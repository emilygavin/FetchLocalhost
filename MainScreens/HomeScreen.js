import { Text, View, ImageBackground, Pressable } from 'react-native'
import MainBackground from "../assets/bgs/bg.png";
import styles from '../StyleSheet/StyleSheet';

const HomeScreen = ({ navigation }) => {
    return (
        <>
            <ImageBackground source={MainBackground} resizeMode="cover" style={styles.image}>
                <View style={styles.TopSection}>
                </View>
                <View style={styles.TopSection}>
                </View>
            </ImageBackground>

            <View style={styles.MiddleSection}>
                <Text style={[styles.bigText, { color: "white" }]}>   DigiWallet</Text>
                <Text style={[styles.mediumText, { color: "white" }]}>   Making Identification Easy</Text>
            </View>
            <View style={styles.WelcomeBottomSection}>
                <Pressable style={styles.logInButtonStyle}
                    onPress={() => navigation.navigate('Log In')}>
                    <Text style={styles.mediumTextBold}>Log in</Text>
                </Pressable>
                <View style={styles.WelcomeBottomSection}></View>
                <View style={styles.WelcomeBottomSection}>
                    <Pressable style={styles.signUpButtonStyle}
                        onPress={() => navigation.navigate('Sign Up')}>
                        <Text style={styles.smallText} >Sign up</Text>
                    </Pressable>
                </View>
                <View style={styles.WelcomeBottomSection}></View>
            </View>
        </>
    )
};

export default HomeScreen;
