import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

function SecondaryButton({  title, style, ...props }) {
    return (
        <Pressable 
        style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
        { ...props }>
             <Text style={ { color: Colors.secondayTextColor }}> { title } </Text>
        </Pressable>
    ) 
}

const styles = StyleSheet.create({
    btn: {
      backgroundColor: Colors.secondary,
      padding: 18,
      borderRadius: 6,
      marginVertical: 10,
      alignItems: 'center',
    },
    pressed: {
        opacity: 0.5
    }
})

export default SecondaryButton