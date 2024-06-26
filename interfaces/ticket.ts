import { Distributor } from "./distributor";
import { URLImage, FileImage } from "./image";

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
  purchased_date?: Date;
  distributor?: Distributor;
  image: URLImage | FileImage;
  category: string;
}
