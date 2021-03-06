import React from 'react';
import {bottomCurve, placeholderProfilePhoto} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Header from '../../components/header';
import {Toast} from 'native-base';
import GlobalStyles, {GlobalImages} from '../../common/styles';
class MessageLists extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: null,
      chats: [],
      editable: false,
      editableChatId: null,
      editableIndex: null,
    };
  }
  componentDidMount() {
    const user = this.context;
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      if (user.length) {
        this.loadUserChats(user[0].token);
      }
    });
  }
  loadUserChats = (userToken) => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.getChats,
        'GET',
        {},
        userToken,
        (response) => {
          this.setState({chats: response, token: userToken, isLoading: false});
        },
        (error) => {
          this.setState({token: userToken, isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({token: userToken, isLoading: false});
      console.log('exception', exception);
    }
  };
  onDottedPressFun = (chatId, Index) => {
    this.setState({
      editable: true,
      editableChatId: chatId,
      editableIndex: Index,
    });
  };
  deleteChat = () => {
    try {
      this.setState({isLoading: true});
      network.getResponse(
        EndPoints.deleteChat,
        'POST',
        {chat_id: this.state.editableChatId},
        this.state.token,
        (response) => {
          console.log(response);
          this.state.chats.splice(this.state.editableIndex, 1);
          this.setState({
            isLoading: false,
            editable: false,
            editableChatId: null,
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
    const {navigation} = this.props;
    return (
      <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
        {this.state.isLoading && (
          <ActivityIndicator
            color={GlobalStyles.whiteTextColor.color}
            size="large"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000080',
              zIndex: 9999,
            }}
          />
        )}
        <Image
          source={bottomCurve}
          style={{
            width: widthPercentageToDP(100),
            height: 200,
            position: 'absolute',
            bottom: -100,
          }}
          resizeMode="contain"
        />
        <Header title="Messages" backButton="true" showRightDrawer={false} />
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 15, paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 40}}>
          {this.state.chats && (
            <MessageListWrap>
              {this.state.chats.map((chat, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      this.setState({
                        editable: false,
                        editableChatId: null,
                        editableIndex: null,
                      });
                      navigation.navigate('ChatMessage', {
                        chat_id: chat.id,
                        name: chat.user.username,
                        receiver: chat.user.user_id,
                        photo: chat.user.photo,
                        status: chat.status,
                      });
                    }}>
                    <MessageList>
                      <MessageIcon>
                        <UserImage
                          source={
                            chat.user && chat.user.photo
                              ? {uri: chat.user.photo}
                              : placeholderProfilePhoto
                          }
                          resizeMode="cover"></UserImage>
                        {chat.unread && (
                          <Text style={styles.unread}>{chat.unread}</Text>
                        )}
                      </MessageIcon>
                      <MessageData>
                        <UserName>{chat.user.username}</UserName>
                        {chat.message && (
                          <UserMessage ellipsizeMode="head" numberOfLines={1}>
                            {chat.message}
                          </UserMessage>
                        )}
                      </MessageData>
                      <TouchableWithoutFeedback
                        onPress={() => this.onDottedPressFun(chat.id, index)}>
                        <View style={styles.DottedWrap}>
                          <View style={styles.DottedItem} />
                          <View style={styles.DottedItem} />
                          <View style={styles.DottedItem} />
                        </View>
                      </TouchableWithoutFeedback>
                    </MessageList>
                  </TouchableWithoutFeedback>
                );
              })}
            </MessageListWrap>
          )}
        </ScrollView>
        {this.state.editable && (
          <View style={styles.bottomDrawerWrap}>
            <Text
              style={styles.bottomDrawItem}
              onPress={() => this.deleteChat()}>
              Delete Chat
            </Text>
            <Text
              style={styles.bottomDrawItem}
              onPress={() =>
                this.setState({
                  editable: false,
                  editableChatId: null,
                  editableIndex: null,
                })
              }>
              Cancel
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bottomDrawerWrap: {
    ...GlobalStyles.secondaryBackgroundColor,
    ...GlobalStyles.primaryBorderColor,
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    borderTopWidth: 1,
  },
  bottomDrawItem: {
    ...GlobalStyles.primaryBorderColor,
    ...GlobalStyles.secondaryTextColor,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    fontSize: 15,
  },
  DottedWrap: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  DottedItem: {
    backgroundColor: GlobalStyles.gradientColorsFrom,
    width: 5,
    height: 5,
    borderRadius: 5,
    marginBottom: 2,
  },
  unread: {
    position: 'absolute',
    backgroundColor: '#0bb265',
    color: '#fff',
    height: 20,
    minWidth: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 13,
    fontSize: 12,
    lineHeight: 15,
    paddingTop: 3,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
    top: 0,
    right: 0,
  },
});
const MessageListWrap = styled(View)({
  flex: 1,
});
const MessageList = styled(View)({
  ...GlobalStyles.primaryBorderColor,
  flex: 1,
  flexDirection: 'row',
  marginBottom: 20,
  alignItems: 'center',
  paddingBottom: 15,
  borderBottomWidth: 1,
});
const MessageIcon = styled(View)({
  marginRight: 20,
  position: 'relative',
});
const MessageData = styled(View)({
  flex: 1,
  flexDirection: 'column',
  position: 'relative',
});
const UserImage = styled(Image)({
  width: 80,
  height: 80,
  borderRadius: 80,
});
const UserName = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 18,
  marginBottom: 5,
  fontWeight: 600,
});
const UserMessage = styled(Text)({
  ...GlobalStyles.custom2TextColor,
  fontSize: 16,
});
export default MessageLists;
