import { Text, View, ImageBackground, Pressable, ScrollView, SafeAreaView, FlatList, Image } from 'react-native'
import { Card, Title ,Paragraph } from 'react-native-paper';
import CardBackground from "../assets/bgs/bg_transparent.png";
import styles from '../StyleSheet/StyleSheet';
import femaleAvatar from "../assets/avatar/femaleAvatar.png";
import maleAvatar from "../assets/avatar/maleAvatar.png";

const MainScreen = ({ navigation, route }) => {
  const { URL, id, data, cardData, password } = route.params;

    const cardList = [
      {
        id: 1, 
        typeOfCard: cardData.ageCard ? cardData.ageCard.type : null,
        name: cardData.ageCard ? cardData.ageCard.name : null,
        dob: cardData.ageCard ? cardData.ageCard.dateOfBirth : null,
        gender: cardData.ageCard ? cardData.ageCard.gender : null,
        cardNumber: cardData.ageCard ? cardData.ageCard.cardNumber : null,
        alias: ""
      },
      {
        id: 2,
        typeOfCard: cardData.driversLicense ? cardData.driversLicense.type : null,
        name: cardData.driversLicense ? cardData.driversLicense.name : null,
        dob: cardData.driversLicense ? cardData.driversLicense.dateOfBirth : null,
        gender: cardData.driversLicense ? cardData.driversLicense.gender : null,
        address: cardData.driversLicense ? `${cardData.driversLicense.address.firstLine}, ${cardData.driversLicense.address.secondLine}, ${cardData.driversLicense.address.city}, ${cardData.driversLicense.address.county}, ${cardData.driversLicense.address.country}` : null,
        cardNumber: cardData.driversLicense ? cardData.driversLicense.driverNumber : null,
        alias: ""
      },
      {
        id: 3,
        typeOfCard: cardData.passportCard ? cardData.passportCard.type : null,
        name: cardData.passportCard ? cardData.passportCard.name : null,
        dob: cardData.passportCard ? cardData.passportCard.dateOfBirth : null,
        gender: cardData.passportCard ? cardData.passportCard.gender : null,
        address: cardData.passportCard ? cardData.passportCard.nationality : null,
        cardNumber: cardData.passportCard ? cardData.passportCard.passportNumber : null,
        alias: ""
      },
      {
        id: 4,
        typeOfCard: cardData.studentCard ? cardData.studentCard.type : null,
        name: cardData.studentCard ? cardData.studentCard.name : null,
        dob: cardData.studentCard ? cardData.studentCard.dateOfBirth : null,
        gender: data.gender,
        address: cardData.studentCard ? `${cardData.studentCard.college}, ${cardData.studentCard.courseTitle}` : null,
        cardNumber: cardData.studentCard ? cardData.studentCard.studentID : null,
        alias: ""
      }
    ];
  
  const renderItem = ({ item }) => {
    if (item.typeOfCard) { // Add a conditional statement to check if the content is not null
      return (
        <Card style={styles.card} overflow="hidden">
          <ImageBackground source={CardBackground} resizeMethod="resize" style={styles.background}>
            <Card.Content style={styles.cardContent}>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Title style={styles.title}>{item.typeOfCard}</Title>
              <Paragraph style={styles.paragraph}>Name: {item.name}</Paragraph>
              <Paragraph style={styles.paragraph}>Date Of Birth: {item.dob}</Paragraph>
              <Paragraph style={styles.paragraph}>Gender: {item.gender}</Paragraph>
              <Paragraph style={styles.paragraph}>Card Number: {item.cardNumber}</Paragraph>
              <Pressable onPress={() => navigation.navigate(item.typeOfCard, {
                URL: URL,
                id: id,
                data: data,
                cardData: cardData,
              })} style={styles.button}>
                <Text style={styles.mediumTextBold}>Open Card</Text>
              </Pressable>
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </Card.Content>
          </ImageBackground>
        </Card>
      );
      } else {
        return null; // Return null if the content is null
      }
    };
  
    return (
      <>
        <SafeAreaView style={styles.setBackgroundWhite}>
        </SafeAreaView>
        <Text></Text>
        <View style={[styles.header, {backgroundColor: "white"}]}>
          <Image source={data.gender === "MALE" ? maleAvatar : femaleAvatar} style={styles.genderImage} />
          <Text style={[styles.bigText, styles.setColorNavy, styles.setBackgroundWhite]}>Hey {data.name.split(' ')[0]}!       </Text>
          <Pressable style={styles.smallButton} onPress={() => navigation.navigate('Add New Card', {
          URL: URL,
          id: id,
          data: data,
          cardData: cardData,
          password: password
        })}>
            <Text style={[{ color: "white" }, { fontWeight: "bold" }]}>+</Text>
          </Pressable>
        </View>
        <Text style={[styles.smallText, styles.setColorNavy, styles.setBackgroundWhite, { marginTop: -30 }]}>Welcome back </Text>
        <SafeAreaView style={[styles.logOutMainScreen, styles.setBackgroundWhite]}>
          <Pressable style={styles.logInButtonStyle} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.mediumTextBold}>Log out</Text>
          </Pressable>
        </SafeAreaView>
        {cardData.ageCard === null && cardData.studentCard === null && cardData.passportCard === null && cardData.driversLicense === null ? (
          <View style={styles.container}>
            <Text style={[styles.smallTextBold, { color: "black", fontSize: 20, textAlign: "center" }]}>
              There are no cards added to this account yet
            </Text>
            <Text style={[styles.smallText, { color: "black", fontSize: 16, textAlign: "center" }]}>
              Add your first card using the "+" button on the top right corner!
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <ScrollView>
              <FlatList
                data={cardList}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
              />
            </ScrollView>
          </View>
        )}
      </>
    )
  }

  export default MainScreen;

