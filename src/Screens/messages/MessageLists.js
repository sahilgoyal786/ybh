import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve,UserImages} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text,ScrollView,View,Image} from 'react-native';
import Header from '../../components/header';
const MessageLists = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Message"/>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 15, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <MessageListWrap>
          <TouchableOpacity onPress={() => navigation.navigate('ChatMessage')}>
            <MessageList>
              <MessageIcon>
                <UserImage source={UserImages['user1']} resizeMode="contain"></UserImage>
                <UserStatus style={{backgroundColor: '#04e534'}}></UserStatus>
              </MessageIcon>
              <MessageData>
                <UserName>Deborah Todd</UserName>
                <UserMessage>Hi matt! Do you have a moment?</UserMessage>
              </MessageData>
            </MessageList>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatMessage')}>
            <MessageList>
              <MessageIcon>
                <UserImage source={UserImages['user2']} resizeMode="contain"></UserImage>
                <UserStatus style={{backgroundColor: '#f9bc16'}}></UserStatus>
              </MessageIcon>
              <MessageData>
                <UserName>John Doe</UserName>
                <UserMessage>Thanks Jenny and have nice day!</UserMessage>
              </MessageData>
            </MessageList>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatMessage')}>
            <MessageList>
              <MessageIcon>
                <UserImage source={UserImages['user3']} resizeMode="contain"></UserImage>
                <UserStatus style={{backgroundColor: '#04e534'}}></UserStatus>
              </MessageIcon>
              <MessageData>
                <UserName>Elizabeth</UserName>
                <UserMessage>Thanks Jenny and have nice day!</UserMessage>
              </MessageData>
            </MessageList>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatMessage')}>
            <MessageList>
              <MessageIcon>
                <UserImage source={UserImages['user4']} resizeMode="contain"></UserImage>
                <UserStatus style={{backgroundColor: '#f9bc16'}}></UserStatus>
              </MessageIcon>
              <MessageData>
                <UserName>Jannette Mccurdy</UserName>
                <UserMessage>Hi matt! Do you have a moment?</UserMessage>
              </MessageData>
            </MessageList>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatMessage')}>
            <MessageList>
              <MessageIcon>
                <UserImage source={UserImages['user5']} resizeMode="contain"></UserImage>
                <UserStatus></UserStatus>
              </MessageIcon>
              <MessageData>
                <UserName>Sandra</UserName>
                <UserMessage>Thanks Jenny and have nice day!</UserMessage>
              </MessageData>
            </MessageList>
          </TouchableOpacity>
        </MessageListWrap>
      </ScrollView>
    </View>
  );
};
const MessageListWrap = styled(View)({
  flex: 1
});
const MessageList = styled(View)({
  flex: 1,
  flexDirection: 'row',
  marginBottom: 30,
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
  backgroundColor: '#f00',
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
  borderRadius: 80
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