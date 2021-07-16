import React from 'react';
import Button from '../../components/button';
import {bottomCurve, placeholderProfilePhoto} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {
  Text,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Header from '../../components/header';
import {Toast} from 'native-base';
import GlobalStyles, {GlobalImages} from '../../common/styles';
class ProfileActivation extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: null,
      profile: props.route.params.profile,
      subscriptionUrl: 'https://api.ybhive.app/subscriptions',
      name: null,
      email: null,
      subscription: false,
    };
  }
  componentDidMount() {
    const user = this.context;
    if (user.length) {
      this.updateAccessToken(user[0]);
    }
  }
  updateAccessToken = (object) => {
    this.setState({
      token: object.token,
      name: object.user.username,
      email: object.user.email,
    });
  };
  activateNow = () => {
    let url =
      this.state.subscriptionUrl +
      '?first_name=' +
      this.state.name +
      '&email=' +
      this.state.email;
    Linking.openURL(url)
      .then((res) => console.log(res))
      .catch((err) => console.error('Error', err));
  };
  checkpaymentStatus = () => {
    const user = this.context;
    const {navigation} = this.props;
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.checkSubscriptions,
        'GET',
        {},
        this.state.token,
        (response) => {
          this.setState({
            subscription: response.subscription,
            isLoading: false,
          });
          if (response.subscription) {
            user[0].user.subscription_is_active = response.subscription;
            Toast.show({
              text: `You have puchased Subscription plan. Your Profile is pending for Admin Aproval.`,
              type: 'success',
            });
            navigation.navigate('Welcomeuser');
          } else {
            Toast.show({
              text: `You don't have any Subscription plan.`,
              type: 'danger',
            });
          }
        },
        (error) => {
          this.setState({isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  render() {
    return (
      <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
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
          title="Profile Activation"
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
            <ProfileImage source={{uri: this.state.profile.photo}} />
            <UserName>{this.state.profile.username}</UserName>
            <UserData>
              Age: {this.state.profile.age}, {this.state.profile.country}
            </UserData>
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
            <Button
              onPress={() => this.activateNow()}
              style={{width: '100%', marginTop: 40}}
              name={'Activate Now'}
              linear
            />
            <ReloadBtn onPress={() => this.checkpaymentStatus()}>
              Refresh Profile Status
            </ReloadBtn>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const ReloadBtn = styled(Text)({
  padding: 0,
  paddingLeft: 25,
  paddingRight: 25,
  borderRadius: 20,
  marginTop: 10,
  height: 40,
  lineHeight: 40,
  backgroundColor: '#7b43a5',
  color: '#fff',
  fontSize: 16,
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
const ProfileImage = styled(Image)({
  width: 120,
  height: 120,
  borderRadius: 120,
  marginTop: 20,
  marginBottom: 20,
});
const ProfileData = styled(View)({
  ...GlobalStyles.secondaryBorderColor,
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
const AboutMeSec = styled(View)({
  ...GlobalStyles.secondaryBorderColor,
  marginTop: 20,
  flex: 1,
  flexDirection: 'column',
  width: '100%',
  borderBottomWidth: 1,
  paddingBottom: 20,
});
const LookingForSec = styled(View)({
  ...GlobalStyles.secondaryBorderColor,
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
export default ProfileActivation;
