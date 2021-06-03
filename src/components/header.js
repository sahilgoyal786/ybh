import React, {Component, useContext} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation,DrawerActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {menu,headerView,search,fillter,profileWhiteIcon} from '../common/images';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {backicon} from '../common/images';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import userDetailContext from '../common/userDetailContext';

const Header = ({title,backButton=false,showRightDrawer=true,searchBtn=false,userImage=false,filterButton=false,myProfileBtn=false}) => {
  const navigation = useNavigation();
  return (
    <View style={{width: widthPercentageToDP(100), height: 120}}>
      <Image
        source={headerView}
        style={{
          width: widthPercentageToDP(100),
          height: 107,
          resizeMode: 'stretch',
        }}
      />
      <WelcomeView>
        <View style={{flex: 1, flexDirection: 'row',alignContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              if (backButton !== false)
                backButton !== false && backButton == 'true'
                  ? navigation.goBack()
                  : navigation.navigate(backButton);
            }}
            style={{width: 20}}>
            {backButton !== false ? (
              <View>
                <BackIcon source={backicon} initHeight="16" initWidth="16" />
              </View>
            ) : (
              <></>
            )}
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={() => {
              if (backButton !== false)
                backButton !== false && backButton == 'true'
                  ? navigation.goBack()
                  : navigation.navigate(backButton);
            }}>
            <View style={{flexDirection: 'row'}}>
              {userImage !== false && (
                <Image source={{uri: userImage}} style={{width: 40,height: 40,borderRadius: 40,marginLeft: 10,marginRight: 10}}></Image>
              )}
              <WelcomeText
                style={{
                  marginTop: 4,
                  marginLeft: 2,
                  textTransform: 'capitalize',
                }}>
                {title}
              </WelcomeText>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {myProfileBtn !== false && (
          <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
            <MenuIcon source={profileWhiteIcon} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        )}
        {filterButton !== false && (
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <MenuIcon source={fillter} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        )}
        {searchBtn !== false && (
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MenuIcon source={search} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        )}
        {showRightDrawer !== false && (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}>
            <MenuIcon source={menu} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        )}
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
