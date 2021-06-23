import React from 'react';
import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import Header from '../../components/header';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const TnC = () => {
  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
      <Image
        source={GlobalImages.footer}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Terms & Conditions" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 15, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={{marginBottom: 20}}>
          <Heading>Terms & Conditions</Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            All content on or available through the YBHApp Website (including
            the Content) and all YBHApp interfaces created for devices including
            text, graphics, logos, designs, photographs, button icons, images,
            audio/video clips, digital downloads, data compilations and software
            and its compilation is the property of Bilyak Consulting Ltd.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor, marginTop: 20}}>
            <Strong>1. Submission on the YBHApp:</Strong> We may now or in the
            future permit users to post, upload, transmit through, or otherwise
            make available on the app (collectively, "submit") messages, text,
            illustrations, files, images, graphics, photos, comments, sounds,
            music, videos, information, content, and/or other materials ("User
            Content"). We have the right to publish, edit or reject any User
            Content that was uploaded or submitted through the app. By
            submitting User Content to us, simultaneously with such posting you
            automatically grant to us a worldwide, fully-paid, royalty-free,
            perpetual, irrevocable, non-exclusive, fully sublicensable, and
            transferable right and license to use, record, sell, lease,
            reproduce, distribute, create derivative works based upon
            (including, without limitation, translations), publicly display,
            publicly perform, transmit, publish and otherwise exploit the User
            Content (in whole or in part) as YBHapp, in its sole discretion,
            deems appropriate. We may exercise this grant in any format, media
            or technology now known or later developed for the full term of any
            copyright that may exist in such User Content. Subject to the rights
            and license you grant to us under these Terms of Use, you retain all
            your right, title and interest in your User Content submissions.
            This means that copyright in your User Content will remain with you
            and that you can continue to use the material in any way, including
            allowing others to use it.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor, marginTop: 20}}>
            <Strong>2. Copyright:</Strong> You agree that you will not submit
            any User Content protected by copyright, trademark, patent, trade
            secret, moral right, or other intellectual property, personal,
            contractual, proprietary or other right owned by a third party
            without the express permission of the owner of the respective right.
            You are solely liable for any damage resulting from your failure to
            obtain such permission or from any other harm resulting from User
            Content that you submit. You represent, warrant, and covenant that
            you will not submit any User Content that:
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • violates or infringes in any way upon the rights of others,
            including, but not limited to, any copyright, trademark, moral
            right, or other third party right of any person or entity;
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • impersonates another or is unlawful, threatening, abusive,
            libelous, defamatory, invasive of privacy or publicity rights,
            obscene, harassing or otherwise objectionable;
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • contains a formula, instruction, or advice that could cause harm
            or injury;
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • the licensed use by us hereunder would result in us having any
            obligation or liability to any party.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We rely on you to present us with User Content that contains
            accurate and factual material. We assume no responsibility for the
            accuracy of information provided on YBHApp. We reserve the right to
            display advertisements in connection with your User Content and to
            use your User Content for advertising and promotional purposes.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor, marginTop: 20}}>
            <Strong>3. Affiliate Advertising:</Strong>
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            YBHApp carries some affiliate marketing links, which means we earn
            commission on sales of some products when users click through a link
            from the site. Our editorial content is NOT influenced by affiliate
            partnerships. You may not post affiliate links without the prior
            permission of YBHApp.
          </Text>
          <Text
            style={{
              ...GlobalStyles.secondaryTextColor,
              marginTop: 20,
              fontSize: 17,
            }}>
            <Strong>4. Subscription and cancellation</Strong>
          </Text>
          <Strong>Subscriptions</Strong>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            YBHApp offers monthly and annual subscriptions. We reserve the right
            to vary the features and types of service we make available to
            different categories of users at any time. We will try our utmost to
            process your subscription promptly, but we don't guarantee your
            subscription will be activated by any specified time. Our contract
            with you to provide subscription services will be formed, and your
            access to subscription services will start, when we have
            successfully verified your payment and contact details. You will
            receive written confirmation when we have done this.
          </Text>
          <Strong>Renewal</Strong>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            Unless specifically stated in an offer or promotion when you place
            your subscription order with us, and unless YBHApp decides to revoke
            your subscription (for example if you are banned from the site), you
            agree that at the end of the initial subscription period (and of
            each renewal period thereafter), your subscription will
            automatically renew for the same subscription period at the then
            prevailing renewal rate, which may change from time to time. You may
            cancel your subscription at any time as set out below.
          </Text>
          <Strong>Cancellation</Strong>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            You have the right to cancel your subscription at any time. If you
            cancel, you will continue to have access to your subscription until
            the end of the current subscription term. Payment already taken
            cannot be reimbursed.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            You can cancel your subscription by completing the 'cancel my
            subscription' action.
          </Text>
          <Strong>Contacting us about your subscription</Strong>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            If you have any queries, please contact our customer support at
            enquiries@yourbusinesshive.com
          </Text>
          <Strong style={{marginTop: 20}}>
            - We filter objectionable content by approving every content
            uploaded.
          </Strong>
          <Strong>
            - We reserve the right to delete any comments or contents we find
            abusive or unsuitable or reported by a member as inappropriate.
          </Strong>
          <Strong>
            - Users can flag objectionable content by sending an email to the
            admin on enquiries@yourbusinesshive.com
          </Strong>
          <Strong>
            - We reserve the right to delete/suspend and block abusive users or
            does that upload any inappropriate content.
          </Strong>
          <Strong>
            - We will respond to any objectionable content reports within 24
            hours by removing the content and suspending/blocking the user
            responsible for uploading the offending content.
          </Strong>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: 110,
  },
});

const Heading = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 20,
  marginBottom: 10,
});

const Strong = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontWeight: 'bold',
  marginTop: 10,
});

export default TnC;
