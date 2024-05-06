import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { staticCategories } from "@/constants/exampleData";

type Props = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  isScroll: boolean;
};

const StickySection = ({
  selectedCategory,
  setSelectedCategory,
  isScroll,
}: Props) => {
  const categories = staticCategories();
  return (
    <ScrollView
      horizontal
      contentContainerStyle={[
        styles.scrollContainer,
        isScroll ? styles.scrollContainerShadow : null,
      ]}
    >
      {categories.map((category, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.button,
            category.name === selectedCategory && styles.buttonActive,
            { backgroundColor: pressed ? Colors.lightGray : Colors.white },
          ]}
          onPress={() =>
            setSelectedCategory(
              category.name === selectedCategory ? null : category.name
            )
          }
        >
          <FontAwesome6 name={category.icon} size={24} color={Colors.gray} />
          <Text style={styles.buttonText}>{category.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default StickySection;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  scrollContainerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 50,
  },
  buttonActive: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
