import React, {Component} from 'react';
//import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {
  bottomCurve,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
//import { ScrollView} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Platform,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import Header from '../../components/header';
import ThriveArticle from '../../components/thriveArticle';
//import { Image } from 'native-base';

const list = [
  {
    name: 'Suspendisse Letctus at',
    avatar_url: image10,
    subtitle: 'Vice President',
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: image12,
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Suspendisse Letctus at',
    avatar_url: image13,
    subtitle: 'Vice President',
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: image14,
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Suspendisse Letctus at',
    avatar_url: image15,
    subtitle: 'Vice President',
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: image12,
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Suspendisse Letctus at',
    avatar_url: image11,
    subtitle: 'Vice President',
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: image10,
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Suspendisse Letctus at',
    avatar_url: image14,
    subtitle: 'Vice President',
  },
  {
    name: 'Aenean rhoncus justo odio nec..',
    avatar_url: image12,
    subtitle: 'Vice Chairman',
  },
];

class Thrive extends Component {
  state = {
    count: 0,
  };

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem containerStyle={{padding: 0, marginRight: 20, marginLeft: 5, marginBottom: 20, backgroundColor: 'transparent'}}>
      <ThriveArticle article={item} compact={false} />
    </ListItem>
  );
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <Image
          source={bottomCurve}
          style={{
            width: widthPercentageToDP(100),
            height: 200,
            position: 'absolute',
            bottom: -100,
          }}
          resizeMode="contain"></Image>
        <Header title="Thrive" backButton="true" />
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 40}}>
          <View>
            <Text
              style={{
                paddingLeft: 30,
                fontSize: 22,
                color: '#000',
                fontFamily: 'FuturaPT-Medium',
                marginBottom: 10,
              }}>
              View List of Blogs
            </Text>

            <FlatList
              keyExtractor={this.keyExtractor}
              data={list}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Thrive;
