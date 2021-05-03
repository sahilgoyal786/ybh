import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve,ConnectionImages} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text,ScrollView,View,Image,TouchableWithoutFeedback} from 'react-native';
import Header from '../../components/header';
const MyConnection = () => {
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
      <Header title="My Connections"/>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 8, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <ConnectionWrap>
          <UserList>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('UserProfile')}>
              <UserListInner>
                <UserImage source={ConnectionImages['user1']} resizeMode="cover"></UserImage>
                <UserData>
                  <UserName>Jeff Patton</UserName>
                  <UserMessage>Steattie, USA, 24</UserMessage>
                </UserData>
              </UserListInner>
            </TouchableWithoutFeedback>
          </UserList>
          <UserList>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('MessageLists')}>
              <UserListInner>
                <UserImage source={ConnectionImages['user2']} resizeMode="cover"></UserImage>
                <UserData>
                  <UserName>James Johnson</UserName>
                  <UserMessage>Taxas, USA, 32</UserMessage>
                </UserData>
              </UserListInner>
            </TouchableWithoutFeedback>
          </UserList>
          <UserList>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
              <UserListInner>
                <UserImage source={ConnectionImages['user3']} resizeMode="cover"></UserImage>
                <UserData>
                  <UserName>Michael Smith</UserName>
                  <UserMessage>Arizona, USA, 25</UserMessage>
                </UserData>
              </UserListInner>
            </TouchableWithoutFeedback>
          </UserList>
          <UserList>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('MessageLists')}>
              <UserListInner>
                <UserImage source={ConnectionImages['user4']} resizeMode="cover"></UserImage>
                <UserData>
                  <UserName>Juliana Bryant</UserName>
                  <UserMessage>Steattie, USA, 22</UserMessage>
                </UserData>
              </UserListInner>
            </TouchableWithoutFeedback>
          </UserList>
          <UserList>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('UserProfile')}>
              <UserListInner>
                <UserImage source={ConnectionImages['user5']} resizeMode="cover"></UserImage>
                <UserData>
                  <UserName>Jeff Patton</UserName>
                  <UserMessage>Washington, USA, 20</UserMessage>
                </UserData>
              </UserListInner>
            </TouchableWithoutFeedback>
          </UserList>
          <UserList>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('UserProfile')}>
              <UserListInner>
                <UserImage source={ConnectionImages['user6']} resizeMode="cover"></UserImage>
                <UserData>
                  <UserName>Frederick Henry</UserName>
                  <UserMessage>hawaii, USA, 28</UserMessage>
                </UserData>
              </UserListInner>
            </TouchableWithoutFeedback>
          </UserList>
          <UserList>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('UserProfile')}>
              <UserListInner>
                <UserImage source={ConnectionImages['user7']} resizeMode="cover"></UserImage>
                <UserData>
                  <UserName>Michael Smith</UserName>
                  <UserMessage>Steattie, USA, 22</UserMessage>
                </UserData>
              </UserListInner>
            </TouchableWithoutFeedback>
          </UserList>
          <UserList>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('UserProfile')}>
              <UserListInner>
                <UserImage source={ConnectionImages['user8']} resizeMode="cover"></UserImage>
                <UserData>
                  <UserName>Juliana Bryant</UserName>
                  <UserMessage>Arizona, USA, 22</UserMessage>
                </UserData>
              </UserListInner>
            </TouchableWithoutFeedback>
          </UserList>
        </ConnectionWrap>
      </ScrollView>
    </View>
  );
};
const ConnectionWrap = styled(View)({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap'
});
const UserList = styled(View)({
  flex: '0 0 50%',
  height: 180,
  width: '100%',
  marginBottom: 15
});
const UserListInner = styled(View)({
  marginLeft: 8,
  marginRight: 8,
  position: 'relative',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.8,
  shadowRadius: 2,  
  elevation: 5,
  borderRadius: 10
});

const UserImage = styled(Image)({
  width: '100%',
  height: '100%',
  borderRadius: 10
});
const UserData = styled(View)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 10
});
const UserName = styled(Text)({
  fontSize: 20,
  color: '#f9bc16',
  fontWeight: 700,
  textAlign: 'center'
});
const UserMessage = styled(Text)({
  fontSize: 14,
  color: '#fff',
  fontWeight: 700,
  textAlign: 'center'
});
export default MyConnection;