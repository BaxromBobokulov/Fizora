import React from "react";
import { Image, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Bu erda biz constants/images va constants/theme/colors ni import qilamiz, 
// lekin hozircha biz buni ishlatmaymiz va dummy malumotlardan foydalanamiz, 
// chunki rasmda berilgan o'zgaruvchilarni bizga berilmagan.
// O'zingizni loyihangizda, bu qismni o'zingizni loyihangizga moslang.
const images = {
  mascotLogo: require("../assets/images/mascot-logo.png"), // 2-rasm yoki logotip uchun
  mascotWelcome: require("../assets/images/mascot-welcome.png"), // 1-rasm uchun
  newtonsCradleToy: require("../assets/images/01-toy.png"),
  pendulumToy: require("../assets/images/02-toy.png"),
};

const primaryColors = {
  orange: "#f39c12", // Misol rang
  purple: "#8e44ad", // Misol rang
  blue: "#3498db",   // Misol rang
};

const neutralColors = {
  textPrimary: "#333333", // Misol rang
};

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 30 }}>
        {/* Logo va Fizora sarlavhasi */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30}}>
          <Image
            source={images.mascotLogo}
            style={{ height: 60, width: 60 }}
            resizeMode="contain"
          />
          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: neutralColors.textPrimary }}>
              Fiz<Text style={{ color: primaryColors.orange }}>ora</Text>
            </Text>
          </View>
        </View>

        {/* Headline */}
        <Text style={{ fontSize: 33, fontWeight: "bold", color: neutralColors.textPrimary, marginBottom: 15 }}>
          Physics you can
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <Text style={{ fontSize: 33, fontWeight: "bold", color: primaryColors.purple }}>
            see
          </Text>
          <Text style={{ fontSize: 33, fontWeight: "bold", color: neutralColors.textPrimary }}>
            .{" "}
          </Text>
          <Text style={{ fontSize: 33, fontWeight: "bold", color: primaryColors.orange }}>
            Try
          </Text>
          <Text style={{ fontSize: 33, fontWeight: "bold", color: neutralColors.textPrimary }}>
            .{" "}
          </Text>
          <Text style={{ fontSize: 33, fontWeight: "bold", color: primaryColors.blue }}>
            Understand
          </Text>
          <Text style={{ fontSize: 33, fontWeight: "bold", color: neutralColors.textPrimary }}>
            .
          </Text>
        </View>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            fontWeight: "normal",
            color: neutralColors.textPrimary,
            marginBottom: 40,
          }}
        >
          Explore interactive experiments, test ideas, and discover the laws of nature.
        </Text>

        {/* Illyustratsiya */}
        <View style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {/* Nyuton beshigi (fon sifatida) */}
          <Image
            // source={images.newtonsCradleToy}
            style={{
              position: "absolute",
              bottom: 15,
              left: -30,
              height: 120,
              width: 100,
              zIndex: 1,
            }}
            resizeMode="contain"
          />
          {/* Mayatnik (fon sifatida) */}
          <Image
            // source={images.pendulumToy}
            style={{
              position: "absolute",
              bottom: 10,
              right: -20,
              height: 160,
              width: 100,
              zIndex: 1,
            }}
            resizeMode="contain"
          />

          {/* Markaziy Fizora maskotining o'zi */}
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 2, marginBottom: 20 }}>
            {/* Fon elementlari (E=mc², F=ma, +, atom, nuqtalar) */}
            <ImageBackground
                // source={require("./assets/illustration_background.png")} // Barcha fon elementlari (E=mc², F=ma, +, atom, nuqtalar) bitta rasmda.
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                }}
                resizeMode="contain"
              >
                {/* Asosiy Fizora rasm (1-rasm) */}
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image
                        source={images.mascotWelcome}
                        style={{ height: 550, width: 450 }}
                        resizeMode="contain"
                    />
                </View>
            </ImageBackground>
          </View>
        </View>

        {/* Pagination */}
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 30,
            marginBottom: 40,
          }}
        >
          <View style={{ height: 6, width: 20, borderRadius: 3, backgroundColor: primaryColors.purple }} />
          <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: "#e0e0e0" }} />
          <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: "#e0e0e0" }} />
          <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: "#e0e0e0" }} />
        </View> */}

        {/* CTA Tugmalar */}
        <View style={{ gap: 20, marginBottom: 20, zIndex: 10 }}>
          <TouchableOpacity
            style={{
              height: 60,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: primaryColors.purple,
              paddingHorizontal: 20,
            }}
            activeOpacity={0.85}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#ffffff", marginRight: 10 }}>
              Get Started
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}