import {
  Image,
  ImageRequireSource,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";

import { Ticket } from "@/interfaces/ticket";
import { Theme } from "@/constants/Theme";
import { hp } from "@/constants/Dimensions";
import Colors from "@/constants/Colors";
import { FileImage, URLImage } from "@/interfaces/image";

type Props = {
  ticket: Ticket;
};

const staticImages: { [key: string]: ImageRequireSource } = {
  "Concert at Madison Square Garden.jpg": require("@/assets/images/sample/Concert at Madison Square Garden.jpg"),
  "Sports Event- NBA Finals.jpg": require("@/assets/images/sample/Sports Event- NBA Finals.jpg"),
  "Music Festival- Coachella.jpg": require("@/assets/images/sample/Music Festival- Coachella.jpg"),
  "TED Talk Conference.jpg": require("@/assets/images/sample/TED Talk Conference.jpg"),
  "Art Exhibition- The Louvre.jpg": require("@/assets/images/sample/Art Exhibition- The Louvre.jpg"),
  "Tech Conference- CES.jpg": require("@/assets/images/sample/Tech Conference- CES.jpg"),
  "Movie Premiere- Avengers- Endgame.jpg": require("@/assets/images/sample/Movie Premiere- Avengers- Endgame.jpg"),
  "Stand-up Comedy Show- Dave Chappelle Live.jpg": require("@/assets/images/sample/Stand-up Comedy Show- Dave Chappelle Live.jpg"),
  "Musical- The Phantom of the Opera.jpg": require("@/assets/images/sample/Musical- The Phantom of the Opera.jpg"),
  "Soccer Match- FIFA World Cup Final.jpg": require("@/assets/images/sample/Soccer Match- FIFA World Cup Final.jpg"),
  "Food and Wine Festival.jpg": require("@/assets/images/sample/Food and Wine Festival.jpg"),
  "Fashion Week- Paris.jpg": require("@/assets/images/sample/Fashion Week- Paris.jpg"),
  "Broadway Show- Hamilton.jpg": require("@/assets/images/sample/Broadway Show- Hamilton.jpg"),
  "Book Signing- Stephen King.jpg": require("@/assets/images/sample/Book Signing- Stephen King.jpg"),
};

const TicketImage: React.FC<{ image: URLImage | FileImage }> = ({ image }) => {
  if ("url" in image) {
    return <Image style={styles.image} source={{ uri: image.url }} />;
  } else if (image.file_image in staticImages) {
    return (
      <Image style={styles.image} source={staticImages[image.file_image]} />
    );
  }
  return null;
};

export default function SingleTicket({ ticket }: Props) {
  const date = new Date(ticket.date);
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.leftDate}>{date.getDate().toString()}</Text>
          <Text style={styles.leftMonth}>
            {date.toLocaleString("default", { month: "short" })}
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <TicketImage image={ticket.image} />
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
