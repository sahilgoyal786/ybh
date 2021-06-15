import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  bottomCurve,
  placeholderProfilePhoto,
  UserProfileIcons,
} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {Text, ScrollView, View, Image, ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import {Toast} from 'native-base';
class UserProfile extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      id: props.route.params.profile_id,
      isLoading: true,
      token: '',
      profile: {},
    };
  }
  componentDidMount() {
    const user = this.context;
    if (user.length) {
      this.LoadProfile(user[0].token);
    }
  }
  LoadProfile = (token) => {
    this.setState({isLoading: true});
    let getMatchProfile = {url: 'matchmaking/profile/' + this.state.id};
    try {
      network.getResponse(
        getMatchProfile,
        'GET',
        {},
        token,
        (response) => {
          this.setState({profile: response, token: token, isLoading: false});
        },
        (error) => {
          this.setState({token: token, isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  sendRequest = () => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.sendProfileRequest,
        'POST',
        {profile_id: this.state.profile.id},
        this.state.token,
        (response) => {
          if (response && response.message) {
            Toast.show({text: response.message});
          }
          this.LoadProfile(this.state.token);
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
  acceptProfileRequest = () => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.acceptProfileRequest,
        'POST',
        {
          profile_id: this.state.profile.mylist.matchmaking_profile_id,
          user_id: this.state.profile.mylist.connection_id,
        },
        '',
        (response) => {
          if (response && response.message) {
            Toast.show({text: response.message});
          }
          this.LoadProfile(this.state.token);
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
  declineProfileRequest = () => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.declineProfileRequest,
        'POST',
        {
          profile_id: this.state.profile.mylist.matchmaking_profile_id,
          user_id: this.state.profile.mylist.connection_id,
        },
        '',
        (response) => {
          if (response && response.message) {
            Toast.show({text: response.message});
          }
          this.LoadProfile(this.state.token);
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
  disconnectRequest = () => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.disconnectProfileRequest,
        'POST',
        {profile_id: this.state.profile.id},
        this.state.token,
        (response) => {
          this.LoadProfile(this.state.token);
          if (response && response.message) {
            Toast.show({text: response.message});
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
  createChats = () => {
    this.setState({isLoading: true});
    const {navigation} = this.props;
    try {
      network.getResponse(
        EndPoints.createChat,
        'POST',
        {user_id: this.state.profile.user_id},
        this.state.token,
        (response) => {
          this.setState({isLoading: false});
          navigation.navigate('ChatMessage', {
            chat_id: response.id,
            name: response.user.username,
            receiver: response.user.user_id,
            photo: response.user.photo,
          });
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
    const btns = [];
    if (this.state.profile.mylist && this.state.profile.mylist.status) {
      btns.push(
        <View
          key={'btnInList'}
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={() => this.createChats()}>
            <View
              style={{
                padding: 5,
                backgroundColor: '#7b43a5',
                borderRadius: 5,
                flexDirection: 'row',
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <IconImage
                source={UserProfileIcons['message']}
                resizeMode="contain"></IconImage>
              <Text style={{color: 'white'}}>Message</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.disconnectRequest()}
            style={{
              marginLeft: 10,
            }}>
            <View
              style={{
                padding: 5,
              }}>
              <IconImage
                source={UserProfileIcons['disconnect']}
                resizeMode="contain"></IconImage>
            </View>
          </TouchableOpacity>
        </View>,
      );
    } else if (
      this.state.profile.mylist &&
      !this.state.profile.mylist.status &&
      this.state.profile.user_id == this.state.profile.mylist.connection_id
    ) {
      btns.push(
        <View
          key={'btnInList'}
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={() => this.acceptProfileRequest()}>
            <View
              style={{
                padding: 5,
                backgroundColor: '#7b43a5',
                borderRadius: 5,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <Text style={{color: 'white'}}>Accept</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.declineProfileRequest()}>
            <View
              style={{
                padding: 5,
                backgroundColor: '#7b43a5',
                borderRadius: 5,
                paddingLeft: 20,
                paddingRight: 20,
                marginLeft: 10,
              }}>
              <Text style={{color: 'white'}}>Decline</Text>
            </View>
          </TouchableOpacity>
        </View>,
      );
    } else if (this.state.profile.mylist && !this.state.profile.mylist.status) {
      btns.push(
        <View
          key={'btnPending'}
          style={{
            padding: 5,
            backgroundColor: '#fff',
            borderRadius: 2,
            flexDirection: 'row',
            marginTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderWidth: 1,
            borderColor: '#7b43a5',
          }}>
          <IconImage
            source={UserProfileIcons['pending']}
            resizeMode="contain"></IconImage>
          <Text style={{color: '#7b43a5'}}>Pending</Text>
        </View>,
      );
    } else {
      btns.push(
        <View
          key={'btnConnect'}
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={() => this.sendRequest()}>
            <View
              style={{
                padding: 5,
                backgroundColor: '#7b43a5',
                borderRadius: 5,
                flexDirection: 'row',
                paddingLeft: 25,
                paddingRight: 25,
              }}>
              <IconImage
                source={UserProfileIcons['connect']}
                resizeMode="contain"></IconImage>
              <Text style={{color: 'white'}}>Connect</Text>
            </View>
          </TouchableOpacity>
        </View>,
      );
    }
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
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
          resizeMode="contain"
        />
        <Header
          title={this.state.profile.username}
          backButton="true"
          showRightDrawer={false}
        />
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 30, paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 40}}>
          <UserProfileWrap>
            <UserImage
              source={
                this.state.profile.photo
                  ? {uri: this.state.profile.photo}
                  : placeholderProfilePhoto
              }
              blurRadius={
                this.state.profile.mylist && this.state.profile.mylist.status
                  ? 0
                  : 6
              }
              resizeMode="cover"></UserImage>
            <UserName>{this.state.profile.username}</UserName>
            <UserData>
              Age: {this.state.profile.age}, {this.state.profile.country}
            </UserData>
            {btns}
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
              {this.state.profile.mylist && this.state.profile.mylist.status && (
                <ListHalfData>
                  <Label>Gender</Label>
                  <LabelValue>{this.state.profile.gender}</LabelValue>
                </ListHalfData>
              )}
              {this.state.profile.mylist && this.state.profile.mylist.status && (
                <ListHalfData>
                  <Label>Are you married?</Label>
                  <LabelValue>{this.state.profile.married}</LabelValue>
                </ListHalfData>
              )}
              <ListHalfData>
                <Label>Kids</Label>
                <LabelValue>{this.state.profile.children}</LabelValue>
              </ListHalfData>
            </ProfileData>
            <PartnerFunSec>
              <PHeading>
                What do you like to do for fun with your partner?
              </PHeading>
              <PValueWrap>
                <PValue>{this.state.profile.partner_fun}</PValue>
              </PValueWrap>
            </PartnerFunSec>
            <LookingForSec>
              <PHeading>Type of Person I am looking for!</PHeading>
              <PValueWrap>
                <ListHalfData>
                  <Label>Age</Label>
                  <LabelValue>{this.state.profile.age}</LabelValue>
                </ListHalfData>
                {this.state.profile.mylist && this.state.profile.mylist.status && (
                  <ListHalfData>
                    <Label>Tribe</Label>
                    <LabelValue>{this.state.profile.tribe}</LabelValue>
                  </ListHalfData>
                )}
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
            {this.state.profile.mylist && this.state.profile.mylist.status && (
              <LookingForSec>
                <PHeading>About Us</PHeading>
                <Text>{this.state.profile.aboutus}</Text>
              </LookingForSec>
            )}
          </UserProfileWrap>
        </ScrollView>
      </View>
    );
  }
}
const UserProfileWrap = styled(View)({
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});
const UserImage = styled(Image)({
  width: 100,
  height: 100,
  borderRadius: 100,
  marginBottom: 10,
});
const IconImage = styled(Image)({
  width: 20,
  height: 20,
  marginRight: 5,
});
const UserName = styled(Text)({
  fontSize: 18,
  lineHeight: '25px',
  color: '#7b43a5',
  fontWeight: 700,
  textAlign: 'center',
});
const UserData = styled(Text)({
  fontSize: 16,
  color: '#484848',
  textAlign: 'center',
});
const ProfileData = styled(View)({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 30,
  borderBottomWidth: 1,
  borderColor: '#ddd',
});
const ListHalfData = styled(View)({
  flex: '0 0 50%',
  width: '100%',
  marginBottom: 15,
});
const Label = styled(Text)({
  fontSize: 15,
  marginBottom: 3,
  fontFamily: 'FuturaPT-Light',
});
const LabelValue = styled(Text)({
  fontSize: 18,
  color: '#484848',
  fontWeight: 700,
  fontFamily: 'FuturaPT-Medium',
});
const PartnerFunSec = styled(View)({
  marginTop: 20,
  flex: 1,
  flexDirection: 'column',
  width: '100%',
});
const LookingForSec = styled(View)({
  marginTop: 20,
  flex: 1,
  flexDirection: 'column',
  width: '100%',
  borderTopWidth: 1,
  borderColor: '#ddd',
  paddingTop: 20,
});
const PHeading = styled(Text)({
  fontSize: 18,
  lineHeight: '25px',
  color: '#484848',
  fontWeight: 700,
  marginBottom: 10,
});
const PValueWrap = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
});
const PValue = styled(Text)({
  fontSize: 16,
  color: '#7b43a5',
  borderWidth: 1,
  borderColor: '#7b43a5',
  padding: 7,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 5,
  marginBottom: 8,
  marginRight: 8,
});
export default UserProfile;
