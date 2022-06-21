import { Button, Icon } from "@rneui/base";
import * as React from 'react'
import { SafeAreaView, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OverlayProvider, ChannelList, useChatContext, Chat } from "stream-chat-expo";
import { useAuthContext } from "../../contexts/AuthContext1";

const Dms = (props) => {
  const { userId } = useAuthContext();
  const {bottom} = useSafeAreaInsets();
  const { client } = useChatContext();
  const { navigation } = props;

  const onChannelSelect = (channel) => {
    // navigate to a screen for this channel
    navigation.navigate("ChannelScreen", {
      screen: "Chat",
      params: { channel },
    });
  };
  const onNewChat = () => {
    // console.log('press')
    // navigate to a screen for this channel
    navigation.navigate("qrScanner");
  };
  const privateFilters = { type: "messaging", members: { $in: [userId] } };
  return (
  < >
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
        <Text style={{
          fontWeight: '700',
          fontSize: 18,
          marginHorizontal: 33,
          // color:"white"
        }}>Direct messages</Text>
        <Button
          raised

          onPress={onNewChat}
          title="Chat"
          // titleStyle={{color: 'white'}}
          icon={{
            name: 'barcode',
            type: 'ant-design',
            size: 20,
            color: 'transparent',
            reverse: true,
          }}
          iconContainerStyle={{}}
          titleStyle={{ fontWeight: '500', color: 'white' }}
          buttonStyle={{
            // backgroundColor: '#4c8bf5',
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
            width: 105,
            // marginHorizontal: 0,
            // marginVertical: 5,
            // marginBottom: 15,
            borderRadius: 30,
            // marginStart: 80,
            // alignSelf: 
            backgroundColor: '#4c8bf5'
          }}
        />
      </View>
    </SafeAreaView>
    <OverlayProvider  >
   <Chat client={client} >
    <ChannelList onSelect={onChannelSelect} filters={privateFilters} />
    </Chat>
      </OverlayProvider>
  </>
  )
}
export default Dms;