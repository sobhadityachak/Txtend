import { Icon, Button } from "@rneui/base";
import * as React from 'react'
import { SafeAreaView, View, Text } from "react-native";
import { OverlayProvider } from "stream-chat-expo";
import { useAuthContext } from "../../contexts/AuthContext1";

const FavouritesScreen = (props) => {
    const { userId } = useAuthContext();
  
    const { navigation } = props;
  
    const onChannelSelect = (channel) => {
      // navigate to a screen for this channel
      navigation.navigate("ChannelScreen", {
        screen: "Chat",
        params: { channel },
      });
    };
    const publicFilters = {
      type: { $ne: "messaging" },
      members: { $in: [userId] },
    };
    return (
      <>
        <SafeAreaView style={{ marginTop: 20, }}>
          <View style={{
            // color: 'white',
            // opacity: 1,
            flexDirection: "row",
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // margin: 10,
            height: 90,
            alignContent: 'space-between',
            // borderBottomRightRadius: 30,
            backgroundColor: 'transparent',
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
          <Text style={{ fontWeight: '700', fontSize: 18, marginHorizontal: 33, }}>Favourite Chats</Text>
          <Button
              raised
              //  onPress={}
              title="edit"
              icon={{
                name: 'edit',
                type: 'material-community-icons',
                size: 20,
                color: '#4c8bf5',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '600', color: '#4c8bf5' }}
              buttonStyle={{
                backgroundColor: 'transparent',
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
              }}
            />
          </View>
        </SafeAreaView>
  
        {/* <ChannelList onSelect={onChannelSelect} filters={publicFilters} /> */}
      </>
    )
  }
export default FavouritesScreen;