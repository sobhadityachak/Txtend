import { View, Text, StyleSheet, Pressable } from "react-native";
import * as React from 'react'
import { useRoute, useNavigation } from "@react-navigation/native";
import { Channel, MessageList, MessageInput, ChannelAvatar, useChatContext, OverlayProvider, Chat } from "stream-chat-expo";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";

const ChannelScreen = () => {
  const route = useRoute();
  const {bottom, top } = useSafeAreaInsets();
  const navigation = useNavigation();
   const {client} = useChatContext();
  const channel = route.params?.channel;
  //param is null initaially thats why we have to access
  //it safely using '?'

  // navigation.setOptions({ title: channel?.data?.name || "Channel" });

  // useEffect(() => {
  //   console.log(chanel.data)

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
    <OverlayProvider topInset={top} bottomInset={bottom}>
            <Chat client={client}>
    <SafeAreaView style={styles.container}>

      <Channel channel={channel} key={channel.data.id}  >
        {/* <ChannelHeader /> */}
        <View style={styles.header}>
          <HamburgerMenu navigation={navigation} />
          <View style={{
            // fontWeight: '700',
            // fontSize: 18, 
            marginHorizontal: 60,
          }} />
          <Text>{channel?.data?.name}</Text>

          <MembersIcon
            cnl={channel} route={route} navigation={navigation} />

          {/* useChatContext to show channel memberCount and active members */}

        </View>

        {/* <ChannelPreviewTitle channel={channel} displayName={"df"}/> */}
        <MessageList />
        <MessageInput />

      </Channel>

    </SafeAreaView>
    </Chat>
    </OverlayProvider>
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
  container: {
    backgroundColor: "#c3c3c3",
    flex: 1,
    padding: 0,
    // paddingVertical: 50,
  },
  header: {
    // color: 'white',
    // opacity: 1,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // margin: 10,
    height: 80,
    alignContent: 'space-between',
    // borderBottomRightRadius: 30,
    backgroundColor: 'white',
    // borderBottomWidth: 2,
    // borderBottomColor: 'lightgray',
    borderRadius: 0,
  }
});

export default ChannelScreen;