import React from 'react';
import {bottomCurve,SearchIcons,search} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Text,ScrollView,View,Image,ActivityIndicator,TouchableWithoutFeedback,RefreshControl} from 'react-native';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Header from '../../components/header';
import storage from '../../components/apis/storage';
import {Toast} from 'native-base';

class Search extends React.Component{
  static contextType = userDetailContext;
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      token: null,
      search: null,
      profiles: null,
      filters: {
        age: [18,60],
        children: null,
        education: null,
        religion: null,
        partnerheight: [140,200],
        build: null,
        ethnicity: null,
        smoker: null,
        religiosity: null,
        family: null
      },
    };
  }
  componentDidMount(){
    const user = this.context;
    if(user.length){
      this.searchUsers(user[0].token);
    }
  }
  updateAccessToken = (userToken) => {
    this.setState({token: userToken});
    this.searchUsers();
  };
  updateData = (value) => {
    this.setState({search: value});
  };
  searchUsers = (userToken) => {
    this.setState({isLoading: true});
    storage.getData('filter').then((filter) => {
      filter = JSON.parse(filter);
      if(filter){
        this.setState({filters: filter});
        try{
          network.getResponse(
            EndPoints.searchMatchProfile,
            'POST',
            filter,
            userToken,
            (response) => {
              if(response && response.length){
                this.setState({token: userToken,isLoading: false,profiles: response});
              }else{
                this.setState({token: userToken,isLoading: false,profiles: []});
                Toast.show({text: "No user found."});
              }
            },
            (error) => {
              this.setState({token: userToken,isLoading: false});
              console.log('error',error);
            },
          );
        }catch(exception){
          this.setState({token: userToken,isLoading: false});
          console.log('exception',exception);
        }
      }
    });
  };
  onRefreshSearch = () => {
    this.setState({refreshing: true});
    storage.getData('filter').then((filter) => {
      filter = JSON.parse(filter);
      if(filter){
        this.setState({filters: filter});
        try{
          network.getResponse(
            EndPoints.searchMatchProfile,
            'POST',
            filter,
            this.state.token,
            (response) => {
              if(response && response.length){
                this.setState({refreshing: false,profiles: response});
              }else{
                this.setState({refreshing: false,profiles: []});
                Toast.show({text: "No user found."});
              }
            },
            (error) => {
              this.setState({refreshing: false});
              console.log('error',error);
            },
          );
        }catch(exception){
          this.setState({refreshing: false});
          console.log('exception',exception);
        }
      }
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
        {this.state.isLoading && (
          <ActivityIndicator color="#fff" size="large" style={{position:'absolute',left:0,top:0,right:0,bottom:0,backgroundColor:'#00000080',zIndex:9999}}/>
        )}
        <Image source={bottomCurve} style={{width: widthPercentageToDP(100),height: 200,position: 'absolute',bottom: -100}} resizeMode="contain"/>
        <Header title="Search" backButton="true" filterButton="true"/>
        {this.state.profiles && (
          <ScrollView 
            alwaysBounceHorizontal={false} 
            alwaysBounceVertical={false} 
            bounces={false} 
            style={{padding: 5,paddingTop: 20}} 
            contentContainerStyle={{paddingBottom: 40}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshSearch}
              />
            }
          >
            <UserListWrap>
              {this.state.profiles.map((profile,index) => {
                return (
                  <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('UserProfile',{profile_id: profile.id})}>
                    <UserList>
                      <UserName>{profile.username}</UserName>
                      <UserData>
                        <IconImage source={SearchIcons['age']} resizeMode="contain"/>
                        <UserDataText>{profile.age}</UserDataText>
                        <IconImage source={SearchIcons['address']} resizeMode="contain"/>
                        <UserDataText>{profile.state}, {profile.country}</UserDataText>
                      </UserData>
                    </UserList>
                  </TouchableWithoutFeedback>
                );
              })}
            </UserListWrap>
          </ScrollView>
        )}
      </View>
    );
  }
}
const UserListWrap = styled(View)({
  flex: 1,
  flexDirection: 'column',
  paddingLeft: 10,
  paddingRight: 10,
});
const UserList = styled(View)({
  flex: 1,
  margin: 10,
  padding: 20,
  paddingLeft: 30,
  paddingRight: 30,
  marginBottom: 15,
  borderRadius: 10,
  backgroundColor: '#fff',
  elevation: 5
});
const UserName = styled(Text)({
  fontSize: 18,
  lineHeight: '20px',
  color: '#7b43a5',
  fontWeight: 700,
  marginBottom: 8
});
const UserData = styled(View)({
  flex: 1,
  flexDirection: 'row'
});
const UserDataText = styled(Text)({
  fontSize: 18,
  color: '#484848',
  fontWeight: 700,
  lineHeight: '20px',
  marginRight: 20
});
const IconImage = styled(Image)({
  width: 20,
  height: 20,
  marginRight: 5
});
export default Search;