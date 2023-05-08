import { Button, Text, View, ImageBackground, Image, Alert, ScrollView } from 'react-native'
import { useState } from 'react'
import MainBackground from "../assets/bgs/bg.png";
import * as Permissions from 'expo-permissions';
import styles from '../StyleSheet/StyleSheet';
import AWS from 'aws-sdk';

const WelcomeScreen = ({ navigation, route }) => {
  const URL = `http://34.242.152.180`
  let id = "";
  let data = "";
  let cardData = "";

  const { name, gender, email, password } = route.params;
  const [pickedImage, setPickedImage] = useState();
  const [savedImageUri, setSavedImageUri] = useState();

  AWS.config.update({
    region: 'eu-west-1',
    accessKeyId: 'AKIAX63AZL24SG7T6QA4',
    secretAccessKey: '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',
  });

  const s3 = new AWS.S3();

  const callAPI = async () => {
    try {
      const imageName = `${Date.now()}-${name.split(' ')[0]}-ID.jpg`;
      const uploadResult = await uploadToS3(pickedImage, imageName);

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
            uri: uploadResult.Location,
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
        // console.log(data)
        navigation.navigate('Main Screen', {
          URL: URL,
          id: id,
          data: data,
          cardData: cardData,
          password: password
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const uploadToS3 = async (imageUri, imageName) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      s3.upload(
        {
          Bucket: 'digiwalletbucket',
          Key: imageName,
          Body: blob,
          ContentType: 'image/jpeg'
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
    let succss = false
    if (result.status == 'granted') succss = true
    if (result.permissions)
      if (result.permissions.camera.status == 'granted') succss = true
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

    const result = await new Promise(async (resolve) => {
      navigation.navigate("Camera Screen", {
        onPictureTaken: (image) => {
          resolve(image);
          navigation.goBack();
        },
      });
    });

    if (!result.cancelled) {
      setPickedImage(result.uri);
    }
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
      <ImageBackground source={MainBackground} resizeMode="cover" style={[{ flex: 1 }, { paddingTop: 80 }]}>
      <ScrollView>
          <View style={[styles.LoginBottomSection, {paddingBottom:50}]}>
          <Text style={[styles.mediumTextBold, { color: "#FFF" }, { textAlign: 'center' }]}>Hi {name.split(' ')[0]},</Text>
          <Text style={[styles.mediumTextBold, { color: "#FFF" }, { textAlign: 'center' }]}>Welcome to DigiWallet!</Text>
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
          </View>
          </ScrollView>
      </ImageBackground>
    </>
  )
}

export default WelcomeScreen;