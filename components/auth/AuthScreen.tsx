import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSignIn, useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import type { OAuthStrategy } from "@clerk/expo/types";

// Bu importlar sizning loyihangizda mavjud deb hisoblayman
import { images } from "@/constants/images";
import { primaryColors, neutralColors } from "@/constants/theme/colors";
import { SocialButton, SocialProvider } from "@/components/auth/SocialButton";
import { VerificationModal } from "@/components/auth/VerificationModal";

// Masotning original o'lchami va aspect ratio'si
const MASCOT_WIDTH = 250; // Bu qiymat rasmning kengligini belgilaydi
const MASCOT_HEIGHT = 200; // Bu qiymat rasmning balandligini belgilaydi
const MASCOT_ASPECT_RATIO = MASCOT_WIDTH / MASCOT_HEIGHT;

type Percent = `${number}%`;
type Sparkle = { top: Percent; left?: Percent; right?: Percent; size: number; color: string };

const SPARKLES: Sparkle[] = [
  { top: "-4%", left: "58%", size: 18, color: primaryColors.purple },
  { top: "16%", right: "-10%", size: 15, color: primaryColors.blue },
  { top: "72%", left: "-12%", size: 13, color: primaryColors.blue },
  { top: "56%", right: "-8%", size: 20, color: primaryColors.orange },
];

const OAUTH_STRATEGIES: Record<SocialProvider, OAuthStrategy> = {
  google: "oauth_google",
  facebook: "oauth_facebook",
  apple: "oauth_apple",
};

type AuthScreenProps = {
  mode: "sign-up" | "sign-in";
  title: string;
  subtitle: string;
  showPassword: boolean;
  primaryLabel: string;
  footerPrompt: string;
  footerActionLabel: string;
  footerHref: "/(auth)/sign-up" | "/(auth)/sign-in";
};

