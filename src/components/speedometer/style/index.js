/* eslint import/no-unresolved: [2, { ignore: ['react-native'] }] */
import {StyleSheet, Dimensions} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const {width} = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    alignSelf: 'center',
  },
  // Circular Container
  // circleWrapper: {
  //   overflow: 'hidden',
  // },
  // outerCircle: {
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   overflow: 'hidden',
  //   borderColor: '#ffffff',
  //   backgroundColor: '#e6e6e6',
  // },
  // halfCircle: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   borderTopRightRadius: 0,
  //   borderBottomRightRadius: 0,
  // },
  imageWrapper: {
    position: 'absolute',
    zIndex: 10,
  },
  image: {
    // marginTop: heightPercentageToDP(2),
    // resizeMode: 'stretch',
    // height: width - 50,
    // width: width - 60,
  },
  // innerCircle: {
  //   overflow: 'hidden',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   backgroundColor: '#ffffff',
  //   width: width * 0.6,
  //   height: (width / 2) * 0.6,
  //   borderTopLeftRadius: width / 2 - 10,
  //   borderTopRightRadius: width / 2 - 10,
  // },
  // labelWrapper: {
  //   marginVertical: 5,
  //   alignItems: 'center',
  // },
  // label: {
  //   fontSize: 25,
  //   fontWeight: 'bold',
  // },
  // labelNote: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});
