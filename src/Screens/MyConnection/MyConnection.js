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
      activeTab: 'connected'
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
      let connUrl = EndPoints.myConnections;
      if(this.state.activeTab == "pending"){
        connUrl = EndPoints.pendingConnections;
      }
      network.getResponse(
        connUrl,
        'GET',
        {},
        token,
        (response) => {
          this.setState({
            profiles: response,
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
  acceptMatchRequest = (userId, indexNum) => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.acceptProfileRequest,
        'POST',
        {user_id: userId},
        this.state.token,
        (response) => {
          this.setState({isLoading: false});
          if(response && response.message){
            Toast.show({text: response.message});
          }
          this.state.profiles.splice(indexNum,1);
          this.setState({profiles: this.state.profiles});
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
  declineMatchRequest = (userId, indexNum) => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.declineProfileRequest,
        'POST',
        {user_id: userId},
        this.state.token,
        (response) => {
          this.setState({isLoading: false});
          if (response && response.message) {
            Toast.show({text: response.message});
          }
          this.state.profiles.splice(indexNum, 1);
          this.setState({profiles: this.state.profiles});
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
  changeTab = (tab) => {
    if(this.state.activeTab != tab){
      this.setState({profiles: []});
      this.loadTabData(tab);
    }
  }
  loadTabData = (tab) => {
    try {
      let connUrl = EndPoints.myConnections;
      if(tab == "pending"){
        connUrl = EndPoints.pendingConnections;
      }
      this.setState({isLoading: true});
      network.getResponse(
        connUrl,
        'GET',
        {},
        this.state.token,
        (response) => {
          this.setState({
            profiles: response,
            isLoading: false,
            activeTab: tab
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
  }
  render() {
    const {navigation} = this.props;
    const profileLists = [];
    if(this.state.profiles.length){
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
    }
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {this.state.isLoading && (
          <ActivityIndicator color="#fff" size="large" style={{position: 'absolute',left: 0,top: 0,right: 0,bottom: 0,backgroundColor: '#00000080',zIndex: 9999}}/>
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
        <Header title="My Connections" backButton="true" searchBtn="true" myProfileBtn="true" chatBtn={true} showRightDrawer={false}/>
        <TopBar>
          <TopBarInner>
            <ItemLeft 
              style={(this.state.activeTab == 'connected') ? {backgroundColor: '#f9bc16',color: '#fff'} : {}}
              onPress={() => this.changeTab('connected')}
            >Connected</ItemLeft>
            <ItemRight 
              style={(this.state.activeTab == 'pending') ? {backgroundColor: '#f9bc16',color: '#fff'} : {}}
              onPress={() => this.changeTab('pending')}
            >Pending</ItemRight>
          </TopBarInner>
        </TopBar>
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 8, paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 40}}>
          {(this.state.activeTab == 'connected') && (
            <ConnectionWrap>{profileLists}</ConnectionWrap>
          )}
          {(this.state.activeTab == 'pending') && (
            <View style={{paddingLeft: 10,paddingRight: 10}}>
              {this.state.profiles && (
                <View>
                  {this.state.profiles.map((profile,index) => {
                    if(profile.user_id === profile.mylist.connection_id){
                      return (
                        <ListLayout key={index}>
                          <PUImage source={{uri: profile.photo}}></PUImage>
                          <ListData>
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                              <Text style={{fontSize: 18,fontWeight: '700',marginRight: 7}}>{profile.username}</Text>
                              <Text style={{fontSize: 16}}>send you request</Text>
                            </View>
                            <ListButtons>
                              <ReqButton onPress={() => this.acceptMatchRequest(profile.user_id,index)}
                                style={{backgroundColor: 'green'}}>Accept</ReqButton>
                              <ReqButton onPress={() => this.declineMatchRequest(profile.user_id,index)}>Decline</ReqButton>
                            </ListButtons>
                          </ListData>
                        </ListLayout>
                      );
                    }else{
                      return (
                        <ListLayout key={index}>
                          <PUImage source={{uri: profile.photo}}></PUImage>
                          <ListData>
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                              <Text style={{fontSize: 16}}>You send an request to</Text>
                              <Text style={{fontSize: 18,fontWeight: '700',marginLeft: 7}}>{profile.username}</Text>
                            </View>
                            <ListButtons>
                              <ReqButton onPress={() => this.disconnectRequest(profile.id,index)}>Withdraw</ReqButton>
                            </ListButtons>
                          </ListData>
                        </ListLayout>
                      );
                    }
                  })}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
const ListLayout = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginBottom: 15,
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: 5,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: '0.2',
  shadowRadius: 5,
  elevation: '10',
});
const PUImage = styled(Image)({
  width: 85,
  height: 85,
});
const ListData = styled(View)({
  flexDirection: 'column',
  padding: 5,
  paddingLeft: 15,
  paddingRight: 15
});
const ListButtons = styled(View)({
  flexDirection: 'row',
  marginTop: 8,
});
const ReqButton = styled(Text)({
  padding: 8,
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: '#f00',
  color: '#fff',
  borderRadius: 5,
  marginRight: 10,
  fontWeight: 700
});
const TopBar = styled(View)({
  flexDirection: 'column',
  alignItems: 'center',
  height: 40
});
const TopBarInner = styled(View)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  height: 40,
});
const ItemLeft = styled(Text)({
  padding: 0,
  paddingLeft: 25,
  paddingRight: 25,
  backgroundColor: '#fff',
  height: 40,
  lineHeight: 40,
  color: '#111',
  border: '2px solid #f9bc16',
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20
});
const ItemRight = styled(Text)({
  padding: 0,
  paddingLeft: 25,
  paddingRight: 25,
  backgroundColor: '#fff',
  height: 40,
  lineHeight: 40,
  color: '#111',
  border: '2px solid #f9bc16',
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20
});
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
