import React, {useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,Image
} from 'react-native';
import {welcomepagebackground, image2} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  menu,
  image3,
  image5,
  image6,
  image8,
  image9,
  backicon,
  headerView,botomView
} from '../../common/images';
import {Right} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';

const MyPhotos = () => {
  const navigation = useNavigation();

  return (
    <View>

      <Image source={headerView}/>
        <WelcomeView>
          <BackIcon source={backicon} initHeight="16" initWidth="16" />

          <WelcomeText>My Photos</WelcomeText>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <MenuIcon source={menu} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        </WelcomeView>
        <Header title="My Photos" />
        <BackgroundImage source={botomView}>
        <View  style={{ flex:Platform.OS === 'ios' ? 1 : .69,bottom:30}}>
            <ScrollView >
        <ThirdView>
          <View>
            <ImagesView
              source={image2}
              initHeight="170"
              initWidth="190"
              borderRadius={3}
            />
            <View
              style={{
                backgroundColor: '#0EC776',
                padding: 7,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'FuturaPt-Medium',

                  fontSize: 15,
                }}>
                {' '}
                07/02/2020, 05:28
              </Text>
            </View>
          </View>
          <View>
            <ImagesView
              source={image6}
              initHeight="170"
              initWidth="190"
              borderRadius={3}
            />
            <View
              style={{
                backgroundColor: '#F25C5D',
                padding: 7,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'FuturaPt-Medium',

                  fontSize: 15,
                }}>
                07/02/2020, 05:28
              </Text>
            </View>
          </View>
        </ThirdView>
        <ThirddView>
          <View>
            <ImagesView
              source={image3}
              initHeight="170"
              initWidth="190"
              borderRadius={3}
            />
            <View
              style={{
                backgroundColor: '#F25C5D',
                padding: 7,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'FuturaPt-Medium',

                  fontSize: 15,
                }}>
                {' '}
                07/02/2020, 05:28
              </Text>
            </View>
          </View>
          <View>
            <ImagesView
              source={image5}
              initHeight="170"
              initWidth="190"
              borderRadius={3}
            />
            <View
              style={{
                backgroundColor: '#0EC776',
                padding: 7,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'FuturaPt-Medium',

                  fontSize: 15,
                }}>
                07/02/2020, 05:28
              </Text>
            </View>
          </View>
        </ThirddView>
        <ThirddView>
          <View>
            <ImagesView
              source={image8}
              initHeight="170"
              initWidth="190"
              borderRadius={3}
            />
            <View
              style={{
                backgroundColor: '#0EC776',
                padding: 7,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'FuturaPt-Medium',
                  fontSize: 15,
                }}>
                {' '}
                07/02/2020, 05:28
              </Text>
            </View>
          </View>
          <View>
            <ImagesView
              source={image9}
              initHeight="170"
              initWidth="190"
              borderRadius={3}
            />
            <View
              style={{
                backgroundColor: '#F25C5D',
                padding: 7,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'FuturaPt-Medium',

                  fontSize: 15,
                }}>
                07/02/2020, 05:28
              </Text>
            </View>
          </View>
        </ThirddView>
        <ThirddView>
          <View>
            <ImagesView
              source={image2}
              initHeight="170"
              initWidth="190"
              borderRadius={3}
            />
            <View
              style={{
                backgroundColor: '#0EC776',
                padding: 7,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'FuturaPt-Medium',

                  fontSize: 15,
                }}>
                {' '}
                07/02/2020, 05:28
              </Text>
            </View>
          </View>
          <View>
            <ImagesView
              source={image2}
              initHeight="170"
              initWidth="190"
              borderRadius={3}
            />
            <View
              style={{
                backgroundColor: '#F25C5D',
                padding: 7,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'FuturaPt-Medium',

                  fontSize: 15,
                }}>
                07/02/2020, 05:28
              </Text>
            </View>
          </View>
        </ThirddView>
        </ScrollView>
        </View>
       </BackgroundImage>
      </View>
  );
};
const ImagesView = styled(ResponsiveImage)({
  marginTop: heightPercentageToDP(0.5),
});

const ThirddView = styled(View)({
  justifyContent: 'space-evenly',
  flexDirection: 'row',
  marginTop: heightPercentageToDP(0.5),
});

const ThirdView = styled(View)({
  justifyContent: 'space-evenly',
  flexDirection: 'row',
  marginTop: heightPercentageToDP(5),
});
const BackgroundImage = styled(ImageBackground)({
  height:Platform.OS === 'ios' ? '89%' : '100%' ,
  bottom:0,
  marginTop:50,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: "-14%",
  marginLeft:12
});
const BackIcon = styled(ResponsiveImage)({
  fontSize: 12,
});
const WelcomeText = styled(Text)({
  fontSize: 24,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: -widthPercentageToDP(50),
  marginTop: -heightPercentageToDP(0.1),
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});

export default MyPhotos;
