import { Link, Stack, usePathname } from "expo-router"; // Import usePathname
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  const pathname = usePathname(); // Get the current route

  // Hide the cart icon on login and register pages
  const hideCart = pathname === "/login" || pathname === "/register";

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
            headerRight: () =>
              !hideCart && ( // Conditionally render cart icon
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
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
        </Stack>
        <Toast /> {/* Render Toast as the last component */}
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
