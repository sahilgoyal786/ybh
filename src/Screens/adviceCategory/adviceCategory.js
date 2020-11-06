import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';

import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {bottomCurve} from '../../common/images';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Button from '../../components/button';
import {Dialog} from 'react-native-simple-dialogs';
import {Textarea, Toast} from 'native-base';

const AdviceFinance = ({route, navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const userDetail = React.useContext(userDetailContext);
  const [Value, setValue] = useState('key11');

  const {Category} = route.params;

  const renderItem = (item, index) => {
    return (
      <SecView>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: heightPercentageToDP(0.1),
              marginLeft: widthPercentageToDP(1),
              borderRadius: 50,
              borderWidth: 1,
              height: 40,
              width: 40,
            }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontFamily: 'FuturaPT-Bold',
              }}>
              {index + 1}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('QuestionDetail', {question: item});
            }}>
            <Text
              style={{
                // backgroundColor: 'pink',
                width: widthPercentageToDP(72),
                fontSize: 16,
                paddingLeft: 10,
                paddingBottom: 10,
                color: '#000',
                fontFamily: 'FuturaPT-Light',
                minHeight: 50,
              }}
              numberOfLines={2}>
              {item.ques}
            </Text>
          </TouchableOpacity>
        </View>
      </SecView>
    );
  };

  const LoadQuestions = () => {
    // const tempImagesArray = [];
    setLoadingMore(true);
    try {
      network.getResponse(
        EndPoints.getAllAdviceQuestions,
        'POST',
        {filter_category: Category.toLowerCase()},
        userDetail.token,
        (response) => {
          // console.log(response);
          if (response.data.length) {
            setQuestions(response.data);
          }
          if (page == 1) {
            setTotalPages(response.last_page);
          }
          setPage(page + 1);
          setLoadingMore(false);
        },
        (error) => {
          console.log('error', error);
          setLoadingMore(false);
        },
      );
    } catch (exception) {
      console.log('exception', exception);
    }
  };

  React.useEffect(() => {
    LoadQuestions();
  }, []);

  return (
    <FlatList
      bounces={false}
      alwaysBounceVertical={false}
      onEndReached={() => {
        if (questions.length && totalPages && page <= totalPages) {
          // console.log(page, totalPages);
          LoadQuestions();
        }
      }}
      onEndReachedThreshold={questions.length ? 0.5 : 0}
      contentContainerStyle={
        (questions.length
          ? {}
          : {
              flex: 1,
            },
        {
          minHeight: heightPercentageToDP(100) - 70,
        })
      }
      data={questions}
      renderItem={({item, index}) => renderItem(item, index)}
      keyExtractor={() => Math.random().toString()}
      numColumns={1}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No questions have been asked yet, be the first one.</Text>
        </View>
      }
      ListHeaderComponent={
        <View style={{backgroundColor: 'transparent'}}>
          <Header title={Category} backButton="true" />

          <ButtonView>
            <TouchableOpacity onPress={() => setDialog(true)}>
              <Button
                style={{
                  marginBottom: 10,
                }}
                name={'Ask A Question'}
                linear
              />
            </TouchableOpacity>
          </ButtonView>
        </View>
      }
      ListFooterComponentStyle={{
        zIndex: -1,
        paddingBottom: 40,
        flex: 1,
        justifyContent: 'flex-end',
      }}
      ListFooterComponent={
        <View
          style={{
            height: 230,
            position: 'absolute',
            bottom: -100,
            zIndex: -10,
          }}>
          {loadingMore && (
            <ActivityIndicator
              color="purple"
              style={{
                marginTop: 100,
                position: 'absolute',
                alignSelf: 'center',
              }}
            />
          )}
          <Image
            source={bottomCurve}
            style={{
              width: widthPercentageToDP(100),
              height: 200,
            }}
            resizeMode="contain"
          />

          <Dialog visible={dialog} onTouchoutside={() => setDialog(false)}>
            <View>
              <Textarea
                rowSpan={10}
                value={text}
                placeholder="Describe your situation..."
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  padding: 10,
                }}
                onChangeText={(text) => setText(text)}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                isLoading={isLoading}
                onPress={() => {
                  if (text.length < 20) {
                    Toast.show({
                      text:
                        'Please describe your situation, before submitting.',
                    });
                  } else {
                    setIsLoading(true);
                    network.getResponse(
                      EndPoints.postAdviceQuestion,
                      'POST',
                      {ques: text, category: Category.toLowerCase()},
                      userDetail.token,
                      (response) => {
                        setIsLoading(false);
                        if (response.message) {
                          setQuestions(questions.concat(response.question));
                          Toast.show({text: response.message});
                        }
                        setDialog(false);
                      },
                      (error) => {
                        setIsLoading(false);
                        if (
                          error.response &&
                          error.response.data &&
                          error.response.data.message
                        ) {
                          Toast.show({text: response.message});
                        }
                      },
                    );
                  }
                }}
                style={{
                  marginTop: heightPercentageToDP(3),
                  width: widthPercentageToDP(35),
                }}
                name={'Submit'}
                linear
              />
              <Button
                onPress={() => {
                  navigation.navigate('Welcomeuser');
                  setDialog(false);
                }}
                style={{
                  marginTop: heightPercentageToDP(3),
                  width: widthPercentageToDP(35),
                }}
                name={'Cancel'}
                secondary
              />
            </View>
          </Dialog>
        </View>
      }
    />
    // <View style={{flex: 1}}>
    //   <Image
    //     source={bottomCurve}
    //     style={{
    //       width: widthPercentageToDP(100),
    //       height: 200,
    //       position: 'absolute',
    //       bottom: -100,
    //     }}
    //     resizeMode="contain"></Image>
    //   <Header title="Advice Finance" backButton="true" />
    //   <ScrollView
    //     alwaysBounceHorizontal={false}
    //     alwaysBounceVertical={false}
    //     bounces={false}
    //     style={{paddingTop: 0}}
    //     contentContainerStyle={{paddingBottom: 60}}>
    //     <MainView>
    //       <FirstViewText>
    //         <TextMonth>Questions</TextMonth>
    //       </FirstViewText>

    //       <Picker
    //         mode="dropdown"
    //         placeholder="Select One"
    //         textStyle={{
    //           fontSize: 19,
    //           fontWeight: '400',
    //           color: '#484848',
    //           fontFamily: 'FuturaPT-Book',
    //           // marginRight: widthPercentageToDP(10),
    //         }}
    //         note={false}
    //         iosIcon={
    //           <ResponsiveImage
    //             style={{
    //               tintColor: '#000',
    //               marginRight: widthPercentageToDP(4.5),
    //               marginTop: heightPercentageToDP(0.5),
    //               fontSize: 19,
    //               fontWeight: '400',
    //               color: '#484848',
    //               fontFamily: 'FuturaPT-Book',
    //             }}
    //             source={downarrow}
    //             initHeight="10"
    //             initWidth="10"
    //           />
    //         }
    //         selectedValue={Value}
    //         onValueChange={(val) => setValue(val)}>
    //         <Picker.Item label="January" value="key0" />
    //         <Picker.Item label="February" value="key1" />
    //         <Picker.Item label="March" value="key2" />
    //         <Picker.Item label="April" value="key3" />
    //         <Picker.Item label="May" value="key4" />
    //         <Picker.Item label="June" value="key5" />
    //         <Picker.Item label="July" value="key6" />
    //         <Picker.Item label="August" value="key7" />
    //         <Picker.Item label="September " value="key8" />
    //         <Picker.Item label="October" value="key9" />
    //         <Picker.Item label="November " value="key10" />
    //         <Picker.Item label="Filter " value="key11" />
    //       </Picker>
    //     </MainView>
    //     <View
    //       style={{
    //         borderWidth: 1,
    //         borderRadius: 4,
    //         borderColor: '#FAF9FF',
    //         margin: 15,
    //         padding: 10,
    //         // backgroundColor: '#FAF9FF',
    //         paddingVertical: heightPercentageToDP(1.5),
    //         paddingHorizontal: widthPercentageToDP(4.5),
    //         shadowColor: 'rgba(0,0,0,.1)',
    //         shadowOffset: {
    //           width: 0,
    //           height: 0.1,
    //         },
    //         shadowOpacity: 0.8,
    //         shadowRadius: 1,

    //         elevation: 3,
    //       }}>
    //       <SecView
    //         style={{
    //           borderBottomWidth: 0.7,
    //           borderBottomColor: 'rgba(0,0,0,.1)',
    //           marginBottom: 10,
    //         }}>
    //         <View style={{flexDirection: 'row'}}>
    //           <View
    //             style={{
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               marginTop: heightPercentageToDP(0.1),
    //               marginLeft: widthPercentageToDP(1),
    //               borderRadius: 50,
    //               borderWidth: 1,
    //               height: 40,
    //               width: 40,
    //             }}>
    //             <Text
    //               style={{
    //                 fontSize: 16,
    //                 textAlign: 'center',
    //                 fontFamily: 'FuturaPT-Bold',
    //               }}>
    //               1
    //             </Text>
    //           </View>
    //           <TouchableOpacity
    //             onPress={() => {
    //               navigation.navigate('MyResponse');
    //             }}>
    //             <Text
    //               style={{
    //                 // backgroundColor: 'pink',
    //                 width: widthPercentageToDP(72),
    //                 fontSize: 16,
    //                 paddingLeft: 10,
    //                 paddingBottom: 10,
    //                 color: '#000',
    //                 fontFamily: 'FuturaPT-Light',
    //                 // marginTop: heightPercentageToDP(2),
    //               }}>
    //               Morbi vel urn et risus efficitur vehicla su. Donec egestas
    //               erat.?
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </SecView>
    //     </View>
    //   </ScrollView>
    // </View>
  );
};
const SecView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 0.7,
  borderBottomColor: 'rgba(0,0,0,.1)',
  margin: 10,
  marginBottom: 10,
});

const ButtonView = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
});
const TextMonth = styled(Text)({
  fontSize: 19,
  fontWeight: '400',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const FirstViewText = styled(View)({
  width: widthPercentageToDP(70),
  marginTop: heightPercentageToDP(1),
  marginLeft: widthPercentageToDP(4.5),

  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const MainView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  // backgroundColor:"red"
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? '89%' : '100%',
  bottom: 0,
  marginTop: 50,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-14%',
  marginLeft: 12,
});

const WelcomeText = styled(Text)({
  fontSize: 24,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  // justifyContent: 'center',
  marginLeft: widthPercentageToDP(0.1),
  marginTop: -heightPercentageToDP(0.1),
});

export default AdviceFinance;
