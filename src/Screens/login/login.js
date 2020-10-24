import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';

import {loginHeader, loginFooter} from '../../common/images';

import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/button';
import axios from 'axios';
import {Formik} from 'formik';
import ResponsiveImage from 'react-native-responsive-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation} from '@react-navigation/native';
import {LoginValidationSchema} from '../../common/validations';
import {AuthContext} from '../../common/AuthContext';
import globalstyles from '../../common/styles';

const Login = (props) => {
  const navigation = useNavigation();
  const {signIn} = React.useContext(AuthContext);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
      <View>
        <HeaaderBackgroundImage source={loginHeader} imageStyle="stretch">
          <Top>
            <Bottom>SIGN IN </Bottom>
            <Discrip>Enter Your User Name and Password</Discrip>
          </Top>
        </HeaaderBackgroundImage>
      </View>
      <View style={{flex: 1, flexGrow: 1, minHeight: hp(30)}}>
        <Formik
          initialValues={{
            email: 'sahilgoyal1@gmail.com',
            password: '0987654321',
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => {
            signIn(values);
          }}>
          {({
            handleChange,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            values,
          }) => (
            <SigninButton>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="USER NAME"
                placeholderTextColor="#484848"
                autoCapitalize="none"
                style={styles.userName}
              />
              {errors.email && touched.email && (
                <Text style={styles.error_message}>{errors.email}</Text>
              )}
              <TextInput
                // onChangeText={handleChange('email')}
                // onBlur={handleBlur('email')}
                value={values.pass}
                placeholder="PASSWORD"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="PASSWORD"
                placeholderTextColor="#484848"
                style={styles.PassTyle}
              />

              {errors.password && touched.password && (
                <Text style={styles.error_message}>{errors.password}</Text>
              )}

              <MainView>
                <TouchableOpacity
                  style={styles.fogot}
                  onPress={() => {
                    navigation.navigate('Forgot');
                  }}>
                  <Text style={styles.Forgotstyle}>Forgot Password ?</Text>
                </TouchableOpacity>
              </MainView>

              <Button
                onPress={handleSubmit}
                // onPress={() => {
                //   navigation.navigate('Welcomeuser');
                // }}
                style={styles.loginbuttin}
                name={'Login'}
                linear
              />
              <View style={{marginTop: hp(2)}}>
                <Text style={styles.account}>
                  Don't have an account?{' '}
                  <Text
                    style={styles.gosignup}
                    onPress={() => {
                      navigation.navigate('Signup');
                    }}>
                    Sign up
                  </Text>
                </Text>
              </View>
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
  height: heightPercentageToDP(40),
  alignContent: 'center',
  justifyContent: 'center',
  marginBottom: 40,
});
const FooterBackgroundImage = styled(ImageBackground)({
  height: heightPercentageToDP(18),
  alignContent: 'center',
  justifyContent: 'center',
  marginBottom: 0,
});
const Top = styled(View)({
  flex: 0.5,
  marginLeft: wp(8),
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
  fontSize: 13,
  // fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const SigninButton = styled.View({
  alignItems: 'center',
  justifyContent: 'flex-end',
});
const MainView = styled.View({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  width: wp(88),
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
    marginTop: hp(1.9),
    fontFamily: 'FuturaPT-Medium',
  },
  PassTyle: {
    borderBottomWidth: 1,
    paddingVertical: hp(0.8),
    width: wp(78),
    fontSize: 17,
    marginTop: hp(3),
    fontFamily: 'FuturaPT-Medium',
  },
  Forgotstyle: {
    fontSize: 14,
    fontFamily: 'FuturaPT-Medium',
    color: '#484848',
  },
  loginbuttin: {
    marginTop: hp(3),
  },
  account: {
    color: '#484848',
    fontSize: 16,
    fontFamily: 'FuturaPT-Light',
  },
  gosignup: {
    textDecorationLine: 'underline',
    color: '#484848',
    fontFamily: 'FuturaPT-Light',
  },
  containerchecked: {
    backgroundColor: 0,
    borderWidth: 0,
    marginRight: '6%',
    fontFamily: 'FuturaPT-Light',
    color: 'red',
  },
  error_message: globalstyles.error_message,
});
export default Login;
