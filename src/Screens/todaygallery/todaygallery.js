import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  welcomepagebackground,
  image2,
  image3,
  image4,
  backsec,
  backicon,
} from '../../common/images';
import {Textarea, Form} from 'native-base';

import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../components/button';
import {Dialog} from 'react-native-simple-dialogs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  menu,
  dots,
  wlcmimg,
  addimage,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  bottomadd,
} from '../../common/images';
import {Right} from 'native-base';
import {lightYellow, White, ShadeYellow} from '../../common/colors';

import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/header';

const TodayGallery = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [dialog, setDialog] = useState(false);

  return (
    <View >
      <Header title="Today Gallery" backButton="true" />
      <ScrollView >
        <TextingView>
          <Text style={{fontSize: 17, fontFamily: 'FuturaPt-Book'}}>
            All Photos
          </Text>
        </TextingView>

        <FlatList
          data={[
            {
              key: 0,
              image: image9,
            },
            {
              key: 1,
              image: image10,
            },
            {
              key: 2,
              image: image11,
            },
            {
              key: 3,
              image: image12,
            },
            {
              key: 4,
              image: image13,
            },
            {
              key: 0,
              image: image9,
            },
            {
              key: 1,
              image: image10,
            },
            {
              key: 2,
              image: image11,
            },
            {
              key: 3,
              image: image12,
            },
            {
              key: 4,
              image: image13,
            },
            {
              key: 0,
              image: image9,
            },
            {
              key: 1,
              image: image10,
            },
            {
              key: 2,
              image: image11,
            },
            {
              key: 3,
              image: image12,
            },
            {
              key: 4,
              image: image13,
            },
            {
              key: 0,
              image: image9,
            },
            {
              key: 1,
              image: image10,
            },
            {
              key: 2,
              image: image11,
            },
            {
              key: 3,
              image: image12,
            },
            {
              key: 4,
              image: image13,
            },
            {
              key: 0,
              image: image9,
            },
            {
              key: 1,
              image: image10,
            },
            {
              key: 2,
              image: image11,
            },
            {
              key: 3,
              image: image12,
            },
          ]}
          contentContainerStyle={{flexWrap: 'wrap', flexDirection: 'row'}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setImage(item.image);
                  setDialog(true);
                }}>
                <ImagesView
                  source={item.image}
                  initHeight="97"
                  initWidth="97"
                />
              </TouchableOpacity>
            );
          }}
        />
      
        <Dialog visible={dialog} onTouchOutside={() => setDialog(false)}>
          <ImagesVieww source={image} initHeight="260" initWidth="360" />
        </Dialog>
        
        </ScrollView>
    </View>
  );
};
const BackIcon = styled(ResponsiveImage)({
  fontSize: 12,
  marginTop:6,
  marginLeft: widthPercentageToDP(4),
});
const TextingView = styled(View)({
  marginTop: heightPercentageToDP(9),
  marginLeft: widthPercentageToDP(4),
});
const ImagesVieww = styled(ResponsiveImage)({
  //marginLeft: -widthPercentageToDP(6.5),
  // marginLeft: 5,
  // marginTop: heightPercentageToDP(0.5),
  // borderRadius: 0,
  // zIndex: 1,
alignSelf:'center'
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: -widthPercentageToDP(10),
  marginLeft: 5,
  marginTop: heightPercentageToDP(0.5),
  borderRadius: 0,
  zIndex: 1,
});
const ThirdView2 = styled(View)({
  flexDirection: 'row',
  marginLeft: -widthPercentageToDP(0.2),
  marginTop: heightPercentageToDP(0.5),
});
const ThirdView = styled(View)({
  flexDirection: 'row',
  marginLeft: -widthPercentageToDP(0.2),
  marginTop: heightPercentageToDP(1),
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 22,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: -widthPercentageToDP(1),
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: heightPercentageToDP(4),
  // marginLeft: widthPercentageToDP(9),
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? heightPercentageToDP(118) : heightPercentageToDP(130),

  // width: widthPercentageToDP(100),
});

export default TodayGallery;
