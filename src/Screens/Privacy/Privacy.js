import React from 'react';
import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import Header from '../../components/header';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const Privacy = () => {
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
      <Header title="Privacy Policy" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 15, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={{marginBottom: 20}}>
          <Heading>Privacy Policy</Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            Your privacy is critically important to us at Yourbusinesshive a
            subsidiary of Bilyak Consulting LTD, we have a few fundamental
            principles:
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • We are thoughtful about the personal information we ask you to
            provide and the personal information that we collect about you
            through the operation of our services.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • We store personal information for only as long as we have a reason
            to keep it.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • We aim to make it as simple as possible for you to control what
            information you share with us on the app.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • We aim for full transparency on how we gather, use, and share your
            personal information.
          </Text>
          <Heading>1. Our Aim and Duty of care </Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We recognise our duty of care with regards to your data and will
            always endeavour to do the right thing with the personal data you
            choose to share with us, including: not compromising your anonymity;
            protecting your privacy; storing your data securely and giving you
            control over your own data.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            Our mission at YBH is to help make some entertainment and knowledge
            to you. We believe that securing your data, preserving your
            anonymity, protecting your privacy, and giving you control over your
            data are an important aspect of that mission.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We believe that employing data and data analytics appropriately can
            improve the user experience on the YBH app. Data you give us when
            filling in forms (when joining for example or when using our apps)
            helps us show you more relevant things. It also allows us to see
            which aspects of the site are popular and well-used, meaning we can
            improve our app for you.{' '}
          </Text>
          <Heading>2. Your Data: What we Store and Why</Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We store IP addresses, cookies, your device’s unique ID, page
            browsing history, ads you’ve viewed and clicked, searches you’ve
            made on site, approximate location, and any enquiries you’ve made.
            For registered members we also store username, password and email
            address; forum discussions you might have with other users, photos
            you have uploaded and like.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We store your email address to register you and contact you (if you
            have asked for email newsletters) and we store things such as IP
            address, cookies and device ID so that our systems recognise you if
            you return to YBH. Subject to the permissions you have given us (as
            described in your permissions and choices below), we may also pass
            your device's reading habits to selected partners for them to show
            you things that may be of interest to you (eg content or ads).
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We only require your name and email when you want to join the YBH
            app and you cannot use the app without fully providing it.{' '}
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            Subject to your permissions and choices, we collect, store and
            process the data listed in this section. We believe we provide a
            useful service, and therefore have a legitimate interest in
            processing your data which benefits both YBH and you as a YBH user.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We store the following data for all users
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • IP address, cookies, device ID – to identify your web browser and
            device.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • Page browsing information – to enable us to show you more relevant
            things and to understand how people use YBH, so we can improve it.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • We also use Google Analytics to report on page views in aggregate
            to help us understand usage trends. We do not pass your personal
            data to Google and your IP address is anonymised before we share
            this information with Google Analytics.{' '}
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • Ads viewed and clicked and searches you’ve made on site – to show
            you more relevant ads and content in future.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • Photos you have uploaded onto the site
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • Discussions that take place over on the forums (questions and
            responses) so that we have a record.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • A summary of any actions we may have taken with regard to your use
            of YBHApp{' '}
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            3. Your Data Protection Rights Under General Data Protection
            Regulation (GDPR):{' '}
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            If you are a resident of the European Economic Area (EEA), you have
            certain data protection rights YBHApp aims to take reasonable steps
            to allow you to correct, amend, delete, or limit the use of your
            Personal Data. If you wish to be informed what Personal Data, we
            hold about you and if you want it to be removed from our systems,
            please contact us on enquiries@yourbusinesshive.com. You can edit
            your account information at any time. In certain circumstances, you
            have the following data protection rights:
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • The right to access, update or to delete the information we have
            on you. Whenever made possible, you can access, update or request
            deletion of your Personal Data directly within your account settings
            section. If you are unable to perform these actions yourself, please
            contact us to assist you.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • The right of rectification. You have the right to have your
            information rectified if that information is inaccurate or
            incomplete.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • The right to object. You have the right to object to our
            processing of your Personal Data.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • The right of restriction. You have the right to request that we
            restrict the processing of your personal information.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • The right to data portability. You have the right to be provided
            with a copy of the information we have on you in a structured,
            machine-readable and commonly used format.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            • The right to withdraw consent. You also have the right to withdraw
            your consent at any time where mylearningacademy.com, relied on your
            consent to process your personal information.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            Please note that we may ask you to verify your identity before
            responding to such requests.
          </Text>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            You have the right to complain to a Data Protection Authority about
            our collection and use of your Personal Data. For more information,
            please contact your local data protection authority.
          </Text>
          <Heading>4. Release of Information: </Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We will not sell, trade, or rent your PII to other parties without
            your consent. But we may share your PII with our current or future
            “affiliates” (which means a Parent Company, subsidiary or company
            under common control), in which case we would require our affiliates
            to honour this Privacy Policy. However, the use of your PII by our
            Service Partners, is governed by the respective privacy policies of
            those partners and is not subject to our control. Please consult
            each site’s privacy policy. Except as otherwise discussed in this
            Privacy Policy, this document only addresses he use and disclosure
            of information we collect from you. We are not responsible for the
            policies and practices of third parties. We may disclose your PII as
            required by law, such as to comply with a subpoena or, similar legal
            process; and when we believe in good faith that disclosure is
            necessary to protect our rights, protect your safety or the safety
            of others, investigate fraud, or respond to a government request.{' '}
          </Text>
          <Heading>5. Correct and update your information: </Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            Users can modify or change their password and e-mail address through
            their “My Profile” settings. Also, Users can modify, change or
            delete their personal information anytime.{' '}
          </Text>
          <Heading>6. Security: </Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We transmit and store the information we collect using standard
            security techniques. However, given the nature of the Internet and
            the fact that network security measures are not full proof, we
            cannot guarantee the security of such information.{' '}
          </Text>
          <Heading>7. Transfer of Information: </Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            This Site processes information about our Users on servers located
            in a number of countries. The Company may also subcontract
            processing or sharing of information to third parties located in
            other countries, other than your home country. Also, such
            information may be transferred to another company if ownership of
            IPL changes. Therefore, information may be transferred cross
            international borders outside the country where you use our
            services, including to countries that do not have laws providing
            specific protection for personal data or those that have different
            legal rules on data protection. You expressly consent to this.{' '}
          </Text>
          <Heading>8. Retention:</Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We may retain PII information about the user, as long as it is
            necessary for business purposes. Also, we may retain aggregated
            anonymous information indefinitely. In addition, we may retain your
            information for an additional period as is permitted or required to,
            among other things, comply with our legal obligations, resolve
            disputes, and enforce agreements.{' '}
          </Text>
          <Heading>9. Changes to the Privacy Policy: </Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            We may make changes to this Privacy Policy from time to time, and
            for any reason. You are advised to consult this privacy policy
            regularly for any changes, as we deem your continued use, following
            posting of any amendment, modification or change, approval of all
            changes.{' '}
          </Text>
          <Heading>10. Contact Us: </Heading>
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            If you have any questions concerning this Privacy Policy please
            contact us at enquiries@yourbusinesshive.com Suite 521/522 The
            Kings’ plaza, opposite NAF conference Centre, off Ahmadu bello way.
            Kado. Abuja{' '}
          </Text>
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
  marginBottom: 5,
  marginTop: 12,
});

export default Privacy;
