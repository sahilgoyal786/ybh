import React, {useState} from 'react';
import {Text, StyleSheet, View, ImageBackground, FlatList} from 'react-native';
import {signupslider1, signupslider2} from '../../common/images';
import styled from 'styled-components/native';
import Button from '../../components/button';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {White} from '../../common/colors';
import {LightPink} from '../../common/colors';
import {Yellow} from '../../common/colors';
import {Purple} from '../../common/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ResponsiveImage from 'react-native-responsive-image';
import {useNavigation} from '@react-navigation/native';
import {signupsec} from '../../common/images';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import {Input, Item, Label} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const Signup = () => {
  const [Tab, setTab] = useState(0);
  const navigation = useNavigation();
  const data = [
    {
      image: signupslider1,
    },
    {
      image: signupslider2,
    },
    {
      image: signupslider1,
    },
  ];
  const _renderItemWithParallax = ({item, index}) => {
    return (
      <View style={[styles.slide]}>
        <ResponsiveImage source={item.image} initHeight="180" initWidth="400" />
      </View>
    );
  };
  const _renderDots = (activeIndex, total, context) => {
    console.log(total, 'total', activeIndex);
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={data}
          horizontal
          renderItem={({item, index}) => {
            const value =
              index === activeIndex
                ? [LightPink, Purple]
                : ['rgba(255,0,0,0)', 'rgba(255,0,0,0)'];
            return (
              <LinearGradient
                style={
                  index === activeIndex
                    ? {
                        height: 10,
                        width: 10,
                        borderRadius: 10,
                        marginLeft: wp(0.5),
                      }
                    : {
                        borderColor: 'lightgray',
                        borderWidth: 1,
                        height: 10,
                        width: 10,
                        borderRadius: 10,
                        marginLeft: wp(0.5),
                      }
                }
                colors={value}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.5, y: 0.1}}
                locations={[0.1, 0.9]}
              />
            );
          }}
        />
      </View>
    );
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
      {/* <ScrollView> */}
      <BackgroundImage source={signupsec}>
        <View
          style={{
            justifyContent: 'center',
            marginTop: hp(7),
            fontFamily: 'Futura-Medium',
          }}>
          <Top>WELCOME TO YBH </Top>
        </View>
        <TopSec>
          <Carousel
            autoplay
            loop
            data={data}
            renderItem={_renderItemWithParallax}
            sliderWidth={wp(100)}
            itemWidth={wp(100)}
            hasParallaxImages={true}
            inactiveSlideScale={0.94}
            containerCustomStyle={styles.slider}
            onSnapToItem={(index) => setTab(index)}
            layout={'default'}
            layoutCardOffset={'10'}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={Tab}
            // containerStyle={styles.dotContainerStyle}
            // dotStyle={styles.activeDotStyle}
            // inactiveDotStyle={styles.InactiveDotStyle}
            // inactiveDotOpacity={1}
            // inactiveDotScale={0.6}
            renderDots={_renderDots}
          />
        </TopSec>

        <TextInputView>
          <Input
            placeholder={'USER NAME'}
            placeholderTextColor="#484848"
            style={{fontFamily: 'Futura-Medium'}}
          />
        </TextInputView>
        <TextInputView>
          <Input
            placeholder={'EMAIL'}
            placeholderTextColor="#484848"
            keyboardType={'email-address'}
            style={{fontFamily: 'Futura-Medium'}}
          />
        </TextInputView>
        <EmailVerText>
          Make sure is a valid email because we will be sending verification
          link.
        </EmailVerText>
        <TextInputView>
          <Input
            placeholder={'PASSWORD'}
            secureTextEntry={true}
            placeholderTextColor="#484848"
            style={{fontFamily: 'FuturaPT-Medium'}}
          />
        </TextInputView>
        <Button
          style={{width: wp(78), marginTop: hp(4), alignSelf: 'center'}}
          name={'Sign up'}
          linear
        />
        <AlreadyAccountText>
          Already have an account?{' '}
          <AlreadyAccountText
            style={{
              textDecorationLine: 'underline',
              fontFamily: 'FuturaPT-Light',
              color: '#484848',
            }}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Sign in
          </AlreadyAccountText>
        </AlreadyAccountText>
      </BackgroundImage>
      {/* </ScrollView> */}
    </KeyboardAwareScrollView>
  );
};
const BackgroundImage = styled(ImageBackground)({
  flex: 1,
  // height: wp(150),
  alignItems: 'center',
});
const Top = styled(Text)({
  textAlign: 'center',
  fontSize: 25,
  fontWeight: '400',
  color: '#ffffff',
  fontFamily: 'Futura-Medium',
});
const TopSec = styled.View({
  // flex: 1,
  // justifyContent: 'center',
  alignItems: 'center',
});
const TextInputView = styled(Item)({
  width: wp(78),
  alignSelf: 'center',
  borderWidth: 2,
  borderColor: '#000',
  marginTop: hp(1),
});
const EmailVerText = styled.Text({
  fontSize: 12,
  marginTop: hp(1),
  color: '#484848',
  textAlign: 'center',
  fontFamily: 'FuturaPT-Light',
  width: wp(80),
  // backgroundColor: 'red',
});
const AlreadyAccountText = styled.Text({
  color: '#484848',
  fontSize: 16,
  textAlign: 'center',
  marginTop: hp(0.5),
  fontFamily: 'FuturaPT-Light',
});
const styles = StyleSheet.create({
  slider: {
    flexGrow: 0,
  },
  slide: {
    alignItems: 'center',
    marginTop: hp(6),
  },

  dotContainerStyle: {
    marginTop: -hp(2),
    width: wp(2),
  },

  activeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: LightPink,
  },
  InactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: LightPink,
  },
});
export default Signup;
