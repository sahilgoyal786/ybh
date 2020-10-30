import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import {Yellow, White, LightPink, Purple} from '../common/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
  name,
  linear,
  onPress,
  isLoading = false,
  icon = false,
  ...props
}) => {
  return (
    <>
      {linear ? (
        <LinearButton {...props} onPress={onPress}>
          <LinearGradientColor
            colors={[LightPink, Purple]}
            start={{x: 0.1, y: 0.5}}
            end={{x: 0.5, y: 0.1}}
            locations={[0.1, 0.9]}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <TextSignup>
                {icon ? (
                  <>
                    <Image
                      source={icon}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                    <Text> </Text>
                  </>
                ) : (
                  <></>
                )}
                <Text>{name}</Text>
              </TextSignup>
            )}
          </LinearGradientColor>
        </LinearButton>
      ) : (
        <TouchableOpacityButton onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <TextLogin>{name}</TextLogin>
          )}
        </TouchableOpacityButton>
      )}
    </>
  );
};
const TouchableOpacityButton = styled(TouchableOpacity)({
  justifyContent: 'center',
  width: wp(78),
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: Yellow,
  paddingVertical: hp(1.6),
  alignSelf: 'center',
  borderRadius: 4,
  marginVertical: hp(1),
  alignItems: 'center',
});
const TextLogin = styled(Text)({
  color: Yellow,
  fontWeight: '300',
  fontSize: 18,
  fontFamily: 'Futura',
});
const LinearButton = styled(TouchableOpacity)({
  width: wp(78),
  marginVertical: hp(1),
});
const LinearGradientColor = styled(LinearGradient)({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  paddingVertical: hp(1.9),
});
const TextSignup = styled(Text)({
  color: White,
  fontWeight: '300',
  fontSize: 18,
  fontFamily: 'Futura',
});

export default Button;
