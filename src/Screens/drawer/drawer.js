import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import {menuubackground, image8, addimage} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Drawer = () => {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor:'blue',flex:1}}>
     <BackgroundImage source={menuubackground}> 

      <MainView>
        <View>
          <FirstView>
            <ImagesView
              source={image8}
              initHeight="70"
              initWidth="70"
              borderRadius={50}
            />
          </FirstView>
        </View>
        <ThirdView>
          <UserNameText>Abigail Akon</UserNameText>
        </ThirdView>
      </MainView>
      <MainThirdView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GetAdvice');
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontWeight: '400',
              fontFamily: 'FuturaPT-Light',
            }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShareImage');
          }}>
          <PageText>Share Image</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GetAdvice2');
          }}>
          <PageText>Get Advice</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RelationMeter');
          }}>
          <PageText>Relationship Meter</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TriviaSec');
          }}>
          <PageText>Trivia</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Thrive');
          }}>
          <PageText>Thrive</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <PageText>My Profile</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyPhotos');
          }}>
          <PageText>My Photos</PageText>
        </TouchableOpacity>
        {/* <PageText>Setting</PageText> */}
        <PageText>Logout</PageText>
      </MainThirdView>
      </BackgroundImage>
    </View>

  );
};
const BackgroundImage = styled(ImageBackground)({
  // flex: 1,
  height: heightPercentageToDP(120),
  backgroundColor: 'red',
});
const PageText = styled(Text)({
  marginTop: heightPercentageToDP(2.7),
  fontSize: 18.5,
  color: '#FFFFFF',
  fontWeight: 400,
  fontFamily: 'FuturaPT-Book',
});
const MainThirdView = styled(View)({
  marginLeft: widthPercentageToDP(10),
  marginTop: heightPercentageToDP(12),

  // color: '#FFFFFF',
});
const UserNameText = styled(Text)({
  color: '#FFFFFF',
  fontWeight: 400,
  fontFamily: 'FuturaPT-Book',
  fontSize: 18,
  marginLeft: widthPercentageToDP(3),
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(8),
  // alignItems: 'center',
});
const MainView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(1),
  alignItems: 'center',
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: widthPercentageToDP(4),
  // borderRadius: 0,
  borderWidth: 2,
  borderColor: '#ffffff',
});
const ThirdView = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(3),
  marginTop: heightPercentageToDP(4),
});
export default Drawer;
