import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSignIn, useSignUp } from "@clerk/expo";

import { primaryColors, neutralColors } from "@/constants/theme/colors";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  mode: "sign-up" | "sign-in";
  onClose: () => void;
};

export function VerificationModal({ visible, email, mode, onClose }: VerificationModalProps) {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setErrorMessage(null);
      const focusTimeout = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(focusTimeout);
    }
  }, [visible]);

  const handleChangeCode = async (value: string) => {
    const digits = value.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    setErrorMessage(null);

    if (digits.length !== CODE_LENGTH) {
      return;
    }

    setIsVerifying(true);
    try {
      if (mode === "sign-up") {
        const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code: digits });
        if (verifyError) {
          setErrorMessage(verifyError.longMessage ?? verifyError.message);
          return;
        }

        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) {
          setErrorMessage(finalizeError.longMessage ?? finalizeError.message);
          return;
        }
      } else {
        const { error: verifyError } = await signIn.emailCode.verifyCode({ code: digits });
        if (verifyError) {
          setErrorMessage(verifyError.longMessage ?? verifyError.message);
          return;
        }

        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          setErrorMessage(finalizeError.longMessage ?? finalizeError.message);
          return;
        }
      }

      onClose();
      router.replace("/");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end bg-black/50" onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <Pressable
            onPress={() => inputRef.current?.focus()}
            className="rounded-t-3xl bg-white px-6 pb-10 pt-6"
          >
            <View className="mb-6 flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-h2 font-poppins-bold text-text-primary">Check your email</Text>
                <Text className="mt-2 text-body-md font-poppins-regular text-text-secondary">
                  We sent a 6-digit verification code to{" "}
                  <Text className="font-poppins-medium text-text-primary">{email}</Text>. Enter it
                  below to continue.
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} hitSlop={12}>
                <Ionicons name="close" size={24} color={neutralColors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between">
              {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                const digit = code[index];
                const isActive = index === code.length;

                return (
                  <View
                    key={index}
                    className="h-14 w-12 items-center justify-center rounded-2xl border bg-surface"
                    style={{ borderColor: isActive ? primaryColors.purple : neutralColors.border }}
                  >
                    <Text className="text-h3 font-poppins-semibold text-text-primary">{digit ?? ""}</Text>
                  </View>
                );
              })}
            </View>

            {isVerifying && (
              <View className="mt-4 items-center">
                <ActivityIndicator color={primaryColors.purple} />
              </View>
            )}

            {errorMessage && (
              <Text className="mt-4 text-center text-body-sm font-poppins-medium text-error">
                {errorMessage}
              </Text>
            )}

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeCode}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              editable={!isVerifying}
              style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
            />
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}
