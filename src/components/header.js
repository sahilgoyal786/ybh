import React, {Component, useContext} from 'react';
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
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import userDetailContext from '../common/userDetailContext';

const Header = ({title, backButton = false}) => {
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
        <View style={{flex: 1, flexDirection: 'row'}}>
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
            <WelcomeText style={{marginTop: 4, marginLeft: 2}}>
              {title}
            </WelcomeText>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}>
          {/* {userDetail.is_connected ? <Text>Y</Text> : <Text>N</Text>} */}
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
