import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
// import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChannelAvatar } from "stream-chat-expo";

// import React, { useState, useEffect } from 'react';
import { Image, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
//
import { Component } from "react";
import { Linking } from 'react-native';

import IconEnt from 'react-native-vector-icons/Entypo'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconFea from 'react-native-vector-icons/Feather'
import IconOct from 'react-native-vector-icons/Octicons'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { Button, Icon } from "@rneui/themed";

const ChannelMembersScreen = () => {
  // const [members, setMembers] = useState([]);
  // const [count, setCount] = useState('');
  const navigation = useNavigation();

  const route = useRoute();
  const channel = route.params?.channel;

  // const fetchMembers = async () => {
  //   const response = await channel.queryMembers({});
  //   setMembers(response.members);

  // };

  // useEffect(() => {
  //   fetchMembers();
  // }, [channel]);

  if (channel.data.type == 'team') {
    // console.log(count);
    return (
      <SafeAreaView >
        <ScrollView>
          <GroupSetting />
          {/* <FlatList
          data={members}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <UserListItem user={item.user} onPress={() => { }} />
          )}
          ListHeaderComponent={() => (
            <Button
              title="Add more members"
              onPress={() => {
                navigation.navigate("InviteMembers", { channel });
              }}
            />
          )}
        /> */}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView >
        <ProfileSetting />
      </SafeAreaView>
    )
  }

};

const ProfileSetting = () => {

  const navigation = useNavigation();

  const route = useRoute();
  const channel = route.params?.channel;

  const _name = () => console.log('Name');

  const _status = () => console.log('Status');

  const _text = () => console.log('Text');

  const _mute = () => console.log('mute');

  const _sharelink = () => console.log('share joining link');

  const _addgrp = () => console.log('Add members');

  const _block = () => console.log('block group');

  const _reportspam = () => console.log('report spam');

  const _delete = () => console.log('delete group');


  return (



    <SafeAreaView >
      <ScrollView >


        <View style={styles.container}>

          <Icon
            containerStyle={{
              width: 60,
              height: 40,
              alignContent: 'center',
              justifyContent: 'center',
              marginStart: -180,
              marginRight: 120,
            }}
            raised
            reverse
            solid
            size={30}
            name='chevron-left'
            type='feather'
            color='#4c8bf5'
            // color='blue'
            onPress={() => navigation.goBack()}

          />
          <View style={{
            // flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            // aspectRatio: .9,
            width: 160,
            backgroundColor: 'transparent',
            flexDirection: 'row'
          }}>
            <ChannelAvatar channel={channel} />
            {/* </TouchableOpacity> */}
          </View>

          <TouchableOpacity onPress={_name}>
            <Text style={styles.text2}>Sobhaditya</Text>
          </TouchableOpacity>
          <Text style={styles.text11}>+91 9774735536</Text>
          <TouchableOpacity onPress={_status}>
            <Text style={styles.text7}>I love motorcycles and it's a good day to ride</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_text}>
            <Text style={styles.text5}><IconIon name={"chatbubble-outline"} size={28} /></Text>
          </TouchableOpacity>
          <Text style={styles.text11}>Text</Text>
        </View>


        <View style={styles.container}>
          <TouchableOpacity onPress={_mute}>
            <Text style={styles.text3}><IconOct name={"mute"} size={22} />    Mute this Person</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_sharelink}>
            <Text style={styles.text}><IconEnt name={"share"} size={22} />    Share contact</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_addgrp}>
            <Text style={styles.text}><IconAnt name={"addusergroup"} size={22} />    Add to another group</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_block}>
            <Text style={styles.text10}><IconEnt name={"block"} size={22} />    Block User</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_reportspam}>
            <Text style={styles.text10}><IconFea name={"alert-octagon"} size={22} />    Report spam or abuse</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_delete}>
            <Text style={styles.text4}><IconAnt name={"delete"} size={22} />    Delete this chat</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>


  );
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f7f7f7',
    //justifyContent: 'center',
    //textAlign: 'center',

  },

  text: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 12,
    color: "#000000",
    borderRadius: 5,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#c3c3c3',
    justifyContent: 'center',
    marginTop: 3,
    textAlign: 'left',

  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7",
    shadowRadius: 15,
  },

  text2: {
    fontSize: 22,
    color: '#516091',
    backgroundColor: "#f7f7f7",
    paddingBottom: 7,
    paddingTop: 10,

  },

  // text11: {
  //   fontSize: 16,
  //   color: '#516091',
  //   backgroundColor: "#f7f7f7",
  //   paddingBottom: 5,
  //   paddingTop: 5,

  // },

  text3: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    //paddingVertical: 0,
    paddingHorizontal: 10,
    paddingTop: 12,
    color: "#000000",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#d6d6d6',
    justifyContent: 'center',
    marginTop: 3,
    textAlign: 'left',

  },

  text4: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 12,
    color: "#FF0000",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#d6d6d6',
    justifyContent: 'center',
    marginTop: 3,
    textAlign: 'left',
    marginBottom: 40,
  },

  text5: {
    fontSize: 22,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 18,
    color: "#000000",
    borderRadius: 30,
    width: 100,
    height: 75,
    shadowOpacity: 1,
    shadowColor: '#d6d6d6',
    justifyContent: 'center',
    marginTop: 5,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    marginBottom: 1,


  },

  text6: {
    //paddingBottom: 7,
    //paddingTop: 25,
    //paddingRight: 500,
    resizeMode: 'contain',
    height: 180,
    marginTop: 70,
  },

  text7: {
    fontSize: 19,
    color: '#000000',
    backgroundColor: "#f7f7f7",
    paddingBottom: 7,
    paddingTop: 5,
    textAlign: 'center',
    paddingHorizontal: 60,
  },

  text10: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 12,
    color: "#ff0000",
    borderRadius: 5,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#c3c3c3',
    justifyContent: 'center',
    marginTop: 3,
    textAlign: 'left',
  },

  text11: {
    fontSize: 19,
    color: '#000000',
    backgroundColor: "#f7f7f7",
    paddingBottom: 7,
    paddingTop: 5,
    textAlign: 'center',
    paddingHorizontal: 60,
    marginTop: 1,
    marginBottom: 20,
  },


});