export function AuthScreen({
  mode,
  title,
  subtitle,
  showPassword,
  primaryLabel,
  footerPrompt,
  footerActionLabel,
  footerHref,
}: AuthScreenProps) {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthProvider, setOauthProvider] = useState<SocialProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && (!showPassword || password.length > 0);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      if (mode === "sign-up") {
        const { error } = await signUp.password({ emailAddress: email.trim(), password });
        if (error) {
          setErrorMessage(error.longMessage ?? error.message);
          return;
        }

        const { error: sendError } = await signUp.verifications.sendEmailCode();
        if (sendError) {
          setErrorMessage(sendError.longMessage ?? sendError.message);
          return;
        }
      } else {
        const { error } = await signIn.emailCode.sendCode({ emailAddress: email.trim() });
        if (error) {
          setErrorMessage(error.longMessage ?? error.message);
          return;
        }
      }

      setIsVerificationVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthPress = async (provider: SocialProvider) => {
    setErrorMessage(null);
    setOauthProvider(provider);
    try {
      const { createdSessionId } = await startSSOFlow({ strategy: OAUTH_STRATEGIES[provider] });
      if (createdSessionId) {
        router.replace("/");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
    } finally {
      setOauthProvider(null);
    }
  };

  const isBusy = isSubmitting || oauthProvider !== null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: neutralColors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="px-6 pb-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} hitSlop={12} className="mb-4 mt-2 h-10 w-10 items-center justify-center">
            <Ionicons name="chevron-back" size={26} color={neutralColors.textPrimary} />
          </TouchableOpacity>

          {/* Title and Subtitle */}
          <Text className="text-h1 font-poppins-bold text-text-primary">{title}</Text>
          <Text className="mt-2 text-body-lg font-poppins-regular text-text-secondary">
            {subtitle}
          </Text>

          {/*
            BU JOY MUHIM! Tulkining input field tepasiga chiqishi effekti
            Mascot Container
          */}
          <View className="items-center justify-center relative" style={{ zIndex: 1, marginTop: 40, marginBottom: -MASCOT_HEIGHT * 0.20 }}>
            {/*
              z-index: 1 -> Rasmni boshqa elementlardan balandroq ko'rsatish
              marginTop: 40 -> Rasmni biroz pastroqdan boshlash
              marginBottom: -MASCOT_HEIGHT * 0.35 -> Rasmni input filed tepasiga "bosish" (overlap)
              Bu hisob-kitob MASCOT_HEIGHT ning 35% ini tashkil qiladi.
            */}
            <View className="w-full max-w-[250px]" style={{ aspectRatio: MASCOT_ASPECT_RATIO }}>
              {SPARKLES.map((sparkle, index) => (
                <MaterialCommunityIcons
                  key={index}
                  name="star-four-points"
                  size={sparkle.size}
                  color={sparkle.color}
                  style={{
                    position: "absolute",
                    top: sparkle.top,
                    left: sparkle.left,
                    right: sparkle.right,
                  }}
                />
              ))}
              <Image
                source={images.mascotAuth}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Form Fields and Buttons Container */}
          <View className="gap-4 relative" style={{ zIndex: 0 }}>
             {/* z-index: 0 -> Input filedlarni rasm ostida ko'rsatish */}

            {/* Email Input */}
            <View className="rounded-3xl border border-border px-5 py-4 bg-white" style={{ elevation: 2 }}>
                {/* rounded-3xl -> Ikkinchi rasmdagi kabi burchaklarni yumshoqroq qilish */}
                {/* border border-border -> Input field chegarasi */}
                {/* elevation: 2 -> Androidda input fieldga biroz soya berish (ikkinchi rasmda ko'rinib turibdi) */}

                {/* Email Label (Tepada) */}
                <Text className="text-body-sm font-poppins-medium text-text-secondary mb-1">Email</Text>

                {/* Email TextInput */}
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="alex@gmail.com"
                    placeholderTextColor={neutralColors.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isBusy}
                    className="py-1 text-h4 font-poppins-regular text-text-primary"
                    style={{ fontSize: 16 }}
                />
            </View>

            {/* Password Input */}
            {showPassword && (
              <View className="flex-row items-center rounded-3xl border border-border px-5 py-4 bg-white" style={{ elevation: 2 }}>
                <View className="flex-1">
                  {/* Password Label (Tepada) */}
                  <Text className="text-body-sm font-poppins-medium text-text-secondary mb-1">Password</Text>

                  {/* Password TextInput */}
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor={neutralColors.textSecondary}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isBusy}
                    className="py-1 text-h4 font-poppins-regular text-text-primary"
                    style={{ fontSize: 16 }}
                  />
                </View>
                {/* Toggle Visibility Button */}
                <TouchableOpacity onPress={() => setIsPasswordVisible((prev) => !prev)} hitSlop={12} className="ml-2">
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color={neutralColors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Error message */}
            {errorMessage && (
              <Text className="text-body-sm font-poppins-medium text-error">{errorMessage}</Text>
            )}

            {/* Sign Up / Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!canSubmit || isBusy}
              activeOpacity={0.87}
              className="h-14 items-center justify-center rounded-3xl"
              style={{ backgroundColor: primaryColors.purple, opacity: canSubmit && !isBusy ? 1 : 0.6 }}
            >
                {/* h-14 -> Tugma balandligi */}
                {/* rounded-3xl -> Tugma burchaklari */}
                {/* opacity: canSubmit ? 1 : 0.6 -> Tugmani faolsizlantirish (disable) */}
              <Text className="text-h4 font-poppins-semibold text-white">
                {isSubmitting ? "Please wait…" : primaryLabel}
              </Text>
            </TouchableOpacity>

            {/* OR Separator */}
            <View className="my-2 flex-row items-center gap-3">
              <View className="h-px flex-1 bg-border" />
              <Text className="text-body-sm font-poppins-regular text-text-secondary">
                or continue with
              </Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            {/* Social Buttons */}
            <SocialButton
              provider="google"
              label="Continue with Google"
              disabled={isBusy}
              onPress={() => handleOAuthPress("google")}
            />
            <SocialButton
              provider="facebook"
              label="Continue with Facebook"
              disabled={isBusy}
              onPress={() => handleOAuthPress("facebook")}
            />
            <SocialButton
              provider="apple"
              label="Continue with Apple"
              disabled={isBusy}
              onPress={() => handleOAuthPress("apple")}
            />
          </View>

          {/* Footer - Sign in Link */}
          <View className="mt-10 flex-row justify-center items-center">
            {/* items-center -> Linkni label bilan bir xil chiziqda qilish */}
            <Text className="text-body-md font-poppins-regular text-text-secondary">
              {footerPrompt}{" "}
            </Text>
            <Link href={footerHref} replace className="text-body-md font-poppins-semibold" style={{ color: primaryColors.purple }}>
              {footerActionLabel}
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verification Modal */}
      <VerificationModal
        visible={isVerificationVisible}
        email={email}
        mode={mode}
        onClose={() => setIsVerificationVisible(false)}
      />
    </SafeAreaView>
  );
}
