import { View, Text, FlatList } from "react-native";
import products from "../assets/products.json";
import { Button, ButtonText } from "@/components/ui/button";

type Product = {
  id: number;  
  name: string;
  price?: number; 
};

type ProductListItemProps = {
  product: Product;
};


function ProductListItem({ product }: ProductListItemProps) {
  return <Text style={{ fontSize: 30 }}>{product.name}</Text>;
}

// Home Screen Component
export default function HomeScreen() {
  return (
    // <FlatList 
    //   data={products}
    //   keyExtractor={(item) => item.id.toString()} 
    //   renderItem={({ item }) => <ProductListItem product={item} />}
    // />
    <Button>
      <ButtonText>Done</ButtonText>
    </Button>
  );
}
