import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/colors";


const PrimaryButton = ({children, onPress}) => {
        return (<View style={styles.buttonOuterContainer}>
         <Pressable 
         style={({ pressed }) => pressed ? 
         [styles.buttonInnerContainer, styles.pressed] 
         : styles.buttonInnerContainer} 
         onPress={onPress} android_ripple={{color: Colors.primary600}}>
            <Text style={styles.buttonText}>
                {children}
            </Text>
        </Pressable>
        </View>
)}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
                margin: 4,
    },
    buttonInnerContainer: {
        backgroundColor: '#72036c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    }

})