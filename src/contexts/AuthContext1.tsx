import { Auth, API, graphqlOperation } from "aws-amplify";
import { createContext, useState, useContext, useEffect } from "react";
import { getStreamToken } from "../graphql/queries";
import { Alert } from "react-native";
import React from 'react';
const AuthContext = createContext({
  userId: null,
  setUserId: (newId: string) => {},
});

const AuthContextComponent = ({ children, client }) => {
  const [userId, setUserId] = useState(null);

  const connectStreamChatUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const { sub, phone_number } = userData.attributes;

    const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
    const token = tokenResponse?.data?.getStreamToken;
    if (!token) {
      Alert.alert("Failed to fetch the token");
      return;
    }

    await client.connectUser(
      {
        id: sub,
        name: phone_number,
        image:
          "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      },
      token; //token dynamically generated from aws backend
      // client.devToken(username)
    );

    const channel = client.channel("livestream", "public", { name: "Public" });
    await channel.watch();

    setUserId(sub);
  };

  useEffect(() => {
    connectStreamChatUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
