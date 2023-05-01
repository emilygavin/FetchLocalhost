import { Text, View, TextInput, ImageBackground, Pressable, StyleSheet, Keyboard, ScrollView } from 'react-native'
import { useState } from 'react'
import MainBackground from "../assets/bgs/bg.png";
import styles from '../StyleSheet/StyleSheet';
import RNPickerSelect from 'react-native-picker-select';

const AddStudentCard = ({ navigation, route }) => {
    const { URL, id, data, cardData } = route.params;
    const [text, setText] = useState('. . . waiting for fetch API')
    const [name, setName] = useState('Emily Gavin');
    const [dateOfBirth, setDateOfBirth] = useState('05-04-2001'); 
    const [college, setCollege] = useState('');
    const [studentID, setStudentID] = useState('982375489172');
    const [courseTitle, setCourseTitle] = useState('Software Engineering');
    const [expiryDate, setExpiryDate] = useState('04-08-2024');

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
          URL + `/api/v1/users/addStudentCard/` + id,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "ngrok-skip-browser-warning": "69420" // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
            },
            body: JSON.stringify({
              type: "Student Card",
              name: name,
              dateOfBirth: dateOfBirth,
              college: college,
              studentID: studentID,
              courseTitle: courseTitle,
              expiryDate: expiryDate
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
          <Text style={[styles.mediumTextBold, {paddingTop: 30}, { textDecorationLine: 'underline' }]}>ADD STUDENT CARD</Text>
            <Text style={[styles.smallTextBold, {paddingTop: 30}]}>FULL NAME </Text>
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
            <Text style={styles.smallTextBold}>COLLEGE</Text>
              <RNPickerSelect
                onValueChange={(valueCollege) => setCollege(valueCollege)}
                items={[
                  { label: 'ATU', value: 'ATU' },
                  { label: 'UCD', value: 'UCD' },
                  { label: 'UG', value: 'UG' },
                  { label: 'DCU', value: 'DCU' },
                ]}
                style={{
                  ...pickerSelectStyles
                }}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: 'transparent' }}
                value={college}
              />
            <Text style={styles.smallTextBold}>STUDENT ID</Text>
            <TextInput
              style={styles.input}
              onChangeText={setStudentID}
              autoCorrect={false}
              value={studentID}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>COURSE TITLE</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCourseTitle}
              autoCorrect={false}
              value={courseTitle}
              onSubmit={Keyboard.dismiss} />
              <Text style={styles.smallTextBold}>EXPIRY DATE</Text>
            <TextInput
              style={styles.input}
              onChangeText={setExpiryDate}
              autoCorrect={false}
              value={expiryDate}
              onSubmit={Keyboard.dismiss} />
            <Text></Text>
            <Text></Text>
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

  export default AddStudentCard;

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
