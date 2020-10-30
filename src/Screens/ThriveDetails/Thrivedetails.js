import React, {Component} from 'react';
import {
  welcomepagebackground,
  menu,
  addbtmimg,
  topbanner,
  bannerThriveimg,
  profile,
  facebook,
  twiter,
  insta,
  linkedin,
  blogimg,
  calendar,
  bottomCurve,
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
//import { Image } from 'native-base';
import Button from '../../components/button';
import Header from '../../components/header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ButtonSUbmit = styled(Button)({
  width: widthPercentageToDP(39),
  marginRight: widthPercentageToDP(5),
});
const BackgroundImage = styled(ImageBackground)({
  height:
    Platform.OS === 'ios'
      ? heightPercentageToDP(118)
      : heightPercentageToDP(130),
  // width: widthPercentageToDP(100),
});

const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  // marginTop: heightPercentageToDP(4),
  marginRight: widthPercentageToDP(4),
});

const TextThirive = styled(Text)({
  fontSize: 9,
  color: 'gray',
  letterSpacing: 0.3,
  marginTop: 2,
  fontFamily: 'FuturaPT-Medium',
});

const Thrivedetails = ({route, navigation}) => {
  const {article} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Thrive" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={{backgroundColor: 'white'}}>
          <Image
            source={topbanner}
            style={{
              width: widthPercentageToDP(100) - 60,
              marginLeft: 30,
              height: 40,
            }}
            resizeMode="contain"
          />
          <Text style={{marginTop: 15, padding: 10, fontSize: 20}}>
            {article.title}
          </Text>
          <View style={{justifyContent: 'flex-start'}}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
              }}>
              {/* <ResponsiveImage
              style={{
                marginTop: heightPercentageToDP(1.2),
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
            </Text> */}
              <ResponsiveImage
                style={{
                  marginTop: heightPercentageToDP(1.2),
                }}
                source={calendar}
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
                {article.created_at}
              </Text>
            </View>
          </View>

          <Image
            source={{uri: article.file.path}}
            style={{
              height: widthPercentageToDP(100) - 20,
              width: widthPercentageToDP(100) - 20,
              marginLeft: 10,
              marginTop: 10,
              borderBottomColor: 'red',
              borderBottomWidth: 10,
              borderRightWidth: 20,
              borderColor: 'blue',
            }}
            resizeMode="cover"
          />
          <Text style={{marginTop: 15, padding: 10, marginBottom: 20}}>
            {article.content}
          </Text>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ButtonSUbmit
            // onPress={() => setDialog(true)}
            name={'Previous'}
            linear
          />
          <ButtonSUbmit
            // onPress={() => setDialog(true)}
            name={'Next'}
            linear
          />
        </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F4E8FE',
              width: windowWidth - 80,
              marginLeft: 40,
              paddingHorizontal: wp(20),
              height: 30,
            }}>
            <Text>Share: </Text>
            <Image source={facebook} style={{height: 20, width: 20}} />
            <Image source={twiter} style={{height: 20, width: 20}} />
            <Image source={insta} style={{height: 20, width: 20}} />
            <Image source={linkedin} style={{height: 20, width: 20}} />
          </View>
          <Image
            source={addbtmimg}
            style={{
              height: 60,
              width: windowWidth - 20,
              marginLeft: 10,
              marginTop: 10,
              borderBottomColor: 'red',
              borderBottomWidth: 10,
              borderRightWidth: 20,
              borderColor: 'blue',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: 110,
  },
});

export default Thrivedetails;
