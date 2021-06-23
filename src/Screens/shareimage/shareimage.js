import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import styled from 'styled-components/native';

import ResponsiveImage from 'react-native-responsive-image';
let RNFS = require('react-native-fs');
//import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../components/button';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {
  uploadicon,
  backsec,
  bottomCurve,
  tickicon,
  sync,
} from '../../common/images';
import {CheckBox} from 'react-native-elements';
import Header from '../../components/header';
import ImagePicker from 'react-native-image-picker';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {Toast} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import storage from '../../components/apis/storage';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const ShareImage = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(true);
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const screenHeight = Dimensions.get('window').height;
  const [userDetail, changeUserDetail] = useContext(userDetailContext);
  const [shareImageBottom, setShareImageBottom] = React.useState(false);

  const handleChoosePhoto = () => {
    if (!checked) {
      Toast.show({
        text: 'Please give your consent to the terms and conditions first.',
      });
      return;
    }
    const options = {
      noData: true,
      quality: 0.5,
      maxWidth: 1000,
      maxHeight: 1000,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        if (response.fileSize < 5000000) {
          setPhoto(response);
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
      EndPoints.uploadImage,
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
        // console.log(response);
        setUploaded(false);
        if (response.message) Toast.show({text: response.message});
        setIsLoading(false);
      },
      photoResource,
      'image',
    );
  };

  useEffect(() => {
    storage.getData('share_image_bottom').then((data) => {
      if (data) {
        setShareImageBottom(JSON.parse(data));
      }
    });
  }, []);

  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
      <Image
        source={GlobalImages.footer}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Upload Image" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <MainView>
          <SubHeading>Disclaimer Text</SubHeading>
          <FirstText>
            YBHApp reserves the right, in its sole discretion, without notice,
            to remove any content that does not adhere to these terms. You will
            not post photographs that may be inappropriate in nature in the
            YBH’s sole discretion. This means that any photo you submit, must
            not be inappropriate, offensive or otherwise offensive and must not
            contain (without limitation) any of the following: profanity, nudity
            or pornographic material.
          </FirstText>
        </MainView>
        <MainnnView>
          <CheckBox
            title="I agree to terms & conditions"
            textStyle={{
              ...GlobalStyles.secondaryTextColor,
              fontSize: 14,
              fontWeight: '400',
              fontFamily: 'FuturaPT-Medium',
            }}
            uncheckedIcon={
              <FontAwesome5Icon
                name="check-square"
                style={{fontSize: 20, color: '#A073C4'}}
                solid
              />
            }
            checkedIcon={
              <FontAwesome5Icon
                name="square"
                style={{fontSize: 20, color: '#A073C4'}}
              />
            }
            checked={!checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.containerchecked}
          />
        </MainnnView>

        <View style={{alignItems: 'center'}}>
          <Button
            onPress={() => {
              handleChoosePhoto();
            }}
            style={{
              marginTop: -heightPercentageToDP(2),
              width: widthPercentageToDP(76),
              marginBottom: heightPercentageToDP(5),
            }}
            name={'Upload'}
            isLoading={isLoading}
            linear
          />
          {photo && (
            <TouchableOpacity
              onPress={() => {
                if (uploaded === false) {
                  uploadPhoto(photo);
                }
              }}>
              <View>
                <Image
                  source={{uri: photo.uri}}
                  style={{width: 100, height: 100}}
                  resizeMode="cover"
                />
                {uploaded && (
                  <Image
                    source={tickicon}
                    style={{
                      height: 50,
                      width: 50,
                      position: 'absolute',
                      left: 25,
                      top: 25,
                    }}
                  />
                )}
                {uploaded === false && (
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: 100,
                      width: 100,
                      alignItems: 'center',
                      padding: 10,
                      borderRadius: 2,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                    <Image
                      source={sync}
                      style={{
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Retry
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          {!isLoading && (
            <ImageeView>
              <ImagesView source={uploadicon} initHeight="20" initWidth="20" />
            </ImageeView>
          )}
        </View>

        <LastImage>
          {shareImageBottom && (
            <TouchableOpacity
              onPress={() => Linking.openURL(shareImageBottom.url)}>
              <Image
                source={{
                  uri:
                    'file://' +
                    RNFS.DocumentDirectoryPath +
                    '/' +
                    shareImageBottom.path,
                }}
                style={{
                  width: '100%',
                  aspectRatio: 208 / 79,
                  padding: 0,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          )}
        </LastImage>
      </ScrollView>
    </View>
  );
};
export const styles = StyleSheet.create({
  containerchecked: {
    backgroundColor: 0,
    borderWidth: 0,
    marginRight: '6%',
    fontFamily: 'FuturaPT-Light',
    color: 'red',
  },
});
const MainnnView = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: widthPercentageToDP(80),
  alignSelf: 'center',
  marginLeft: widthPercentageToDP(20),
  marginTop: -heightPercentageToDP(1),
  marginBottom: heightPercentageToDP(2),
});
const LastImage = styled(View)({
  marginLeft: 15,
  marginTop: 20,
  width: widthPercentageToDP(100) - 30,
});
const ImageeView = styled(View)({
  position: 'absolute',
  // bottom: heightPercentageToDP(49),
  left: widthPercentageToDP(33),
  // backgroundColor: 'red',
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
  borderRadius: 0,
});
const FirstText = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  padding: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 14,
});
const SecText = styled(Text)({
  paddingTop: 1,
  paddingRight: 15,
  paddingLeft: 15,
  paddingBottom: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 14,
});
const SubHeading = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  marginLeft: widthPercentageToDP(4),
  fontFamily: 'FuturaPT-Book',
  fontSize: 18,
  paddingTop: 10,
});
const MainView = styled(View)({
  ...GlobalStyles.secondaryBackgroundColor,
  ...GlobalStyles.primaryBorderColor,
  borderRadius: 4,
  margin: 15,
  marginTop: 0,
  padding: 10,
  paddingTop: 0,
  borderRightWidth: 4,
  borderBottomWidth: 4,
});
export default ShareImage;
