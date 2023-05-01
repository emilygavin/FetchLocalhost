import { Text, View, Pressable, ImageBackground, Image } from 'react-native'
import { Title ,Paragraph } from 'react-native-paper';
import styles from '../StyleSheet/StyleSheet';
import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import CardBackground from "../assets/bgs/bg_transparent.png";

const DriversLicense = ({ navigation, route }) => {
  const { URL, id, data, cardData } = route.params;
  const [dataAcc, setDataAcc] = useState({});
  const [rectangleColor, setRectangleColor] = useState('#FF0000');

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);
    const subscription = Accelerometer.addListener(accelerometerData => {
      setDataAcc(accelerometerData);
      changeRectangleColor(accelerometerData);
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  const changeRectangleColor = ({ x, y, z }) => {
    const rainbowColors = [
      '#FF0000', // Red
      '#FF7F00', // Orange
      '#FFFF00', // Yellow
      '#00FF00', // Green
      '#0000FF', // Blue
      '#4B0082', // Indigo
      '#8F00FF', // Violet
    ];

    const index = Math.floor(Math.abs(x + y + z) * 10) % rainbowColors.length;
    setRectangleColor(rainbowColors[index]);
  };

    return (
      <View style={styles.cardFullScreen}>
      <ImageBackground source={CardBackground} resizeMethod="resize" style={styles.background}>
        <View style={{ padding: 20, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column' }}>
              <Title style={[styles.bigText, { textDecorationLine: 'underline' }, {paddingLeft:35}, {paddingRight: 2}]}>
                {cardData.driversLicense.type.split(' ')[0]}
              </Title>
              <Title style={[styles.bigText, { textDecorationLine: 'underline' }, {paddingLeft:35}]}>
                {cardData.driversLicense.type.split(' ')[1]}
              </Title>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Image source={{ uri: data.uri }} style={{ width: 150, height: 230, borderRadius: 10 }} />
            </View>
          </View>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Name:</Text> {cardData.driversLicense.name}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Gender:</Text> {cardData.driversLicense.gender}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Date Of Birth:</Text> {cardData.driversLicense.dateOfBirth}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Country Of Residence:</Text> {cardData.driversLicense.countryOfResidence}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Issue Date:</Text> {cardData.driversLicense.issueDate}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Expiry Date:</Text> {cardData.driversLicense.expiryDate}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Driver Number:</Text> {cardData.driversLicense.driverNumber}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Address:</Text> {`${cardData.driversLicense.address.firstLine}, ${cardData.driversLicense.address.secondLine}, ${cardData.driversLicense.address.city}, ${cardData.driversLicense.address.county}, ${cardData.driversLicense.address.country}`}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Type Of License:</Text> {cardData.driversLicense.typeOfLicense}
        </Paragraph>
        <View style={{ backgroundColor: rectangleColor, width: '100%', height: 20, marginBottom: 20, borderRadius:20 }} />
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Pressable onPress={() => navigation.goBack()} style={styles.button}>
            <Text style={styles.mediumTextBold}>Go Back</Text>
          </Pressable>
          </View>
        </View> 
      </ImageBackground>
    </View>
    );
  }

  export default DriversLicense;