<script setup lang="ts">
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

import type { Product, StockProduct, CartItem, Order } from '@/utils/types'

import { onBeforeMount, ref } from 'vue'

const userId: number = 14;
let inventory = ref([] as StockProduct[]);
let recommended = ref([] as StockProduct[]);
let cart = ref([] as CartItem[]);
let isSidebarVisible = ref(false);

const openSidebar = (): void => {
  isSidebarVisible.value = true;
}

const closeSidebar = (): void => {
  isSidebarVisible.value = false;
}

const removeCartItemHandler = (itemName: string): void => {
  // Find item index
  const itemIndex = cart.value.findIndex((cartItem) => cartItem.itemName === itemName);

  if (itemIndex < 0) return;

  // If item exists -> remove it
  cart.value.splice(itemIndex, 1);
}

const checkoutHandler = (): void => {
  alert('Order addd to the "DB"! Please check console for more data.');
  const newOrder: Order =
    { userId, date: new Date(Date.now()), products: cart.value, total: getCartTotal() };

  console.log(newOrder);
}

const getCartTtlQuantity = (): number => {
  return cart.value.reduce((total, cartItem) => {
    total += cartItem.itemQuantity;
    return total;
  }, 0)
}

const getCartTotal = (): number => {
  const cartTotal = cart.value.reduce((total, cartItem) => {
    total += cartItem.itemQuantity * getPriceByName(cartItem.itemName);

    return total;
  }, 0)
  return cartTotal;
}

const getItemByName = (itemName: string): StockProduct | null => {
  return inventory.value.find((item) => item.name === itemName) || null;
}

const getPriceByName = (itemName: string, priceType: 'USD' | 'NOK' = 'USD'): number => {
  const item: StockProduct | null = getItemByName(itemName);

  return item?.price[priceType] || -1;
}

const getIconByName = (itemName: string): string => {
  const item: StockProduct | null = getItemByName(itemName);

  return item?.icon || '';
}

const addToCartHandler = (productToAdd: string, amount: number) => {
  if (amount < 1) return;

  const productFound = getItemByName(productToAdd);
  if (!productFound) return;

  const itemIndex: number = cart.value.findIndex(
    (inventoryItem: CartItem) => inventoryItem.itemName === productToAdd);

  if (itemIndex < 0)
    return cart.value.push({ id: productFound.id, itemName: productFound.name, itemQuantity: amount });

  else
    return cart.value[itemIndex].itemQuantity += amount
}

onBeforeMount(async (): Promise<void> => {
  try {
    const response = await fetch('./data/food.json');
    const data = await response.json();

    inventory.value = data.map((product: Product) => { return { ...product, quantity: 0 } });

    recommended.value = [data[14], data[0], data[9]];
  } catch (error) {
    console.error("Failed to fetch products!");
    console.error(error);
  }
})
</script>

<template>
  <Header :cartQuantity="getCartTtlQuantity()" @openCartClick="openSidebar" />

  <router-view :recommended="recommended" :inventory="inventory" :getPrice="getPriceByName" :getIcon="getIconByName"
    @addToCartClick="addToCartHandler" />

  <Sidebar v-if="isSidebarVisible" @closeCartClick="closeSidebar" :cart="cart" :getPrice="getPriceByName"
    :getIcon="getIconByName" @removeItemClick="removeCartItemHandler" @checkout="checkoutHandler" />
</template>
