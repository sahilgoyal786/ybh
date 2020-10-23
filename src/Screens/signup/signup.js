import React, {useState} from 'react';
import {Text, StyleSheet, View, ImageBackground, FlatList} from 'react-native';
import {signupslider1, signupslider2} from '../../common/images';
import styled from 'styled-components/native';
import Button from '../../components/button';
import LinearGradient from 'react-native-linear-gradient';
import * as yup from 'yup';
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
import {Input, Item, Label, Toast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import network from '../../components/apis/network';
import storage from '../../components/apis/storage';
import {SignupValidationSchema} from '../../common/validations';

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
  const _renderDots = (activeIndex) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item, index) => index.toString()}
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
                        borderWidth: 1,
                        borderColor: 'transparent',
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
            inactiveSlideScale={0.4}
            containerCustomStyle={styles.slider}
            onSnapToItem={(index) => setTab(index)}
            layout={'default'}
            layoutCardOffset={10}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={Tab}
            renderDots={_renderDots}
          />
        </TopSec>

        <Formik
          initialValues={{
            name: 'Sahil',
            email: 'sahil@32bitsolutions.com',
            password: '123456789',
          }}
          onSubmit={(values) => {
            values.password_confirmation = values.password;
            console.log(values);
            network.getResponse(
              'register',
              'POST',
              values,
              (response) => {
                Toast.show({
                  text:
                    "Awesome, just click on the verification link in the email and you'll be all set.",
                  duration: 5000,
                });
              },
              (response) => {
                if (response.response.data.errors) {
                  errors = response.response.data.errors;
                  // console.log(errors);
                  for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                      const element = errors[key];
                      Toast.show({text: element[0]});
                    }
                  }
                }
              },
            );
          }}
          validationSchema={SignupValidationSchema}
          validateOnChange={true}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View>
              <TextInputView>
                <TextInput
                  name="name"
                  placeholder="YOUR NAME"
                  placeholderTextColor="#484848"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={{fontFamily: 'Futura-Medium', flex: 1}}
                />
              </TextInputView>
              {errors.name && touched.name && (
                <Text style={styles.error_message}>{errors.name}</Text>
              )}
              <TextInputView>
                <TextInput
                  name="email"
                  placeholder="EMAIL"
                  placeholderTextColor="#484848"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  style={{fontFamily: 'Futura-Medium', flex: 1}}
                />
              </TextInputView>
              {errors.email && touched.email && (
                <Text style={styles.error_message}>{errors.email}</Text>
              )}
              <TextInputView>
                <TextInput
                  name="password"
                  placeholder={'PASSWORD'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                  placeholderTextColor="#484848"
                  style={{fontFamily: 'FuturaPT-Medium', flex: 1}}
                />
              </TextInputView>
              {errors.password && touched.password && (
                <Text style={styles.error_message}>{errors.password}</Text>
              )}
              <Button
                style={{width: wp(78), marginTop: hp(4), alignSelf: 'center'}}
                name={'Sign up'}
                onPress={handleSubmit}
                disabled={!isValid}
                linear
              />
            </View>
          )}
        </Formik>
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
const TextInputView = styled(View)({
  width: wp(78),
  alignSelf: 'center',
  borderWidth: 0,
  borderBottomWidth: 1,
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
  error_message: {
    fontSize: 10,
    color: 'red',
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
  },
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
