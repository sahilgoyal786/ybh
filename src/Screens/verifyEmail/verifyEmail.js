import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';

import {loginFooter, loginHeader} from '../../common/images';
import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {backicon} from '../../common/images';
import network from '../../components/apis/network';
import endpoints from '../../components/apis/endPoints';
import {Toast} from 'native-base';
import storage from '../../components/apis/storage';
import {AuthContext} from '../../common/AuthContext';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const verifyEmail = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const {signIn} = React.useContext(AuthContext);
  // let interval = setInterval(() => {
  //   timeLeft > 0 ? setTimeLeft(timeLeft - 1) : '';
  // }, 1000);

  // // console.log(route.params);

  // useEffect(() => {
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
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
            <Bottom>Verify Email</Bottom>
          </Top>
        </HeaaderBackgroundImage>
      </View>
      <View style={{flex: 1, flexGrow: 1, minHeight: hp(30)}}>
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
              Please enter the verification code sent to your email
            </Text>
            <TextInput
              // editable={!verified}
              keyboardType="number-pad"
              maxLength={6}
              editable={!isLoading}
              onChangeText={(text) => {
                if (text.length == 6) {
                  setIsLoading(true);
                  network.getResponse(
                    endpoints.verifyEmail,
                    'POST',
                    {otp: text, email: route.params.email},
                    {},
                    (response) => {
                      setIsLoading(false);
                      // console.log(response, 'succcess');
                      // Toast.show({text: error.response.data.message});
                      response.token = response.access_token;
                      storage.setData('access_token', response.access_token);
                      storage.setData('user', JSON.stringify(response.user));
                      signIn(response);
                    },
                    (error) => {
                      setIsLoading(false);
                      // console.log(error.response.data, 'error');
                      // console.log(error, 'forgot fail');
                      if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                      ) {
                        Toast.show({text: error.response.data.message});
                      }
                    },
                  );
                }
              }}
              placeholder="Verification Code"
              placeholderTextColor="#484848"
              style={{textAlign: 'center', width: '100%', ...styles.PassTyle}}
            />
            <Text
              style={
                isLoading
                  ? {opacity: 0.2, marginVertical: 20, alignSelf: 'flex-end'}
                  : {marginVertical: 20, alignSelf: 'flex-end'}
              }
              onPress={() => {
                if (isLoading) {
                  return;
                }
                // if (timeLeft == 0) {
                //   timeLeft == 10;
                // }
                setIsLoading(true);
                network.getResponse(
                  endpoints.resendVerifyEmailOTP,
                  'POST',
                  {email: route.params.email},
                  {},
                  (response) => {
                    setIsLoading(false);
                    // console.log(response, 'succcess');
                    if (response.message) Toast.show({text: response.message});
                  },
                  (error) => {
                    setIsLoading(false);
                    // console.log(error.response.data, 'error');
                    // console.log(error, 'forgot fail');
                    if (
                      error.response &&
                      error.response.data &&
                      error.response.data.message
                    ) {
                      Toast.show({text: error.response.data.message});
                    }
                  },
                );
              }}>
              Resend Code
            </Text>
            {/* <Text style={{marginTop: -20, alignSelf: 'flex-end', fontSize: 10}}>
              {timeLeft >= 0 && <Text>Available In {timeLeft} seconds</Text>}
            </Text> */}
            {isLoading && (
              <ActivityIndicator color="#A073C4" style={{marginTop: 30}} />
            )}
          </View>
        </SigninButton>
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
    marginTop: 10,
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
    ...GlobalStyles.error_message,
    width: wp(78),
  },
});
export default verifyEmail;
