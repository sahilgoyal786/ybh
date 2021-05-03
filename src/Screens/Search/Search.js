import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve,SearchIcons} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text,ScrollView,View,Image} from 'react-native';
import Header from '../../components/header';
const Search = () => {
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
      <Header title="Search"/>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 8, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <UserListWrap>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <UserList>
              <UserName>Jeff Patton</UserName>
              <UserData>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['age']} resizeMode="contain"></Image>
                <UserDataText>24</UserDataText>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['address']} resizeMode="contain"></Image>
                <UserDataText>Texas</UserDataText>
              </UserData>
            </UserList>
          </TouchableOpacity>
          <TouchableOpacity>
            <UserList>
              <UserName>Jeff Patton</UserName>
              <UserData>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['age']} resizeMode="contain"></Image>
                <UserDataText>24</UserDataText>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['address']} resizeMode="contain"></Image>
                <UserDataText>Texas</UserDataText>
              </UserData>
            </UserList>
          </TouchableOpacity>
          <TouchableOpacity>
            <UserList>
              <UserName>Jeff Patton</UserName>
              <UserData>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['age']} resizeMode="contain"></Image>
                <UserDataText>24</UserDataText>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['address']} resizeMode="contain"></Image>
                <UserDataText>Texas</UserDataText>
              </UserData>
            </UserList>
          </TouchableOpacity>
          <TouchableOpacity>
            <UserList>
              <UserName>Jeff Patton</UserName>
              <UserData>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['age']} resizeMode="contain"></Image>
                <UserDataText>24</UserDataText>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['address']} resizeMode="contain"></Image>
                <UserDataText>Texas</UserDataText>
              </UserData>
            </UserList>
          </TouchableOpacity>
          <TouchableOpacity>
            <UserList>
              <UserName>Jeff Patton</UserName>
              <UserData>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['age']} resizeMode="contain"></Image>
                <UserDataText>24</UserDataText>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['address']} resizeMode="contain"></Image>
                <UserDataText>Texas</UserDataText>
              </UserData>
            </UserList>
          </TouchableOpacity>
          <TouchableOpacity>
            <UserList>
              <UserName>Jeff Patton</UserName>
              <UserData>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['age']} resizeMode="contain"></Image>
                <UserDataText>24</UserDataText>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['address']} resizeMode="contain"></Image>
                <UserDataText>Texas</UserDataText>
              </UserData>
            </UserList>
          </TouchableOpacity>
          <TouchableOpacity>
            <UserList>
              <UserName>Jeff Patton</UserName>
              <UserData>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['age']} resizeMode="contain"></Image>
                <UserDataText>24</UserDataText>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['address']} resizeMode="contain"></Image>
                <UserDataText>Texas</UserDataText>
              </UserData>
            </UserList>
          </TouchableOpacity>
          <TouchableOpacity>
            <UserList>
              <UserName>Jeff Patton</UserName>
              <UserData>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['age']} resizeMode="contain"></Image>
                <UserDataText>24</UserDataText>
                <Image style={{width:20,height:20,marginRight:5}} source={SearchIcons['address']} resizeMode="contain"></Image>
                <UserDataText>Texas</UserDataText>
              </UserData>
            </UserList>
          </TouchableOpacity>
        </UserListWrap>
      </ScrollView>
    </View>
  );
};
const UserListWrap = styled(View)({
  flex: 1,
  flexDirection: 'column',
});
const UserList = styled(View)({
  flex: 1,
  margin: 10,
  padding: 20,
  paddingLeft: 30,
  paddingRight: 30,
  marginBottom: 15,
  borderRadius: 10,
  backgroundColor: '#fff',
  elevation: 5
});
const UserName = styled(Text)({
  fontSize: 18,
  lineHeight: 20,
  color: '#7b43a5',
  fontWeight: 700,
  marginBottom: 8
});
const UserData = styled(View)({
  flex: 1,
  flexDirection: 'row'
});
const UserDataText = styled(Text)({
  fontSize: 18,
  color: '#484848',
  fontWeight: 700,
  lineHeight: 20,
  marginRight: 20
});
export default Search;