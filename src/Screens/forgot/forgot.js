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

import {loginbackground, signupsec} from '../../common/images';
import {iconchecked} from '../../common/images';

import {unchecked} from '../../common/images';

import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {White} from '../../common/colors';
import Button from '../../components/button';
import {Formik} from 'formik';
import {CheckBox} from 'react-native-elements';
import ResponsiveImage from 'react-native-responsive-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation} from '@react-navigation/native';
import {menu, image8, backicon, editprofile} from '../../common/images';
import network from '../../components/apis/network';
import endpoints from '../../components/apis/endPoints';
import userDetailContest from '../../common/userDetailContext';

const BackIcon = styled(ResponsiveImage)({
  fontSize: 12,
  marginTop: 30,
  marginLeft: 10,
});

const Forgot = () => {
  const navigation = useNavigation();
  const userDetail = React.useContext(userDetailContest);
  const [checked, setChecked] = useState(false);
  return (
    <BackgroundImage source={signupsec}>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              //navigation.goBack()
              navigation.navigate('Login');
            }}>
            <BackIcon source={backicon} initHeight="16" initWidth="16" />
          </TouchableOpacity>
          <Top>
            <Bottom>FORGOT</Bottom>
            <Bottom>PASSWORD</Bottom>
          </Top>
          <Formik
            initialValues={{email: 'kartik@gmail.com'}}
            onSubmit={(values) =>{
              network.getResponse(endpoints.forgotPassword,'POST',values,userDetail.access_token||'',(response)=>{
                console.log(response,'forgot success')
              },error=>{
                console.log(error,'forgot fail')

              })
              console.log(values);

            } }>
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
                    We just need your registered email to send you password
                    reset instructions
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

                <Button style={styles.loginbuttin} name={'Send Email'} onPress={handleSubmit} linear />
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
});
const Top = styled(View)({
  flex: 0.22,
  marginLeft: wp(8),
  justifyContent: 'flex-end',
});
const Bottom = styled(Text)({
  color: '#ffffff',
  fontSize: 23,

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