const GroupSetting = () => {

  const [members, setMembers] = useState([]);
  // const [count, setCount] = useState('');
  const navigation = useNavigation();

  const route = useRoute();
  const channel = route.params?.channel;

  const fetchMembers = async () => {
    const response = await channel.queryMembers({});
    setMembers(response.members);

  };

  useEffect(() => {
    fetchMembers();
  }, [channel]);


  const _goBack = () => console.log('Go Back');

  const _grpname = () => console.log('Group Name');

  const _status = () => console.log('Status');

  const _text = () => console.log('Text');

  const _mute = () => console.log('mute this group');

  const _sharelink = () => console.log('share joining link');

  const _addmembers = () => {

    navigation.navigate("InviteMembers", { channel });

  };

  const _blockgrp = () => console.log('block group');

  const _reportspam = () => console.log('report spam');

  const _leavegrp = () => console.log('leave group');

  const _deletegrp = () => console.log('delete group');

  const _members = () => console.log('Members');

  return (

    // <Provider >
    <SafeAreaView >

      <ScrollView >


        <View style={gstyles.container}>

          <Icon
            containerStyle={{
              width: 60,
              height: 40,
              alignContent: 'center',
              justifyContent: 'center',
              marginStart: -180,
              marginRight: 120,
            }}
            raised
            reverse
            solid
            size={30}
            name='chevron-left'
            type='feather'
            color='#4c8bf5'
            // color='blue'
            onPress={() => navigation.goBack()}

          />
          <View style={{
            // flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            // aspectRatio: .9,
            width: 160,
            backgroundColor: 'transparent',
            flexDirection: 'row'
          }}>
            <ChannelAvatar channel={channel} />
            {/* </TouchableOpacity> */}
          </View>


          <TouchableOpacity onPress={_grpname}>
            <Text style={gstyles.text2}>Biker's Hood</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_status}>
            <Text style={gstyles.text7}>Here, we share a mutual passion for security</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={_text}>
            <Text style={gstyles.text5}><IconIon name={"chatbubble-outline"} size={38} /> Text</Text>
        </TouchableOpacity> */}
        </View>


        <View style={gstyles.container}>
          <TouchableOpacity onPress={_mute}>
            <Text style={gstyles.text3}><IconOct name={"mute"} size={22} />    Mute this group</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_sharelink}>
            <Text style={gstyles.text}><IconEnt name={"share"} size={22} />    Share joining link</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_addmembers}>
            <Text style={gstyles.text}><IconAnt name={"addusergroup"} size={22} />    Add members</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={_blockgrp}>
            <Text style={gstyles.text10}><IconEnt name={"block"} size={22} />    Block this group</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_reportspam}>
            <Text style={gstyles.text10}><IconFea name={"alert-octagon"} size={22} />    Report spam or abuse</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_leavegrp}>
            <Text style={gstyles.text10}><IconEnt name={"log-out"} size={22} />    Leave Group</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_deletegrp}>
            <Text style={gstyles.text4}><IconAnt name={"delete"} size={22} />    Delete Group</Text>
          </TouchableOpacity>


          <View>
            <Text style={gstyles.text9}>Group Members</Text>
          </View>

          <FlatList
            data={members}
            keyExtractor={(item) => item.user_id}
            renderItem={({ item }) => (
              <UserListItem user={item.user} onPress={() => { }} />
            )}
          // ListHeaderComponent={() => (
          //   <Button
          //     title="Add more members"
          //     onPress={() => {
          //       navigation.navigate("InviteMembers", { channel });
          //     }}
          //   />
          // )}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
    // </Provider>

  );
};


