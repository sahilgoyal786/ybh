import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageWithBorder from '../components/imageWithBorder';
import {image15, profile, calaender} from '../common/images';
import ResponsiveImage from 'react-native-responsive-image';

let size = 60;

const ThriveArticle = ({article = {}, compact}) => {
  size = (compact ? 60 : 100);
  return (
    <View style={styles.wrapper}>
      {article.avatar_url && article.avatar_url != '' ? (
        <ImageWithBorder src={article.avatar_url} height={size} width={size} />
      ) : (
        <ImageWithBorder src={image15} height={size} width={size} />
      )}
      <View style={textWrapperStyles(size)}>
        <Text style={styles.title}>Suspendisse Lectus at</Text>
        <Text style={styles.text_content}>
        {compact ?
          "Lorem dolor sit amet, consecteturt Lorem dolor sit amet consecteturt sit amet consecteturt ..."
          :
          "Lorem dolor sit amet, consecteturt Lorem dolor sit amet consecteturt sit amet consecteturt porem dolor sit amet, consecteturt Lorem dolor sit amet consecteturt sit amet consecteturt ..."
      }
          <Text
            onPress={() => {
              navigation.navigate('MyPhotos');
            }}
            style={styles.link}>
            More
          </Text>
        </Text>
        {!compact ? (
          <View style={{justifyContent: 'flex-start'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ResponsiveImage
                style={{
                  fontSize: 10,
                  color: 'gray',
                  marginTop: 5,
                }}
                source={profile}
                initHeight="8"
                initWidth="8"
              />
              <Text
                style={{
                  fontSize: 10,
                  color: '#848585',
                  marginTop: 5,
                  marginLeft: 5,
                  fontFamily: 'FuturaPT-Medium',
                }}>
                By: joe Smith
              </Text>
              <ResponsiveImage
                style={{
                  fontSize: 10,
                  color: 'gray',
                  marginTop: 5,
                  marginLeft: 5,
                }}
                source={calaender}
                initHeight="8"
                initWidth="8"
              />
              <Text
                style={{
                  fontSize: 10,
                  color: 'gray',
                  marginTop: 5,
                  marginLeft: 5,
                }}>
                09/04/2020
              </Text>
            </View>
          </View>
        ) : (
          <Text style={{display: 'none'}}></Text>
        )}
      </View>
    </View>
  );

};


const textWrapperStyles = function(size){
    return {
      backgroundColor: '#FBF8FF',
      fontSize: 12,
      color: 'gray',
      borderRadius: 5,
      marginLeft: (size - 60)/2 + 20,
      marginTop: - ((size - 60) + 70),
      zIndex: -10,
      paddingLeft: (size - 60)/2 + 50,
      paddingTop: 7,
      paddingRight: 5,
      paddingBottom: 5,
      fontFamily: 'FuturaPT-Medium',
      borderWidth: 2,
      borderColor: '#E1E1E1',
      borderTopWidth: 0,
      borderLeftWidth: 0,
    };
}
const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    color: '#9A6FC0',
    fontSize: 11,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
    fontFamily: 'FuturaPT-Medium',
  },
  text_content: {
    fontSize: 12,
    color: 'gray',
  },
  wrapper: {
    marginTop: 0,
    marginLeft: 10,
    paddingTop: 10,
  },
});
export default ThriveArticle;
