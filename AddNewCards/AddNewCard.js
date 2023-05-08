import { Text, View, ImageBackground, Pressable, TouchableOpacity, Vibration, Alert } from 'react-native'
import MainBackground from "../assets/bgs/bg.png";
import { useState } from 'react'
import styles from '../StyleSheet/StyleSheet';
import Toast from 'react-native-toast-message';


const AddNewCard = ({ navigation, route }) => {
  const { URL, id, data, cardData, password } = route.params;
  const [errorMessage, setErrorMessage] = useState(null);
  const isAllCardsFilled = cardData.ageCard !== null && cardData.studentCard !== null && cardData.passportCard !== null && cardData.driversLicense !== null;

  const callAPI = async () => {
    try {
      const res = await fetch(URL + `/api/v1/users/delete/` + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
          },
        }
      );

      if (res.ok) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Account has been deleted',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 50,
        });
        navigation.navigate('Home');
      } else {
        console.log(id);
        setErrorMessage('Invalid');
        Vibration.vibrate(500); // Add haptic feedback
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showDeleteConfirmation = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Yes, delete my account',
          onPress: () => callAPI(),
          style: 'destructive',
        },
        {
          text: 'No, keep my account',
          onPress: () => console.log('Account deletion cancelled'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ImageBackground source={MainBackground} resizeMode="cover" style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingTop: 180 }}>
          {!isAllCardsFilled && cardData.ageCard === null && (
            <TouchableOpacity
              style={[styles.button, { width: 280 }, { backgroundColor: "#ef835d" }, { marginBottom: 20 }]}
              onPress={() => navigation.navigate('Add Age Card', {
                URL: URL,
                id: id,
                data: data,
                cardData: cardData,
                password: password
              })}>
              <Text style={styles.smallTextBold}>Add Age Card</Text>
            </TouchableOpacity>
          )}
          {!isAllCardsFilled && cardData.studentCard === null && (
            <TouchableOpacity
              style={[styles.button, { width: 280 }, { backgroundColor: "#ef835d" }, { marginBottom: 20 }]}
              onPress={() => navigation.navigate('Add Student Card', {
                URL: URL,
                id: id,
                data: data,
                cardData: cardData,
                password: password
              })}>
              <Text style={styles.smallTextBold}>Add Student Card</Text>
            </TouchableOpacity>
          )}
          {!isAllCardsFilled && cardData.passportCard === null && (
            <TouchableOpacity
              style={[styles.button, { width: 280 }, { backgroundColor: "#ef835d" }, { marginBottom: 20 }]}
              onPress={() => navigation.navigate('Add Passport Card', {
                URL: URL,
                id: id,
                data: data,
                cardData: cardData,
                password: password
              })}>
              <Text style={styles.smallTextBold}>Add Passport Card</Text>
            </TouchableOpacity>
          )}
          {!isAllCardsFilled && cardData.driversLicense === null && (
            <TouchableOpacity
              style={[styles.button, { width: 280 }, { backgroundColor: "#ef835d" }, { marginBottom: 20 }]}
              onPress={() => navigation.navigate('Add Drivers License', {
                URL: URL,
                id: id,
                data: data,
                cardData: cardData,
                password: password
              })}>
              <Text style={styles.smallTextBold}>Add Drivers License</Text>
            </TouchableOpacity>
          )}
          {isAllCardsFilled && (
            <Text style={[styles.smallTextBold, { color: "white", fontSize: 20, textAlign: "center" }]}>
              You have already added all available cards!
            </Text>
          )}
          <Text></Text>
          <Text></Text>
          <Pressable onPress={() => navigation.goBack()} style={[styles.button, { backgroundColor: "#ef835d" }]}>
            <Text style={styles.smallTextBold}>Go Back</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 60, marginBottom: 50 }}>
          <Pressable onPress={showDeleteConfirmation} style={[styles.button, { backgroundColor: "#ff6961" }]}>
            <Text style={styles.smallTextBold}>Delete Account</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </>
  )
}

export default AddNewCard;
