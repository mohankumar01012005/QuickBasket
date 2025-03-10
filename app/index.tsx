import { FlatList, Pressable,useWindowDimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import products from "../assets/products.json";
import { Link } from "expo-router";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";



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
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="w-full h-[300px] p-4 rounded-lg bg-white flex flex-grow justify-between">
          <Image
            source={{ uri: product.image }}
            className="mb-4 h-[180px] w-full rounded-md"
            alt="image"
            resizeMode="contain"
          />
          <Text className="text-sm font-normal text-typography-700" numberOfLines={2}>
            {product.name}
          </Text>
          <Heading size="md" className="mt-auto">
            ₹{product.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}

export default function HomeScreen() {
  // const {width} = useWindowDimensions();
  // const noColumns= width>700 ? 3:2

  const noColumns=useBreakpointValue({
    default:2,
    sm:3,
    xl:4,
  });
  return (
    <FlatList
      key={noColumns}
      data={products}
      numColumns={noColumns}
      keyExtractor={(item) => item.id.toString()}
      columnWrapperClassName="gap-x"
      renderItem={({ item }) => (
        <Box className="w-1/2 p-2">
          <ProductListItem product={item} />
        </Box>
      )}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
    />
  );
}
