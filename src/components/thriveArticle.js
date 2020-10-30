import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageWithBorder from '../components/imageWithBorder';
import {image15, profile, calendar} from '../common/images';
import ResponsiveImage from 'react-native-responsive-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

let size = 60;

const ThriveArticle = ({article = {}, compact, navigate}) => {
  size = compact ? 60 : 100;
  return (
    <TouchableOpacity
    
    onPress={() => {
      navigate('Thrivedetails', {article});
    }}>
    <View style={styles.wrapper}>
      {article.file && article.file.url != '' ? (
        <ImageWithBorder
          src={{uri: article.file.url}}
          height={size}
          width={size}
        />
      ) : (
        <ImageWithBorder src={image15} height={size} width={size} />
      )}
      <View style={textWrapperStyles(size)}>
        <Text
          style={compact ? styles.title : styles.title_large}
          numberOfLines={2}>
          {article.title}
        </Text>
        <Text
          style={compact ? styles.text_content : styles.text_content_large}
          numberOfLines={compact ? 4 : 4}>
          {article.content}
        </Text>
        {!compact ? (
          <View style={{justifyContent: 'flex-start'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* <ResponsiveImage
                style={{
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
              </Text> */}
              <ResponsiveImage
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                }}
                source={calendar}
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
                {article.created_at_formatted}
              </Text>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
    </TouchableOpacity>
  );
};

const textWrapperStyles = function (size) {
  return {
    backgroundColor: '#FBF8FF',
    fontSize: 12,
    color: 'gray',
    borderRadius: 5,
    marginLeft: (size - 60) / 2 + 20,
    marginTop: -(size - 60 + 70),
    zIndex: -10,
    paddingLeft: (size - 60) / 2 + 60,
    paddingTop: 7,
    paddingRight: 15,
    paddingBottom: 10,
    fontFamily: 'FuturaPT-Medium',
    borderWidth: 2,
    borderColor: '#E1E1E1',
    borderTopWidth: 0,
    borderLeftWidth: 0,
  };
};
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
  title_large: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
    fontFamily: 'FuturaPT-Medium',
  },
  text_content: {
    fontSize: 12,
    color: 'gray',
  },
  text_content_large: {
    fontSize: 14,
    color: 'gray',
  },
  wrapper: {
    marginTop: 0,
    marginLeft: 10,
    paddingTop: 10,
  },
});
export default ThriveArticle;
