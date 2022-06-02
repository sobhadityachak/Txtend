import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Channel, MessageList, MessageInput, ChannelAvatar, useChatContext } from "stream-chat-expo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";

const ChannelScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [channel, setChannel] = useState(null);
  const channelObject = route?.params?.channel;
  //param is null initaially thats why we have to access
  //it safely using '?'

  // navigation.setOptions({ title: channel?.data?.name || "Channel" });

  // useEffect(() => {
  //   console.log(channel)

  //   return () => {
  //   }
  // }, [])
  const { client } = useChatContext();
  const { channelId } = route?.params || {};

  useEffect(() => {
    const fetchChannel = async () => {
      setChannel(null);
      console.log("fetching channel", channelId);
      const channels = await client.queryChannels({ id: { $eq: channelId } });
      if (channels.length > 0) {
        console.log("updating channel state");
        setChannel(channels[0]);
      } else {
        console.log("No channels found");
      }
    };

    fetchChannel();
  }, [channelId]);

  if (!channelId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Opps! ..Loading! please go back
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>

      <Channel channel={channelId} key={channelId.data.id}  >
        {/* <ChannelHeader /> */}
        <View style={{
          flexDirection: "row",
          margin: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <HamburgerMenu navigation={navigation} />

          <MembersIcon
            cnl={channelId} route={route} navigation={navigation} />

          {/* useChatContext to show channel memberCount and active members */}

          <Text>{channelId?.data?.name}</Text>
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
    color: "#ffffff",
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default ChannelScreen;
