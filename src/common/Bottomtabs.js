import React, {useContext} from 'react';
import {Text, View, StyleSheet, Platform, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
import Trivia from '../Screens/trivia/trivia';
import LinearGradient from 'react-native-linear-gradient';
import userDetailContext from './userDetailContext';
import storage from '../components/apis/storage';
import GlobalStyles, {GlobalImages} from '../common/styles';
const BottomTab = ({state, descriptors, navigation}) => {
  const [userDetail, changeUserDetail] = useContext(userDetailContext);

  storage.getData('new_compat_notification').then((new_compat_notification) => {
    if (
      new_compat_notification &&
      new_compat_notification == 'true' &&
      typeof userDetail['user'] !== 'undefined' &&
      typeof userDetail['user']['has_new_compat_notification'] === 'undefined'
    ) {
      let userDetailTemp = userDetail;
      userDetailTemp['user']['has_new_compat_notification'] = true;
      changeUserDetail(userDetail);
    }
  });
  // console.log(userDetail);
  return (
    <View style={styles.ButtonContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        // console.log(label);
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            testID={options.tabBarTestID}
            onLongPress={onLongPress}
            accessibilityStates={isFocused ? ['selected'] : []}
            activeOpacity={0.95}
            onPress={onPress}>
            <View style={{alignItems: 'center'}}>
              <View
                style={
                  isFocused
                    ? {
                        ...GlobalStyles.BottomtabBackgroundColor,
                        height: 70,
                        width: widthPercentageToDP(20),
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                      }
                    : {
                        ...GlobalStyles.BottomtabBackgroundColor,
                        height: 70,
                        width: widthPercentageToDP(20),
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                }>
                <LinearGradient
                  colors={
                    isFocused
                      ? [
                          GlobalStyles.gradientColorsFrom,
                          GlobalStyles.gradientColorsTo,
                        ]
                      : [
                          GlobalStyles.gradientColorsFrom,
                          GlobalStyles.gradientColorsFrom,
                        ]
                  }
                  style={{
                    bottom: 0,
                    height: 60,
                    width: widthPercentageToDP(20),
                    position: 'absolute',
                  }}
                  start={{x: 0.5, y: 0.4}}
                  end={{x: 0.5, y: 1}}></LinearGradient>
                {isFocused && (
                  <View
                    style={{
                      position: 'absolute',
                      height: 20,
                      width: widthPercentageToDP(20) + 10,
                      top: -16,
                      left: 0,
                    }}>
                    <Image
                      source={GlobalImages.tabCurve}
                      resizeMode="contain"
                    />
                  </View>
                )}
                {typeof userDetail['user'] !== 'undefined' &&
                  typeof userDetail['user']['has_new_compat_notification'] !==
                    'undefined' &&
                  label == 'CompatibilityTestsHome' && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 10,
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: 15,
                        zIndex: 9,
                        right: widthPercentageToDP(10) - 20,
                      }}></View>
                  )}
                <ResponsiveImage
                  source={options.icon}
                  initHeight="30"
                  initWidth="30"
                  resizeMode="contain"
                  style={
                    isFocused
                      ? {
                          tintColor: 'white',
                        }
                      : {tintColor: 'white'}
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  ButtonContainer: {
    flexDirection: 'row',
    marginTop: -20,
  },
});
export default BottomTab;
