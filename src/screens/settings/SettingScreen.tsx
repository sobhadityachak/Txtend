// import React, { Component } from "react";
// import  { Component } from 'react';
import * as React from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList, Linking, TouchableOpacity, Image } from 'react-native';
// import { Provider, Appbar, Card, IconButton, Avatar, Colors } from 'react-native-paper';
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button, Icon } from '@rneui/themed';
import { Auth } from 'aws-amplify';


const SettingScreen = () => {

  const _goBack = () => console.log('Go Back');

  const _name = () => console.log('Name');

  const _username = () => console.log('User name');

  const _phone = () => console.log('Phone');

  const _email = () => console.log('Email');

  const _aboutme = () => console.log('About Me');

  const _tellafriend = () => console.log('Tell a Friend');

  const _chatwall = () => console.log('Chat Wallpaper');

  const _blocked = () => console.log('blocked contacts');

  const _deleteall = () => Auth.signOut();

  const _suggestions = () => console.log('Suggestions');

  const _faq = () => console.log('FAQ');

  const _privacy = () => console.log('privacy policy');

  const _useragreement = () => console.log('user agreement');

  const _report = () => console.log('report a bug');

  const route = useRoute();
  const navigation = useNavigation();
  const channel = route.params?.channel;


  return (

    // <Provider>
    //   <Appbar.Header style={styles.header}>
    //     <Appbar.BackAction onPress={_goBack} />
    //     <Appbar.Content title="Settings" />


    //   </Appbar.Header>




    <SafeAreaView style={{
      //   marginTop: 30,
      //   backgroundColor: "#365",
      //   flex: 1,
      paddingTop: 35,

    }} >
      <View style={{
        // color: 'white',
        // opacity: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 10,
        height: 90,
        alignContent: 'space-between',
        // borderBottomRightRadius: 30,
        backgroundColor: 'white',
        // borderBottomWidth: 50,
        // borderBottomColor: 'lightgray',
        // borderBottomEndRadius: -320,

      }}>
        <Icon
          containerStyle={{
            width: 60,
            height: 40,
            alignContent: 'center',
            justifyContent: 'center',

          }}
          raised
          reverse
          solid
          size={30}
          name='chevrons-right'
          type='feather'
          color='#4c8bf5'
          // color='blue'
          onPress={() => navigation.openDrawer()}

        />
        <Text style={{ fontWeight: '700', fontSize: 18, marginLeft: 150, }}>Settings</Text>


      </View>
      <ScrollView >
        <View><Text style={styles.text2}>    My Account</Text></View>

        <View style={styles.container}>

          <TouchableOpacity>
            <View>
              {/* <Image style={styles.text6}
                  source={require('./assets/images/pro.png')}
                /> */}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={_name}>
            <Text style={styles.text3}>Name</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_username}>
            <Text style={styles.text}>Username</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_phone}>
            <Text style={styles.text}>Phone</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_email}>
            <Text style={styles.text}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_aboutme}>
            <Text style={styles.text}>About Me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_tellafriend}>
            <Text style={styles.text4}>Tell a Friend</Text>
          </TouchableOpacity>
        </View>

        <View><Text style={styles.text2}>    Chat</Text></View>
        <View style={styles.container}>
          <TouchableOpacity onPress={_chatwall}>
            <Text style={styles.text3}>Chat Wallpaper</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_blocked}>
            <Text style={styles.text}>Blocked Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_deleteall}>
            <Text style={styles.text4}>Log out</Text>
          </TouchableOpacity>
        </View>

        <View><Text style={styles.text2}>    Help</Text></View>
        <View style={styles.container}>
          <TouchableOpacity onPress={_suggestions}>
            <Text style={styles.text3}>Suggestions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_faq}>
            <Text style={styles.text}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_privacy}>
            <Text style={styles.text}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_useragreement}>
            <Text style={styles.text}>User Agreement</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_report}>
            <Text style={styles.text4}>Report a Bug</Text>
          </TouchableOpacity>
        </View>

        <View><Text style={styles.text2}>    What's next?</Text></View>
        <View style={styles.container}>
          <TouchableOpacity>
            <Text style={styles.text3}>Profile Pic Privacy (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Phone Number Privacy (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>About Section Privacy (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Status Privacy (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={styles.text}>Media Sent Quality (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Light/Dark Modes (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Pinned Messages (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Archive Chats (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>AR Camera Filters (coming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text4}>And a lot more... (coming soon)</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <View>
              {/* <Image style={styles.text5}
                  source={require('./assets/images/logo.png')}
                /> */}
            </View>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
    // </Provider>
  );
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    textAlign: 'center',
  },

  text: {
    fontSize: 15,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 18,
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
    fontSize: 20,
    color: '#516091',
    backgroundColor: "#f7f7f7",
    paddingBottom: 7,
    paddingTop: 25,
  },

  text3: {
    fontSize: 15,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
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
    marginTop: 3,
    textAlign: 'left',
  },

  text4: {
    fontSize: 15,
    backgroundColor: "#ffffff",
    //paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 16,
    color: "#000000",
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
    paddingBottom: 7,
    paddingTop: 25,
    resizeMode: 'contain',
    height: 300,
  },

  text6: {
    //paddingBottom: 7,
    //paddingTop: 25,
    paddingRight: 500,
    resizeMode: 'contain',
    height: 180,
  },

});
export default SettingScreen;