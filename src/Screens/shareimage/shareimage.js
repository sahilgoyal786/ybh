import React, {useContext, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import styled from 'styled-components/native';

import ResponsiveImage from 'react-native-responsive-image';
//import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../components/button';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {
  uploadicon,
  backsec,
  iconchecked,
  unchecked,
  photoworld,
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

const ShareImage = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(true);
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const screenHeight = Dimensions.get('window').height;
  const userDetail = useContext(userDetailContext);

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
        console.log(response);
        setUploaded(false);
        if (response.message) Toast.show({text: response.message});
        setIsLoading(false);
      },
      photoResource,
      'image',
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
      <Header title="Upload Image" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <MainView>
          <SubHeading>Disclaimer Text</SubHeading>
          <FirstText>
            Morbi vel urn et risus efficitururn et risus, Morbi vel urn et risus
            efficitururn et risus
          </FirstText>
          <SecText>
            Morbi vel urn et risus efficitururn et , Morbi vel urn et risus
            efficitururn et risus
          </SecText>
        </MainView>
        <MainnnView>
          <CheckBox
            title="I agree to terms & conditions"
            textStyle={{
              fontSize: 14,
              fontWeight: '400',
              fontFamily: 'FuturaPT-Medium',
            }}
            checkedIcon={
              <Checkicons source={unchecked} initHeight="18" initWidth="18" />
            }
            uncheckedIcon={
              <Checkicons source={iconchecked} initHeight="18" initWidth="18" />
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
          <View>
            <ImageBackground
              source={backsec}
              style={{
                height: 80,
                width: 70,
                borderRadius: 50,
                marginLeft: widthPercentageToDP(66),
              }}
            />

            <LastaddImage
              source={photoworld}
              initHeight="130"
              initWidth="381"
            />
          </View>
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
const Checkicons = styled(ResponsiveImage)({
  tintColor: '#000',
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
const LastaddImage = styled(ResponsiveImage)({
  marginTop: -heightPercentageToDP(5),
});
const LastImage = styled(View)({
  // marginTop: heightPercentageToDP(2),

  marginLeft: widthPercentageToDP(4),
});
const UploadView = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
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
  marginLeft: widthPercentageToDP(4),
  fontFamily: 'FuturaPT-Book',
  fontSize: 18,
  paddingTop: 10,
});
const MainView = styled(View)({
  borderRadius: 4,
  borderColor: '#DEDFE0',
  margin: 15,
  marginTop: 0,
  padding: 10,
  paddingTop: 0,
  backgroundColor: '#FAF9FF',
  borderRightWidth: 4,
  borderBottomWidth: 4,
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 22,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: -widthPercentageToDP(2),
  marginTop: -heightPercentageToDP(0.1),
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? '87%' : '100%',
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
export default ShareImage;
