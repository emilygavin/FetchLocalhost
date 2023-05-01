import { Text, View, TextInput, ImageBackground, Pressable, Keyboard, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useState } from 'react'
import femaleAvatar from "../assets/avatar/femaleAvatar.png";
import maleAvatar from "../assets/avatar/maleAvatar.png";
import MainBackground from "../assets/bgs/bg.png";
import styles from '../StyleSheet/StyleSheet';

const AddAgeCard = ({ navigation, route }) => {
    const { URL, id, data, cardData } = route.params;
    const [text, setText] = useState('')
    const [name, setName] = useState('Emily Gavin');
    const [dateOfBirth, setDateOfBirth] = useState('05-04-2001');
    const [gender, setGender] = useState('');
    const [cardNumber, setCardNumber] = useState('8642346358');

  const callAPIRefresh = async () => {
    try {
      const res = await fetch(URL + `/api/v1/users/login?` + new URLSearchParams({
        email: data.email,
        password: data.password
      }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
          },
        }
      );

      if (res.ok) {
        const updatedData = await res.json();
        navigation.navigate('Main Screen', {
          URL: URL,
          id: id,
          data: updatedData,
          cardData: updatedData.cards
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  
    const callAPI = async () => {
      try {
        const res = await fetch(
          URL + `/api/v1/users/addAgeCard/` + id,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "ngrok-skip-browser-warning": "69420" // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
            },
            body: JSON.stringify({
              type: "Age Card",
              name: name,
              dateOfBirth: dateOfBirth,
              gender: gender,
              cardNumber: cardNumber
            }) // Need to use POST to send body
          }
        )
        const data = await res.json()
        console.log(data)
        setText(JSON.stringify(data))
        callAPIRefresh();
      } catch (err) {
        console.log(err)
      }
    }
  
    return (
      <>
        <ImageBackground source={MainBackground} resizeMode="cover" style={[{ flex: 1 }, {paddingTop: 80}]}>
        <ScrollView>
          <View style={styles.LoginBottomSection}>
          <Text style={[styles.mediumTextBold, {paddingTop: 60}, { textDecorationLine: 'underline' }]}>ADD AGE CARD</Text>
            <Text style={[styles.smallTextBold, {paddingTop: 40}]}>FULL NAME </Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              autoCorrect={false}
              value={name}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>DATE OF BIRTH (dd-mm-yyyy)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDateOfBirth}
              autoCorrect={false}
              value={dateOfBirth}
              onSubmit={Keyboard.dismiss} />
            <Text style={styles.smallTextBold}>GENDER</Text>
            <View style={styles.genderContainer}>
            <TouchableOpacity
              style={gender === 'MALE' ? styles.selectedGenderOption : styles.genderOption}
              onPress={() => setGender('MALE')}
              activeOpacity={0.8}>
              <>
                <Image source={maleAvatar} style={styles.genderImage} />
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={gender === 'FEMALE' ? styles.selectedGenderOption : styles.genderOption}
              onPress={() => setGender('FEMALE')}
              activeOpacity={0.8}>
              <>
                <Image source={femaleAvatar} style={styles.genderImage} />
              </>
            </TouchableOpacity>
          </View>
            <Text style={styles.smallTextBold}>CARD NUMBER</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCardNumber}
              autoCorrect={false}
              value={cardNumber}
              onSubmit={Keyboard.dismiss} />
            <View style={styles.WelcomeBottomSection}>
              <Pressable style={styles.logInButtonStyle}
                onPress={async () => callAPI()}>
                <Text style={styles.mediumTextBold}>Add Card!</Text>
                </Pressable>
            </View>
            <View style={[styles.LoginBottomSection,  {paddingBottom: 60}]}>
            </View>
          </View>
          </ScrollView>
        </ImageBackground>
      </>
    )
  }

  export default AddAgeCard;