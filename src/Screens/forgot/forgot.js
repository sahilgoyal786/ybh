import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useState, useEffect} from 'react';

import {
  loginbackground,
  loginFooter,
  loginHeader,
  signupsec,
} from '../../common/images';

import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/button';
import {Formik} from 'formik';
import ResponsiveImage from 'react-native-responsive-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation} from '@react-navigation/native';
import {backicon} from '../../common/images';
import network from '../../components/apis/network';
import endpoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {Toast} from 'native-base';

const Forgot = () => {
  const navigation = useNavigation();
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [checked, setChecked] = useState(false);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
      <View>
        <HeaaderBackgroundImage source={loginHeader} imageStyle="stretch">
          <Top>
            <TouchableOpacity
              style={{
                height: 20,
                width: 20,
                marginLeft: -wp(8),
                top: 28,
              }}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Image source={backicon} style={{height: 20, width: 20}} />
            </TouchableOpacity>
            <Bottom>FORGOT</Bottom>
            <Bottom>PASSWORD</Bottom>
          </Top>
        </HeaaderBackgroundImage>
      </View>
      <View style={{flex: 1, flexGrow: 1, minHeight: hp(30)}}>
        <Formik
          initialValues={{email: 'sahilgoyal1@gmail.com'}}
          onSubmit={(values) => {
            network.getResponse(
              endpoints.forgotPassword,
              'POST',
              values,
              '',
              (response) => {
                if (response.message) {
                  Toast.show({text: response.message, duration: 3000});
                  navigation.navigate('SetPassword', {email: response.email});
                }
              },
              (error) => {
                // console.log(error, 'forgot fail');
                if (error.message) {
                  Toast.show({text: error.message});
                }
              },
            );
            // console.log(values);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <SigninButton>
              <View
                style={{
                  width: wp(78),
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,

                    color: '#484848',
                    fontWeight: '200',
                    fontFamily: 'FuturaPT-Medium',
                  }}>
                  We need your registered email to send you password reset
                  instructions
                </Text>
              </View>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="EMAIL"
                placeholderTextColor="#484848"
                style={styles.PassTyle}
              />

              <Button
                style={styles.loginbuttin}
                name={'Send Email'}
                onPress={handleSubmit}
                linear
              />
            </SigninButton>
          )}
        </Formik>
      </View>
      <FooterBackgroundImage
        source={loginFooter}
        imageStyle="stretch"></FooterBackgroundImage>
    </KeyboardAwareScrollView>
  );
};
const HeaaderBackgroundImage = styled(ImageBackground)({
  height: hp(40),
  alignContent: 'center',
  justifyContent: 'center',
  marginBottom: 40,
});
const FooterBackgroundImage = styled(ImageBackground)({
  height: hp(18),
  alignContent: 'center',
  justifyContent: 'center',
  marginBottom: 0,
});
const Top = styled(View)({
  flex: 0.5,
  marginLeft: wp(11),
  justifyContent: 'flex-end',
});
const Bottom = styled(Text)({
  color: '#ffffff',
  fontSize: 25,
  // fontWeight: '300',
  fontFamily: 'FuturaPT-Medium',
});
const Discrip = styled(Text)({
  color: 'white',
  fontSize: 15,
  fontWeight: '500',
});
const SigninButton = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  flex: 0.62,
});
const MainView = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: wp(90),
  alignSelf: 'center',
  marginTop: hp(3),
});
const Checkicons = styled(ResponsiveImage)({
  tintColor: '#000',
});

export const styles = StyleSheet.create({
  fogot: {
    justifyContent: 'center',
    marginRight: wp(5),
  },
  userName: {
    borderBottomWidth: 1,
    paddingVertical: hp(1),
    width: wp(80),
    fontSize: 20,
    marginTop: hp(1),
  },
  PassTyle: {
    borderBottomWidth: 1,
    paddingVertical: hp(1),
    width: wp(78),
    fontSize: 20,
    marginTop: hp(6),
  },
  Forgotstyle: {
    fontSize: 12,
  },
  loginbuttin: {
    marginTop: hp(5),
    width: wp(78),
  },
  account: {
    color: '#484848',
    fontSize: 16,
  },
  gosignup: {
    textDecorationLine: 'underline',
    color: '#484848',
  },
  containerchecked: {
    backgroundColor: 0,
    borderWidth: 0,
    marginRight: '4%',
  },
});
export default Forgot;
