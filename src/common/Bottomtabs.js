import React, {useContext} from 'react';
import {Text, View, StyleSheet, Platform, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {selectedTabCurve} from '../common/images';
import ResponsiveImage from 'react-native-responsive-image';
import Trivia from '../Screens/trivia/trivia';
import LinearGradient from 'react-native-linear-gradient';
import userDetailContext from './userDetailContext';
import storage from '../components/apis/storage';

const BottomTab = ({state, descriptors, navigation}) => {
  const [userDetail, changeUserDetail] = useContext(userDetailContext);

  storage.getData('new_compat_notification').then((new_compat_notification) => {
    if (
      new_compat_notification &&
      new_compat_notification == 'true' &&
      !userDetail['user']['has_new_compat_notification']
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
                        backgroundColor: '#9F74C5',
                        height: 70,
                        width: widthPercentageToDP(20),
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                      }
                    : {
                        height: 70,
                        width: widthPercentageToDP(20),
                        marginTop: 20,
                        backgroundColor: '#9F74C5',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                }>
                <LinearGradient
                  colors={
                    isFocused
                      ? ['#9F74C5', '#8F64B5', '#7F54A5']
                      : ['#9F74C5', '#9F74C5']
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
                      left: -5,
                    }}>
                    <Image source={selectedTabCurve} resizeMode="contain" />
                  </View>
                )}
                {userDetail['user']['has_new_compat_notification'] &&
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
