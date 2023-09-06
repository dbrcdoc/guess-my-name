import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, View, Text, SafeAreaView } from 'react-native';
import { useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import { useState, useCallback } from 'react';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOver from './screens/GameOver';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, SetUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
       
  const [fontLoading] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontLoading) {
          await SplashScreen.hideAsync();
    }
  }, [fontLoading]);

  if (!fontLoading) {
    return null;
  }


  // if(!fontLoading){
  //   return<SplashScreen />
  // }

  function pickedNumberHandler(pickedNumber) {
    SetUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }
  if (gameIsOver && userNumber) {
    screen = <GameOver />
  }


  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground source={require('./assets/images/riho-kroll.jpg')} resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>
          {screen}
          <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      <Text>SplashScreen Demo! </Text>
      <Entypo name="rocket" size={30} />

    </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.20
  }
});
