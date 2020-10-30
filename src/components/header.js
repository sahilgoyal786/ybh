import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {menu, headerView} from '../common/images';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {backicon} from '../common/images';

const Header = ({title, backButton = ''}) => {
  const navigation = useNavigation();
  return (
    <View style={{width: widthPercentageToDP(100), height: 114}}>
      <Image
        source={headerView}
        style={{
          width: widthPercentageToDP(100),
          height: 100,
          resizeMode: 'stretch',
        }}
      />
      <WelcomeView>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              backButton && backButton == 'true' && navigation.goBack();
            }}
            style={{width: 20}}>
            {backButton && backButton == 'true' ? (
              <View>
                <BackIcon source={backicon} initHeight="16" initWidth="16" />
              </View>
            ) : (
              <View></View>
            )}
          </TouchableOpacity>
          <WelcomeText style={{marginTop: 4, marginLeft: 2}}>
            {title}
          </WelcomeText>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}>
          <MenuIcon source={menu} initHeight="30" initWidth="30" />
        </TouchableOpacity>
      </WelcomeView>
    </View>
  );
};

const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: -70,
  marginLeft: 12,
});
const WelcomeText = styled(Text)({
  fontSize: 22,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const BackIcon = styled(ResponsiveImage)({
  top: 10,
});

export default Header;
