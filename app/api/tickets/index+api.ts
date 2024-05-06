import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { staticTickets } from "@/constants/exampleData";

export async function GET() {
  return ExpoResponse.json({ tickets: await staticTickets() });
}
