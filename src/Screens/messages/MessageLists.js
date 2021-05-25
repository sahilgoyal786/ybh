import React from 'react';
import {bottomCurve,placeholderProfilePhoto} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Text,View,Image,ActivityIndicator,TouchableWithoutFeedback} from 'react-native';
import {FlatList,ScrollView} from 'react-native-gesture-handler';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Header from '../../components/header';
import {Toast} from 'native-base';

class MessageLists extends React.Component{
  static contextType = userDetailContext;
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      token: null,
      chats: []
    };
  }
  componentDidMount(){
    const user = this.context;
    if(user.length){
      this.loadUserChats(user[0].token);
    }
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
          this.setState({chats: response,token: userToken,isLoading: false});
        },
        (error) => {
          this.setState({token: userToken,isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({token: userToken,isLoading: false});
      console.log('exception', exception);
    }
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
        {this.state.isLoading && (
          <ActivityIndicator color="#fff" size="large" style={{position:'absolute',left:0,top:0,right:0,bottom:0,backgroundColor:'#00000080',zIndex:9999}}/>
        )}
        <Image source={bottomCurve} style={{width: widthPercentageToDP(100),height: 200,position: 'absolute',bottom: -100}} resizeMode="contain"/>
        <Header title="Messages" backButton="true" showRightDrawer={false}/>
        <ScrollView alwaysBounceHorizontal={false} alwaysBounceVertical={false} bounces={false} style={{padding: 15,paddingTop: 20}} contentContainerStyle={{paddingBottom: 40}}>
          {this.state.chats && (
            <MessageListWrap>
              {this.state.chats.map((chat,index) => {
                return (
                  <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('ChatMessage',{chat_id: chat.id,name: chat.user.username,receiver: chat.user.user_id,photo: chat.user.photo})}>
                    <MessageList>
                      <MessageIcon>
                        <UserImage source={chat.user.photo ? {uri: chat.user.photo} : placeholderProfilePhoto} resizeMode="contain"></UserImage>
                        <UserStatus style={{backgroundColor: '#04e534'}}></UserStatus>
                      </MessageIcon>
                      <MessageData>
                        <UserName>{chat.user.username}</UserName>
                        {chat.message && (
                          <UserMessage>{chat.message}</UserMessage>
                        )}
                      </MessageData>
                    </MessageList>
                  </TouchableWithoutFeedback>
                );
              })}
            </MessageListWrap>
          )}
        </ScrollView>
      </View>
    );
  }
}
const MessageListWrap = styled(View)({
  flex: 1
});
const MessageList = styled(View)({
  flex: 1,
  flexDirection: 'row',
  marginBottom: 20,
  alignItems: 'center'
});
const MessageIcon = styled(View)({
  marginRight: 20,
  position: 'relative'
});
const UserStatus = styled(View)({
  width: 20,
  height: 20,
  borderRadius: 20,
  backgroundColor: '#f9bc16',
  border: '2px solid #fff',
  position: 'absolute',
  bottom: 3,
  right: 2
});
const MessageData = styled(View)({
  flex: 1,
  flexDirection: 'column'
});
const UserImage = styled(Image)({
  width: 80,
  height: 80,
  borderRadius: 100
});
const UserName = styled(Text)({
  fontSize: 18,
  marginBottom: 5,
  color: '#484848',
  fontWeight: 700
});
const UserMessage = styled(Text)({
  fontSize: 16,
  color: '#7e7e7e'
});
export default MessageLists;