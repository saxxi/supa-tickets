import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { Ticket } from "@/interfaces/ticket";
import Deployment from "@/constants/Deployment";
import Colors from "@/constants/Colors";
import { SampleImage } from "@/components/SampleImage";
import { Theme } from "@/constants/Theme";
import Button from "@/components/Button";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

const fetchTicket = (ticketId: string): Promise<{ ticket: Ticket }> => {
  const url = `${Deployment.server_url}/api/tickets/${ticketId}`;
  return fetch(url).then((r) => r.json());
};

export default function Page() {
  const router = useRouter();
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
  const { data } = useQuery<{ ticket: Ticket }>({
    queryKey: ["tickets", ticketId],
    queryFn: () => fetchTicket(`${ticketId}`),
  });

  const ticket = data?.ticket;

  if (!ticket) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: ticket.title }} />
      <View style={styles.container}>
        <Animated.ScrollView>
          <SampleImage image={ticket.image} style={styles.image} />
          <View style={styles.infoContainer}>
            <View style={styles.textHeader}>
              {ticket.distributor && (
                <Text style={styles.distributor}>
                  {ticket.distributor.name}
                </Text>
              )}
              <Text style={styles.date}>
                {new Date(ticket.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.title}>{ticket.title}</Text>
            <View>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.category}>{ticket.category}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{ticket.description}</Text>
            <Text style={styles.quantity}>{ticket.quantity} available</Text>
          </View>
        </Animated.ScrollView>
        <Animated.View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 30,
            }}
          >
            <TouchableOpacity style={styles.footerText}>
              <Text style={styles.footerPrice}>{ticket.price_value}</Text>
              <Text style={styles.footerPriceCurrency}>
                {ticket.price_currency}
              </Text>
            </TouchableOpacity>

            <Button label="Buy now" />
          </View>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: 400,
    marginBottom: 5,
  },
  infoContainer: {
    padding: 15,
  },
  textHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontWeight: Theme.fontWeights.light,
    fontSize: 32,
    marginBottom: 10,
  },
  date: {
    fontSize: 22,
    color: Colors.neutral(0.6),
    fontWeight: Theme.fontWeights.light,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    marginBottom: 5,
  },
  categoryButton: {
    borderColor: Colors.gray,
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    padding: 5,
  },
  category: {
    color: Colors.darkgray,
    fontSize: 14,
  },
  distributor: {
    flex: 1,
    fontSize: 16,
    fontWeight: Theme.fontWeights.medium,
    marginBottom: 5,
    color: Colors.neutral(0.7),
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 32,
    color: Colors.neutral(0.6),
  },
  footerPriceCurrency: {
    fontSize: 18,
    color: Colors.neutral(0.8),
  },
});
