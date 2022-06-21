import { Icon } from "@rneui/base";
import { Button } from "@rneui/themed";
import * as React from 'react'
import { Text, View, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OverlayProvider, ChannelList, ChannelListMessenger, Chat, useChatContext } from "stream-chat-expo";
import { useAuthContext, useUserContext } from "../../contexts/AuthContext1";

const GroupChats = (props) => {

  const { bottom, top } = useSafeAreaInsets();
  // const {bottom} = useSafeAreaInsets();
  const { client } = useChatContext();
    const { userId } = useAuthContext();
  
    const { navigation } = props;

    // const { channels  } = useUserContext();
  
    const onChannelSelect = (channel) => {
      // console.log(channel);
      // navigate to a screen for this channel
      navigation.navigate("ChannelScreen", {
        screen: "Chat",
        params: { channel },
      });
    };
    const onChannelCreate = () => {
      // console.log('press')
      // navigate to a screen for this channel
      navigation.navigate("NewChannel");
    };
    const publicFilters = {
      type: { $ne: "messaging" },
      members: { $in: [userId] },
    };
    const groupPreview = () => {
      const { channel, setActiveChannel } = props;
      // const {}
      return (
        <View>{channel.data.name}</View>)
    }
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
            <Text style={{ fontWeight: '700', fontSize: 18, marginHorizontal: 50, }}>Group Chats</Text>
            <Button
              raised
              onPress={onChannelCreate}
              title="Group +"
              // icon={{
              //   name: 'dingding',
              //   type: 'ant-design',
              //   size: 20,
              //   color: 'rgba(90, 154, 230, 1)',
              // }}
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
            {/* <View style={{
        height:50,
         width:150, 
         backgroundColor:'blue',
         borderRadius: 30,
         justifyContent:"center",
         alignContent: "center",
         alignItems: "center",
         alignSelf: "center",
         opacity: 200,
         margin:0,
         shadowRadius:2,
         }}> */}
            {/* <Pressable onPress={onChannelCreate}>
        <Text>Start A Group</Text> */}
            {/* <FloatingAction  */}
            {/* // onPressMain={} */}
            {/* /> */}
            {/* </Pressable>
      </View>
      </View> */}
            {/* <FAB
                color="blue"
                 activeOpacity={1}
                
                icon={{ name: 'plus', color: 'white', size:20, }}
              /> */}
          </View>
        </SafeAreaView>
        <OverlayProvider  >
   <Chat client={client} >
        <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
        {/* <ChannelListMessenger
 channels={channels}
 additionalFlatListProps={{ bounces: true }}
/> */}
</Chat>
      </OverlayProvider>
      </>
  
    )
  }
  

  export default GroupChats;