import React from "react";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";
import { Text } from "react-native";

import Colors from "@/constants/Colors";
import { wp } from "@/constants/Dimensions";

type Props = {
  label?: string;
  onChangeText?: any;
  value?: any;
  onBlur?: any;
  error?: any;
  disabled?: any;
};

const TextInput = ({
  label,
  onChangeText,
  value,
  onBlur,
  error,
  disabled,
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
        onBlur={onBlur}
        editable={!disabled}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100) - 20 * 2,
    gap: 5,
    marginBottom: 8,
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
    marginBottom: 10,
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
