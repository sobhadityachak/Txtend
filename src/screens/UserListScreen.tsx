import { useEffect, useState } from "react";
import { View, Text, SafeAreaView,StyleSheet } from "react-native";
import React from "react";
import { OverlayProvider, useChatContext } from "stream-chat-expo";
import { FlatList } from "react-native-gesture-handler";
import UserListItem from "../components/UserListItem";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from "@rneui/base";

const UserListScreen = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const { userId } = useAuthContext();
  const navigation = useNavigation();

  const fetchUsers = async () => {
    const response = await client.queryUsers({});
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startChannel = async (user) => {
    const channel = client.channel("messaging", {
      members: [userId, user.id],
    });
    await channel.create();

    navigation.navigate("ChannelScreen", { channel});
  };

  return (
    <OverlayProvider >
    <SafeAreaView style={styles.container}>
    <View style={{
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
      borderRadius: 30,

    }}>
      <Icon
        containerStyle={{
          width: 60,
          height: 40,
          alignContent: 'center',
          justifyContent: 'center',
          marginRight: 0,
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
      <Text style={{ fontWeight: '700', fontSize: 18, marginHorizontal: 33, }}>Contacts</Text>
      <Button
        raised
        // onPress={onNewChat}
        title="+ Chat"
        // icon={{
        //   name: 'dingding',
        //   type: 'ant-design',
        //   size: 20,
        //   color: 'rgba(90, 154, 230, 1)',
        // }}
        // iconContainerStyle={{ }}
        titleStyle={{ fontWeight: '600', color: '#4c8bf5' }}
        buttonStyle={{
          backgroundColor: 'white',
          borderColor: 'gray',
          borderWidth: 0,
          borderRadius: 30,
          // width: 10,
          height: 45,
          // shadowRadius: 1,
          // shadowOffset: {width: 5, height: 15},
          // shadowColor: 'black',
          // shadowOpacity: 1,
          // borderRadius: 2,
        }}
        containerStyle={{
          width: 100,
          marginHorizontal: 0,
          marginVertical: 5,
          // marginBottom: 15,
          borderRadius: 30,
          // marginStart: 80,
          // alignSelf: 
        }}
      />
    </View>


  {/* // <ChannelList onSelect={onChannelSelect} filters={privateFilters} /> */}
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <UserListItem user={item} onPress={startChannel} />
      )}
    />
      </SafeAreaView>
      </OverlayProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c3c3c3",
    flex: 1,
    padding: 0,
    paddingVertical: 50,
  },
})

export default UserListScreen;
