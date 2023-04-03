<script setup lang="ts">

import type { CartItem } from '@/utils/types'
import { toRefs } from 'vue';


const props = defineProps<{
    cart: CartItem[],
    getPrice: (itemName: string, priceType?: 'USD' | 'NOK') => number,
    getIcon: (itemName: string) => string
}>()

defineEmits<{
    (e: 'closeCartClick'): void,
    (e: 'removeItemClick', itemName: string): void,
    (e: 'checkout'): void
}>()

const { cart, getPrice, getIcon } = toRefs(props);

const getCartItemTotal =
    (itemName: string, itemQuantity: number, priceType: 'USD' | 'NOK' = 'USD'): number => {
        const total = itemQuantity * getPrice.value(itemName, priceType);
        return Number(total.toFixed(2));
    }

const getCartTotal = (): number => {
    return cart.value.reduce((total, cartItem) => {
        total += getCartItemTotal(cartItem.itemName, cartItem.itemQuantity);
        return total;
    }, 0)
}

</script>

<template>
    <aside class="cart-container">
        <div class="cart">
            <h1 class="cart-title spread">
                <span>
                    Cart
                    <i class="icofont-cart-alt icofont-1x"></i>
                </span>
                <button class="cart-close" @click="(e) => $emit('closeCartClick')">&times;</button>
            </h1>

            <div class="cart-body">
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th><span class="sr-only">Product Image</span></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cartItem, index) in cart" :key="index">
                            <td><i :class="'icofont-' + getIcon(cartItem.itemName)" class="icofont-3x"></i></td>
                            <td>{{ cartItem.itemName }}</td>
                            <td>${{ getPrice(cartItem.itemName) }}</td>
                            <td class="center">{{ cartItem.itemQuantity }}</td>
                            <td>${{ getCartItemTotal(cartItem.itemName, cartItem.itemQuantity).toFixed(2) }}</td>
                            <td class="center">
                                <button class="btn btn-light cart-remove"
                                    @click="$emit('removeItemClick', cartItem.itemName)">
                                    &times;
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p v-if="cart.length === 0" class="center"><em>No items in cart</em></p>
                <div class="spread">
                    <span><strong>Total:</strong> ${{ getCartTotal().toFixed(2) }}</span>
                    <button class="btn btn-light" @click="$emit('checkout')">Checkout</button>
                </div>
            </div>
        </div>
    </aside>
</template>
