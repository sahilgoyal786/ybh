import React from 'react';
import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import Header from '../../components/header';

const Privacy = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={bottomCurve}
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
          <Text>
            In hac habitasse platea dictumst. Curabitur condimentum turpis ut
            felis luctus tempor. Duis ac volutpat nibh. Praesent molestie
            tincidunt orci, ac tincidunt dui. Donec risus lacus, aliquet eu eros
            ac, tincidunt pretium justo. Sed sit amet laoreet neque. Morbi nec
            ex at turpis dictum dictum at eu nisi. Cras elementum ante sed nisl
            ullamcorper tempor. Nullam justo tortor, mattis non ante sit amet,
            molestie elementum est. Maecenas eu placerat metus, a molestie
            libero. Nullam maximus bibendum iaculis. Donec vel elit molestie,
            interdum quam vel, placerat ligula. Mauris sit amet mattis orci, ut
            pharetra libero. Nunc in sem pellentesque, consectetur diam vel,
            volutpat orci. Nulla volutpat dui et metus commodo, id porttitor
            metus semper. Integer ultrices vitae nisl non scelerisque. Curabitur
            ac tortor vitae neque interdum porttitor. Nunc dictum et turpis id
            varius. Maecenas sit amet diam suscipit mi efficitur tincidunt.
            Mauris tempus elementum dignissim.
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading>Integer pretium massa posuere</Heading>
          <Text>
            Duis venenatis augue ut vehicula consequat. Fusce tincidunt at velit
            eu faucibus. Praesent egestas fermentum facilisis. Nam sit amet leo
            neque. Nunc a metus at tellus maximus placerat. Duis semper, nunc
            eget posuere feugiat, magna ex tincidunt mauris, sit amet euismod
            velit enim id sem. Suspendisse quis leo nisi. Nunc et congue mi. Nam
            eget vestibulum velit. Donec bibendum pretium magna, ac blandit dui
            tincidunt at. Pellentesque pellentesque sollicitudin tellus, ut
            mattis massa. Nam tempus auctor magna id feugiat. Cras urna velit,
            molestie ac facilisis sed, dictum faucibus justo. Fusce porttitor
            sit amet elit at vehicula. Praesent enim orci, pellentesque ut
            scelerisque eget, maximus quis dui. Ut sed libero eu ex vehicula
            condimentum vel nec diam.
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading>Integer pretium massa posuere</Heading>
          <Text>
            Donec quis sem et dolor efficitur consequat. Nullam ultricies nunc
            nec tortor tempus tempus. Fusce et pretium sem. Nullam tempor
            venenatis lectus, sit amet laoreet orci consectetur a. Ut sit amet
            interdum massa. Morbi imperdiet porttitor felis at porta. Mauris eu
            arcu cursus, sodales leo quis, tincidunt elit. Nullam consectetur
            ante nec urna vestibulum consectetur. Aliquam erat volutpat.
            Maecenas vitae magna ut ipsum sollicitudin feugiat in ac justo.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Aliquam imperdiet aliquet odio, et ornare felis molestie ac. Sed
            sagittis velit nec ex dictum tempor. Nulla condimentum malesuada
            finibus. Ut ullamcorper arcu arcu, eu hendrerit purus eleifend nec.
          </Text>
          <Text>
            Ut lobortis lorem eget auctor feugiat. Etiam tristique, sapien at
            scelerisque egestas, turpis lacus congue arcu, sed efficitur lacus
            metus a tellus. Suspendisse quis tempus risus, in posuere est. Donec
            nec libero accumsan, ultricies felis quis, viverra diam. Phasellus
            consequat bibendum odio eget condimentum. In hac habitasse platea
            dictumst. Etiam imperdiet euismod lorem, eget elementum arcu rutrum
            sed. Integer pulvinar lectus metus, ac fringilla sem commodo ut.
            Morbi quis lobortis est. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Fusce venenatis, nibh vel aliquet facilisis, ex
            nisi interdum urna, luctus rutrum nibh enim non massa. Pellentesque
            a arcu mi. Aenean consectetur ante eget gravida congue.
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading>Integer pretium massa posuere</Heading>
          <Text>
            Aliquam erat volutpat. Fusce accumsan commodo tellus sed euismod.
            Vivamus bibendum ante et elit laoreet, a efficitur metus imperdiet.
            Nulla facilisis, erat eu ullamcorper blandit, eros magna ullamcorper
            mi, in porttitor nunc erat ac nibh. Ut quis pellentesque risus. In
            hac habitasse platea dictumst. Donec ornare, tortor a aliquam
            vehicula, odio eros viverra ante, sed convallis arcu ante vel nisl.
            Duis mattis, sem id dictum lacinia, lectus diam venenatis enim, eget
            finibus leo diam nec leo. Quisque condimentum in velit eu placerat.
            Sed laoreet tempus sem, imperdiet interdum metus ornare nec. Ut
            finibus consequat lorem, quis imperdiet ex luctus in. Duis est arcu,
            mollis eu consequat eu, dapibus eu lectus. Aliquam a mauris nulla.
            Vestibulum augue nibh, facilisis nec ipsum vitae, pretium interdum
            ligula. Nunc id cursus metus. Praesent arcu arcu, commodo id sem
            vel, auctor efficitur libero.
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading>Integer pretium massa posuere</Heading>
          <Text>
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Curabitur sed massa ex. Fusce elementum
            nibh faucibus orci mattis pulvinar. Integer feugiat maximus velit ut
            pellentesque. Fusce semper dui ut magna aliquet semper. Ut pharetra
            varius pretium. Donec mattis, urna id porta interdum, neque nisl
            facilisis sapien, ac pulvinar libero diam non metus. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Quisque fermentum enim dolor, ut faucibus dolor fermentum
            quis. Proin id sem consectetur nisl ultricies congue. Proin eu
            eleifend enim, quis malesuada lectus. Fusce quis leo eu ex
            scelerisque venenatis vitae vitae orci. Nunc eget augue sit amet
            mauris gravida semper. Nunc nisl odio, pulvinar vitae commodo eget,
            blandit sed massa. Aliquam accumsan, est id suscipit tempor, lectus
            massa porta augue, in gravida risus diam vel neque. Morbi vehicula
            posuere enim vel imperdiet. Ut a lacinia eros, non condimentum
            lorem. Nam ornare erat pretium nunc tempor, eu gravida justo
            rhoncus.
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading>Integer pretium massa posuere</Heading>
          <Text>
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Cras a justo dictum dui imperdiet suscipit.
            Integer auctor est non ex commodo, a hendrerit elit ornare. Donec
            pellentesque magna in turpis semper porttitor. Nunc sed accumsan
            nulla. Cras pharetra posuere ex eu lacinia. Donec volutpat sodales
            tellus, sit amet malesuada leo pellentesque sit amet. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Pellentesque
            facilisis sem massa, quis rutrum ex posuere sed. Donec non erat ex.
            Etiam ut elit convallis, interdum justo eu, dapibus quam. Donec eu
            purus interdum, feugiat justo in, ultrices ex. Aenean ut mollis
            ante. Proin porta augue nec lacinia efficitur. Duis placerat nibh
            quis pharetra maximus. Cras tempus dui ex. Etiam non aliquam eros.
            Praesent at neque sed eros consectetur gravida. Sed sed mauris sit
            amet purus porttitor finibus. In turpis lectus, iaculis eget dolor
            non, varius ornare nunc. Ut non cursus sapien. Maecenas velit odio,
            tincidunt ut purus in, placerat convallis magna. Aenean pulvinar
            nulla arcu, non placerat diam commodo sit amet. Curabitur commodo
            tincidunt malesuada. Donec vitae mollis libero. Vivamus felis elit,
            blandit et volutpat eu, pretium id dui. Fusce interdum velit eu
            hendrerit varius. Pellentesque id ligula ac lacus gravida semper eu
            ut velit. Vivamus ut mauris augue. Morbi arcu purus, tempor quis
            enim sit amet, tempor commodo tellus. Fusce scelerisque justo sed
            neque malesuada, nec hendrerit sapien ultrices. Phasellus
            pellentesque interdum lorem et varius.
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Heading>Integer pretium massa posuere</Heading>
          <Text>
            Nullam ligula enim, aliquam in ullamcorper in, convallis vitae
            augue. Curabitur tincidunt elit nec congue pellentesque. Vestibulum
            ultrices ac nisl sit amet mattis. Sed ipsum nisl, consequat et lorem
            a, malesuada maximus sem. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Vestibulum eu viverra libero. Morbi vestibulum
            sapien eu enim rutrum, efficitur vulputate nulla scelerisque. In sed
            pulvinar sapien. Nullam porttitor nisl velit, non porttitor leo
            ultrices convallis. Praesent efficitur eget nunc sed sagittis.
            Aliquam erat volutpat. Proin sodales tincidunt mi eget congue.
            Vivamus ullamcorper dui ex. Cras porttitor nunc vitae ante auctor
            interdum. Vivamus vitae imperdiet erat. Praesent bibendum, lectus id
            maximus suscipit, augue leo tincidunt dui, consectetur rutrum est
            dolor at arcu. Pellentesque eu turpis eu arcu molestie lobortis id
            nec metus. Nullam non est vel neque cursus semper ut et libero.
            Fusce porta interdum nisi, vel sagittis augue scelerisque nec.
            Nullam bibendum nibh augue, a ullamcorper purus tempus et. Etiam
            lobortis dolor eget nulla viverra, in pharetra urna feugiat. Aliquam
            scelerisque vehicula nibh, aliquet pulvinar eros venenatis eget.
            Proin elementum tempus ligula vel imperdiet. In vestibulum justo in
            facilisis fermentum. Quisque arcu dui, tincidunt a accumsan
            vestibulum, placerat quis nisi. Integer pretium massa posuere libero
            gravida convallis. Cras rutrum tincidunt diam in aliquet. Duis
            imperdiet massa nec tincidunt laoreet. Sed et odio sit amet nisi
            auctor congue.
          </Text>
        </View>
        <View style={{marginBottom: 60}}>
          <Heading>Integer pretium massa posuere</Heading>
          <Text>
            Phasellus at quam eu ipsum bibendum vehicula ac sit amet purus.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Nam posuere nulla sed faucibus pellentesque.
            Sed augue urna, maximus at eros sit amet, vehicula lobortis mi.
            Integer tincidunt venenatis nulla non molestie. Vestibulum semper
            justo a mi semper iaculis. Maecenas quis diam eget lorem imperdiet
            posuere nec quis lorem. Donec rutrum condimentum odio, ac placerat
            eros. Praesent eu massa pretium ipsum ornare condimentum. Donec sed
            urna arcu. In et massa felis.
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
  fontSize: 20,
  marginBottom: 10,
});

export default Privacy;
