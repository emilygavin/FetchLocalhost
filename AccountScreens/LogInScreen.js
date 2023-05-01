import { Button, Text, View, TextInput, ImageBackground, Pressable, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Vibration } from 'react-native';
import MainBackground from "../assets/bgs/bg.png";
import styles from '../StyleSheet/StyleSheet';

const LogInScreen = ({ navigation }) => {
    const URL = `https://aad8-2001-bb6-66ab-3000-45a5-4851-b478-1701.ngrok-free.app`
    let id = "";
    let data = "";
    let cardData = "";

    const [text, setText] = useState('');
    const [email, setEmail] = useState('emilygavin@hotmail.com');
    const [password, setPassword] = useState('Emilygavin1@');
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
  
    const callAPI = async () => {
      try {
        const res = await fetch(URL + `/api/v1/users/login?` + new URLSearchParams({
          email: email,
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
          data = await res.json();
          cardData = data.cards;
          id = data.id;
          console.log(data);
          console.log(email);
          console.log(password);
          console.log(cardData);
          console.log(id);
          setText(JSON.stringify(data));
          navigation.navigate('Main Screen', {
            URL: URL,
            id: id,
            data: data,
            cardData: cardData
          });
          JSON.parse(cardData);
        } else {
          setErrorMessage('Invalid Email or Password');
          Vibration.vibrate(500); // Add haptic feedback
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <>
        <ImageBackground source={MainBackground} resizeMode="cover" style={styles.image}>
          <View style={styles.TopSection}>
          </View>
        </ImageBackground>
        <View style={styles.LoginBottomSection}>
          <Text></Text>
          <Text style={styles.smallTextBold}>EMAIL </Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize='none'
            value={email} />
          <Text style={styles.smallTextBold}>PASSWORD </Text>
          <View style={styles.LoginBottomSection}>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              autoCorrect={false}
              secureTextEntry={!showPassword}
              value={password} />
          </View>
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
          </TouchableOpacity>
          {errorMessage && <Text style={[styles.smallTextBold, styles.errorMessage]}>{errorMessage}</Text>}
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <View style={styles.WelcomeBottomSection}>
            <Pressable style={styles.logInButtonStyle} onPress={async () => callAPI()}>
              <Text style={styles.mediumTextBold}>Log in</Text>
            </Pressable>
          </View>
          <View style={styles.LoginBottomSection}>
            <Text style={styles.smallText}>      Don't have an account?
              <Button title="Sign up" onPress={() => navigation.navigate('Sign Up')} />
            </Text>
          </View>
          <View style={styles.WelcomeBottomSection}></View>
        </View>
      </>
    )
  }

  export default LogInScreen;