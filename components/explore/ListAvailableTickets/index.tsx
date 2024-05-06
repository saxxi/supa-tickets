import { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ticket } from "@/interfaces/ticket";
import { hp, wp } from "@/constants/Dimensions";
import SingleTicket from "./SingleTicket";
import StickySection from "./StickySection";
import Colors from "@/constants/Colors";

type Props = {
  tickets: Ticket[] | null;
};

export default function ListAvailableTickets({ tickets }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  const filteredTickets = selectedCategory
    ? tickets?.filter((t) => t.category === selectedCategory)
    : tickets;

  if (!filteredTickets) {
    return (
      <View
        style={[
          {
            height: hp(100),
            alignItems: "center",
            alignContent: "center",
            paddingHorizontal: 10,
            backgroundColor: Colors.white,
          },
        ]}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Change 50 to the height of your sticky section
    setIsHeaderScrolled(offsetY > 50); // Assuming 50 as the threshold
  };

  return (
    <SectionList
      sections={[{ data: [{ title: "Table" }] }]}
      keyExtractor={(i) => i.title}
      renderSectionHeader={() => (
        <StickySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isScroll={isHeaderScrolled}
        />
      )}
      onScroll={handleScroll}
      renderItem={() => (
        <>
          <FlatList
            style={styles.container}
            data={filteredTickets}
            numColumns={1}
            renderItem={({ item }: ListRenderItemInfo<Ticket>) => (
              <SingleTicket ticket={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    ></SectionList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 3,
    width: wp(100),
  },
});
