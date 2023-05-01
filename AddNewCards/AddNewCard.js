import { Text, View, ImageBackground, Pressable, TouchableOpacity } from 'react-native'
import MainBackground from "../assets/bgs/bg.png";
import styles from '../StyleSheet/StyleSheet';

const AddNewCard = ({ navigation, route }) => {
  const { URL, id, data, cardData } = route.params;
  const isAllCardsFilled = cardData.ageCard !== null && cardData.studentCard !== null && cardData.passportCard !== null && cardData.driversLicense !== null;
  
   return (
      <>
        <ImageBackground source={MainBackground} resizeMode="cover" style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            {!isAllCardsFilled && cardData.ageCard === null && (
              <TouchableOpacity
                style={[styles.button, { width: 280 }, { backgroundColor: "#ef835d" }, { marginBottom: 20 }]}
                onPress={() => navigation.navigate('Add Age Card', {
                  URL: URL,
                  id: id,
                  data: data,
                  cardData: cardData
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
                  cardData: cardData
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
                  cardData: cardData
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
                  cardData: cardData
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
        </ImageBackground>
      </>
    )
  }

  export default AddNewCard;
  