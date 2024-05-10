import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";
import { Text } from "react-native";

import Colors from "@/constants/Colors";

type Props = {
  label?: string;
  onChangeText?: (text: string) => void;
  value?: string | undefined;
  error?: string;
  disabled?: any;
  secureTextEntry?: boolean | undefined;
  other?: Omit<TextInputProps, "label" | "onChangeText" | "error" | "disabled">;
};

const TextInput = ({
  label,
  onChangeText,
  value,
  error,
  disabled,
  secureTextEntry,
  ...other
}: Props) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[
          styles.input,
          error && styles.error,
          disabled && styles.disabled,
        ]}
        onChangeText={onChangeText}
        value={value}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        {...other}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.neutral(0.6),
  },
  input: {
    fontSize: 20,
    color: Colors.neutral(0.8),
    height: 40,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
  },
  disabled: {
    backgroundColor: Colors.lightGray,
  },
  error: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
  },
});

export default TextInput;
