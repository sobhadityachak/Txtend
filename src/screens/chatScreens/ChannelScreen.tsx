import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Channel, MessageList, MessageInput, ChannelAvatar, useChatContext } from "stream-chat-expo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";

const ChannelScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const channel = route?.params?.channel;
  //param is null initaially thats why we have to access
  //it safely using '?'

  // navigation.setOptions({ title: channel?.data?.name || "Channel" });

  // useEffect(() => {
  //   console.log(channel)

  //   return () => {
  //   }
  // }, [])

  if (!channel) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Go back to All Chats and Start texting
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>

      <Channel channel={channel} key={channel.data.id}  >
        {/* <ChannelHeader /> */}
        <View style={{
          flexDirection: "row",
          margin: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <HamburgerMenu navigation={navigation} />

          <MembersIcon
            cnl={channel} route={route} navigation={navigation} />

          {/* useChatContext to show channel memberCount and active members */}

          <Text>{channel?._user?.name}</Text>
        </View>

        {/* <ChannelPreviewTitle channel={channel} displayName={"df"}/> */}
        <MessageList />
        <MessageInput />

      </Channel>

    </SafeAreaView>
  );
};

const MembersIcon = ({ cnl, route, navigation }) => {
  if (!route?.params?.channel) {
    // console.log("fail")
    return null;
  }
  // console.log("pass")
  return (
    <Pressable
      // style={styles.icon}
      onPress={() =>

        navigation.navigate("ChannelMembers", {
          channel: route.params.channel,
        })} >
      <>
        <ChannelAvatar channel={cnl} />
      </>
    </Pressable>
  );
};

const HamburgerMenu = ({ navigation }) => (
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
);
const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  errorText: {
    color: "#000000",
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default ChannelScreen;
