import AsyncStorage from "@react-native-async-storage/async-storage";
import { deployment } from "@/settings/deployment";

import { Ticket } from "@/interfaces/ticket";

const fetchTickets = (): Promise<{ tickets: Ticket[] }> =>
  fetch(`${deployment.server_url}/api/tickets`).then((r) => r.json());

export const retrieveTickets = async (setTickets: (tickets: Ticket[]) => void) => {
  // await AsyncStorage.clear()
  const ticketIds: string[] | undefined = (
    await AsyncStorage.getItem("owned_tickets")
  )?.split(",");
  if (ticketIds?.length) {
    const data = await AsyncStorage.multiGet(
      ticketIds.map((id) => `t-${id}`)
    );
    const tickets: Ticket[] = data
      .filter(([_id, rawTicket]) => rawTicket !== null)
      .map(([_id, rawTicket]) => JSON.parse(rawTicket!));
    console.log("Tickets retrieved from Local storage");
    setTickets(tickets);
    return;
  }

  const res = await fetchTickets();
  await AsyncStorage.setItem(
    "owned_tickets",
    res.tickets.map((t) => t.id).join(",")
  );
  await AsyncStorage.multiSet(
    res.tickets.map((t: Ticket): [string, string] => {
      return [`t-${t.id}`, JSON.stringify(t)];
    })
  );

  console.log("tickets retrieved from API GET request");
  setTickets(res.tickets);
}
