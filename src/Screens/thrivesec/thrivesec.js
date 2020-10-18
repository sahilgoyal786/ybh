import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {
  welcomepagebackground,
  menu,
  topbanner,
  profile,
  bnrimg,
  calaender,
  facebook,
  twiter,
  linkedin,
  insta,
  addbtmimg,
} from '../../common/images';
import Button from '../../components/button';

import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const ThriveSec = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <BackgroundImage source={welcomepagebackground}>
        <WelcomeView>
          <WelcomeText>Thrive</WelcomeText>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <MenuIcon source={menu} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        </WelcomeView>
        <ScrollView>
          <View
            style={{alignItems: 'center', marginTop: heightPercentageToDP(4)}}>
            <ImagesView source={topbanner} initHeight="35" initWidth="320" />
          </View>
          <View
            style={{
              marginLeft: widthPercentageToDP(3),
              marginTop: heightPercentageToDP(1.7),
            }}>
            <Text style={{fontFamily: 'FuturaPT-Book', fontSize: 16}}>
              Aenean rhoncus justo odio necfend lacus
            </Text>
            <Text style={{fontFamily: 'FuturaPT-Book', fontSize: 16}}>
              ipsum ornare egestas lorem pulvinar ut.
            </Text>
          </View>
          <View
            style={{marginLeft: widthPercentageToDP(3), flexDirection: 'row'}}>
            <ResponsiveImage
              style={{
                fontSize: 10,
                color: 'gray',
                marginTop: heightPercentageToDP(1.2),
                marginLeft: widthPercentageToDP(0.3),
              }}
              source={profile}
              initHeight="8"
              initWidth="8"
            />
            <Text
              style={{
                fontSize: 10,
                color: '#848585',
                marginTop: heightPercentageToDP(0.9),
                marginLeft: widthPercentageToDP(1),
                fontFamily: 'FuturaPT-Medium',
              }}>
              By: joe Smith
            </Text>
            <ResponsiveImage
              style={{
                fontSize: 10,
                color: 'gray',
                marginTop: heightPercentageToDP(1.2),
                marginLeft: widthPercentageToDP(3),
              }}
              source={calaender}
              initHeight="8"
              initWidth="8"
            />
            <Text
              style={{
                fontSize: 10,
                color: 'gray',
                marginTop: heightPercentageToDP(1),
                marginLeft: widthPercentageToDP(1),
              }}>
              09/04/2020
            </Text>
          </View>
          <BanerImageView>
            <ImagesView source={bnrimg} initHeight="165" initWidth="380" />
          </BanerImageView>
          <View style={{padding: 10, width: widthPercentageToDP(97)}}>
            <Text
              style={{
                color: '#484848',
                fontSize: 14,
                fontFamily: 'FuturaPT-Light',
              }}>
              Lorem dolor sit amet, consectetur adipiscing elit,Lorem ipsum
              dolor amet, consectetur adipiscing dolor sit amet,dolor sit amet
              consectetur adipiscing ipsum dolor consectetur consectetur elit
              Lorem dolor sit amet, consectetur adipiscing elit,Lorem ipsum
              dolor amet, consectetur adipiscing dolor sit amet,dolor sit amet
              consectetur adipiscing ipsum.
            </Text>
          </View>
          <BorderView>
            <Text
              style={{
                fontFamily: 'FuturaPT-Book',
                fontSize: 14,
                color: '#000',
              }}>
              Lorem dolor amet, consectetur adipiscing elit,Lorem ipsum dolor
              amet, consectetur adipiscing dolor sit amet,dolor sit amet
              consectetur amet.
            </Text>
          </BorderView>
          <View style={{padding: 10, width: widthPercentageToDP(97)}}>
            <TextBig>
              Lorem dolor sit amet, consectetur adipiscing elit,Lorem ipsum
              dolor amet, consectetur adipiscing dolor sit amet,dolor sit amet
              consectetur adipiscing ipsum dolor consectetur consectetur elit
              Lorem dolor sit amet, consectetur adipiscing elit,Lorem ipsum
              dolor amet, consectetur adipiscing dolor sit amet,dolor sit amet
              consectetur adipiscing ipsum.
            </TextBig>
          </View>
          <RowButtonView>
            <Button
              style={{
                width: widthPercentageToDP(38),
                paddingLeft: widthPercentageToDP(3),
              }}
              name={'Previous'}
              linear
            />
            <Button
              style={{
                width: widthPercentageToDP(38),
                paddingRight: widthPercentageToDP(3),
              }}
              name={'Next'}
              linear
            />
          </RowButtonView>
          <Viewlast>
            <ViewSecLst>
              <TextShare>Share : </TextShare>
              <ImageFacebook source={facebook} initHeight="8" initWidth="8" />
              <ImageTwiter source={twiter} initHeight="8" initWidth="8" />
              <Imageinsta source={insta} initHeight="8" initWidth="8" />
              <ImageLinkedin source={linkedin} initHeight="8" initWidth="8" />
            </ViewSecLst>
          </Viewlast>
          <View
            style={{alignItems: 'center', marginTop: heightPercentageToDP(2)}}>
            <ImagesView source={addbtmimg} initHeight="40" initWidth="340" />
          </View>
        </ScrollView>
      </BackgroundImage>
    </ScrollView>
  );
};
const TextBig = styled(Text)({
  color: '#484848',
  fontSize: 14,
  justifyContent: 'center',
  fontFamily: 'FuturaPT-Light',
});
const Imageinsta = styled(ResponsiveImage)({
  fontSize: 10,
  color: 'gray',
  marginTop: heightPercentageToDP(1.2),
  marginLeft: widthPercentageToDP(3),
});
const ImageLinkedin = styled(ResponsiveImage)({
  fontSize: 10,
  color: 'gray',
  marginTop: heightPercentageToDP(1.2),
  marginLeft: widthPercentageToDP(3),
});
const ImageTwiter = styled(ResponsiveImage)({
  fontSize: 10,
  color: 'gray',
  marginTop: heightPercentageToDP(1.2),
  marginLeft: widthPercentageToDP(3),

  fontFamily: 'FuturaPT-Medium',
});
const ImageFacebook = styled(ResponsiveImage)({
  fontSize: 10,
  color: 'gray',
  marginTop: heightPercentageToDP(1.2),
  marginLeft: widthPercentageToDP(0.3),

  fontFamily: 'FuturaPT-Medium',
});
const TextShare = styled(Text)({
  fontSize: 11,
  color: '#848585',
  marginTop: heightPercentageToDP(0.9),

  fontFamily: 'FuturaPT-Medium',
});
const ViewSecLst = styled(View)({
  flexDirection: 'row',
  paddingBottom: heightPercentageToDP(1),
  alignSelf: 'center',
});
const Viewlast = styled(View)({
  backgroundColor: '#F2E9FE',
  width: widthPercentageToDP(94),
  alignSelf: 'center',
  marginTop: heightPercentageToDP(1),
});
const RowButtonView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: heightPercentageToDP(1),
});
const BorderView = styled(View)({
  padding: 5,
  width: widthPercentageToDP(90),
  borderLeftWidth: 1.5,
  borderLeftColor: '#8952B2',
  left: 10,
});
const BanerImageView = styled(View)({
  backgroundColor: '#F6BC18',
  marginLeft: -widthPercentageToDP(1.6),
  width: widthPercentageToDP(94.4),
  height: heightPercentageToDP(22.6),
  marginTop: heightPercentageToDP(2),
  borderRadius: 4,
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
  resizeMode: 'cover',
  justifyContent: 'center',
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  // marginTop: heightPercentageToDP(4),
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 25,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(9),
});
const BackgroundImage = styled(ImageBackground)({
  height: heightPercentageToDP(117),
  // width: widthPercentageToDP(100),
});
export default ThriveSec;
