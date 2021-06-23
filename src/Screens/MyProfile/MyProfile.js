import React from 'react';
import {bottomCurve, placeholderProfilePhoto} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import GlobalStyles, {GlobalImages} from '../../common/styles';
import {
  Text,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/header';
import {Toast} from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
class MyProfile extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      profile: {},
      showModal: false,
    };
  }
  componentDidMount() {
    const user = this.context;
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      if (user.length) {
        this.LoadProfile(user[0].token);
      }
    });
  }
  LoadProfile = (userToken) => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.myProfile,
        'GET',
        {},
        userToken,
        (response) => {
          this.setState({
            profile: response,
            token: userToken,
            isLoading: false,
          });
        },
        (error) => {
          this.setState({token: userToken, isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({token: userToken, isLoading: false});
      console.log('exception', exception);
    }
  };
  render() {
    const {navigation} = this.props;
    const btns = [];
    return (
      <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
        {this.state.isLoading && (
          <ActivityIndicator
            color={GlobalStyles.whiteTextColor.color}
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
          source={GlobalImages.footer}
          style={{
            width: widthPercentageToDP(100),
            height: 200,
            position: 'absolute',
            bottom: -100,
          }}
          resizeMode="contain"
        />
        <Header title="My Profile" backButton="true" showRightDrawer={false} />
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 30, paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 40}}>
          <UserProfileWrap>
            <TouchableWithoutFeedback
              onPress={() => this.setState({showModal: true})}>
              <UserImage
                source={
                  this.state.profile.photo
                    ? {uri: this.state.profile.photo}
                    : placeholderProfilePhoto
                }
                resizeMode="cover"
              />
            </TouchableWithoutFeedback>
            <UserName>{this.state.profile.username}</UserName>
            <UserData>
              Age: {this.state.profile.age}, {this.state.profile.country}
            </UserData>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditMyProfile')}>
              <View
                style={{
                  ...GlobalStyles.primaryBackgroundColor,
                  padding: 5,
                  borderRadius: 5,
                  paddingLeft: 25,
                  paddingRight: 25,
                  marginTop: 15,
                }}>
                <Text style={{...GlobalStyles.whiteTextColor}}>
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
            <ProfileData>
              <ListHalfData>
                <Label>Religion</Label>
                <LabelValue>{this.state.profile.religion}</LabelValue>
              </ListHalfData>
              <ListHalfData>
                <Label>Education</Label>
                <LabelValue>{this.state.profile.education}</LabelValue>
              </ListHalfData>
              <ListHalfData>
                <Label>Profession</Label>
                <LabelValue>{this.state.profile.profession}</LabelValue>
              </ListHalfData>
              <ListHalfData>
                <Label>Gender</Label>
                <LabelValue>{this.state.profile.gender}</LabelValue>
              </ListHalfData>
              <ListHalfData>
                <Label>Are you married?</Label>
                <LabelValue>{this.state.profile.married}</LabelValue>
              </ListHalfData>
              <ListHalfData>
                <Label>Do you have children?</Label>
                <LabelValue>{this.state.profile.children}</LabelValue>
              </ListHalfData>
            </ProfileData>
            <PartnerFunSec>
              <PHeading>
                What do you like to do for fun with your partner?
              </PHeading>
              <PValueWrap>
                {this.state.profile &&
                  this.state.profile.partner_fun &&
                  this.state.profile.partner_fun.map((item, index) => {
                    return <PValue key={index}>{item}</PValue>;
                  })}
              </PValueWrap>
            </PartnerFunSec>
            <LookingForSec>
              <PHeading>Type of Person I am looking for!</PHeading>
              <PValueWrap>
                <ListHalfData>
                  <Label>Age</Label>
                  <LabelValue>{this.state.profile.age} years</LabelValue>
                </ListHalfData>
                <ListHalfData>
                  <Label>Tribe</Label>
                  <LabelValue>{this.state.profile.tribe}</LabelValue>
                </ListHalfData>
                <ListHalfData>
                  <Label>Current Status</Label>
                  <LabelValue>{this.state.profile.current_status}</LabelValue>
                </ListHalfData>
                <ListHalfData>
                  <Label>Ethnicity</Label>
                  <LabelValue>{this.state.profile.ethnicity}</LabelValue>
                </ListHalfData>
                <ListHalfData>
                  <Label>Looking For</Label>
                  <LabelValue>{this.state.profile.looking_for}</LabelValue>
                </ListHalfData>
                <ListHalfData>
                  <Label>Ideal Build</Label>
                  <LabelValue>{this.state.profile.build}</LabelValue>
                </ListHalfData>
                <ListHalfData>
                  <Label>Smoking</Label>
                  <LabelValue>{this.state.profile.smoke}</LabelValue>
                </ListHalfData>
                <ListHalfData>
                  <Label>Hair</Label>
                  <LabelValue>{this.state.profile.hair}</LabelValue>
                </ListHalfData>
                <ListHalfData>
                  <Label>Partner height</Label>
                  <LabelValue>{this.state.profile.height}cm</LabelValue>
                </ListHalfData>
              </PValueWrap>
            </LookingForSec>
            <LookingForSec>
              <PHeading>About Us</PHeading>
              <Text style={{...GlobalStyles.secondaryTextColor}}>
                {this.state.profile.aboutus}
              </Text>
            </LookingForSec>
          </UserProfileWrap>
        </ScrollView>
        <Modal visible={this.state.showModal}>
          <View
            style={{
              ...GlobalStyles.whiteBackgroundColor,
              position: 'absolute',
              left: 20,
              top: 40,
              height: 25,
              width: 25,
              borderRadius: 40,
              zIndex: 100,
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                height: 25,
                width: 25,
                textAlignVertical: 'center',
                fontWeight: '900',
                lineHeight: 25,
              }}
              onPress={() => this.setState({showModal: false})}>
              X
            </Text>
          </View>
          <ImageViewer
            imageUrls={[{url: this.state.profile.photo}]}
            enableSwipeDown={true}
            index={null}
            onCancel={() => this.setState({showModal: false})}
            renderImage={(props) => <FastImage {...props} />}
            enablePreload={true}
            saveToLocalByLongPress={false}
            loadingRender={() => {
              return (
                <ActivityIndicator color={GlobalStyles.whiteTextColor.color} />
              );
            }}
            renderIndicator={() => {}}
          />
        </Modal>
      </View>
    );
  }
}
const UserProfileWrap = styled(View)({
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});
const UserImage = styled(Image)({
  width: 100,
  height: 100,
  borderRadius: 100,
  marginBottom: 10,
});
const UserName = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 18,
  lineHeight: '25px',
  fontWeight: 700,
  textAlign: 'center',
});
const UserData = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 16,
  textAlign: 'center',
});
const ProfileData = styled(View)({
  ...GlobalStyles.primaryBorderColor,
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 30,
  borderBottomWidth: 1,
});
const ListHalfData = styled(View)({
  flex: '0 0 50%',
  width: '100%',
  marginBottom: 15,
});
const Label = styled(Text)({
  ...GlobalStyles.primaryTextColor,
  fontSize: 15,
  marginBottom: 3,
  fontFamily: 'FuturaPT-Light',
});
const LabelValue = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 18,
  fontWeight: 600,
  fontFamily: 'FuturaPT-Medium',
});
const PartnerFunSec = styled(View)({
  marginTop: 20,
  flex: 1,
  flexDirection: 'column',
  width: '100%',
});
const LookingForSec = styled(View)({
  ...GlobalStyles.primaryBorderColor,
  marginTop: 20,
  flex: 1,
  flexDirection: 'column',
  width: '100%',
  borderTopWidth: 1,
  paddingTop: 20,
});
const PHeading = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 18,
  lineHeight: '23px',
  fontWeight: 600,
  marginBottom: 15,
});
const PValueWrap = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
});
const PValue = styled(Text)({
  ...GlobalStyles.primaryBoxWrap,
  fontSize: 16,
  borderWidth: 1,
  padding: 7,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 5,
  marginBottom: 8,
  marginRight: 8,
});
export default MyProfile;
