import React, {Component, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import Button from '../../components/button';
import {Input} from 'react-native-elements';

import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
//import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Item, Label, Toast} from 'native-base';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  menu,
  image8,
  backicon,
  editprofile,
  botomView,
  headerView,
  bottomCurve,
  placeholderProfilePhoto,
} from '../../common/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import userDetailContext from '../../common/userDetailContext';
import network from '../../components/apis/network';
import endpoint from '../../components/apis/endPoints';
import globalstyles from '../../common/styles';
import {AuthContext} from '../../common/AuthContext';
import ImagePicker from 'react-native-image-picker';
import EndPoints from '../../components/apis/endPoints';

const Profile = () => {
  const userDetail = React.useContext(userDetailContext);
  const {updateUserDetail} = React.useContext(AuthContext);

  console.log(userDetail.user.avatar);

  const [isLoading, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        if (response.fileSize < 20000000) {
          uploadPhoto(response);
        } else {
          Toast.show({text: 'Please choose an image under 20MB.'});
        }
      }
    });
  };

  const uploadPhoto = (photoResource) => {
    setIsLoading(true);
    setUploaded(null);
    network.getResponse(
      EndPoints.profileUpdate,
      'POST',
      {},
      userDetail.token,
      (response) => {
        // console.log(response);
        Toast.show({text: response.message});
        setUploaded(true);
        setIsLoading(false);
      },
      (response) => {
        console.log(response);
        setUploaded(false);
        if (response.message) Toast.show({text: response.message});
        setIsLoading(false);
      },
      photoResource,
      'profile_image',
    );
  };

  return (
    <View style={{flex: 1}}>
      <Image
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Profile" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 60}}>
        <View style={{alignSelf: 'center'}}>
          <FirstView>
            <TouchableOpacity onPress={() => handleChoosePhoto()}>
              {isLoading && (
                <ActivityIndicator
                  size="large"
                  color="purple"
                  style={{
                    zIndex: 10,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginLeft: -18,
                    marginTop: -10,
                  }}
                />
              )}
              <ImagesView
                source={
                  userDetail && userDetail.user.avatar
                    ? {uri: userDetail.user.avatar}
                    : placeholderProfilePhoto
                }
                initHeight="130"
                initWidth="130"
                borderRadius={100}></ImagesView>
            </TouchableOpacity>
          </FirstView>
        </View>

        <Formik
          initialValues={{
            username: (userDetail && userDetail.user.username) || '',
            email: (userDetail && userDetail.user.email) || '',
          }}
          onSubmit={(values) => {
            console.log(values, 'valuess');
            network.getResponse(
              endpoint.profileUpdate,
              'POST',
              values,
              userDetail.token || '',
              (response) => {
                if (response.access_token) {
                  updateUserDetail(response);
                  // storage.setData('access_token', response.access_token);
                  storage.setData('user', JSON.stringify(response.user));
                  // dispatch({type: 'SIGN_IN', token:response.access_token,userDetail:response.user});
                } else {
                  // console.log('console.log(error),',error)
                }
              },
              (error) => {
                console.log(error);
              },
            );
          }}>
          {({
            values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            handleBlur,
          }) => (
            <View style={{width: '80%', alignSelf: 'center', marginTop: 20}}>
              <Input
                style={{fontFamily: 'FuturaPT-Light'}}
                placeholder="User Name"
                label="Name"
                name="username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
              />
              {errors.username && touched.username && (
                <Text style={styles.error_message}>{errors.username}</Text>
              )}

              <Input
                style={{
                  fontFamily: 'FuturaPT-Light',
                  color: '#CCC',
                }}
                placeholder="test@gmail.com"
                label="Email"
                name="email"
                editable={false}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {errors.email && touched.email && (
                <Text style={styles.error_message}>{errors.email}</Text>
              )}
              <Button
                style={{
                  width: widthPercentageToDP(78),
                  marginTop: heightPercentageToDP(4),
                  alignSelf: 'center',
                }}
                onPress={handleSubmit}
                name={'Save Profile'}
                linear
              />
            </View>
          )}
        </Formik>

        <View style={{width: '80%', alignSelf: 'center', marginTop: 20}}>
          <Input
            style={{fontFamily: 'FuturaPT-Light'}}
            placeholder="**********"
            label="Password"
          />
        </View>

        <View style={{width: '80%', alignSelf: 'center', marginTop: 20}}>
          <Input
            style={{fontFamily: 'FuturaPT-Light'}}
            placeholder="**********"
            label="Confirm Password"
          />
        </View>
        <Button
          style={{
            width: widthPercentageToDP(78),
            marginTop: heightPercentageToDP(4),
            alignSelf: 'center',
          }}
          name={'Update Password'}
          linear
        />
      </ScrollView>
    </View>
  );
};
const TextInputtView = styled(Item)({
  width: widthPercentageToDP(78),
  alignSelf: 'center',
  // borderWidth: 2,
  // borderColor: '#000',
  //marginTop: heightPercentageToDP(8),
});
const TextInputView = styled(Item)({
  width: widthPercentageToDP(78),
  alignSelf: 'center',
  // borderWidth: 2,
  // borderColor: '#000',
  marginTop: heightPercentageToDP(1.8),
});
const ImagesView = styled(ResponsiveImage)({
  borderWidth: 2,
  borderColor: '#FFFFFF',
  shadowColor: '#FFFFFF',
  shadowOffset: {
    width: 0,
    height: 0.9,
  },
  shadowOpacity: 0.8,
  shadowRadius: 1,
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(6),
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 24,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: -widthPercentageToDP(60),
  marginTop: -heightPercentageToDP(0.1),
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? '89%' : '100%',
  bottom: 0,
  marginTop: 50,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-14%',
  marginLeft: 12,
});
const BackIcon = styled(ResponsiveImage)({});
const styles = StyleSheet.create({
  error_message: {
    ...globalstyles.error_message,
    // width: wp(78),
  },
});
export default Profile;
