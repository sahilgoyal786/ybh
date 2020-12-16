import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';

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
import {Formik, useFormikContext} from 'formik';
import ResponsiveImage from 'react-native-responsive-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation} from '@react-navigation/native';
import {LoginValidationSchema} from '../../common/validations';
import {AuthContext} from '../../common/AuthContext';
import globalstyles from '../../common/styles';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import storage from '../../components/apis/storage';
import {Toast} from 'native-base';

const Login = (props) => {
  const navigation = useNavigation();
  const {signIn} = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let token = await storage.getData('device_token');
      if (token) {
        setDeviceToken(token);
      }
    };
    bootstrapAsync();
  }, []);

  const CheckSavedEmail = () => {
    const formik = useFormikContext();
    React.useEffect(() => {
      const bootstrapAsync = async () => {
        let saved_email = await storage.getData('remember_email');
        // console.log('saved_email', saved_email);
        if (saved_email) {
          formik.setFieldValue('email', saved_email);
        }
      };
      bootstrapAsync();
    }, []);
    return null;
  };

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
            email: 'admin@ybhive.app',
            password: '123456789',
            email: '',
            password: '',
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => {
            setIsLoading(true);
            if (deviceToken) {
              values['device_token'] = deviceToken;
            }
            storage.setData('remember_email', values.email);
            network.getResponse(
              EndPoints.login,
              'POST',
              values,
              '',
              (response) => {
                setIsLoading(false);
                if (response.access_token) {
                  response.token = response.access_token;
                  storage.setData('access_token', response.access_token);
                  storage.setData('user', JSON.stringify(response.user));
                  signIn(response);
                } else {
                  // console.log('console.log(error),',error)
                }
              },
              (error) => {
                setIsLoading(false);
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.message
                ) {
                  Toast.show({text: error.response.data.message});
                }
                if (error.response.data.email_verification === false) {
                  navigation.navigate('VerifyEmail', {email: values.email});
                }
              },
            );
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
              <CheckSavedEmail />
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
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
                placeholder="Password"
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
                isLoading={isLoading}
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
  width: wp(78),
  alignSelf: 'center',
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
    width: '100%',
    fontSize: 17,
    marginTop: hp(1.9),
  },
  PassTyle: {
    borderBottomWidth: 1,
    paddingVertical: hp(0.8),
    width: '100%',
    fontSize: 17,
    marginTop: hp(3),
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
