import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { wp } from "@/constants/Dimensions";

type Props = {
  label?: string;
  outline?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  icon?: any;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  outline,
  label,
  onPress,
  disabled,
  icon,
  style,
}: Props) {
  return (
    <Pressable style={[styles.buttonContainer]} onPress={onPress}>
      <View
        style={[
          styles.button,
          outline ? styles.buttonOutline : styles.buttonSolid,
          disabled && styles.buttonDisabled,
        ]}
      >
        <View
          style={[
            {
              gap: 10,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.neutral(0),
              justifyContent: "center",
            },
            style,
          ]}
        >
          {icon}
          <Text
            style={[
              styles.buttonText,
              outline ? styles.buttonTextOutline : styles.buttonTextSolid,
              disabled && styles.buttonTextDisabled,
            ]}
          >
            {label}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 25,
    borderRadius: 50,
    flexDirection: "row",
  },
  buttonOutline: {
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.white,
  },
  buttonSolid: {
    backgroundColor: Colors.darkgray,
  },
  buttonDisabled: {
    backgroundColor: Colors.lighterGray,
  },
  buttonText: {
    fontSize: 20,
    paddingVertical: 10,
  },
  buttonTextOutline: {
    color: Colors.neutral(0.8),
  },
  buttonTextSolid: {
    color: Colors.white,
  },
  buttonTextDisabled: {
    color: Colors.neutral(0.3),
  },
});
