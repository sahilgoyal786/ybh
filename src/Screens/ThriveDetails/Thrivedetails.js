import React, { Component } from 'react';
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
  calaender,
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { useNavigation, DrawerActions } from '@react-navigation/native';

import {
  StyleSheet,
  TouchableOpacity,
  Text, ScrollView,
  View,
  ImageBackground, Image, Platform, Dimensions
} from 'react-native'
//import { Image } from 'native-base';
import Button from '../../components/button';
import { Header } from 'react-native/Libraries/NewAppScreen';
import TopHeader from '../../components/header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ButtonSUbmit = styled(Button)({
  width: widthPercentageToDP(39),
  marginRight: widthPercentageToDP(5),
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? heightPercentageToDP(118) : heightPercentageToDP(130),
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

class Thrivedetails extends Component {



  render() {
    const { navigation } = this.props;
    return (
      <View>
        <TopHeader title="Thrive Details" backButton="true" />
          <ScrollView >
            <Image
              source={topbanner} style={{ height: 60, width: windowWidth - 60, marginLeft: 30, marginTop: 40 }}
            />
            <Text style={{ marginTop: 15, padding: 10 }}> Aenean rohoncus justo odio necfend lacus ipsum ornare egestas lorem pulvinar ut.</Text>
            <View style={{ justifyContent: 'flex-start' }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10
                }}>
                <ResponsiveImage
                  style={{
                    fontSize: 10,
                    color: 'gray',
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
            </View>

            <Image
              source={bannerThriveimg} style={{
                height: 260, width: windowWidth - 20, marginLeft: 10, marginTop: 10, borderBottomColor: 'red',
                borderBottomWidth: 10, borderRightWidth: 20, borderColor: 'blue'
              }}
            />
            <Text style={{ marginTop: 15, padding: 10 }}> Aenean rohoncus justo odio necfend lacus ipsum ornare egestas
            lorem pulvinar ut Aenean rohoncus justo odio necfend lacus ipsum ornare egestas
            lorem pulvinar utAenean rohoncus justo odio necfend lacus ipsum ornare egestas
            lorem pulvinar utAenean rohoncus justo odio necfend lacus ipsum ornare egestas lorem pulvinar ut.
                     </Text>

            <Text style={{ padding: 10 }}> Aenean rohoncus justo odio necfend lacus ipsum ornare egestas
            lorem pulvinar ut Aenean rohoncus justo odio necfend .
                     </Text>

            <Text style={{ padding: 10 }}> Aenean rohoncus justo odio necfend lacus ipsum ornare egestas
            lorem pulvinar ut Aenean rohoncus justo odio necfend lacus ipsum ornare egestas
            lorem pulvinar utAenean rohoncus justo odio necfend lacus ipsum ornare egestas
            lorem pulvinar utAenean rohoncus justo odio necfend lacus ipsum ornare egestas lorem pulvinar ut.
                     </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

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

            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F4E8FE',
              width: windowWidth - 80,
              marginLeft: 40,
              paddingHorizontal: wp(20),
              height: 30

            }}>

              <Text>Share: </Text>
              <Image source={facebook} style={{ height: 20, width: 20 }} />
              <Image source={twiter} style={{ height: 20, width: 20 }} />
              <Image source={insta} style={{ height: 20, width: 20 }} />
              <Image source={linkedin} style={{ height: 20, width: 20 }} />
            </View>
            <Image
              source={addbtmimg} style={{
                height: 60, width: windowWidth - 20, marginLeft: 10, marginTop: 10, borderBottomColor: 'red',
                borderBottomWidth: 10, borderRightWidth: 20, borderColor: 'blue'
              }}
            />
          </ScrollView>
        </View>
    )
  }
}

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
    marginBottom: 10
  },
  image: {
    flex: 1,
    height: 110
  },
})

export default Thrivedetails;