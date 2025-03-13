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
import { Link, useRouter } from "expo-router";
import { useToast, Toast, ToastTitle } from "@/components/ui/toast";
import { CheckCircle } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen() {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user)); // Store user data
        console.log("Stored User Data:", data.user); // Debugging
  
        toast.show({
          placement: "top",
          render: ({ id }) => (
            <Toast nativeID={`toast-${id}`} className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row bg-green-500 rounded-lg">
              <Icon as={CheckCircle} size="xl" className="fill-white stroke-none" />
              <ToastTitle size="sm" className="text-white">
                {role === "user" ? "User Registration Successful" : "Seller Registration Successful"}
              </ToastTitle>
            </Toast>
          ),
        });
  
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Registration failed!");
    }
  };
  

  return (
    <FormControl className="p-4 border rounded-lg border-outline-300">
      <VStack space="xl">
        <Heading className="text-typography-900">Register</Heading>

        {/* Role Toggle */}
        <View className="flex-row items-center justify-between">
          <Text className="text-typography-500">
            Register as {role === "user" ? "User" : "Seller"}
          </Text>
          <Switch
            value={role === "seller"}
            onValueChange={() => setRole(role === "user" ? "seller" : "user")}
          />
        </View>

        {/* Username Input */}
        <VStack space="xs">
          <Text className="text-typography-500">
            {role === "user" ? "Username" : "Seller Name"}
          </Text>
          <Input>
            <InputField value={username} onChangeText={setUsername} />
          </Input>
        </VStack>

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

        {/* Register Button */}
        <Button onPress={handleRegister}>
          <ButtonText className="text-typography-0">Register</ButtonText>
        </Button>

        {/* Link to Login */}
        <View className="flex-row items-center">
          <Text>Already have an account? </Text>
          <Link href={"/login"} asChild>
            <Pressable>
              <Text className="text-primary-500">Login here</Text>
            </Pressable>
          </Link>
        </View>
      </VStack>
    </FormControl>
  );
}
