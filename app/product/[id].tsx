import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, ScrollView, Pressable } from "react-native";
import products from "@/assets/products.json";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const [expanded, setExpanded] = useState(false);
  
  // Check if scrolling is needed
  const needsScroll = product && product.description.length > 150;

  if (!product) {
    return <Text className="text-center mt-10">Product details not found for ID: {id}</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center p-4 bg-gray-100">
      {/* Scrollable only if needed */}
      <ScrollView 
        className="w-full" 
        contentContainerStyle={{ flexGrow: 1 }} 
        scrollEnabled={needsScroll}
      >
        <Card className="w-full min-h-[85vh] p-4 rounded-lg bg-white flex justify-between">
          {/* Image */}
          <Image
            source={{ uri: product.image }}
            className="h-[40%] w-full rounded-md"
            alt="image"
            resizeMode="contain"
          />

          {/* Product Details */}
          <VStack className="justify-center">
            <Text className="text-lg font-semibold text-typography-700">{product.name}</Text>
            <Heading size="md" className="mt-2">₹{product.price}</Heading>

            {/* Description with "More" Button */}
            {expanded ? (
              <Text size="sm" className="mt-2 text-gray-600">{product.description}</Text>
            ) : (
              <Text size="sm" className="mt-2 text-gray-600 line-clamp-3">
                {product.description.length > 100 ? product.description.slice(0, 100) + "..." : product.description}
              </Text>
            )}

            {/* Show More Button */}
            {product.description.length > 100 && !expanded && (
              <Pressable onPress={() => setExpanded(true)}>
                <Text className="text-blue-500 mt-1">More</Text>
              </Pressable>
            )}
          </VStack>

          {/* Buttons */}
          <Box className="flex flex-row space-x-3 mt-4">
            <Button className="flex-1 px-4 py-2">
              <ButtonText size="sm">Add to cart</ButtonText>
            </Button>
            <Button variant="outline" className="flex-1 px-4 py-2 border-outline-300">
              <ButtonText size="sm" className="text-typography-600">Wishlist</ButtonText>
            </Button>
          </Box>
        </Card>
      </ScrollView>
    </View>
  );
}
