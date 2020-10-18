import React, { Component } from 'react';
//import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {
  welcomepagebackground,
  menu,
  image1,
  image2,
  image3,
  image4,
  image5,
  profile,
  blogimg,
  calaender,
  headerView,
  botomView
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
//import { ScrollView} from 'react-native-gesture-handler';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import {
  StyleSheet,
  TouchableOpacity,
  Text,SafeAreaView,
  View,ScrollView,Image,
  ImageBackground, FlatList,Platform
} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { Header } from 'react-native/Libraries/NewAppScreen';
import TopHeader from '../../components/header';
//import { Image } from 'native-base';

const list = [
  {
    name: 'Suspendisse Letctus at',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Suspendisse Letctus at',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Suspendisse Letctus at',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Suspendisse Letctus at',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Suspendisse Letctus at',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: "-14%",
  marginLeft:15
});
const WelcomeText = styled(Text)({
  fontSize: 25,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? heightPercentageToDP(103) : heightPercentageToDP(130),
  // width: widthPercentageToDP(100),
});

const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  // marginTop: heightPercentageToDP(4),
  marginRight: widthPercentageToDP(4),
});

const TextThirive = styled(Text)({
  fontSize: 9,
  color: 'gray',
  letterSpacing: 0.3,
  marginTop: 2,
  fontFamily: 'FuturaPT-Medium',
});

class Thrive extends Component {
  state = {
    count: 0
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }


  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ImageBackground source={blogimg} style={styles.image}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
            <Avatar style={{ width: 82, height: 85, marginLeft: -17, marginTop: 10 }} source={{ uri: item.avatar_url }} />
            <View style={{ flexDirection: 'column', width: '65%' }}>
              <Text style={{ textAlign: 'left', fontWeight: 'bold', fontFamily: 'FuturaPT-Medium', }}>{item.name}</Text>

              <TextThirive style={{ fontSize: 14, fontFamily: 'FuturaPT-Light' }}>Lorem dolor sit amet, consectetur adipiscing elit,Lorem ipsum
              dolor amet, consectetur adipiscing dolor sit amet,dolor sit amet
              consectetur adipiscing ipsum dolor ...
               <Text style={{
                  textDecorationLine: 'underline', color: '#8334B4',
                  fontWeight: '500', fontFamily: 'FuturaPT-Medium', fontSize: 10,
                }}
                  onPress={() => {
                    this.props.navigation.navigate('Thrivedetails');
                  }}>
                  More
              </Text>
              </TextThirive>

              <View style={{ justifyContent: 'flex-start' }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <ResponsiveImage
                    style={{
                      fontSize: 10,
                      color: 'gray',
                      marginTop: heightPercentageToDP(1.2),
                    }}
                    source={profile}
                    initHeight="8"
                    initWidth="8"
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#848585',
                      marginTop: heightPercentageToDP(0.9),
                      marginLeft: widthPercentageToDP(1),
                      fontFamily: 'FuturaPT-Medium',
                    }}>
                    By: joe Smith
              </Text>
                  <ResponsiveImage
                    style={{
                      fontSize: 10,
                      color: 'gray',
                      marginTop: heightPercentageToDP(1.2),
                      marginLeft: widthPercentageToDP(3),
                    }}
                    source={calaender}
                    initHeight="8"
                    initWidth="8"
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: 'gray',
                      marginTop: heightPercentageToDP(1),
                      marginLeft: widthPercentageToDP(1),
                    }}>
                    09/04/2020
              </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

    </ListItem>
  )
  render() {
    const { navigation } = this.props;
    return (
      <View >
     
        {/* <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-between', top: Platform.OS === 'ios' ? 40 : 10 }}>
          <Text style={{ paddingLeft: 10, fontSize: 25, color: '#ffffff', fontWeight: '500', fontFamily: 'FuturaPT-Medium' }}>Thrive</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <MenuIcon source={menu} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        </View> */}
        <TopHeader title="Thrive" backButton="true" />
        <BackgroundImage source={botomView}>
        <View  style={{ marginTop: 40  }}>
        <ScrollView >
        <View style={{bottom:Platform.OS === 'ios' ? 100 : 10,}}>
        <Text style={{ paddingLeft: 10, fontSize: 25, color: '#000', fontFamily: 'FuturaPT-Medium', marginTop: Platform.OS === 'ios' ? '25%' : 10 }}>View List of Blogs</Text>

          <FlatList
            keyExtractor={this.keyExtractor}
            data={list}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
        </View>
       </BackgroundImage>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
  image: {
    flex: 1,
    height: 110
  },
})

export default Thrive;