import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon, Icon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { View, Pressable } from "react-native";
import { Link, useRouter } from "expo-router"; // useRouter for navigation
import { useToast, Toast, ToastTitle } from "@/components/ui/toast";
import { CheckCircle } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter(); // React Native router
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            return (
              <Toast
                nativeID={`toast-${id}`}
                className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row bg-green-500 rounded-lg"
              >
                <Icon
                  as={CheckCircle}
                  size="xl"
                  className="fill-white stroke-none"
                />
                <ToastTitle size="sm" className="text-white">
                  {role === "user" ? "User Login Successful" : "Seller Login Successful"}
                </ToastTitle>
              </Toast>
            );
          },
        });

        setTimeout(() => {
          router.replace("/"); // Redirect to home screen (index)
        }, 1000); // Delay to show toast before redirecting
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <FormControl className="p-4 border rounded-lg border-outline-300">
      <VStack space="xl">
        <Heading className="text-typography-900">Login</Heading>

        {/* Role Toggle */}
        <View className="flex-row items-center justify-between">
          <Text className="text-typography-500">Login as {role}</Text>
          <Switch
            value={role === "seller"}
            onValueChange={() => setRole(role === "user" ? "seller" : "user")}
          />
        </View>

        {/* Email Input */}
        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input>
            <InputField
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </Input>
        </VStack>

        {/* Password Input */}
        <VStack space="xs">
          <Text className="text-typography-500">Password</Text>
          <Input>
            <InputField
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>

        {/* Login Button */}
        <Button onPress={handleLogin}>
          <ButtonText className="text-typography-0">Login</ButtonText>
        </Button>

        {/* Link to Register */}
        <View className="flex-row items-center">
          <Text>Didn't have an account? </Text>
          <Link href={"/register"} asChild>
            <Pressable>
              <Text className="text-primary-500">Register here</Text>
            </Pressable>
          </Link>
        </View>
      </VStack>
    </FormControl>
  );
}
