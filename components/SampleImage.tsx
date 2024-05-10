import {
  Image,
  ImageProps,
  ImageRequireSource,
  ImageStyle,
  StyleProp,
} from "react-native";

import { URLImage, FileImage } from "@/interfaces/image";

export const SampleImage: React.FC<{
  image: URLImage | FileImage;
  style: StyleProp<ImageStyle> | undefined;
  otherProps?: Omit<ImageProps, "image" | "style">;
}> = ({ image, ...otherProps }) => {
  if ("url" in image) {
    return <Image source={{ uri: image.url }} {...otherProps} />;
  } else if (image.file_image in staticImages) {
    return <Image source={staticImages[image.file_image]} {...otherProps} />;
  }
  return null;
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
