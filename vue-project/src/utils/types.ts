export type Product = {
  id: number;
  name: string;
  icon: string;
  price: {
    USD: number;
    NOK: number;
  };
  type: string;
};

export type StockProduct = Product & { quantity: number };

export type CartItem = {
  id: number;
  itemName: string;
  itemQuantity: number;
};

export type Order = {
  userId: number;
  date: Date;
  products: CartItem[];
  total: number;
};
