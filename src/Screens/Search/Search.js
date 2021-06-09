import React from 'react';
import {bottomCurve, SearchIcons, search} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  Text,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Header from '../../components/header';
import storage from '../../components/apis/storage';
import {Toast} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';

class Search extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      search: null,
      profiles: [],
      page: 0,
      totalPage: 1,
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.searchUsers();
    });
  }
  updateData = (value) => {
    this.setState({search: value});
  };
  searchUsers = () => {
    const user = this.context;
    let userToken = user[0].token;
    storage.getData('filter').then((filter) => {
      filter = JSON.parse(filter);
      if (filter) {
        this.setState({isLoading: true});
        try {
          let current_page = this.state.page + 1;
          filter['page'] = current_page;
          network.getResponse(
            EndPoints.searchMatchProfile,
            'POST',
            filter,
            userToken,
            (response) => {
              if (response.data && response.data.length) {
                let userProfiles = this.state.profiles.concat(response.data);
                this.setState({
                  isLoading: false,
                  profiles: userProfiles,
                  page: response.current_page,
                  totalPage: response.last_page,
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
      }
    });
  };
  renderItem = (item, index) => {
    const {navigation} = this.props;
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() =>
          navigation.navigate('UserProfile', {
            profile_id: item.id,
          })
        }>
        <UserList>
          <UserName>{item.username}</UserName>
          <UserData>
            <IconImage source={SearchIcons['age']} resizeMode="contain" />
            <UserDataText>{item.age}</UserDataText>
            <IconImage source={SearchIcons['address']} resizeMode="contain" />
            <UserDataText>
              {item.state}, {item.country}
            </UserDataText>
          </UserData>
        </UserList>
      </TouchableWithoutFeedback>
    );
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
          <Text>No user found.</Text>
        )}
      </View>
    );
  };
  ListHeaderComponent = () => {
    return (
      <Header
        title="Search"
        backButton="true"
        filterButton="true"
        showRightDrawer={false}
      />
    );
  };

  render() {
    return (
      <FlatList
        bounces={false}
        alwaysBounceVertical={false}
        onEndReached={() => this.searchUsers()}
        onEndReachedThreshold={this.state.profiles.length ? 0.5 : 0}
        data={this.state.profiles}
        renderItem={({item, index}) => this.renderItem(item, index)}
        keyExtractor={() => Math.random().toString()}
        numColumns={1}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={() => this.ListEmptyComponent()}
        ListHeaderComponent={() => this.ListHeaderComponent()}
      />
    );
  }
}
const UserList = styled(View)({
  flex: 1,
  margin: 10,
  marginLeft: 20,
  marginRight: 20,
  padding: 20,
  paddingLeft: 30,
  paddingRight: 30,
  marginBottom: 15,
  borderRadius: 10,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: '0.2',
  shadowRadius: 5,
  elevation: '5',
});
const UserName = styled(Text)({
  fontSize: 18,
  lineHeight: '20px',
  color: '#7b43a5',
  fontWeight: 700,
  marginBottom: 8,
});
const UserData = styled(View)({
  flex: 1,
  flexDirection: 'row',
});
const UserDataText = styled(Text)({
  fontSize: 18,
  color: '#484848',
  fontWeight: 700,
  lineHeight: '20px',
  marginRight: 20,
});
const IconImage = styled(Image)({
  width: 20,
  height: 20,
  marginRight: 5,
});
export default Search;
