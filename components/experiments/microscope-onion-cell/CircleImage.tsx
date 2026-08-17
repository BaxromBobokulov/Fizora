import { Image, ImageSourcePropType, View } from "react-native";

type CircleImageProps = {
  source: ImageSourcePropType;
  size: number;
  tintColor?: string;
  tintOpacity?: number;
};

export function CircleImage({ source, size, tintColor, tintOpacity = 0.35 }: CircleImageProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: "#E4EFE6",
      }}
    >
      <Image source={source} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      {tintColor && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: tintColor,
            opacity: tintOpacity,
          }}
        />
      )}
    </View>
  );
}
