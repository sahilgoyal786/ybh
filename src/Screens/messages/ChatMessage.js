import React from 'react';
import {
  bottomCurve,
  placeholderProfilePhoto,
  SendIcon,
} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
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
} from 'react-native';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Header from '../../components/header';
import {Toast} from 'native-base';
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
      isLoading: false,
      message: null,
      messages: [],
      token: null,
      page: 0,
      totalPage: 1,
      loadingMore: false,
    };
  }
  componentDidMount() {
    const user = this.context;
    this.setState({token: user[0].token});
    const {navigation} = this.props;
    this.loadUserChatMessages();
    let interval = setInterval(() => {
      this.loadUserChatMessages(true);
    }, 10000);
    navigation.addListener('blur', () => {
      clearInterval(interval);
    });
  }
  loadUserChatMessages = (refresh = false) => {
    const user = this.context;
    let userToken = user[0].token;
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
          let msgs = this.state.messages;
          if (refresh && response.length) {
            msgs.unshift(response);
            this.setState({messages: msgs});
          } else {
            let messages = msgs.concat(response.data);
            this.setState({
              messages: messages,
              page: response.current_page,
              totalPage: response.last_page,
              isLoading: false,
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
  changeMessage = (value) => {
    this.setState({message: value});
  };
  sendMessage = () => {
    if (this.state.message.length) {
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
            }
            if (response && response.message) {
              Toast.show({text: response.message});
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
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={this.state.name}
          backButton="true"
          userImage={this.state.photo}
          showRightDrawer={false}
        />
        <KeyboardAvoidingView style={styles.keyboard}>
          <FlatList
            inverted
            bounces={false}
            alwaysBounceVertical={false}
            onEndReached={() => this.loadUserChatMessages()}
            onEndReachedThreshold={this.state.messages.length ? 0.5 : 0}
            data={this.state.messages}
            contentContainerStyle={{justifyContent: 'flex-end'}}
            renderItem={(list) => {
              return (
                <View style={styles.messageWrap} key={list.index}>
                  {list.item.receiver != this.state.receiver ? (
                    <View style={styles.userMessageWrap}>
                      <Text style={styles.userTxtMsg}>{list.item.message}</Text>
                      <Text style={styles.time}>{list.item.time}</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.myMessage}>{list.item.message}</Text>
                      <Text style={styles.time}>{list.item.time}</Text>
                    </>
                  )}
                </View>
              );
            }}
            ListEmptyComponent={
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.isLoading || this.state.loadingMore ? (
                  <ActivityIndicator color="#A073C4" size="large" />
                ) : (
                  <></>
                )}
              </View>
            }
          />
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
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    height: 60,
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
    height: 40,
    fontSize: 16,
    color: '#fff',
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
    color: '#484848',
    marginBottom: 5,
    fontSize: 15,
  },
  myMessage: {
    maxWidth: width - 40,
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
    color: '#fff',
    marginBottom: 5,
    marginLeft: 'auto',
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
