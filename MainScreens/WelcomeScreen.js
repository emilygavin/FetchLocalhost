import { Button, Text, View, ImageBackground, Image, Alert   } from 'react-native'
import { useState } from 'react'
import MainBackground from "../assets/bgs/bg.png";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'; 
import styles from '../StyleSheet/StyleSheet';

const WelcomeScreen = ({ navigation, route }) => {
  const URL = `https://aad8-2001-bb6-66ab-3000-45a5-4851-b478-1701.ngrok-free.app`
    let id = "";
    let data = "";
    let cardData = "";

    const { name, gender, email, password } = route.params;
    const [pickedImage, setPickedImage] = useState();
    const [savedImageUri, setSavedImageUri] = useState();

    const callAPI = async () => {
      try {
        const res = await fetch(
          URL + `/api/v1/users`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "ngrok-skip-browser-warning": "69420" // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
            },
            body: JSON.stringify({
              name: name,
              uri : pickedImage,
              gender: gender,
              email: email,
              password: password,
              cards: {}
            }) // Need to use POST to send body
          }
        )
        if (res.ok) {
          data = await res.json();
          cardData = data.cards;
          id = data.id;
          console.log(data)
          navigation.navigate('Main Screen', {
            URL: URL,
            id: id,
            data: data,
            cardData: cardData
          });
        } 
      } catch (err) {
        console.log(err);
      }
    }
  
    const verifyPermissions = async () => {
      const result = await Permissions.askAsync( Permissions.CAMERA_ROLL, Permissions.CAMERA)
      let succss = false
      if (result.status == 'granted') succss = true
      if(result.permissions )
      if(result.permissions.camera.status == 'granted') succss = true
      console.log('result: ' + JSON.stringify(result))
      if (result.status !== 'granted') {
        Alert.alert(
          'Insufficient permissions!',
          'You need to grant camera permissions to use this app.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    };
  
    const takeImageHandler = async () => {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return;
      }
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5
      });
  
      setPickedImage(image.uri);
    };
  
    const saveImageHandler = () => {
      {
        setSavedImageUri(pickedImage);
        console.log('Image saved with URI: ', pickedImage);
        callAPI();
      } 
    };
  
    return (
      <>
        <ImageBackground source={MainBackground} resizeMode="cover" style={{ flex: 1 }}>
          <View>
            <Text style={[styles.mediumTextBold, { color: "#FFF" }, { textAlign: 'center' }, { paddingTop: 200 }]}>Hi {name.split(' ')[0]},</Text>
          </View>
          <View>
            <Text style={[styles.mediumTextBold, { color: "#FFF" }, { textAlign: 'center' }]}>Welcome to DigiWallet!</Text>
            <Text></Text>
          </View>
          <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
              {!pickedImage ? (
                <Text style={styles.smallText}>Click the button below to take your ID photo!</Text>
              ) : (
                <Image style={styles.imagePreview} source={{ uri: pickedImage }} />
              )}
            </View>
            <Button style={styles.imagePicker}
              title="Take ID Photo"
              onPress={takeImageHandler}
            />
            {pickedImage && (
              <Button
                style={styles.imagePicker}
                title="Use This ID Photo"
                onPress={saveImageHandler}
              />
            )}
          </View>
        </ImageBackground>
      </>
    )
  }

  export default WelcomeScreen;