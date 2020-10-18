// import React, { useRef } from "react";
// import {Text, StyleSheet, View, ImageBackground,PanResponder,Animated} from 'react-native';
// import {
//   welcomepagebackground,
//   menu,
//   image1,
//   vtngpage,
//   vtngpage2,
//   vtngpage3,
//   vtngpage4,
//   vtngbakground,
//   vtngbtn,
// } from '../../common/images';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import styled from 'styled-components/native';
// import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
// import {useNavigation, DrawerActions} from '@react-navigation/native';
// import ResponsiveImage from 'react-native-responsive-image';


// const VotingPage = () => {
//   const navigation = useNavigation();
//   const pan = useRef(new Animated.ValueXY()).current;
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         pan.setOffset({
//           x: pan.x._value,
//           y: pan.y._value
//         });
//       },
//       onPanResponderMove: Animated.event(
//         [
//           null,
//           { dx: pan.x, dy: pan.y }
//         ]
//       ),
//       onPanResponderRelease: () => {
//         pan.flattenOffset();
//       }
//     })
//   ).current;
//   return (
//     <View>
//       <BackgroundImage source={vtngbakground}>
//         <WelcomeView>
//           <WelcomeText>Voting Page</WelcomeText>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.dispatch(DrawerActions.openDrawer());
//             }}>
//             <MenuIcon source={menu} initHeight="30" initWidth="30" />
//           </TouchableOpacity>
//         </WelcomeView>
//         <View
//           style={{alignItems: 'center',  marginTop: heightPercentageToDP(5)}}>
//             <Animated.View
//         style={{
//           transform: [{ translateX: pan.x }, { translateY: pan.y }]
//         }}
//         {...panResponder.panHandlers}
//       >
//           <View>
//             <ImagesView
//               source={vtngpage}
//               initHeight="135"
//               initWidth="120"
//               // borderRadius={5}
//             />
//           </View>
//           </Animated.View>

//           <View
//             style={{
//               marginLeft: -widthPercentageToDP(28),
//               marginTop: -heightPercentageToDP(3.8),
//             }}>
//             <ImagesView
//               source={vtngpage2}
//               initHeight="135"
//               initWidth="120"
//               borderRadius={5}
//             />
//           </View>
//           <MainView
//             style={{
//               marginTop: -heightPercentageToDP(4),
//               marginLeft: widthPercentageToDP(1),
//             }}>
//             <ImagesView
//               source={vtngpage4}
//               initHeight="135"
//               initWidth="120"
//               borderRadius={5}
//             />
//             <ImagesView
//               source={vtngpage}
//               initHeight="135"
//               initWidth="120"
//               borderRadius={5}
//             />
//             <ImagesView
//               source={vtngpage4}
//               initHeight="135"
//               initWidth="120"
//               borderRadius={5}
//             />
//           </MainView>
//           <View
//             style={{
//               marginLeft: widthPercentageToDP(30),
//               marginTop: -heightPercentageToDP(4),
//             }}>
//                <Animated.View
//         style={{
//           transform: [{ translateX: pan.x }, { translateY: pan.y }]
//         }}
//         {...panResponder.panHandlers}
//       >
//             <ImagesView
//               source={vtngpage2}
//               initHeight="135"
//               initWidth="120"
//               borderRadius={5}
//             />
//             </Animated.View>
//           </View>
//           <View
//             style={{
//               marginTop: -heightPercentageToDP(3.7),
//               marginLeft: widthPercentageToDP(2),
//             }}>
//             <ImagesView
//               source={vtngpage}
//               initHeight="135"
//               initWidth="120"
//               borderRadius={5}
//             />
//           </View>
//           <Mainbtn>
//             <ImagesView
//               style={{
//                 marginLeft: -widthPercentageToDP(8),
//                 marginTop: -heightPercentageToDP(2),
//               }}
//               source={vtngbtn}
//               initHeight="135"
//               initWidth="140"
//               borderRadius={5}
//             />

//             {/* <View
//             style={{
//               marginTop: -heightPercentageToDP(3.9),
//               marginLeft: -widthPercentageToDP(13),
//             }}> */}
//             <ImagesView
//               style={{
//                 marginTop: -widthPercentageToDP(8),
//                 marginLeft: widthPercentageToDP(4),
//               }}
//               source={vtngpage4}
//               initHeight="135"
//               initWidth="120"
//               borderRadius={5}
//             />
//           </Mainbtn>
//         </View>
//       </BackgroundImage>
//     </View>
//   );
// };
// const Mainbtn = styled(View)({
//   flexDirection: 'row',
//   justifyContent: 'space-between',

//   textAlign: 'center',
// });
// const MainView = styled(View)({
//   flexDirection: 'row',
//   marginTop: heightPercentageToDP(1),
//   // marginLeft: widthPercentageToDP(20),
//   textAlign: 'center',
// });
// const ImagesView = styled(ResponsiveImage)({
//   // marginLeft: 5,
//   borderRadius: 0,
// });
// const MenuIcon = styled(ResponsiveImage)({
//   alignSelf: 'flex-end',
//   // marginTop: heightPercentageToDP(4),
//   marginRight: widthPercentageToDP(4),
// });
// const BackgroundImage = styled(ImageBackground)({
//   height: heightPercentageToDP(117),
//   // width: widthPercentageToDP(100),
// });
// const WelcomeView = styled(View)({
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginTop: heightPercentageToDP(4),
//   marginLeft: widthPercentageToDP(9),
// });
// const WelcomeText = styled(Text)({
//   fontSize: 22,
//   color: '#ffffff',
//   fontWeight: '500',
//   fontFamily: 'FuturaPT-Medium',
// });

// export default VotingPage;

import React, { Component } from 'react';
import {
  headerView, menu, vtngpage4, vtngbtn,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,

} from 'react-native-responsive-screen';



import {
  StyleSheet,
  View, Text, TouchableOpacity, ScrollView,
  ImageBackground, Image, Platform, Dimensions
} from 'react-native'
//import { Image } from 'native-base';
import { DraggableGrid } from 'react-native-draggable-grid';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Button from '../../components/button';
import Header from '../../components/header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? '89%' : '100%',
  bottom: 0,
  marginTop: 50,
});
const Mainbtn = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',

  textAlign: 'center',
});
const ImagesView = styled(ResponsiveImage)({
  // marginLeft: 5,
  borderRadius: 0,
});

