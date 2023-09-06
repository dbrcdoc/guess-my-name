import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";


function InstructionNameComponent({ children, style}){

    return <Text style={[styles.instructionText, style]}>{children}</Text>

    
}

export default InstructionNameComponent;

const styles = StyleSheet.create({
    instructionText: {
        fontFamily:'open-sans',
        color: Colors.accent500,
          fontSize: 24
    }

});

 