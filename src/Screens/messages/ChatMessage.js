import React from 'react';
import {
  bottomCurve,
  placeholderProfilePhoto,
  SendIcon,
} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Header from '../../components/header';
import {Toast} from 'native-base';
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
    };
  }
  componentDidMount() {
    const user = this.context;
    const {navigation} = this.props;
    if (user.length) {
      this.loadUserChatMessages(user[0].token);
    }
    let interval = setInterval(() => {
      this.loadChatMessages();
    },10000);
    navigation.addListener('blur', () => {
      clearInterval(interval);
    });
  }
  loadUserChatMessages = (userToken) => {
    this.setState({token: userToken,isLoading: true});
    let getChatMessages = {url: 'chat/messages/' + this.state.chat_id};
    try {
      network.getResponse(
        getChatMessages,
        'GET',
        {},
        userToken,
        (response) => {
          this.setState({messages: response,isLoading: false});
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
              messages.push(response.data);
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
  loadChatMessages = () => {
    let chatMessages = {url: 'chat/messages/' + this.state.chat_id};
    try{
      network.getResponse(
        chatMessages,
        'GET',
        {},
        this.state.token,
        (response) => {
          if(response && response.length > this.state.messages.length){
            this.setState({messages: response});
          }
        },
        (error) => {
          console.log('error', error);
        },
      );
    }catch(exception){
      console.log('exception', exception);
    }
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {this.state.isLoading && (
          <ActivityIndicator
            color="#fff"
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
        <Header
          title={this.state.name}
          backButton="true"
          userImage={this.state.photo}
          showRightDrawer={false}
        />
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 5, paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 0}}>
          {this.state.messages && (
            <View>
              {this.state.messages.map((list, index) => {
                if (list.receiver != this.state.receiver) {
                  return (
                    <MessageWrap key={index}>
                      <UserMessage>
                        <UserImage
                          source={
                            this.state.photo
                              ? {uri: this.state.photo}
                              : placeholderProfilePhoto
                          }
                          resizeMode="cover"></UserImage>
                        <UserTxtMsg>{list.message}</UserTxtMsg>
                      </UserMessage>
                      <Time>{list.time}</Time>
                    </MessageWrap>
                  );
                } else {
                  return (
                    <MessageWrap key={index}>
                      <MyMessage>{list.message}</MyMessage>
                      <Time>{list.time}</Time>
                    </MessageWrap>
                  );
                }
              })}
            </View>
          )}
        </ScrollView>
        <MessageBottom>
          <TextInput
            name="message"
            style={styles.input}
            placeholderTextColor={'#fff'}
            onChangeText={(text) => this.changeMessage(text)}
            placeholder="Write a message..."
          />
          <TouchableWithoutFeedback
            disabled={this.state.message == null}
            onPress={() => this.sendMessage()}>
            <SendImage
              source={SendIcon}
              style={this.state.message == null ? {opacity: 0.4} : {}}
              resizeMode="contain"></SendImage>
          </TouchableWithoutFeedback>
        </MessageBottom>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 45,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginRight: 15,
  },
});
const MessageBottom = styled(View)({
  height: 65,
  flexDirection: 'row',
  padding: 10,
  paddingLeft: 15,
  paddingRight: 15,
  backgroundColor: '#7b43a5',
  alignItems: 'center',
});
const DayTag = styled(Text)({
  padding: 7,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 20,
  backgroundColor: '#fff',
  fontSize: 16,
  color: '#7b43a5',
  textAlign: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: '0.2',
  shadowRadius: 5,
  elevation: '5',
  margin: 'auto',
  marginTop: 15,
  marginBottom: 15,
});
const MessageWrap = styled(View)({
  flex: 1,
  flexDirection: 'column',
  padding: 5,
  paddingLeft: 15,
  paddingRight: 15,
});
const UserMessage = styled(View)({
  flexDirection: 'row',
});
const UserImage = styled(Image)({
  width: 40,
  height: 40,
  borderRadius: 40,
  marginRight: 10,
});
const UserTxtMsg = styled(Text)({
  flex: 1,
  paddingTop: 10,
  paddingBottom: 15,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 20,
  borderBottomRightRadius: 0,
  backgroundColor: '#fff',
  fontSize: 14,
  lineHeight: '20px',
  color: '#484848',
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: '0.2',
  shadowRadius: 5,
  elevation: '5',
  marginBottom: 5,
});
const MyMessage = styled(Text)({
  paddingTop: 10,
  paddingBottom: 15,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 20,
  borderBottomRightRadius: 0,
  backgroundColor: '#7b43a5',
  fontSize: 14,
  lineHeight: '20px',
  color: '#fff',
  maxWidth: 280,
  marginLeft: 'auto',
  marginBottom: 5,
});
const Time = styled(Text)({
  textAlign: 'right',
  color: '#a0a0a0',
});
const SendImage = styled(Image)({
  width: 40,
  height: 40,
});
export default ChatMessage;
