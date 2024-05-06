import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

export const wp = (percentage: number): number => (percentage * deviceWidth) / 100
export const hp = (percentage: number): number => (percentage * deviceHeight) / 100

export const getColumnsCount = (): number => {
  if (deviceWidth >= 1024) {
    // Desktop
    return 4
  } else if (deviceWidth >= 768) {
    // Tablet
    return 3
  }
  return 2
}
