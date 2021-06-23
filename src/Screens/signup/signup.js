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
import userDetailContest from '../../common/userDetailContext';
import EndPoints from '../../components/apis/endPoints';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const Signup = () => {
  const [Tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
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
    const userDetail = React.useContext(userDetailContest);

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
    <KeyboardAwareScrollView
      contentContainerStyle={{
        ...GlobalStyles.screenBackgroundColor,
        flexGrow: 1,
      }}>
      <View>
        <HeaaderBackgroundImage
          source={GlobalImages.loginHeader}
          imageStyle="stretch"
          contentContainerStyle={{flex: 1, marginBottom: 100}}>
          <View
            style={{
              justifyContent: 'center',
              marginTop: hp(7),
              fontFamily: 'Futura-Medium',
            }}>
            <Top>WELCOME TO YBH</Top>
          </View>
          <TopSec style={{alignSelf: 'flex-end', marginBottom: -120}}>
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
          </TopSec>
        </HeaaderBackgroundImage>
      </View>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }}
        onSubmit={(values) => {
          if (!termsAgreed) {
            setShowTermsError(true);
            return;
          }
          setIsLoading(true);
          network.getResponse(
            EndPoints.register,
            'POST',
            values,
            '',
            (response) => {
              setIsLoading(false);
              if (response.message)
                Toast.show({
                  text: response.message,
                  duration: 5000,
                });
              navigation.navigate('VerifyEmail', {email: response.user.email});
            },
            (error) => {
              setIsLoading(false);
              if (
                error.response &&
                error.response.data &&
                error.response.data.errors
              ) {
                const errors = error.response.data.errors;
                for (const key in errors) {
                  if (errors.hasOwnProperty(key)) {
                    const element = errors[key];
                    Toast.show({text: element[0]});
                    return;
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
          <SigninButton>
            <TextInputView>
              <TextInput
                name="name"
                placeholder="Choose Username"
                placeholderTextColor={'#afafaf'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={styles.inputField}
              />
            </TextInputView>
            {errors.name && touched.name && (
              <Text style={styles.error_message}>{errors.name}</Text>
            )}
            <TextInputView>
              <TextInput
                name="email"
                placeholder="Email"
                placeholderTextColor={'#afafaf'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.inputField}
              />
            </TextInputView>
            {errors.email && touched.email && (
              <Text style={styles.error_message}>{errors.email}</Text>
            )}
            <TextInputView>
              <TextInput
                name="password"
                placeholder={'Password'}
                placeholderTextColor={'#afafaf'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
                style={styles.inputField}
              />
            </TextInputView>
            {errors.password && touched.password && (
              <Text style={styles.error_message}>{errors.password}</Text>
            )}
            <TextInputView>
              <TextInput
                name="password_confirmation"
                placeholder={'Confirm Password'}
                placeholderTextColor={'#afafaf'}
                onChangeText={handleChange('password_confirmation')}
                onBlur={handleBlur('password_confirmation')}
                value={values.password_confirmation}
                secureTextEntry={true}
                style={styles.inputField}
              />
            </TextInputView>
            {errors.password_confirmation && (
              <Text style={styles.error_message}>
                {errors.password_confirmation}
              </Text>
            )}
            <TextInputView>
              <Text
                style={{
                  ...GlobalStyles.secondaryTextColor,
                  fontSize: 16,
                  marginTop: 20,
                }}>
                <FontAwesome5Icon
                  solid={termsAgreed}
                  name={!termsAgreed ? 'square' : 'check-square'}
                  onPress={() => setTermsAgreed(!termsAgreed)}
                  style={{
                    ...GlobalStyles.customTextColor,
                    fontSize: 18,
                    padding: 4,
                    marginRight: 5,
                  }}
                />
                {'  '}
                <Text onPress={() => setTermsAgreed(!termsAgreed)}>
                  I agree to the{' '}
                </Text>
                <Text
                  onPress={() => navigation.navigate('TnC')}
                  style={{
                    ...GlobalStyles.customTextColor,
                    textDecorationLine: 'underline',
                  }}>
                  terms and conditions
                </Text>
              </Text>
            </TextInputView>

            {showTermsError && !termsAgreed && (
              <Text style={styles.error_message}>
                You need to agree to the terms and conditions to proceed.
              </Text>
            )}
            <Button
              style={{width: wp(78), marginTop: hp(4), alignSelf: 'center'}}
              name={'Sign up'}
              onPress={handleSubmit}
              disabled={!isValid}
              isLoading={isLoading}
              linear
            />
          </SigninButton>
        )}
      </Formik>
      <AlreadyAccountText>
        Already have an account?{' '}
        <AlreadyAccountText
          style={{
            ...GlobalStyles.secondaryTextColor,
            textDecorationLine: 'underline',
            fontFamily: 'FuturaPT-Light',
          }}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Sign in
        </AlreadyAccountText>
      </AlreadyAccountText>
      <FooterBackgroundImage
        source={GlobalImages.loginFooter}
        imageStyle="stretch"></FooterBackgroundImage>
    </KeyboardAwareScrollView>
  );
};

const HeaaderBackgroundImage = styled(ImageBackground)({
  height: hp(40),
  alignContent: 'center',
  justifyContent: 'center',
  marginBottom: 60,
});
const FooterBackgroundImage = styled(ImageBackground)({
  height: hp(20),
  alignContent: 'center',
  justifyContent: 'center',
  marginBottom: 0,
});
const BackgroundImage = styled(ImageBackground)({
  flex: 1,
  alignItems: 'center',
});
const Top = styled(Text)({
  ...GlobalStyles.whiteTextColor,
  textAlign: 'center',
  fontSize: 25,
  fontWeight: '400',
  fontFamily: 'Futura-Medium',
});
const TopSec = styled.View({});
const TextInputView = styled(View)({
  width: wp(78),
  alignSelf: 'center',
  borderWidth: 0,
  borderBottomWidth: 0,
  marginTop: hp(1),
});
const EmailVerText = styled.Text({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 12,
  marginTop: hp(1),
  textAlign: 'center',
  fontFamily: 'FuturaPT-Light',
  width: wp(80),
});
const SigninButton = styled.View({
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: wp(78),
  alignSelf: 'center',
});
const AlreadyAccountText = styled.Text({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 16,
  textAlign: 'center',
  marginTop: hp(3),
  marginBottom: hp(3),
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
  inputField: {
    ...GlobalStyles.secondaryTextColor,
    ...GlobalStyles.secondaryBorderColor,
    borderBottomWidth: 1,
    paddingVertical: hp(1),
    fontSize: 17,
    marginTop: 8,
    fontFamily: 'FuturaPT-Light',
  },
  error_message: GlobalStyles.error_message,
});
export default Signup;
