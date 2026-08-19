import { Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { primaryColors } from "@/constants/theme/colors";
import { images } from "@/constants/images";

type LogOutModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function LogOutModal({ visible, onClose, onConfirm }: LogOutModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 items-center justify-center bg-black/50 px-6" onPress={onClose}>
        <Pressable onPress={() => {}} className="w-full max-w-sm items-center rounded-[28px] bg-white px-6 pb-6 pt-9">
          <View className="h-32 w-32 items-center justify-center">
            {/* <View
              className="h-32 w-32 items-center justify-center overflow-hidden rounded-full"
              style={{ backgroundColor: `${primaryColors.purple}1A` }}
            > */}
              <Image
                source={images.logOutFox}
                resizeMode="cover"
                className="absolute -left-[33px] -top-[17px] h-[166px] w-[150px]"
              />
            {/* </View> */}

            {/* <View
              className="absolute -left-1 top-0 h-9 w-9 right-5 items-center justify-center rounded-full"
              style={{ backgroundColor: primaryColors.purple }}
            >
              <Ionicons name="flask" size={16} color="#FFFFFF" />
            </View> */}

            <Ionicons
              name="sparkles"
              size={16}
              color={primaryColors.orange}
              className="absolute -top-1 right-2"
            />
            <Ionicons
              name="sparkles"
              size={11}
              color={primaryColors.orange}
              className="absolute left-0 top-12"
            />
            <Ionicons
              name="sparkles"
              size={10}
              color={primaryColors.orange}
              className="absolute -right-2 bottom-3"
            />
            <View
              className="absolute right-0 top-14 h-2 w-2 rounded-full"
              style={{ backgroundColor: primaryColors.blue }}
            />
          </View>

          <Text className="mt-5 text-h2 font-poppins-bold text-text-primary">Log out?</Text>
          <Text className="mt-2 text-center text-body-md font-poppins-regular text-text-secondary">
            You&apos;ll need to log in again to access your labs and progress.
          </Text>

          <View className="mt-6 w-full flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className="flex-1 items-center justify-center rounded-2xl py-4"
              style={{ backgroundColor: `${primaryColors.purple}1A` }}
            >
              <Text className="font-poppins-bold text-body-md" style={{ color: primaryColors.purple }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              activeOpacity={0.8}
              className="flex-1 items-center justify-center rounded-2xl py-4"
              style={{ backgroundColor: primaryColors.purple }}
            >
              <Text className="font-poppins-bold text-body-md text-white">Log Out</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
