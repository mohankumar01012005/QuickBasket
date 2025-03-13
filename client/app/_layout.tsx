import { Link, Stack, usePathname, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User, LogOut } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Fetch user from AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        console.log("User Data:", JSON.parse(storedUser)); // Debugging
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);

  // Hide cart on login and register screens
  const hideCart = pathname === "/login" || pathname === "/register";

  // Handle Cart Click
  const handleCartPress = () => {
    if (!user) {
      router.replace("/login"); // Redirect to login if not authenticated
    } else {
      router.push("/cart"); // Navigate to cart if authenticated
    }
  };

  // Handle Logout (delete user data but do not redirect)
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user"); // Remove user data
    setUser(null); // Clear user state
    console.log("User logged out"); // Debugging
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerLeft: () =>
              user ? ( // Show Logout button if logged in
                <Pressable className="pl-4" onPress={handleLogout}>
                  <Icon as={LogOut} />
                </Pressable>
              ) : (
                <Link href={"/login"} asChild>
                  <Pressable className="pl-4">
                    <Icon as={User} />
                  </Pressable>
                </Link>
              ),
            headerRight: () =>
              !hideCart && (
                <View className="flex-row gap-4 pr-4">
                  <Pressable className="flex-row gap-2" onPress={handleCartPress}>
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemsNum}</Text>
                  </Pressable>
                </View>
              ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
        </Stack>
        <Toast />
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
