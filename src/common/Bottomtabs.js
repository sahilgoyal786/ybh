import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getadvice, relationmeter, shareimage, trivia, homeicon,
   bottomtabshome,bottomtabcamera,bottomtabsadvice,bottomtabsmeter, bottomtabstrivia} from '../common/images';
// import {RedColor, whiteColor, purpleColor} from '../../utils/fonts';
// import {Red12pxFont} from '../../utils/CommonStyles';
// import {camera} from '../../utils/Images';
import ResponsiveImage from 'react-native-responsive-image';
import Trivia from '../Screens/trivia/trivia';

const BottomTab = ({ state, descriptors, navigation }) => {
    // const focusedOptions = descriptors[state.routes[state.index].key].options;
  
    // if (focusedOptions.tabBarVisible === true) {
    //   return null;
    // }


  return (
    <View style={styles.ButtonContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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

    //     return (
    //       <TouchableOpacity
    //         accessibilityRole="button"
    //         testID={options.tabBarTestID}
    //         onLongPress={onLongPress}
    //         accessibilityStates={isFocused ? ['selected'] : []}
    //         onPress={onPress}>
    //         <View style={{ alignItems: 'center', }}>
    //           {label === 'GetAdvice2' && (
    //             <ResponsiveImage
    //               source={isFocused ? bottomtabsadvice : getadvice}
    //               style={
    //                 isFocused
    //                   ? {
    //                     height: 79,
    //                     width: 83,
    //                     bottom: Platform.OS === 'ios' ? 26 : 0,

    //                   }
    //                   : {
    //                     height: 40,
    //                     width: 40,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                   }

    //               }
    //             />

    //           )}

    //           {label === 'home' && (

    //             <ResponsiveImage
    //               source={isFocused ? bottomtabshome : homeicon}
    //               style={
    //                 isFocused
    //                   ? {
    //                     height: 79,
    //                     width: 83,
    //                     bottom: Platform.OS === 'ios' ? 26 : 0,

    //                   }
    //                   : {
    //                     height: 40,
    //                     width: 40,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                   }

    //               }
    //             ></ResponsiveImage>


    //           )}
    //           {label === 'RelationMeter' && (

    //             <ResponsiveImage
    //               source={isFocused ? bottomtabsmeter : relationmeter}
    //               style={
    //                 isFocused
    //                   ? {
    //                     height: 79,
    //                     width: 83,
    //                     bottom: Platform.OS === 'ios' ? 26 : 0,

    //                   }
    //                   : {
    //                     height: 40,
    //                     width: 40,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                   }

    //               }
    //             ></ResponsiveImage>
    //             // </View>
    //           )}
    //           {label === 'ShareImage' && (

    //             <ResponsiveImage
    //               source={isFocused ? bottomtabcamera : shareimage}
    //               style={
    //                 isFocused
    //                   ? {
    //                     height: 79,
    //                     width: 83,
    //                     bottom: Platform.OS === 'ios' ? 26 : 0,
    //                   }
    //                   : {
    //                     height: 40,
    //                     width: 40,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                   }

    //               }
    //             ></ResponsiveImage>

    //           )}
    //           {label === 'Trivia' && (
    //             <ResponsiveImage
    //               source={isFocused ? bottomtabstrivia : trivia}
    //               style={
    //                 isFocused
    //                   ? {
    //                     height: 79,
    //                     width: 83,
    //                     bottom: Platform.OS === 'ios' ? 26 : 0,
    //                   }
    //                   : {
    //                     height: 40,
    //                     width: 40,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     tintcolor:"red"
    //                   }

    //               }
    //             ></ResponsiveImage>
                
    //           )}
            
    //         </View>
    //       </TouchableOpacity>
    //     );
    //   })}
    // </View>
    return (
      <TouchableOpacity
        accessibilityRole="button"
        testID={options.tabBarTestID}
        onLongPress={onLongPress}
        accessibilityStates={isFocused ? ['selected'] : []}
        onPress={onPress}>
          
        <View style={{alignItems: 'center'}}>
          {label === 'GetAdvice2' && (
            <View
              style={
                isFocused
                  ? {
                      // backgroundColor: 'white',
                      height: 40,
                      width: 40,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }>
              <ResponsiveImage
                source={getadvice}
                initHeight="25"
                initWidth="20"
                style={
                  isFocused
                    ? {
                        tintColor: 'white',
                      }
                    : {tintColor: 'white'}
                }
             
              />
            </View>
          )}
             {label === 'home' && (
            <View
              style={
                isFocused
                  ? {
                      // backgroundColor: 'white',
                      height: 40,
                      width: 40,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }>
              <ResponsiveImage
                source={homeicon}
                initHeight="25"
                initWidth="20"
                style={
                  isFocused
                    ? {
                        tintColor: 'white',
                      }
                    : {tintColor: 'white'}
                }
              />
            </View>
          )}
          {label === 'RelationMeter' && (
            
            <View
              style={
                isFocused
                  ? {
                      // backgroundColor: 'white',
                      height: 40,
                      width: 40,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }>
              <ResponsiveImage
                source={relationmeter}
                initHeight="27"
                initWidth="27"
                style={
                  isFocused
                    ? {
                        tintColor: 'white',
                      }
                    : {tintColor: 'white'}
                }
              />
              
            </View>
         
          )}
          {label === 'ShareImage' && (
            <View
              style={
                isFocused
                  ? {
                      // backgroundColor: 'white',
                      height: 40,
                      width: 40,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }>
              <ResponsiveImage
                source={shareimage}
                initHeight="25"
                initWidth="25"
                style={
                  isFocused
                    ? {
                        tintColor: 'white',
                      }
                    : {tintColor: 'white'}
                }
              />
            </View>
          )}
          {label === 'Trivia' && (
            <View
              style={
                isFocused
                  ? {
                      // backgroundColor: 'white',
                      height: 40,
                      width: 40,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }>
              <ResponsiveImage
                source={trivia}
                initHeight="25"
                initWidth="25"
                style={
                  isFocused
                    ? {
                        tintColor: 'white',
                      }
                    : {tintColor: 'white'}
                }
              />
            </View>
          )}
          {/* <Text style={[{color: isFocused ? 'white' : 'white'}]}>
            {label}
          </Text> */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#9F74C5',
    paddingHorizontal: wp(8),
    paddingVertical: hp(2),
     borderTopRightRadius: 5,
     borderTopLeftRadius: 5,

  },
});
export default BottomTab;
