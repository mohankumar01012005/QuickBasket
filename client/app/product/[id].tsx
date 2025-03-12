import { useLocalSearchParams, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/products";
import { useCart } from "@/store/cartStore";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const addProduct = useCart((state)=>state.addProduct);
  const cartItems = useCart(state=>state.items);
  // console.log("cartItems: ", JSON.stringify(cartItems,null,2));


  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProductById(Number(id)),
  });

  const addToCart=()=>{
    addProduct(product);
  }

  if(isLoading){
    return <ActivityIndicator></ActivityIndicator>
  }


  if(error){
    return <Text>Product not Found</Text>
  }

  

  if (!product) {
    return (
      <Text className="text-center mt-10">
        Product details not found for ID: {id}
      </Text>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4 bg-gray-100">
      <Stack.Screen options={{ title: product.name }}></Stack.Screen>

      <Card className="w-full h-[95vh] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl sm:h-auto sm:min-h-[70vh] p-6 rounded-lg bg-white flex justify-between">
        {/* Image */}
        <Image
          source={{ uri: product.image }}
          className="h-[40%] w-full rounded-md"
          alt="image"
          resizeMode="contain"
        />

        {/* Product Details */}
        <VStack className="h-[35%] justify-center">
          <Text className="text-4xl  font-semibold text-typography-700">
            {product.name}
          </Text>
          <Heading size="3xl" className="mt-2">
            ₹{product.price}
          </Heading>
          <Text size="lg" className="pt-6 text-gray-600">
            {product.description}
          </Text>
        </VStack>

        {/* Buttons */}
        <Box className="h-[15%] flex flex-row space-x-3">
          <Button onPress={addToCart} className="flex-1 px-4 py-2">
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="flex-1 px-4 py-2 border-outline-300"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </View>
  );
}