const gstyles = StyleSheet.create({
  header: {
    backgroundColor: '#f7f7f7',
    //justifyContent: 'center',
    //textAlign: 'center',

  },

  text: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 12,
    color: "#000000",
    borderRadius: 5,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#c3c3c3',
    justifyContent: 'center',
    marginTop: 3,
    textAlign: 'left',

  },

  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    shadowRadius: 15,
  },

  text2: {
    fontSize: 22,
    color: '#516091',
    backgroundColor: "#f7f7f7",
    paddingBottom: 7,
    paddingTop: 10,

  },

  text3: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    //paddingVertical: 0,
    paddingHorizontal: 10,
    paddingTop: 12,
    color: "#000000",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#d6d6d6',
    justifyContent: 'center',
    marginTop: 3,
    textAlign: 'left',

  },

  text4: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 12,
    color: "#FF0000",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#d6d6d6',
    justifyContent: 'center',
    marginTop: 3,
    textAlign: 'left',
  },

  text5: {
    fontSize: 34,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 18,
    color: "#000000",
    borderRadius: 30,
    width: 140,
    height: 75,
    shadowOpacity: 1,
    shadowColor: '#d6d6d6',
    justifyContent: 'center',
    margin: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000000',

  },

  text6: {
    //paddingBottom: 7,
    //paddingTop: 25,
    //paddingRight: 500,
    resizeMode: 'contain',
    height: 180,
  },

  text7: {
    fontSize: 19,
    color: '#000000',
    backgroundColor: "#f7f7f7",
    paddingBottom: 7,
    paddingTop: 15,
    textAlign: 'center',
    paddingHorizontal: 60,
  },

  text8: {
    fontSize: 18,
    backgroundColor: "#ffffff",
    paddingVertical: 0,
    paddingHorizontal: 10,
    paddingTop: 19,
    color: "#000000",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: 340,
    height: 255,
    shadowOpacity: 1,
    shadowColor: '#d6d6d6',
    justifyContent: 'center',
    marginTop: 1,
    textAlign: 'left',
    marginBottom: 110,

  },

  text9: {
    fontSize: 20,
    backgroundColor: "#ffffff",
    paddingVertical: 0,
    paddingHorizontal: 10,
    paddingTop: 19,
    color: "#000000",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#d6d6d6',
    justifyContent: 'center',
    marginTop: 18,
    textAlign: 'center',


  },
  text10: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 12,
    color: "#ff0000",
    borderRadius: 5,
    width: 340,
    height: 55,
    shadowOpacity: 1,
    shadowColor: '#c3c3c3',
    justifyContent: 'center',
    marginTop: 3,
    textAlign: 'left',
  },

});
export default ChannelMembersScreen;
