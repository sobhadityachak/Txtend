import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/AuthContext1';
import { useChatContext } from 'stream-chat-expo';

export default function QrCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [friendId, setFriendId] = useState(undefined);
  const navigation = useNavigation();
  const { userId } = useAuthContext();
  const { client } = useChatContext();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setFriendId(data);

    // useEffect(() => {
    //   startChannel();
    //   // navigation.navigate("ChannelScreen", { channel });
    //   // navigation.navigate("NewChannel");
    // }, [])
  };

  const startChannel = async () => {
    const channel = client.channel("messaging", {
      members: [userId, friendId]
    });
    await channel.create();
    navigation.navigate("NewChannel");

  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'start Chatting'} onPress={startChannel} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
