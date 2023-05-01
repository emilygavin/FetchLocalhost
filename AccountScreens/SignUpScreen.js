import { Button, Text, View, TextInput, ImageBackground, Pressable, Keyboard, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import femaleAvatar from "../assets/avatar/femaleAvatar.png";
import maleAvatar from "../assets/avatar/maleAvatar.png";
import { Vibration } from 'react-native';
import MainBackground from "../assets/bgs/bg.png";
import styles from '../StyleSheet/StyleSheet';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('Emily Gavin');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('emilygavin@hotmail.com');
    const [password, setPassword] = useState('Emilygavin1@');
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    return (
      // <ScrollView keyboardShouldPersistTaps="never">
      <>
      <ImageBackground source={MainBackground} resizeMode="cover" style={styles.image}>
        <View style={styles.MiddleSection}>
        </View>
      </ImageBackground>
      <View style={styles.LoginBottomSection}>
        <Text style={styles.smallTextBold}>FULL NAME</Text>
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
        <Text style={styles.smallTextBold}>EMAIL</Text>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={setEmail}
          value={email}
          onSubmit={Keyboard.dismiss} />
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
        <Text></Text>
        {errorMessage && <Text style={[styles.smallTextBold, styles.errorMessage]}>{errorMessage}</Text>}
        <View style={styles.WelcomeBottomSection}>
          <Pressable style={styles.logInButtonStyle} onPress={async () => navigation.navigate('Welcome Screen', {name: name, gender: gender, email: email, password: password})}>
            <Text style={styles.mediumTextBold}>Sign up!</Text>
          </Pressable>
        </View>
        <View style={styles.LoginBottomSection}>
          <Text style={styles.smallText}>Already have an account?
            <Button title="Log in" onPress={() => navigation.navigate('Log In')} />
          </Text>
        </View>
        <View style={styles.WelcomeBottomSection}></View>
      </View>
    </>
      // </ScrollView>
    )
  }

  export default SignUpScreen;