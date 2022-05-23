import React, { useState, useRef, useEffect } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Share,
    ToastAndroid
} from 'react-native';
import LOGO from '../../../assets/images/Logo.png'
import QRCode from 'react-native-qrcode-svg';
import { Auth } from 'aws-amplify';
// import RNFS from "react-native-fs"
// import CameraRoll from '@react-native-community/cameraroll'
export default function QrCodeGenerator() {
    // const [inputText, setInputText] = useState('');
    const [qrvalue, setQrvalue] = useState('');
    let myQRCode = useRef();
    // const logo = require('LOGO')

    const shareQRCode = () => {
        myQRCode.toDataURL((dataURL) => {
            console.log(dataURL);
            let shareImageBase64 = {
                title: 'Start Chatting with your friend in Txtend',
                url: `data:image/png;base64,${dataURL}`,
                subject: 'Start Chatting with your friend in Txtend', //  for email
                message: 'Your friend wants to chat with you in Txtend on a secure line'
            };
            Share.share(shareImageBase64).catch((error) => console.log(error.message));
        });
    };
//     function saveQrToDisk(this: any) {
//         this.svg.toDataURL((data) => {
//             RNFS.writeFile(RNFS.CachesDirectoryPath+"/your-id.png", data, 'base64')
//               .then((_success) => {
//                   return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/your-id.png", 'photo')
//               })
//               .then(() => {
//                   this.setState({ busy: false, imageSaved: true  })
//                   ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
//               })
//         })
//    }

    const getUserData = async () => {
        const userData = await Auth.currentAuthenticatedUser();
        const { sub } = userData.attributes;
        setQrvalue(sub);
        // setUserPicture(picture);
        // setUserNumber(username);
    }

    useEffect(() => {
        getUserData();
        // return () => {
        //     saveQrToDisk();
        //   }       
    }, [])
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>
                    Share Your QR Code to Start Chatting with your Friend in Txtend
                </Text>
                <QRCode
                    getRef={(ref) => (myQRCode = ref)}
                    // ref={myQRCode}
                    //QR code value
                    value={qrvalue ? qrvalue : 'NA'}
                    //size of QR Code
                    size={250}
                    //Color of the QR Code (Optional)
                    color="black"
                    //Background Color of the QR Code (Optional)
                    backgroundColor="white"
                    //Logo of in the center of QR Code (Optional)
                    logo={require('../../../assets/images/Logo.png')}
                    //Center Logo size  (Optional)
                    logoSize={50}
                    //Center Logo margin (Optional)
                    logoMargin={2}
                    //Center Logo radius (Optional)
                    logoBorderRadius={15}
                    //Center Logo background (Optional)
                    logoBackgroundColor="white"
                />
                <Text style={styles.textStyle}>
                    Scan the QR Code to added as Friend!
                </Text>
                {/* <TextInput
                    style={styles.textInputStyle}
                    onChangeText={
                        (inputText) => setInputText(inputText)
                    }
                    placeholder="Enter Any Value"
                    value={inputText}
                /> */}
                {/* <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => setQrvalue(inputText)}>
                    <Text style={styles.buttonTextStyle}>
                        Generate QR Code
                    </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={shareQRCode}>
                    <Text style={styles.buttonTextStyle}>
                        Share QR Code
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
// export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    textStyle: {
        textAlign: 'center',
        margin: 10,
    },
    textInputStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#51D8C7',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#51D8C7',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        padding: 10,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});