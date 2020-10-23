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

import {signupsec} from '../../common/images';

import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/button';
import {Formik} from 'formik';
import ResponsiveImage from 'react-native-responsive-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation} from '@react-navigation/native';
import {LoginValidationSchema} from '../../common/validations';
import {AuthContext} from '../../common/AuthContext';

const Login = () => {
  const navigation = useNavigation();
  const {signIn} = React.useContext(AuthContext);

  return (
    <BackgroundImage source={signupsec}>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <Top>
            <Bottom>SIGN IN </Bottom>
            <Discrip>Enter Your User Name and Password</Discrip>
          </Top>
          <Formik
            initialValues={{
              email: 'sahilgoyal1@gmail.com',
              password: 'sahilgoyal1@gmail.com',
            }}
            validationSchema={LoginValidationSchema}
            onSubmit={(values) => {
              signIn(values);
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
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

                <MainView>
                  {/* <CheckBox
                    title="keep me sign in"
                    checkedIcon={
                      <Checkicons
                        source={iconchecked}
                        initHeight="18"
                        initWidth="18"
                      />
                    }
                    uncheckedIcon={
                      <Checkicons
                        source={unchecked}
                        initHeight="18"
                        initWidth="18"
                      />
                    }
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    containerStyle={styles.containerchecked}
                  /> */}
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </BackgroundImage>
  );
};
const BackgroundImage = styled(ImageBackground)({
  flex: 1,
  // height: hp(120),
});
const Top = styled(View)({
  flex: 0.22,
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
  flex: 0.57,
});
const MainView = styled.View({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  width: wp(87),
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
    width: wp(78),
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
});
export default Login;
