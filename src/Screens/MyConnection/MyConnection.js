import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve, DotIcon, UserProfileIcons} from '../../common/images';
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
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/header';
import {Toast} from 'native-base';

class MyConnection extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      showPopover: '',
      profiles: [],
    };
  }
  componentDidMount() {
    const user = this.context;
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      if(user.length){
        this.LoadConnections(user[0].token);
      }
    });
  }
  LoadConnections = (token) => {
    try {
      network.getResponse(
        EndPoints.myConnections,
        'GET',
        {},
        token,
        (response) => {
          this.setState({
            profiles: response.data,
            token: token,
            isLoading: false,
          });
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
  disconnectRequest = (profileId, indexNum) => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.disconnectProfileRequest,
        'POST',
        {profile_id: profileId},
        this.state.token,
        (response) => {
          this.setState({isLoading: false, showPopover: false});
          if (response && response.message) {
            Toast.show({text: response.message});
          }
          this.state.profiles.splice(indexNum, 1);
          this.setState({profiles: this.state.profiles});
        },
        (error) => {
          this.setState({isLoading: false, showPopover: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false, showPopover: false});
      console.log('exception', exception);
    }
  };
  createChats = (userId) => {
    const {navigation} = this.props;
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.createChat,
        'POST',
        {user_id: userId},
        this.state.token,
        (response) => {
          this.setState({isLoading: false, showPopover: false});
          navigation.navigate('ChatMessage', {
            chat_id: response.id,
            name: response.user.username,
            receiver: response.user.user_id,
            photo: response.user.photo,
          });
        },
        (error) => {
          this.setState({isLoading: false, showPopover: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false, showPopover: false});
      console.log('exception', exception);
    }
  };
  showPopup = (itemId) => {
    if (this.state.showPopover == itemId) {
      this.setState({showPopover: false});
    } else {
      this.setState({showPopover: itemId});
    }
  };
  render() {
    const {navigation} = this.props;
    const profileLists = [];
    this.state.profiles.forEach((item, index) => {
      let popup = [];
      if (this.state.showPopover === item.id) {
        popup.push(
          <Popover key={'popup' + index}>
            <TouchableWithoutFeedback
              onPress={() => this.disconnectRequest(item.id, index)}>
              <PopoverBtn style={{borderBottomWidth: 1, borderColor: '#ddd'}}>
                <IconImage
                  source={UserProfileIcons['delete']}
                  resizeMode="contain"></IconImage>
                <Text>Remove</Text>
              </PopoverBtn>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.createChats(item.user_id)}>
              <PopoverBtn>
                <IconImage
                  source={UserProfileIcons['colormessage']}
                  resizeMode="contain"></IconImage>
                <Text>Message</Text>
              </PopoverBtn>
            </TouchableWithoutFeedback>
          </Popover>,
        );
      }
      profileLists.push(
        <UserList key={index}>
          <UserListInner>
            <TouchableWithoutFeedback onPress={() => this.showPopup(item.id)}>
              <DotImage source={DotIcon} resizeMode="contain"></DotImage>
            </TouchableWithoutFeedback>
            {popup}
            <UserImage
              source={{uri: item.photo}}
              resizeMode="cover"></UserImage>
            <UserData>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({showPopover: false});
                  navigation.navigate('UserProfile', {profile_id: item.id});
                }}>
                <UserName>{item.username}</UserName>
              </TouchableWithoutFeedback>
              <UserMessage>
                {item.state}, {item.country}, {item.age}
              </UserMessage>
            </UserData>
          </UserListInner>
        </UserList>,
      );
    });
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
          resizeMode="contain"></Image>
        <Header title="My Connections" backButton="true" searchBtn="true" myProfileBtn="true"/>
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 8, paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 40}}>
          <ConnectionWrap>{profileLists}</ConnectionWrap>
        </ScrollView>
      </View>
    );
  }
}
const Popover = styled(View)({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  position: 'absolute',
  top: 10,
  right: 25,
  zIndex: 999,
  borderRadius: 5,
  backgroundColor: '#fff',
});
const PopoverBtn = styled(View)({
  padding: 7,
  flexDirection: 'row',
  paddingLeft: 10,
  paddingRight: 15,
  backgroundColor: '#fff',
  borderRadius: 5,
});
const IconImage = styled(Image)({
  width: 20,
  height: 20,
  marginRight: 5,
});
const ConnectionWrap = styled(View)({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
});
const UserList = styled(View)({
  flex: '0 0 50%',
  height: 180,
  width: '100%',
  marginBottom: 15,
});
const UserListInner = styled(View)({
  marginLeft: 8,
  marginRight: 8,
  position: 'relative',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: '0.2',
  shadowRadius: 5,
  elevation: '10',
});
const DotImage = styled(Image)({
  width: 10,
  height: 20,
  position: 'absolute',
  top: 8,
  right: 10,
  zIndex: 999,
});
const UserImage = styled(Image)({
  width: '100%',
  height: '100%',
  borderRadius: 10,
});
const UserData = styled(View)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 10,
  backgroundColor: '#00000040',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
});
const UserName = styled(Text)({
  fontSize: 16,
  color: '#f9bc16',
  fontWeight: 700,
  textAlign: 'center',
});
const UserMessage = styled(Text)({
  fontSize: 13,
  color: '#fff',
  textAlign: 'center',
});
export default MyConnection;
