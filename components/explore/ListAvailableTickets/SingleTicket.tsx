import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Ticket } from "@/interfaces/ticket";
import { Theme } from "@/constants/Theme";
import { hp } from "@/constants/Dimensions";
import Colors from "@/constants/Colors";
import { SampleImage } from "@/components/SampleImage";

type Props = {
  ticket: Ticket;
};

export default function SingleTicket({ ticket }: Props) {
  const router = useRouter();
  const date = new Date(ticket.date);
  return (
    <Pressable
      onPress={() =>
        router.push(`/(authenticated)/explore/tickets/${ticket.id}`)
      }
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.leftDate}>{date.getDate().toString()}</Text>
          <Text style={styles.leftMonth}>
            {date.toLocaleString("default", { month: "short" })}
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <SampleImage image={ticket.image} style={styles.image} />
          {/* <Image style={styles.image} source={{ uri: ticket.image.url }} /> */}
          <View>
            <Text style={styles.title}>{ticket.title}</Text>
            <Text style={styles.description}>{ticket.description}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 15,
  },
  leftColumn: { width: 50, alignItems: "flex-end" },
  leftDate: { fontSize: 32, color: Colors.neutral(0.6) },
  leftMonth: { textTransform: "uppercase", color: Colors.neutral(0.8) },
  rightColumn: { flex: 1 },
  button: {
    padding: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: Theme.radius.sm,
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: "column",
    paddingTop: 10,
    gap: 10,
  },
  title: {
    fontSize: hp(2),
    fontWeight: Theme.fontWeights.medium,
    color: Colors.neutral(0.8),
  },
  description: {},
  date: {
    color: Colors.neutral(0.5),
    fontSize: hp(1.6),
  },
});
