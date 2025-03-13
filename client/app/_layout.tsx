import { Link, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import Toast from 'react-native-toast-message'; // Import Toast

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerLeft: () => (
              <Link href={"/login"} asChild>
                <Pressable className="pl-4">
                  <Icon as={User} />
                </Pressable>
              </Link>
            ),
            headerRight: () => (
              <View className="flex-row gap-4 pr-4">
                <Link href={"/cart"} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              </View>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
        </Stack>
        <Toast /> {/* Render Toast as the last component */}
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
