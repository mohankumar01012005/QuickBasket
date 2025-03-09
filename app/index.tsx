import { FlatList } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import products from "../assets/products.json";

type Product = {
  id: number;
  name: string;
  price?: number;
  image?: string;
  description?: string;
};

type ProductListItemProps = {
  product: Product;
};

function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Card className="w-full  p-4 rounded-lg bg-white flex-1">
      <Image
        source={{ uri: product.image }}
        className="mb-4 h-[240px] w-full rounded-md aspect-[4/3]"
        alt="image"
        resizeMode="contain"
      />
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {product.name}
      </Text>
      <VStack className="mb-6">
        <Heading size="md" className="mb-4">
        ₹{product.price}
        </Heading>
        <Text size="sm">{product.description}</Text>
      </VStack>
      <Box className="flex flex-col sm:flex-row sm:space-x-3">
        <Button className="px-4 py-2 sm:flex-1">
          <ButtonText size="sm">Add to cart</ButtonText>
        </Button>
        <Button variant="outline" className="px-4 py-2 border-outline-300 sm:flex-1">
          <ButtonText size="sm" className="text-typography-600">Wishlist</ButtonText>
        </Button>
      </Box>
    </Card>
  );
}

export default function HomeScreen() {
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      // contentContainerClassName="gap-2"
      columnWrapperClassName="gap-1"
      renderItem={({ item }) => (
        <Box className="w-1/2 p-2">
          <ProductListItem product={item} />
        </Box>
      )}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
    />
  );
}
