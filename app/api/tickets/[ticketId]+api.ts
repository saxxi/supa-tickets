import { staticTickets } from "@/constants/exampleData";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export async function GET(request: Request, { ticketId }: Record<string, string>) {
  const tickets = await staticTickets()
  return ExpoResponse.json({ ticket: tickets.find(t => t.id === ticketId) });
}
