import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // input: {
    //   height: 40,
    //   margin: 12,
    //   borderWidth: 1,
    //   padding: 10,
    // },
    image: {
      flex: 0,
      justifyContent:'flex-end',
      alignContent:'flex-end'
    },
    TopSection: {
      width: '100%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'left'
   },
   MiddleSection: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: '5%',
    backgroundColor: "#2c365a",
  },
  WelcomeBottomSection: {
    flex: 1,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#2c365a",
  },
  LoginBottomSection: {
    flex: 1,
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: "#2c365a",
  },
    logInButtonStyle: {
      flex: 1,
      width: '40%',
      height: '30%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#ef835d",
   },
   smallButton: {
    width: '10%',
    height: '25%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ef835d",
  },
    signUpButtonStyle: {
      flex: 1,
      width: '30%',
      height: '20%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#ef835d",
   },
    bigText: {
      fontSize: 35,
      lineHeight: 40,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: 'black',
    },
    mediumText: {
      fontSize: 25,
      lineHeight: 40,
      letterSpacing: 0.25,
      color: 'black',
    },
    mediumTextBold: {
      fontSize: 25,
      lineHeight: 40,
      letterSpacing: 0.25,
      fontWeight: 'bold',
      color: 'white',
    },
    smallTextBold: {
      fontSize: 15,
      lineHeight: 40,
      letterSpacing: 0.25,
      fontWeight: 'bold',
      color: 'white',
    },
    smallText: {
      fontSize: 15,
      lineHeight: 40,
      letterSpacing: 0.25,
      color: 'white'
    },
    // input: {
    //   width: '97%',
    //   height: '10%',
    //   textAlign: 'center',
    //   margin: 5,
    //   borderWidth: 2,
    //   padding: 15,
    //   borderRadius: 20,
    // },
    setColorNavy : {
      textAlign: 'center',
      color: '#2c365a'
    },
    setBackgroundWhite : {
      backgroundColor: "#fff"
    },
    // container: {
    //   flex: 1,
    //   alignContent: 'center',
    //   margin: 20
    // },
    cardSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#2c365a",
    },
    logOutMainScreen: {
      flex: 0,
      width: '100%',
      height: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#2c365a",
    },
    scrollView: {
      backgroundColor: '#2c365a',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    card: {
      margin: 20,
      width: 300,
      height: 550,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fbcd77',  
      flexDirection: 'column',
      overflow: 'hidden' 
    },
    cardContent: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    paragraph: {
      fontSize: 18,
      lineHeight: 40,
      letterSpacing: 0.25,
      color: 'black',
      flex: 1,
    },
    background: {
      flex: 1,
      width: 350,
    },
    CardBackground: {
      backgroundColor: "#fbcd77",
    },
    errorMessage: {
      color: "red",
      fontSize: 15,
      textAlign: 'center',
      paddingLeft:15,
      paddingRight: 15,
    },
    input: {
      height: 40,
      width: '90%',
      textAlign: 'center',
      margin: 12,
      paddingLeft: 10,
      backgroundColor: '#fbcd77',
      borderRadius: 10,
      borderColor: '#E5E5E5',
      borderWidth: 1,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: "#2c365a",
      color: 'black',
      borderRadius: 10,
      height: 40,
      width: 150,
    },
    cardFullScreen: {
      marginTop: 80,
      margin: 20,
      width: 350,
      height: 720,
      textAlign: 'left',
      backgroundColor: '#fbcd77',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: 20
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#fff',
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginTop: -30,
    },
    genderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 20,
    },
    genderImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 10,
    },
    genderOption: {
      alignItems: 'center',
      opacity: 0.5, // set the initial opacity for unselected options
    },
    selectedGenderOption: {
      alignItems: 'center',
      opacity: 1, // set the opacity for the selected option to 1 (fully visible)
    },
    imagePicker: {
      alignItems: 'center',
      width: '100%',
      height: '70%'
    },
    imagePreview: {
      width: '100%',
      height: 470,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1
    }
});

export default styles;