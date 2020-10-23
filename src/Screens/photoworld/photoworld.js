import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
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
  dummyimage,
  dots,
  image1,
  image2,
  downarrow,
  image3,
  image4,
  image9,
  image10,
  image5,
  image6,
  image11,
  image12,
  image7,
  image8,
  bottomadd,
  backicon,
  welcomepagebackground,
  photoworld,
  backfirst,
  backsec,
  botomView,
  headerView,
  bottomCurve,
} from '../../common/images';
import {Form, Content, Picker, Container, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header} from 'react-native/Libraries/NewAppScreen';
import TopHeader from '../../components/header';
// import { Form } from 'formik';
const PhotoWorld = () => {
  const navigation = useNavigation();
  const [Value, setValue] = useState('key11');

  return (
    <View>
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
        <Header title="Love Meter" backButton="true" />
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 60}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextView>Today</TextView>
            <TouchableOpacity
              style={{
                height: 30,
                width: 100,
                marginTop: heightPercentageToDP(6.4),
              }}
              onPress={() => {
                navigation.navigate('TodayGallery');
              }}>
              <Text
                style={{
                  // marginTop: heightPercentageToDP(6.4),
                  marginRight: 3,
                  textAlign: 'right',
                  fontSize: 16,
                  color: '#A176C5',
                  fontFamily: 'FuturaPT-Book',
                }}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
          <FirstView>
            <ImagesView source={image1} initHeight="98" initWidth="98" />
            <ImagesView source={image2} initHeight="98" initWidth="98" />
            <ImagesView source={image3} initHeight="98" initWidth="98" />
            <ImagesView source={image4} initHeight="98" initWidth="98" />
            <ImageBackground
              source={backsec}
              style={{
                height: 0,
                width: 70,
                borderRadius: 50,
                position: 'absolute',
                right: widthPercentageToDP(1),
                // marginTop: -heightPercentageToDP(4),
              }}
            />
          </FirstView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextView>Week</TextView>
            <TouchableOpacity
              style={{
                height: 30,
                width: 100,
                marginTop: heightPercentageToDP(6.4),
              }}
              onPress={() => {
                navigation.navigate('TodayGallery');
              }}>
              <Text
                style={{
                  // marginTop: heightPercentageToDP(6.4),
                  marginRight: 3,
                  textAlign: 'right',
                  fontSize: 16,
                  color: '#A176C5',
                  fontFamily: 'FuturaPT-Book',
                }}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
          <FirstView>
            <ImagesView source={image5} initHeight="98" initWidth="98" />
            <ImagesView source={image7} initHeight="98" initWidth="98" />
            <ImagesView source={image7} initHeight="98" initWidth="98" />
            <ImagesView source={image8} initHeight="98" initWidth="98" />
          </FirstView>

          <MainView>
            <View>
              <ImageBackground
                source={backfirst}
                style={{
                  height: heightPercentageToDP(30),
                  width: widthPercentageToDP(50),
                  alignItems: 'center',
                  marginBottom: -heightPercentageToDP(6),
                  marginLeft: -widthPercentageToDP(6),
                  marginTop: -heightPercentageToDP(9),
                }}
              />
              <FirstViewText>
                <TextMonth>Month</TextMonth>
              </FirstViewText>
            </View>
            <Picker
              style={{
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                marginLeft: widthPercentageToDP(23),
                marginTop: heightPercentageToDP(1),
              }}
              mode="dropdown"
              placeholder="Select One"
              textStyle={{
                fontSize: 19,
                fontWeight: '600',
                color: '#484848',
                fontFamily: 'FuturaPT-Book',
              }}
              note={false}
              iosIcon={
                <ResponsiveImage
                  style={{tintColor: '#000'}}
                  source={downarrow}
                  initHeight="16"
                  initWidth="16"
                />
              }
              selectedValue={Value}
              onValueChange={(val) => setValue(val)}>
              <Picker.Item label="January" value="key0" />
              <Picker.Item label="February" value="key1" />
              <Picker.Item label="March" value="key2" />
              <Picker.Item label="April" value="key3" />
              <Picker.Item label="May" value="key4" />
              <Picker.Item label="June" value="key5" />
              <Picker.Item label="July" value="key6" />
              <Picker.Item label="August" value="key7" />
              <Picker.Item label="September " value="key8" />
              <Picker.Item label="October" value="key9" />
              <Picker.Item label="November " value="key10" />
              <Picker.Item label="December " value="key11" />
            </Picker>
          </MainView>
          <ThirdView>
            <ImagesView source={image9} initHeight="98" initWidth="98" />
            <ImagesView source={image10} initHeight="98" initWidth="98" />
            <ImagesView source={image11} initHeight="98" initWidth="98" />
            <ImagesView source={image12} initHeight="98" initWidth="98" />
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
                  marginTop: -heightPercentageToDP(2),
                }}
              />
              <LastaddImage
                source={photoworld}
                initHeight="150"
                initWidth="381"
                // borderRadius={3}
              />
            </View>
          </LastImage>
        </ScrollView>
      </View>
    </View>
  );
};
const LastaddImage = styled(ResponsiveImage)({
  marginTop: -heightPercentageToDP(5),
  // marginLeft: widthPercentageToDP(4),
});
const LastImage = styled(View)({
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(4),
});
const ThirdView = styled(View)({
  flexDirection: 'row',
  marginLeft: -widthPercentageToDP(0.2),
  // marginTop: heightPercentageToDP(0.2),
});
const TextMonth = styled(Text)({
  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const FirstViewText = styled(View)({
  marginTop: -heightPercentageToDP(13),
  marginLeft: widthPercentageToDP(4),

  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const MainView = styled(View)({
  flexDirection: 'row',
  // backgroundColor: 'green',
  // marginTop: heightPercentageToDP(1),
});
const TextViewWeek = styled(Text)({
  marginTop: heightPercentageToDP(2),
  marginLeft: widthPercentageToDP(4),
  marginVertical: heightPercentageToDP(2),
  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
  borderRadius: 0,
  zIndex: 1,
});
const TextView = styled(Text)({
  marginTop: heightPercentageToDP(6),
  marginLeft: widthPercentageToDP(4),
  marginVertical: heightPercentageToDP(2),
  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginLeft: -widthPercentageToDP(0.2),
  marginTop: -heightPercentageToDP(1),
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? '89%' : '100%',
  bottom: 0,
  marginTop: 50,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-14%',
  marginLeft: 12,
});
const WelcomeText = styled(Text)({
  fontSize: 25,
  color: '#ffffff',
  fontFamily: 'FuturaPT-Medium',
});
const BackIcon = styled(ResponsiveImage)({
  fontSize: 12,
  top: 10,
  // color: '#ffffff',
  // fontWeight: '500',
  // fontFamily: 'FuturaPT-Medium',
});

const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  // marginTop: heightPercentageToDP(4),
  marginRight: widthPercentageToDP(4),
});

export default PhotoWorld;
