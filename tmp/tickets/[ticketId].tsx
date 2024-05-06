import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import { Ticket } from "@/interfaces/ticket";
import Deployment from "@/constants/Deployment";

const fetchTicket = (ticketId: string): Promise<{ ticket: Ticket }> =>
  fetch(`${Deployment.server_url}/api/tickets/${ticketId}`).then((r) =>
    r.json()
  );

const SingleTicketScreen = () => {
  const { ticketId }: { ticketId: string } = useLocalSearchParams();
  const [ticket, setTicket] = useState<Ticket>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchTicket(ticketId);
      setTicket(res.ticket);
    };

    fetchData();
  }, []);

  if (!ticket) {
    return (
      <View style={[styles.container, { padding: 30, alignItems: "center" }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: ticket.title,
        }}
      />
      <Text>SingleTicketScreen: {ticket.title}</Text>
    </View>
  );
};

export default SingleTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
});
