import { Text, View, TextInput, ImageBackground, Pressable, StyleSheet, TouchableOpacity, Keyboard, Image, ScrollView } from 'react-native'
import { useState } from 'react'
import MainBackground from "../assets/bgs/bg.png";
import styles from '../StyleSheet/StyleSheet';
import femaleAvatar from "../assets/avatar/femaleAvatar.png";
import maleAvatar from "../assets/avatar/maleAvatar.png";
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

const AddPassportCard = ({ navigation, route }) => {
    const { URL, id, data, cardData, password } = route.params;
    const [name, setName] = useState('Emily Gavin');
    const [dateOfBirth, setDateOfBirth] = useState('05-04-2001');
    const [country, setCountry] = useState('');
    const [nationality, setNationality] = useState('');
    const [passportNumber, setPassportNumber] = useState('PE13895419285');
    const [issueDate, setIssueDate] = useState('06-11-2019');
    const [expiryDate, setExpiryDate] = useState('06-11-2029');
    const [gender, setGender] = useState('');

    const callAPIRefresh = async () => {
      try {
        const res = await fetch(URL + `/api/v1/users/login?` + new URLSearchParams({
          email: data.email,
          password: password
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
            cardData: updatedData.cards,
            password: password
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const callAPI = async () => {
      try {
        const res = await fetch(
          URL + `/api/v1/users/addPassportCard/` + id,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "ngrok-skip-browser-warning": "69420" // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
            },
            body: JSON.stringify({
              type: "Passport Card",
              country: country,
              name: name,
              nationality: nationality,
              passportNumber: passportNumber,
              dateOfBirth: dateOfBirth,
              issueDate: issueDate,
              expiryDate: expiryDate,
              gender: gender
            }) // Need to use POST to send body
          }
        )
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Passport Card added to account!',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 50,
        });
        const data = await res.json()
        // console.log(data)
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
          <Text style={[styles.mediumTextBold, {paddingTop: 40}, { textDecorationLine: 'underline' }]}>ADD PASSPORT CARD</Text>
            <Text style={[styles.smallTextBold, {paddingTop: 30}]}>FULL NAME</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              autoCorrect={false}
              value={name}
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
          <Text style={styles.smallTextBold}>COUNTRY OF RESIDENCE</Text>
              <RNPickerSelect
                onValueChange={(valueCountry) => setCountry(valueCountry)}
                items={[
                  { label: 'IRELAND', value: 'IRELAND' },
                  { label: 'ENGLAND', value: 'ENGLAND' },
                  { label: 'SCOTLAND', value: 'SCOTLAND' },
                  { label: 'WALES', value: 'WALES' },
                ]}
                style={{
                  ...pickerSelectStyles
                }}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: 'transparent' }}
                value={country}
              />
            <Text style={styles.smallTextBold}>NATIONALITY</Text>
              <RNPickerSelect
                onValueChange={(valueNationality) => setNationality(valueNationality)}
                items={[
                  { label: 'IRISH', value: 'IRISH' },
                  { label: 'ENGLISH', value: 'ENGLISH' },
                  { label: 'SCOTTISH', value: 'SCOTTISH' },
                  { label: 'WELSH', value: 'WELSH' },
                ]}
                style={{
                  ...pickerSelectStyles
                }}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: 'transparent' }}
                value={nationality}
              />
            <Text style={styles.smallTextBold}>DATE OF BIRTH</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDateOfBirth}
              autoCorrect={false}
              value={dateOfBirth}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>ISSUE DATE</Text>
            <TextInput
              style={styles.input}
              onChangeText={setIssueDate}
              autoCorrect={false}
              value={issueDate}
              onSubmit={Keyboard.dismiss} />
            <Text style={styles.smallTextBold}>EXPIRY DATE</Text>
            <TextInput
              style={styles.input}
              onChangeText={setExpiryDate}
              autoCorrect={false}
              value={expiryDate}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>PASSPORT CARD NUMBER</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassportNumber}
              autoCorrect={false}
              value={passportNumber}
              onSubmit={Keyboard.dismiss} />
            <View style={styles.WelcomeBottomSection}>
              <Pressable style={[styles.logInButtonStyle]}
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
  
  export default AddPassportCard;

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 40,
      width: '90%',
      textAlign: 'center',
      margin: 12,
      paddingLeft: 15,
      backgroundColor: '#fbcd77',
      borderRadius: 10,
      borderColor: '#E5E5E5',
      borderWidth: 1,
    },
    inputAndroid: {
      height: 40,
      width: '90%',
      textAlign: 'center',
      margin: 12,
      paddingLeft: 15,
      backgroundColor: '#fbcd77',
      borderRadius: 10,
      borderColor: '#E5E5E5',
      borderWidth: 1
    },
  });