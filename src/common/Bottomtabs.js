import React from 'react';
import {Text, View, StyleSheet, Platform, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {selectedTabCurve} from '../common/images';
// import {RedColor, whiteColor, purpleColor} from '../../utils/fonts';
// import {Red12pxFont} from '../../utils/CommonStyles';
// import {camera} from '../../utils/Images';
import ResponsiveImage from 'react-native-responsive-image';
import Trivia from '../Screens/trivia/trivia';

const BottomTab = ({state, descriptors, navigation}) => {
  // const focusedOptions = descriptors[state.routes[state.index].key].options;

  // if (focusedOptions.tabBarVisible === true) {
  //   return null;
  // }

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
                        // backgroundColor: 'white',
                        height: 70,
                        width: widthPercentageToDP(20),
                        marginTop: 20,
                        backgroundColor: '#9F74C5',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                {isFocused && (
                  <View
                    style={{
                      position: 'absolute',
                      height: 20,
                      width: widthPercentageToDP(20) + 10,
                      top: -16,
                      left: -5,
                    }}>
                    <Image
                      source={selectedTabCurve}
                      height={1}
                      resizeMode="contain"
                    />
                  </View>
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
