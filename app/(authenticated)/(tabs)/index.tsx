import { useState } from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useHeaderHeight } from "@react-navigation/elements";

import Deployment from "@/constants/Deployment";
import { View } from "@/components/Themed";
import ListAvailableTickets from "@/components/explore/ListAvailableTickets";
import { Ticket } from "@/interfaces/ticket";

const fetchTickets = async (): Promise<{ tickets: Ticket[] }> => {
  const url = `${Deployment.server_url}/api/tickets`;
  return fetch(url).then((res) => res.json());
};

export default function ExploreScreen() {
  const headerHeight = useHeaderHeight();
  const [search, setSearch] = useState<string>("");
  const { data } = useQuery<{ tickets: Ticket[] }>({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });
  return (
    <View style={(styles.container, { paddingTop: headerHeight })}>
      <ListAvailableTickets tickets={data?.tickets || null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