// interface VotingPageProps {

// }

// interface VotingPageState {
//   data: { key: string, name: string }[];
// }
class VotingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [

        { name: image1, key: '1',hideView: true },
        { name: '', key: '2' ,disabledDrag: true, disabledReSorted: true,hideView: false},
        { name: '', key: '3',disabledDrag: true, disabledReSorted: true,hideView: false },
        { name: '', key: '4' ,disabledDrag: true, disabledReSorted: true,hideView: false},

        { name: image2, key: '6',hideView: true },
        { name: image3, key: '7',hideView: true },
        { name: '', key: '8',disabledDrag: true, disabledReSorted: true ,hideView: false},
        { name: '', key: '9',disabledDrag: true, disabledReSorted: true ,hideView: false},

        { name: '', key: '10', disabledDrag: true, disabledReSorted: true,hideView: false},
        { name: image4, key: '11' ,hideView: true},
        { name: image5, key: '12' ,hideView: true},
        { name: '', key: '13' ,disabledDrag: true, disabledReSorted: true,hideView: false},


        { name: '', key: '14',disabledDrag: true, disabledReSorted: true ,hideView: false},
        { name: '', key: '15',disabledDrag: true, disabledReSorted: true ,hideView: false},
        { name: image6, key: '16',hideView: true },
        { name: image7, key: '17',hideView: true },

        { name: '', key: '18',disabledDrag: true, disabledReSorted: true ,hideView: false},
        { name: '', key: '19',disabledDrag: true, disabledReSorted: true ,hideView: false},
        { name: '', key: '20',disabledDrag: true, disabledReSorted: true ,hideView: false},
        { name: image8, key: '21',hideView: true },

      ],

    }
  }


  render_item(item) {
    return (
      // <Image source={item.name} style={{
      //   height: 100, width: 100, borderRadius: 8,
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }} />
      item.hideView === false ?
        <View  style={{
          height: widthPercentageToDP(25)-5, width: widthPercentageToDP(25)-5,
          justifyContent: 'center',backgroundColor:'transparent',
          alignItems: 'center',
        }}  /> :
        <Image source={item.name} style={{
          height: widthPercentageToDP(25)-5, width: widthPercentageToDP(25)-5,
          justifyContent: 'center', resizeMode: 'contain',
          alignItems: 'center',
        }} />

      
      

    );
  }
  render() {
    const { navigation } = this.props;
    return (
      <View >
        <Header title="Voting Page" backButton="true" />
        <View style={{ marginTop: 10, height: (heightPercentageToDP(100) - 330), paddingLeft: 10, paddingRight: 10 }}>
            <DraggableGrid
              numColumns={4}
              renderItem={this.render_item}
              onDragStart={this.onDragStart}
              data={this.state.data}
              onDragRelease={(data) => {
                this.setState({ data });// need reset the props data sort after drag release
              }}
            />
        </View>

        <View style={{
          paddingLeft: 40,
          position: 'relative',
        }}>
          <ImagesView
            style={{
              marginLeft: -widthPercentageToDP(8),
              marginTop: -heightPercentageToDP(2),
            }}
            source={vtngbtn}
            initHeight="135"
            initWidth="140"
            borderRadius={5}
          />

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 100,
    backgroundColor: 'blue',
  },
  wrapper: {
    paddingTop: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  item: {
    // width: 100,
    // height: 100,
    // borderRadius: 8,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',

    // borderTopEndRadius: 60,
    // borderBottomEndRadius: 100,
  },
  item_text: {
    fontSize: 40,
    color: '#FFFFFF',
  },
})

export default VotingPage;
