import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';
import Button from '../../components/button';
import { Input } from 'react-native-elements';

import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
//import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Item, Label } from 'native-base';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { menu, image8, backicon, editprofile,botomView,headerView } from '../../common/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/header';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View >
        <Header title="Profile" />
        <BackgroundImage source={botomView}>
        <View  style={{ flex:Platform.OS === 'ios' ? 1 : .69}}>
            <ScrollView >
        <View style={{ alignSelf: 'center' }}>
          <FirstView>
            <ImagesView
              source={image8}
              initHeight="130"
              initWidth="130"
              borderRadius={100}
            />
          </FirstView>
        </View>

       
        <View style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}>
          <Input
            style={{ fontFamily: 'FuturaPT-Light' }}
            placeholder='User Name'
            label='Name'
          />

          <Input
            style={{ fontFamily: 'FuturaPT-Light' }}
            placeholder='test@gmail.com'
            label='Email'
          />

        </View>

        <Button
          style={{
            width: widthPercentageToDP(78),
            marginTop: heightPercentageToDP(4),
            alignSelf: 'center',
          }}
          name={'Edit Profile'}
          linear
        />

        <View style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}>
          
          <Input
            style={{ fontFamily: 'FuturaPT-Light' }}
            placeholder='**********'
            label='Password'
          />

        </View>
        <Button
          style={{
            width: widthPercentageToDP(78),
            marginTop: heightPercentageToDP(4),
            alignSelf: 'center',
          }}
          name={'Edit Password'}
          linear
        />
      </ScrollView>
        </View>
       </BackgroundImage>
      </View>
  );
};
const TextInputtView = styled(Item)({
  width: widthPercentageToDP(78),
  alignSelf: 'center',
  // borderWidth: 2,
  // borderColor: '#000',
  //marginTop: heightPercentageToDP(8),
});
const TextInputView = styled(Item)({
  width: widthPercentageToDP(78),
  alignSelf: 'center',
  // borderWidth: 2,
  // borderColor: '#000',
  marginTop: heightPercentageToDP(1.8),
});
const ImagesView = styled(ResponsiveImage)({
  borderWidth: 2,
  borderColor: '#FFFFFF',
  shadowColor: '#FFFFFF',
  shadowOffset: {
    width: 0,
    height: 0.9,
  },
  shadowOpacity: 0.8,
  shadowRadius: 1,

  elevation: 3,
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(6),
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 24,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: -widthPercentageToDP(60),
  marginTop: -heightPercentageToDP(0.1),
});
const BackgroundImage = styled(ImageBackground)({
  height:Platform.OS === 'ios' ? '89%' : '100%' ,
  bottom:0,
  marginTop:50,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: "-14%",
  marginLeft:12
});
const BackIcon = styled(ResponsiveImage)({
  fontSize: 12,
});
export default Profile;
