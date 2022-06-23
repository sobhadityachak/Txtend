import { View, Text, FlatList, StyleSheet } from "react-native";
import * as React from 'react'
import { useEffect, useState } from "react";
import { Channel, useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import { Avatar, Button, Icon } from "@rneui/themed"

const InviteMembersScreen = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const { userId } = useAuthContext();
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const channel = route?.params?.channel;

  const fetchUsers = async () => {
    const existingMembers = await channel.queryMembers({});
    const existingMemberIds = existingMembers.members.map((m) => m.user_id);

    const response = await client.queryUsers({
      id: { $nin: existingMemberIds },
    });
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = (user) => {
    if (selectedUserIds.includes(user.id)) {
      setSelectedUserIds((existingUsers) =>
        existingUsers.filter((id) => id !== user.id)
      );
    } else {
      setSelectedUserIds((exisitingUsers) => [...exisitingUsers, user.id]);
    }
  };

  const inviteUsers = async () => {
    await channel.addMembers(selectedUserIds);
    // await channel.addMembers([userId]);
    // navigation.goBack();
    //  navigation.navigate("ChannelScreen", {channel});
    navigation.navigate("ChannelScreen", {
      screen: "Chat",
      params: { channel },
    });
  };

  return (
    <FlatList
      data={users}
      // style={styles.memberList}

      renderItem={({ item }) => (
        <UserListItem
          user={item}
          onPress={selectUser}
          isSelected={selectedUserIds.includes(item.id)}
        />
      )}
      ListHeaderComponent={() =>
        !!selectedUserIds.length && (
          <Button
            title="Add Members"
            onPress={inviteUsers}
            buttonStyle={
              styles.memberList
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
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  memberList: {
    color: 'black'
  }
})
export default InviteMembersScreen;
