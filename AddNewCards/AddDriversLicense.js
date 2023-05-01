import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Pressable, Keyboard, Image, ScrollView } from 'react-native'
import { useState } from 'react'
import MainBackground from "../assets/bgs/bg.png";
import styles from '../StyleSheet/StyleSheet';
import femaleAvatar from "../assets/avatar/femaleAvatar.png";
import maleAvatar from "../assets/avatar/maleAvatar.png";
import RNPickerSelect from 'react-native-picker-select';

const AddDriversLicense = ({ navigation, route }) => {
    const { URL, id, data, cardData } = route.params;
    const [name, setName] = useState('Emily Gavin');
    const [dateOfBirth, setDateOfBirth] = useState('05-04-2001');
    const [countryOfResidence, setCountryOfResidence] = useState('');
    const [issueDate, setIssueDate] = useState('06-11-2021');
    const [expiryDate, setExpiryDate] = useState('06-11-2031');
    const [driverNumber, setDriverNumber] = useState('53672356138');
    const [firstLine, setFirstLine] = useState('Ros Ard');
    const [secondLine, setSecondLine] = useState('Pool Boy');
    const [city, setCity] = useState('Ballinasloe');
    const [county, setCounty] = useState('Galway');
    const [typeOfLicense, setTypeOfLicense] = useState('');
    const [gender, setGender] = useState('');

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
          URL + `/api/v1/users/addDriversLicense/` + id,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "ngrok-skip-browser-warning": "69420" // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
            },
            body: JSON.stringify({
              type: "Drivers License",
              name: name,
              dateOfBirth: dateOfBirth,
              countryOfResidence: countryOfResidence,
              issueDate: issueDate,
              expiryDate: expiryDate,
              driverNumber: driverNumber,
              address: {
                firstLine: firstLine,
                secondLine: secondLine,
                city: city,
                county: county
              },
              gender: gender,
              typeOfLicense: typeOfLicense
            }) // Need to use POST to send body
          }
        )
        const data = await res.json()
        console.log(data)
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
          <Text style={[styles.mediumTextBold, {paddingTop: 40}, { textDecorationLine: 'underline' }]}>ADD DRIVERS LICENSE</Text>
            <Text style={[styles.smallTextBold, {paddingTop: 30}]}>FULL NAME</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              autoCorrect={false}
              value={name}
              onSubmit={Keyboard.dismiss} />
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
            <Text style={styles.smallTextBold}>DATE OF BIRTH</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDateOfBirth}
              autoCorrect={false}
              value={dateOfBirth}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>COUNTRY OF RESIDENCE</Text>
              <RNPickerSelect
                onValueChange={(valueCountry) => setCountryOfResidence(valueCountry)}
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
                value={countryOfResidence}
              />
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
              <Text style={styles.smallTextBold}>ADDRESS</Text>
              <Text style={styles.smallTextBold}>FIRST LINE</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFirstLine}
              autoCorrect={false}
              value={firstLine}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>SECOND LINE</Text>
            <TextInput
              style={styles.input}
              onChangeText={setSecondLine}
              autoCorrect={false}
              value={secondLine}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>CITY</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCity}
              autoCorrect={false}
              value={city}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>COUNTY</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCounty}
              autoCorrect={false}
              value={county}
              onSubmit={Keyboard.dismiss} />
            <Text style={styles.smallTextBold}>DRIVER NUMBER</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDriverNumber}
              autoCorrect={false}
              value={driverNumber}
              onSubmit={Keyboard.dismiss} />
            <Text style={styles.smallTextBold}>TYPE OF LICENSE</Text>
              <RNPickerSelect
                onValueChange={(valueType) => setTypeOfLicense(valueType)}
                items={[
                  { label: 'CAR', value: 'CAR' },
                  { label: 'MOTORBIKE', value: 'MOTORBIKE' },
                  { label: 'TRACTOR', value: 'TRACTOR' },
                  { label: 'TRUCK', value: 'TRUCK' },
                ]}
                style={{
                  ...pickerSelectStyles
                }}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: 'transparent' }}
                value={typeOfLicense}
              />
            <View style={styles.WelcomeBottomSection}>
              <Pressable style={styles.logInButtonStyle}
                onPress={async () => callAPI()}>
                <Text style={styles.mediumTextBold}>Add Card!</Text>
              </Pressable>
            </View>
            <View style={[styles.LoginBottomSection,  {paddingBottom: 60}]}></View>
          </View>
          </ScrollView>
        </ImageBackground>
      </>
    )
  }

  export default AddDriversLicense;

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
  
  
  
  
  
  