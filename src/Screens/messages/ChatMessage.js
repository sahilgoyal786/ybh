import React from 'react';
import {
  bottomCurve,
  placeholderProfilePhoto,
  SendIcon,
  EditIcon,
} from '../../common/images';
import styled from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../../components/button';
import {Dialog} from 'react-native-simple-dialogs';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Header from '../../components/header';
import {Textarea, Toast} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');
class ChatMessage extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      chat_id: props.route.params.chat_id,
      receiver: props.route.params.receiver,
      name: props.route.params.name,
      photo: props.route.params.photo,
      isLoading: true,
      message: null,
      hasMoreMessages: true,
      messages: [],
      token: null,
      page: 0,
      totalPage: 1,
      loadingMore: false,
      editable: false,
      editableMsgId: null,
      editableMsg: null,
      editableIndex: null,
      dialog: false,
    };
  }
  componentDidMount() {
    const user = this.context;
    this.setState({token: user[0].token});
    const {navigation} = this.props;
    this.loadUserChatMessages();
    var interval = setInterval(() => {
      this.loadUserChatMessages(true);
    }, 10000);
    navigation.addListener('blur', () => {
      clearInterval(interval);
    });
  }
  loadUserChatMessages = (refresh = false) => {
    const user = this.context;
    let userToken = user[0].token;

    if (!refresh && !this.state.hasMoreMessages) {
      return;
    }
    if (!refresh) {
      this.setState({isLoading: true});
    }
    try {
      let currentPage = this.state.page + 1;
      if (refresh) {
        currentPage = 1;
      }
      let data = {
        chat_id: this.state.chat_id,
        page: currentPage,
      };
      if (refresh && this.state.messages.length) {
        data['last'] = this.state.messages[0].id;
      }
      network.getResponse(
        EndPoints.getChatMessages,
        'POST',
        data,
        userToken,
        (response) => {
          this.setState({isLoading: false});
          let msgs = this.state.messages;
          if (refresh && response.length) {
            let latMsgs = response.concat(msgs);
            this.setState({messages: latMsgs});
          } else if (!refresh && response.data && response.data.length) {
            let messages = msgs.concat(response.data);
            this.setState({
              messages: messages,
              page: response.current_page,
              totalPage: response.last_page,
            });
          } else {
            this.setState({hasMoreMessages: false});
          }
        },
        (error) => {
          this.setState({isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  changeMessage = (value) => {
    this.setState({message: value});
  };
  sendMessage = () => {
    if (this.state.message && this.state.message.length) {
      this.setState({isLoading: true});
      try {
        network.getResponse(
          EndPoints.sendMessage,
          'POST',
          {
            chat_id: this.state.chat_id,
            receiver: this.state.receiver,
            message: this.state.message,
          },
          this.state.token,
          (response) => {
            this.setState({isLoading: false, message: null});
            if (response && response.data) {
              let messages = this.state.messages;
              messages.unshift(response.data);
              this.setState({messages: messages});
            } else if (response && response.message) {
              Toast.show({
                text: response.message,
                type: 'danger',
                duration: 3000,
              });
            }
          },
          (error) => {
            this.setState({isLoading: false});
            console.log('error', error);
          },
        );
      } catch (exception) {
        this.setState({isLoading: false});
        console.log('exception', exception);
      }
    } else {
      Toast.show({text: 'Message is not valid.'});
    }
  };
  onLongPressFun = (item, index) => {
    this.setState({
      editable: true,
      editableMsgId: item.id,
      editableMsg: item.message,
      editableIndex: index,
    });
  };
  editMessage = () => {
    try {
      this.setState({isLoading: true});
      network.getResponse(
        EndPoints.updateMessage,
        'POST',
        {msg_id: this.state.editableMsgId, message: this.state.editableMsg},
        this.state.token,
        (response) => {
          if (response && response.data) {
            var result = this.state.messages.map((el) =>
              el.id == response.data.id
                ? {
                    ...el,
                    message: response.data.message,
                    editable: response.data.editable,
                  }
                : el,
            );
            this.setState({
              messages: result,
              dialog: false,
              isLoading: false,
              editable: false,
              editableMsgId: null,
              editableMsg: null,
              editableIndex: null,
            });
          } else if (response && response.message) {
            Toast.show({
              text: response.message,
              type: 'danger',
              duration: 3000,
            });
          }
        },
        (error) => {
          this.setState({isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  deleteMessage = () => {
    try {
      this.setState({isLoading: true});
      network.getResponse(
        EndPoints.deleteMessage,
        'POST',
        {message_id: this.state.editableMsgId},
        this.state.token,
        (response) => {
          console.log(response);
          this.state.messages.splice(this.state.editableIndex, 1);
          this.setState({
            isLoading: false,
            editable: false,
            editableMsgId: null,
            editableMsg: null,
            editableIndex: null,
          });
        },
        (error) => {
          this.setState({isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  render() {
    let msgDate = null;
    let lastMsgDate = null;
    let dateTag = false;
    return (
      <View style={{flex: 1}}>
        <Header
          title={this.state.name}
          backButton="true"
          userImage={this.state.photo}
          showRightDrawer={false}
        />
        {this.state.isLoading && (
          <ActivityIndicator color="#A073C4" size="large" />
        )}
        <Dialog
          visible={this.state.dialog}
          onTouchoutside={() =>
            this.setState({
              dialog: false,
              editable: false,
              editableMsgId: null,
              editableMsg: null,
              editableIndex: null,
            })
          }>
          <View>
            <Textarea
              rowSpan={5}
              value={this.state.editableMsg}
              placeholder="Enter your message...."
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
              }}
              onChangeText={(textMsg) => this.setState({editableMsg: textMsg})}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              onPress={() => this.editMessage()}
              style={styles.DialogBtn}
              name={'Submit'}
              linear
            />
            <Button
              onPress={() =>
                this.setState({
                  dialog: false,
                  editable: false,
                  editableMsgId: null,
                  editableMsg: null,
                  editableIndex: null,
                })
              }
              style={styles.DialogBtn}
              name={'Cancel'}
              secondary
            />
          </View>
        </Dialog>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS == 'ios' ? 'padding' : ''}>
          <FlatList
            inverted
            bounces={false}
            alwaysBounceVertical={false}
            onEndReached={() => this.loadUserChatMessages()}
            onEndReachedThreshold={this.state.messages.length ? 0.5 : 0}
            keyExtractor={() => Math.random()}
            data={this.state.messages}
            contentContainerStyle={{justifyContent: 'flex-end'}}
            renderItem={(list) => {
              if (list.index == 0) {
                msgDate = list.item.date;
              } else if (msgDate !== list.item.date) {
                lastMsgDate = msgDate;
                msgDate = list.item.date;
                dateTag = true;
              } else {
                dateTag = false;
              }

              return (
                <>
                  {/* {dateTag && (
                    <View style={styles.dateTagWrap}>
                      <Text style={styles.dateTag}>{lastMsgDate}</Text>
                    </View>
                  )} */}
                  <View style={styles.messageWrap}>
                    {list.item.receiver != this.state.receiver ? (
                      <View style={styles.userMessageWrap}>
                        {list.item.editable ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignSelf: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <View style={styles.userTxtMsg}>
                              <Text style={styles.userTxtMsgTxt}>
                                {list.item.message}
                              </Text>
                            </View>
                            <Image
                              source={EditIcon}
                              style={{
                                width: 15,
                                height: 15,
                                marginLeft: 8,
                              }}></Image>
                          </View>
                        ) : (
                          <View style={styles.userTxtMsg}>
                            <Text style={styles.userTxtMsgTxt}>
                              {list.item.message}
                            </Text>
                          </View>
                        )}
                        <Text style={styles.time}>
                          {list.item.date + ' ' + list.item.time}
                        </Text>
                      </View>
                    ) : (
                      <>
                        {list.item.editable ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignSelf: 'flex-end',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={EditIcon}
                              style={{
                                width: 15,
                                height: 15,
                                marginRight: 8,
                              }}></Image>
                            <View style={styles.myMessage}>
                              <Text
                                style={styles.myMessageTxt}
                                onLongPress={() =>
                                  this.onLongPressFun(list.item, list.index)
                                }>
                                {list.item.message}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View style={styles.myMessage}>
                            <Text
                              style={styles.myMessageTxt}
                              onLongPress={() =>
                                this.onLongPressFun(list.item, list.index)
                              }>
                              {list.item.message}
                            </Text>
                          </View>
                        )}
                        <Text style={styles.time}>
                          {list.item.date + ' ' + list.item.time}
                        </Text>
                      </>
                    )}
                  </View>
                </>
              );
            }}
          />
          {this.state.editable && (
            <View style={styles.bottomDrawerWrap}>
              <Text
                style={styles.bottomDrawItem}
                onPress={() => this.setState({dialog: true})}>
                Edit
              </Text>
              <Text
                style={styles.bottomDrawItem}
                onPress={() => this.deleteMessage()}>
                Delete
              </Text>
              <Text
                style={styles.bottomDrawItem}
                onPress={() =>
                  this.setState({
                    editable: false,
                    editableMsgId: null,
                    editableMsg: null,
                    editableIndex: null,
                  })
                }>
                Cancel
              </Text>
            </View>
          )}
          <View style={styles.bottomWrap}>
            <TextInput
              style={styles.input}
              value={this.state.message}
              onChangeText={(msg) => this.changeMessage(msg)}
              blurOnSubmit={false}
              onSubmitEditing={() => this.sendMessage()}
              placeholder="Write a message..."
              returnKeyType="send"
              placeholderTextColor="#fff"
              multiline={true}
            />
            <TouchableWithoutFeedback onPress={() => this.sendMessage()}>
              <Image
                source={SendIcon}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 10,
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  DialogBtn: {
    marginTop: 15,
    width: '50%',
    height: 40,
  },
  bottomDrawerWrap: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  bottomDrawItem: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    fontSize: 15,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#7b43a5',
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    maxHeight: 80,
    minHeight: 40,
  },
  userMessageWrap: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  myMessageWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  messageWrap: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  userTxtMsg: {
    maxWidth: width - 80,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    backgroundColor: '#efefef',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    marginBottom: 5,
  },
  userTxtMsgTxt: {
    color: '#484848',
    fontSize: 15,
  },
  myMessage: {
    maxWidth: width - 80,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    backgroundColor: '#7b43a5',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    marginBottom: 5,
    marginLeft: 'auto',
  },
  myMessageTxt: {
    color: '#fff',
    fontSize: 15,
  },
  time: {
    textAlign: 'right',
    color: '#a0a0a0',
    fontSize: 12,
  },
  dateTagWrap: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateTag: {
    padding: 5,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#ebf7ff',
    color: '#333',
    borderRadius: 10,
    fontSize: 12,
  },
});
export default ChatMessage;
