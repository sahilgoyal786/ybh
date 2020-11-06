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

import {bottomCurve, placeholderProfilePhoto} from '../../common/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import userDetailContext from '../../common/userDetailContext';
import network from '../../components/apis/network';
import endpoint from '../../components/apis/endPoints';
import globalstyles from '../../common/styles';
import {AuthContext} from '../../common/AuthContext';
import ImagePicker from 'react-native-image-picker';
import EndPoints from '../../components/apis/endPoints';
import storage from '../../components/apis/storage';
import {
  UpdateProfileValidationSchema,
  UpdatePasswordValidationSchema,
} from '../../common/validations';
import FastImage from 'react-native-fast-image';

const Profile = () => {
  const userDetail = React.useContext(userDetailContext);
  const {updateUserDetail} = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      quality: 0.5,
      maxWidth: 256,
      maxHeight: 256,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        if (response.fileSize < 5000000) {
          uploadPhoto(response);
        } else {
          Toast.show({text: 'Please choose a lighter/smaller image.'});
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
        updateUserDetail(userDetail, {user: response.user});
        // console.log('response ------------', response);
        if (response.message) {
          Toast.show({text: 'Profile photo uploaded successfully.'});
        }
        setUploaded(true);
        setIsLoading(false);
      },
      (response) => {
        setUploaded(false);
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
              />
            </TouchableOpacity>
          </FirstView>
        </View>

        <Formik
          validationSchema={UpdateProfileValidationSchema}
          initialValues={{
            username: (userDetail && userDetail.user.username) || '',
            email: (userDetail && userDetail.user.email) || '',
          }}
          onSubmit={(values) => {
            setIsSaving(true);
            network.getResponse(
              endpoint.profileUpdate,
              'POST',
              values,
              userDetail.token || '',
              (response) => {
                updateUserDetail(userDetail, {user: response.user});
                if (response.message)
                  Toast.show({text: 'Profile updated successfully.'});
                storage.setData('user', JSON.stringify(response.user));
                setIsSaving(false);
              },
              (error) => {
                // console.log(error.response.data);
                setIsSaving(false);
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
                isLoading={isSaving}
                linear
              />
            </View>
          )}
        </Formik>

        <Formik
          validationSchema={UpdatePasswordValidationSchema}
          initialValues={{
            current_password: '',
            password: '',
            password_confirmation: '',
          }}
          onSubmit={(values) => {
            setIsSaving(true);
            network.getResponse(
              endpoint.passwordUpdate,
              'POST',
              values,
              userDetail.token || '',
              (response) => {
                if (response.message)
                  Toast.show({text: response.message, duration: 5000});
                setIsSaving(false);
              },
              (error) => {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.message
                ) {
                  Toast.show({
                    text: error.response.data.message,
                    duration: 5000,
                  });
                }
                setIsSaving(false);
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
            <>
              <View style={{width: '80%', alignSelf: 'center', marginTop: 20}}>
                <Input
                  secureTextEntry={true}
                  placeholder="**********"
                  label="Current Password"
                  name="current_password"
                  onChangeText={handleChange('current_password')}
                  onBlur={handleBlur('current_password')}
                />
                {touched && errors.current_password && (
                  <Text style={styles.error_message}>
                    {errors.current_password}
                  </Text>
                )}
              </View>
              <View style={{width: '80%', alignSelf: 'center', marginTop: 20}}>
                <Input
                  secureTextEntry={true}
                  placeholder="**********"
                  label="Password"
                  name="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                {touched && errors.password && (
                  <Text style={styles.error_message}>{errors.password}</Text>
                )}
              </View>

              <View style={{width: '80%', alignSelf: 'center', marginTop: 20}}>
                <Input
                  placeholder="**********"
                  label="Confirm Password"
                  secureTextEntry={true}
                  name="password_confirmation"
                  onChangeText={handleChange('password_confirmation')}
                  onBlur={handleBlur('password_confirmation')}
                />
                {touched && errors.password_confirmation && (
                  <Text style={styles.error_message}>
                    {errors.password_confirmation}
                  </Text>
                )}
              </View>
              <Button
                style={{
                  width: widthPercentageToDP(78),
                  marginTop: heightPercentageToDP(4),
                  alignSelf: 'center',
                }}
                onPress={handleSubmit}
                isLoading={isSaving}
                name={'Update Password'}
                linear
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};
const ImagesView = styled(FastImage)({
  borderWidth: 2,
  borderColor: '#FFFFFF',
  shadowColor: '#FFFFFF',
  height: 130,
  width: 130,
  shadowRadius: 1,
  borderRadius: 100,
});
const FirstView = styled(View)({
  flexDirection: 'row',
});
const styles = StyleSheet.create({
  error_message: {
    ...globalstyles.error_message,
    paddingLeft: 10,
    marginBottom: 25,
    marginTop: -10,
  },
});
export default Profile;
