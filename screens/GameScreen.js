import { View, StyleSheet, Alert } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionNameComponent from "../components/ui/InstructionName";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {
        if ((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert('Dont Lie', 'You Know that this is Worng Number...', [
                { text: 'Sorry !', Style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            maxBoundry = currentGuess;
        } else {
            minBoundry = currentGuess + 1;
        }
        console.log(minBoundry, maxBoundry);
        const newRndNumber = generateRandomBetween(minBoundry, maxBoundry, currentGuess);
        setCurrentGuess(newRndNumber);
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card><InstructionNameComponent style={styles.instructionText}>Higher or Lower?</InstructionNameComponent>
                <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower',)}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                    </PrimaryButton>
                </View>
                </View>
            </Card>
            {/* <View>LOG ROUNDS</View> */}
        </View>
    )
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 50,
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer: {
        flex:1
    },
    instructionText: {
        marginBottom: 12
    }

});