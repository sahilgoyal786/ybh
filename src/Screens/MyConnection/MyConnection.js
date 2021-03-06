import React from 'react';
import {DotIcon, UserProfileIcons} from '../../common/images';
import styled from 'styled-components/native';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/button';
import Header from '../../components/header';
import {Toast} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';
import GlobalStyles, {GlobalImages} from '../../common/styles';
class MyConnection extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      showPopover: '',
      profiles: [],
      activeTab: 'connected',
      page: 0,
      totalPage: 1,
      loadingMore: false,
      pendingProfiles: null,
      unread: null,
    };
  }
  componentDidMount() {
    const user = this.context;
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      if (user.length) {
        this.LoadConnections(user[0].token);
      }
    });
  }
  LoadConnections = (userToken) => {
    this.setState({token: userToken, isLoading: true});
    try {
      let connUrl = EndPoints.myConnections;
      if (this.state.activeTab == 'pending') {
        connUrl = EndPoints.pendingConnections;
      }
      network.getResponse(
        connUrl,
        'GET',
        {},
        userToken,
        (response) => {
          this.setState({
            pendingProfiles: response.pending,
            unread: response.unread,
            profiles: response.profiles.data,
            page: response.profiles.current_page,
            totalPage: response.profiles.last_page,
            isLoading: false,
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
          if (response && response.message) {
            Toast.show({text: response.message});
          }
          if (response && response.pending) {
            this.setState({pendingProfiles: response.pending});
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
          if (response && response.pending) {
            this.setState({pendingProfiles: response.pending});
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
          if (response && response.pending) {
            this.setState({pendingProfiles: response.pending});
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
            status: response.status,
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
    if (this.state.activeTab != tab) {
      this.setState({profiles: []});
      this.loadTabData(tab);
    }
  };
  loadTabData = (tab) => {
    try {
      let connUrl = EndPoints.myConnections;
      if (tab == 'pending') {
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
            pendingProfiles: response.pending,
            unread: response.unread,
            profiles: response.profiles.data,
            page: response.profiles.current_page,
            totalPage: response.profiles.last_page,
            isLoading: false,
            activeTab: tab,
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
  loadMoreTabData = () => {
    if (
      this.state.profiles.length &&
      this.state.totalPage > 0 &&
      this.state.page != this.state.totalPage
    ) {
      let connUrl;
      let current_page = this.state.page + 1;
      this.setState({page: current_page, loadingMore: true});
      connUrl = {url: 'matchmaking/profiles/?page=' + current_page};
      if (this.state.activeTab == 'pending') {
        connUrl = {url: 'matchmaking/pending-profiles/?page=' + current_page};
      }
      try {
        network.getResponse(
          connUrl,
          'GET',
          {},
          this.state.token,
          (response) => {
            let profiles = this.state.profiles.concat(response.profiles.data);
            this.setState({
              pendingProfiles: response.pending,
              unread: response.unread,
              profiles: profiles,
              loadingMore: false,
              totalPage: response.profiles.last_page,
            });
          },
          (error) => {
            this.setState({loadingMore: false});
            console.log('error', error);
          },
        );
      } catch (exception) {
        this.setState({loadingMore: false});
        console.log('exception', exception);
      }
    }
  };
  renderItem = (item, index) => {
    const {navigation} = this.props;
    if (this.state.activeTab == 'connected') {
      return (
        <UserList key={index}>
          <UserListInner>
            <TouchableWithoutFeedback onPress={() => this.showPopup(item.id)}>
              <DotImageWrap>
                <DotImage source={DotIcon} resizeMode="contain"></DotImage>
              </DotImageWrap>
            </TouchableWithoutFeedback>
            {this.state.showPopover === item.id && (
              <Popover key={'popup' + index}>
                <TouchableWithoutFeedback
                  onPress={() => this.disconnectRequest(item.id, index)}>
                  <PopoverBtn
                    style={{borderBottomWidth: 1, borderColor: '#ddd'}}>
                    <IconImage
                      source={UserProfileIcons['delete']}
                      resizeMode="contain"></IconImage>
                    <Text style={{...GlobalStyles.primaryFont}}>Remove</Text>
                  </PopoverBtn>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => this.createChats(item.user_id)}>
                  <PopoverBtn>
                    <IconImage
                      source={UserProfileIcons['colormessage']}
                      resizeMode="contain"></IconImage>
                    <Text style={{...GlobalStyles.primaryFont}}>Message</Text>
                  </PopoverBtn>
                </TouchableWithoutFeedback>
              </Popover>
            )}
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({showPopover: false});
                navigation.navigate('UserProfile', {profile_id: item.id});
              }}>
              <UserImage
                onPress={() => {
                  this.setState({showPopover: false});
                  navigation.navigate('UserProfile', {profile_id: item.id});
                }}
                source={{uri: item.photo}}
                resizeMode="cover"></UserImage>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({showPopover: false});
                navigation.navigate('UserProfile', {profile_id: item.id});
              }}>
              <UserData>
                <UserName>{item.username}</UserName>
                <UserMessage>
                  {item.state}, {item.country}, {item.age}
                </UserMessage>
              </UserData>
            </TouchableWithoutFeedback>
          </UserListInner>
        </UserList>
      );
    } else {
      return (
        <ListLayout key={index} style={{marginLeft: 10, marginRight: 10}}>
          <PUImage source={{uri: item.photo}}></PUImage>
          <ListData>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {item.user_id === item.mylist.connection_id && (
                <>
                  <Text
                    style={{
                      ...GlobalStyles.secondaryTextColor,
                      fontSize: 14,
                      fontWeight: '700',
                      marginRight: 7,
                    }}>
                    {item.username}
                  </Text>
                  <Text
                    style={{...GlobalStyles.secondaryTextColor, fontSize: 14}}>
                    send you request
                  </Text>
                </>
              )}
              {item.user_id != item.mylist.connection_id && (
                <>
                  <Text
                    style={{...GlobalStyles.secondaryTextColor, fontSize: 14}}>
                    You send an request to
                  </Text>
                  <Text
                    style={{
                      ...GlobalStyles.secondaryTextColor,
                      fontSize: 14,
                      fontWeight: '700',
                      marginLeft: 7,
                    }}>
                    {item.username}
                  </Text>
                </>
              )}
            </View>
            <ListButtons>
              {item.user_id === item.mylist.connection_id && (
                <>
                  <Button
                    onPress={() => this.acceptMatchRequest(item.user_id, index)}
                    style={{backgroundColor: 'green', marginRight: 10}}
                    name={'Accept'}
                    isLoading={this.state.isLoading}
                    custom={{color: '#fff'}}
                  />
                  <Button
                    onPress={() =>
                      this.declineMatchRequest(item.user_id, index)
                    }
                    style={{...GlobalStyles.errorBgColor}}
                    name={'Decline'}
                    isLoading={this.state.isLoading}
                    custom={{color: '#fff'}}
                  />
                </>
              )}
              {item.user_id != item.mylist.connection_id && (
                <Button
                  onPress={() => this.disconnectRequest(item.id, index)}
                  style={{...GlobalStyles.errorBgColor}}
                  name={'Withdraw'}
                  isLoading={this.state.isLoading}
                  custom={{color: '#fff'}}
                />
              )}
            </ListButtons>
          </ListData>
        </ListLayout>
      );
    }
  };
  ListEmptyComponent = () => {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this.state.isLoading || this.state.loadingMore ? (
          <ActivityIndicator color="#A073C4" size="large" />
        ) : (
          <Text
            style={{
              ...GlobalStyles.secondaryTextColor,
              ...GlobalStyles.primaryFont,
              fontSize: 16,
            }}>
            No request found.
          </Text>
        )}
      </View>
    );
  };
  ListHeaderComponent = () => {
    return (
      <View>
        <Header
          title="My Connections"
          backButton="true"
          searchBtn="true"
          myProfileBtn="true"
          chatBtn={true}
          unread={this.state.unread}
          showRightDrawer={false}
        />
        <TopBar>
          <TopBarInner>
            <TouchableWithoutFeedback
              onPress={() => this.changeTab('connected')}>
              <ItemLeftWrap
                style={
                  this.state.activeTab == 'connected'
                    ? {backgroundColor: '#f9bc16'}
                    : {}
                }>
                <Text
                  style={
                    this.state.activeTab == 'connected'
                      ? {...GlobalStyles.primaryFont, color: '#fff'}
                      : {...GlobalStyles.primaryFont}
                  }>
                  Connected
                </Text>
              </ItemLeftWrap>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.changeTab('pending')}>
              <ItemRightWrap
                style={
                  this.state.activeTab == 'pending'
                    ? {backgroundColor: '#f9bc16'}
                    : {}
                }>
                {this.state.pendingProfiles && <CustomBadge />}
                <Text
                  style={
                    this.state.activeTab == 'pending'
                      ? {...GlobalStyles.primaryFont, color: '#fff'}
                      : {...GlobalStyles.primaryFont}
                  }>
                  Pending
                </Text>
              </ItemRightWrap>
            </TouchableWithoutFeedback>
          </TopBarInner>
        </TopBar>
      </View>
    );
  };
  render() {
    return (
      <>
        {this.state.activeTab == 'connected' && (
          <FlatList
            style={{...GlobalStyles.screenBackgroundColor}}
            bounces={false}
            alwaysBounceVertical={false}
            onEndReached={() => this.loadMoreTabData()}
            onEndReachedThreshold={this.state.profiles.length ? 0.5 : 0}
            data={this.state.profiles}
            renderItem={({item, index}) => this.renderItem(item, index)}
            keyExtractor={() => Math.random().toString()}
            numColumns={2}
            stickyHeaderIndices={[0]}
            ListEmptyComponent={() => this.ListEmptyComponent()}
            ListHeaderComponent={() => this.ListHeaderComponent()}
          />
        )}
        {this.state.activeTab == 'pending' && (
          <FlatList
            style={{...GlobalStyles.screenBackgroundColor}}
            bounces={false}
            alwaysBounceVertical={false}
            onEndReached={() => this.loadMoreTabData()}
            onEndReachedThreshold={this.state.profiles.length ? 0.5 : 0}
            data={this.state.profiles}
            renderItem={({item, index}) => this.renderItem(item, index)}
            keyExtractor={() => Math.random().toString()}
            numColumns={1}
            stickyHeaderIndices={[0]}
            ListEmptyComponent={() => this.ListEmptyComponent()}
            ListHeaderComponent={() => this.ListHeaderComponent()}
          />
        )}
      </>
    );
  }
}
const ListLayout = styled(View)({
  ...GlobalStyles.secondaryBackgroundColor,
  ...GlobalStyles.primaryBorderColor,
  ...GlobalStyles.shadowColor,
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginBottom: 15,
  borderWidth: 1,
  borderRadius: 5,
  overflow: 'hidden',
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
  paddingRight: 15,
});
const ListButtons = styled(View)({
  flexDirection: 'row',
  marginTop: 8,
});
const TopBar = styled(View)({
  flexDirection: 'column',
  alignItems: 'center',
  height: 40,
  marginBottom: 15,
});
const TopBarInner = styled(View)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  height: 40,
});
const ItemLeftWrap = styled(View)({
  padding: 0,
  paddingLeft: 25,
  paddingRight: 25,
  backgroundColor: '#fff',
  height: 40,
  color: '#111',
  border: '2px solid #f9bc16',
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
});
const ItemRightWrap = styled(View)({
  padding: 0,
  paddingLeft: 25,
  paddingRight: 25,
  backgroundColor: '#fff',
  height: 40,
  color: '#111',
  border: '2px solid #f9bc16',
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});
const CustomBadge = styled(View)({
  ...GlobalStyles.errorBgColor,
  color: '#fff',
  width: 15,
  height: 15,
  borderRadius: 15,
  textAlign: 'center',
  position: 'absolute',
  top: -5,
  right: -5,
});
const Popover = styled(View)({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  position: 'absolute',
  top: 10,
  right: 50,
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
const DotImageWrap = styled(View)({
  width: 40,
  height: 40,
  position: 'absolute',
  top: 5,
  right: 5,
  zIndex: 999,
  backgroundColor: '#00000080',
  borderRadius: 10,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});
const DotImage = styled(Image)({
  width: 10,
  height: 20,
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
  backgroundColor: '#00000080',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
});
const UserName = styled(Text)({
  ...GlobalStyles.primaryFont,
  fontSize: 16,
  color: '#f9bc16',
  fontWeight: 700,
  textAlign: 'center',
});
const UserMessage = styled(Text)({
  ...GlobalStyles.primaryFont,
  fontSize: 13,
  color: '#fff',
  textAlign: 'center',
});
export default MyConnection;
