import { View } from "react-native";

// Global styles
import { COLORS_NS_SCALE } from "../styles/global";

export default function GradeIndicator({ grade, size = 24 }) {
  return (
    <View
      style={{
        backgroundColor: COLORS_NS_SCALE[grade],
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    />
  );
}
