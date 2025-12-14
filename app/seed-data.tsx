import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import seed from "@/lib/seed";
import { useRouter } from "expo-router";

export default function SeedDataScreen() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSeed = async () => {
    setLoading(true);
    try {
      await seed();
      Alert.alert("Success", "Database seeded successfully!", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to seed database: " + (error as Error).message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-10">
        <Text className="text-3xl font-rubik-bold text-black-300 text-center mb-4">
          Seed Database
        </Text>

        <Text className="text-base font-rubik text-black-200 text-center mb-8">
          This will populate your Appwrite database with sample properties,
          agents, reviews, and galleries.
        </Text>

        <TouchableOpacity
          onPress={handleSeed}
          disabled={loading}
          className="bg-primary-300 rounded-full w-full py-4 mt-5"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-lg font-rubik-medium text-white text-center">
              Seed Database
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-base font-rubik text-primary-300">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
