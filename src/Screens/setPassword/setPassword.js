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

import {loginFooter, loginHeader} from '../../common/images';

import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/button';
import {Formik} from 'formik';
import ResponsiveImage from 'react-native-responsive-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {backicon} from '../../common/images';
import network from '../../components/apis/network';
import endpoints from '../../components/apis/endPoints';
import {Toast} from 'native-base';
import {SetPasswordValidationSchema} from '../../common/validations';
import globalstyles from '../../common/styles';

const SetPassword = ({route, navigation}) => {
  const [verified, setVerified] = useState(false);
  const [otp, setOTP] = useState();
  // console.log(route.params);
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
            <Bottom>SET NEW</Bottom>
            <Bottom>PASSWORD</Bottom>
          </Top>
        </HeaaderBackgroundImage>
      </View>
      <View style={{flex: 1, flexGrow: 1, minHeight: hp(30)}}>
        <Formik
          initialValues={{}}
          validationSchema={SetPasswordValidationSchema}
          onSubmit={(values) => {
            values.email = route.params.email;
            values.otp = otp;
            network.getResponse(
              endpoints.setPassword,
              'POST',
              values,
              '',
              (response) => {
                if (response.message) {
                  Toast.show({text: response.message});
                }
                navigation.navigate('Login');
              },
              (error) => {
                // console.log(error, 'forgot fail');
                if (error.message) {
                  Toast.show({text: error.message, duration: 4000});
                }
                navigation.navigate('Login');
              },
            );
            // console.log(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
          }) => (
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
                    marginBottom: 20,
                  }}>
                  Please enter the verification code sent to your email
                </Text>
              </View>
              <TextInput
                // editable={!verified}
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={(text) => {
                  setOTP(text);
                  if (text.length == 6) {
                    network.getResponse(
                      endpoints.verifyOTP,
                      'POST',
                      {otp: text, email: route.params.email},
                      (response) => {
                        setVerified(true);
                        // console.log('verified', verified);
                        // console.log(response, 'succcess');
                        // if (response.message) {
                        //   Toast.show({text: response.message});
                        // }
                      },
                      (error) => {
                        console.log(error, 'error');
                        // console.log(error, 'forgot fail');
                        if (error.message) {
                          Toast.show({text: error.message});
                        }
                      },
                    );
                  }
                }}
                onBlur={handleBlur('otp')}
                value={values.otp}
                placeholder="Verification Code"
                placeholderTextColor="#AAAAAA"
                style={styles.PassTyle}
              />
              {verified && (
                <Text style={{color: 'green', marginTop: 10}}>
                  Awesome, please set a new password below.
                </Text>
              )}

              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                editable={verified}
                placeholder="Password"
                placeholderTextColor="#AAAAAA"
                style={styles.PassTyle}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={styles.error_message}>{errors.password}</Text>
              )}

              <TextInput
                onChangeText={handleChange('password_confirmation')}
                onBlur={handleBlur('password_confirmation')}
                editable={verified}
                value={values.password_confirmation}
                placeholder="Confirm Password"
                placeholderTextColor="#AAAAAA"
                style={styles.PassTyle}
                secureTextEntry
              />
              {errors.password_confirmation &&
                touched.password_confirmation && (
                  <Text style={styles.error_message}>
                    {errors.password_confirmation}
                  </Text>
                )}

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
    width: wp(78),
    fontSize: 17,
    marginTop: 8,
  },
  PassTyle: {
    borderBottomWidth: 1,
    paddingVertical: hp(1),
    width: wp(78),
    fontSize: 17,
    marginTop: 8,
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
  error_message: {
    ...globalstyles.error_message,
    width: wp(78),
  },
});
export default SetPassword;
