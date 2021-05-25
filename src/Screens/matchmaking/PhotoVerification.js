import React from 'react';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve, placeholderProfilePhoto} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {Text, ScrollView, View, Image, ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import {Toast} from 'native-base';
import ImagePicker from 'react-native-image-picker';
class PhotoVerification extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: null,
      profile_photo: null,
    };
  }
  componentDidMount() {
    const user = this.context;
    if (user.length) {
      this.updateAccessToken(user[0].token);
    }
  }
  updateAccessToken = (userToken) => {
    this.setState({token: userToken});
  };
  openCamera = () => {
    const options = {
      mediaType: 'photo',
      noData: true,
      quality: 0.5,
      maxWidth: 1000,
      maxHeight: 1000,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        if (response.fileSize < 5000000) {
          this.verifyProfileImage(response);
        } else {
          Toast.show({text: 'Please choose a lighter/smaller image.'});
        }
      }
    });
  };
  verifyProfileImage = (photoResource) => {
    const {navigation} = this.props;
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.verifyMatchProfile,
        'POST',
        {},
        this.state.token,
        (response) => {
          this.setState({profile_photo: response.url, isLoading: false});
          Toast.show({text: response.message});
          navigation.navigate('MyConnection');
        },
        (error) => {
          this.setState({isLoading: false});
          console.log('error', error);
        },
        photoResource,
        'image',
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {this.state.isLoading && (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000080',
              zIndex: 9999,
            }}
          />
        )}
        <Image
          source={bottomCurve}
          style={{
            width: widthPercentageToDP(100),
            height: 200,
            position: 'absolute',
            bottom: -100,
          }}
          resizeMode="contain"></Image>
        <Header
          title="Photo Verification"
          backButton="true"
          showRightDrawer={false}
        />
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 40, paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 40}}>
          <View style={{marginBottom: 20, alignItems: 'center'}}>
            <Heading>Keep your face still and look into the circle.</Heading>
            <Text style={{fontSize: 16, lineHeight: 24}}>
              Without verifying your photo you cannot use this app. We have to
              make sure is a safe environment.
            </Text>
            <ProfileImage
              source={
                this.state.profile_photo
                  ? {
                      uri:
                        'https://api.ybhive.app/storage/' +
                        this.state.profile_photo,
                    }
                  : placeholderProfilePhoto
              }
            />
            <Text style={{fontSize: 17, lineHeight: 24, textAlign: 'center'}}>
              Your photo will not be posted or stored once verified.
            </Text>
            <Button
              onPress={() => this.openCamera()}
              style={{width: '100%', marginTop: 40}}
              name={'Take Picture to Verify'}
              linear
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const Heading = styled(Text)({
  fontSize: 20,
  marginBottom: 10,
  color: '#7b43a5',
  lineHeight: 26,
});
const ProfileImage = styled(Image)({
  width: 120,
  height: 120,
  borderRadius: 120,
  marginTop: 20,
  marginBottom: 20,
});
export default PhotoVerification;
