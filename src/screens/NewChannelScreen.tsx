import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
// import Button from "../components/Button";
import { useChatContext } from "stream-chat-expo";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Icon } from "@rneui/themed"

import { useEffect } from 'react';
import { Image, Platform, TouchableOpacity, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const NewChannelScreen = () => {
  const [name, setName] = useState("");
  const { client } = useChatContext();
  const { userId } = useAuthContext();
  const [image, setImage] = useState(null)
  
  const navigation = useNavigation();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const createChannel = async () => {

    
    if(!name){
      return (
        Alert.alert('error', 'The group name must not be empty!',[
          // {text: 'ok', onPress: () => console.warn('ok')},
          // {text: 'Cancel', onPress: () => console.warn('ok')},
          // {text: 'ok', onPress: () => console.warn('ok')},
        ],{cancelable: true})
      )
    }
    const channel = client.channel("team", uuidv4(), { name, image: image });
    await channel.watch();
    await channel.addMembers([userId]);
    setName('');
    setImage(null)
    // navigation.navigate("ChannelScreen", { channel });
    navigation.navigate("ChannelScreen", {
      screen: "InviteMembers",
      params: { channel },
    });
  };
  


  return (
    <View style={styles.main}>
    <View style={styles.root}>
      {/* <Avatar
        rounded
        icon={{name:'camera-alt', type: 'material-icon'}}
        containerStyle={{
          backgroundColor: '#ffe354', 
          padding: 10,
          borderColor: 'lightgrey',
          borderStyle: 'dashed',
          borderWidth: 1,
          margin: 5
        }}
        size={65}
        >
          <Avatar.Accessory size={24}/>

      </Avatar> */}
 <View style={imageUploaderStyles.container}>
          {
            image && <Image source={{ uri: image }} style={{ 
              width: 200, height: 200,
              borderRadius: 70,
            
            }} />
          }

          <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={pickImage} style={imageUploaderStyles.uploadBtn} >
              <Text>{image ? 'Edit' : 'Upload'} Image</Text>
              <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>


        </View>   
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Type group name here..."
        style={styles.input}
        placeholderTextColor="gray"
        clearButtonMode="unless-editing"
        clearTextOnFocus
        defaultValue="new group"
        textContentType="username"
        
        // multiline
        // textAlignVertical="bottom"
        // numberOfLines={3}
      />
      
    </View>
    <View style={{ 
      alignContent: 'flex-end',
      justifyContent: 'flex-end', 
      // backgroundColor:'yellow',
      width: '100%',
      alignItems: 'flex-end'
      }}>
    <Button 
      raised
      // iconContainerStyle={{ marginRight: 10 }}
      title="Add Group members" 
      onPress={createChannel} 
      buttonStyle={
        styles.button
      }
      containerStyle={{
        width: 260,
        marginHorizontal: 30,
        marginVertical: 5,
        // marginBottom: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // alignContent: 'flex-end',
      }}
      icon={{
        // raised:true,
        // reverse: true,
        name: 'dingding',
        type: 'ant-design',
        size: 20,
        // color: 'rgba(90, 154, 230, 1)',
        color: 'white'
      }}
      />
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 40,
    // height: '100%',
    backgroundColor: 'white',
    // flex:1,
    justifyContent: 'space-between',
    alignItems: "center",
    // alignContent: 'stretch',
    flexDirection: 'row',
    // flexGrow: ,
    margin: 10,
  },
  input: {
    // borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    color: "black",
    height: 50,
    width: 250,
    paddingStart: 20,
  },
  button: {
    backgroundColor: '#00a7f7',
    width: '100%',
    height: 50,
    // borderRadius:70,
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  main : {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
  }
});

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 70,
    overflow: 'hidden',
    margin: 20,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
})
export default NewChannelScreen;
