import React, {useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {welcomepagebackground} from '../../common/images';
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
  lefticon,
  menu,
  dummyimage,
  backsec,
  dots,
  photoworld,
  righticon1,
  righticon,
  lefticon2,
  womanimg,
  backicon,
} from '../../common/images';
import {Right} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PhotoViewing = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(womanimg);
  const imagechanger = useRef();
  return (
    <BackgroundImage source={welcomepagebackground}>
      <WelcomeView>
        <BackIcon source={backicon} initHeight="16" initWidth="16" />

        <WelcomeText>Photo Viewing</WelcomeText>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <MenuIcon source={menu} initHeight="30" initWidth="30" />
        </TouchableOpacity>
      </WelcomeView>
      <View style={{marginTop: heightPercentageToDP(7)}}>
        <ArrowView>
          <ImagesView
            style={{
              marginTop: heightPercentageToDP(2.7),
              marginLeft: widthPercentageToDP(2.5),
            }}
            source={lefticon2}
            initHeight="20"
            initWidth="20"
          />
        </ArrowView>

        <ImagesView source={image} initHeight="230" initWidth="405" />
        <ArroowView>
          <ImagesView
            style={{
              marginTop: heightPercentageToDP(2.7),
              marginRight: widthPercentageToDP(1),
            }}
            source={righticon1}
            initHeight="20"
            initWidth="20"
          />
        </ArroowView>
      </View>
      <ThirdView>
        <ImagesView source={lefticon} initHeight="20" initWidth="20" />
        <FlatList
          data={[]}
          horizontal
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setImage(item.image);
                }}>
                <ImagesView
                  source={item.image}
                  initHeight="65"
                  initWidth="65"
                />
              </TouchableOpacity>
            );
          }}
        />

        <ImagesView source={righticon} initHeight="20" initWidth="20" />
      </ThirdView>
      <LastImage>
        <View>
          <ImageBackground
            source={backsec}
            style={{
              height: 70,
              width: 70,
              borderRadius: 50,
              marginLeft: widthPercentageToDP(66),
            }}
          />
          <LastaddImage source={photoworld} initHeight="150" initWidth="381" />
          <ImageBackground source={backsec} style={{}} />
        </View>
      </LastImage>
    </BackgroundImage>
  );
};

const LastaddImage = styled(ResponsiveImage)({
  marginTop: -heightPercentageToDP(5),
});
const LastImage = styled(View)({
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(4),
});
const ArroowView = styled(View)({
  position: 'absolute',
  zIndex: 10,
  backgroundColor: '#f6a7d4',
  opacity: 0.7,
  height: heightPercentageToDP(8),
  top: heightPercentageToDP(9),
  right: widthPercentageToDP(1),
  alignSelf: 'flex-end',
});
const ArrowView = styled(View)({
  position: 'absolute',
  zIndex: 10,
  backgroundColor: '#f6a7d4',
  opacity: 0.7,
  height: heightPercentageToDP(8),
  top: heightPercentageToDP(9),
  marginLeft: widthPercentageToDP(1),
});
const ThirdView = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: heightPercentageToDP(2),
  paddingHorizontal: widthPercentageToDP(3),
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
  resizeMode: 'cover',
  justifyContent: 'center',
});
const BackIcon = styled(ResponsiveImage)({});

const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const BackgroundImage = styled(ImageBackground)({
  height: heightPercentageToDP(117),
  // width: widthPercentageToDP(100),
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(9),
});
const WelcomeText = styled(Text)({
  fontSize: 24,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: -widthPercentageToDP(40),
  marginTop: -heightPercentageToDP(0.1),
});
export default PhotoViewing;
