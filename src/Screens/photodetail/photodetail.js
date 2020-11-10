import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Button from '../../components/button';

import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Container, Header, Content} from 'native-base';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  menu,
  backicon,
  editprofile,
  tickicon,
  dlticon,
} from '../../common/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {White} from '../../common/colors';

const PhotoDetail = () => {
  const navigation = useNavigation();

  return (
    <BackgroundImage source={editprofile}>
      <WelcomeView>
        <BackIcon source={backicon} initHeight="16" initWidth="16" />

        <WelcomeText>View Photo Detail</WelcomeText>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <MenuIcon source={menu} initHeight="30" initWidth="30" />
        </TouchableOpacity>
      </WelcomeView>
      <View style={{alignSelf: 'center', marginTop: heightPercentageToDP(4)}}>
        <FirstView>
          <ImagesView source={{}} initHeight="150" initWidth="180" />

          <ImageeDltView source={dlticon} initHeight="40" initWidth="40" />
        </FirstView>
      </View>

      <ViewRow>
        <View>
          <CUstomButton>
            <ImagesView source={tickicon} initHeight="22" initWidth="22" />
            <TextApproved>Approved</TextApproved>
          </CUstomButton>
        </View>

        <View style={{marginLeft: widthPercentageToDP(1)}}>
          <Button
            onPress={() => {
              navigation.navigate('PhotoDetail');
            }}
            style={{
              width: widthPercentageToDP(44),
            }}
            name={'Share With Friends'}
            linear
          />
        </View>
      </ViewRow>
    </BackgroundImage>
  );
};
const TextApproved = styled(Text)({
  color: '#fff',
  fontFamily: 'FuturaPT-Medium',
  fontSize: 18,
  fontWeight: '500',
});
const CUstomButton = styled(TouchableOpacity)({
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#0BC677',
  flexDirection: 'row',
  width: widthPercentageToDP(44),
  padding: heightPercentageToDP(1.9),
  marginTop: heightPercentageToDP(1),
  borderRadius: 5,
});
const ImageeDltView = styled(ResponsiveImage)({
  // position: 'absolute',
  // position: 'relative',
  // top: heightPercentageToDP(12.2),
  // right: widthPercentageToDP(9.8),
  left: -widthPercentageToDP(9.5),
});
const ImageeView = styled(View)({
  position: 'absolute',
  top: heightPercentageToDP(3.2),
  left: widthPercentageToDP(5.7),
});
const ViewRow = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(2),
  justifyContent: 'space-between',
  alignSelf: 'center',
});
const ImagesView = styled(ResponsiveImage)({
  // marginRight: widthPercentageToDP(2),
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(8),
  alignItems: 'flex-end',
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
  marginLeft: -widthPercentageToDP(30),
  marginTop: -heightPercentageToDP(0.1),
});
const BackIcon = styled(ResponsiveImage)({
  fontSize: 12,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(9),
});
const BackgroundImage = styled(ImageBackground)({
  height: heightPercentageToDP(120),
  width: widthPercentageToDP(100),
});
export default PhotoDetail;
