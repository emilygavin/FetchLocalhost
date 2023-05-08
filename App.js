// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './MainScreens/HomeScreen';
import LogInScreen from './AccountScreens/LogInScreen';
import SignUpScreen from './AccountScreens/SignUpScreen';
import WelcomeScreen from './MainScreens/WelcomeScreen';
import MainScreen from './MainScreens/MainScreen';
import AddNewCard from './AddNewCards/AddNewCard';
import AddAgeCard from './AddNewCards/AddAgeCard';
import AddStudentCard from './AddNewCards/AddStudentCard';
import AddPassportCard from './AddNewCards/AddPassportCard';
import AddDriversLicense from './AddNewCards/AddDriversLicense';
import AgeCard from './DisplayCards/AgeCard';
import StudentCard from './DisplayCards/StudentCard';
import DriversLicense from './DisplayCards/DriversLicense';
import PassportCard from './DisplayCards/PassportCard';
import Toast from 'react-native-toast-message';
import CameraScreen from './MainScreens/cameraScreen';

const Stack = createNativeStackNavigator()

export default App = () => {
  return ( 
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}  
        />
        <Stack.Screen
          options={{headerShown: false,
            headerStyle: {
              backgroundColor: '#2c365a',
            },
          }}
          name="Log In"
          component={LogInScreen}
        />
        <Stack.Screen
          options={{headerShown: false,
            headerStyle: {
              backgroundColor: '#2c365a',
            },
          }}
          name="Sign Up"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Welcome Screen"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Main Screen"
          component={MainScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Add New Card"
          component={AddNewCard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Add Age Card"
          component={AddAgeCard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Add Student Card"
          component={AddStudentCard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Add Passport Card"
          component={AddPassportCard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Add Drivers License"
          component={AddDriversLicense}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Age Card"
          component={AgeCard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Student Card"
          component={StudentCard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Drivers License"
          component={DriversLicense}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Passport Card"
          component={PassportCard}
        />
        <Stack.Screen
            options={{ headerShown: false }}
            name="Camera Screen"
            component={CameraScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  )
}