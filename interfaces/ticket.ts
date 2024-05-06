import { Distributor } from "./distributor";
import { Image } from "./image";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  date: Date;
  price_value: number;
  price_currency: string;
  quantity: number;
  activated: boolean;
  expired: boolean;
  purchased_date: Date | null;
  distributor: Distributor | null;
  image: Image;
  category: string;
}
