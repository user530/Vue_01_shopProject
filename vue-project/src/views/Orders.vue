<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import type { Order } from '@/utils/types'

const orders = ref([] as Order[]);

const props = defineProps<{
    getPrice: (itemName: string, priceType?: 'USD' | 'NOK') => number,
    getIcon: (itemName: string) => string
}>()

const { getPrice, getIcon } = toRefs(props);

onMounted(async () => {
    try {
        const response = await fetch('./data/orders.json');
        const data = await response.json();

        orders.value = data;
    } catch (error) {
        console.error("Failed to fetch orders!");
        console.error(error);
    }
})
</script>

<template>
    <main class="wrapper">
        <h1>Past Orders</h1>

        <div class="order" v-for="(order, index) in orders" :key="index">
            <h4>Order date: {{ new Date(order.date).toUTCString() }}</h4>
            <table class="product-table">
                <thead>
                    <tr>
                        <td><span class="sr-only">Product Image</span></td>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total</td>
                        <td><span class="sr-only">Actions</span></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cartItem, itemIndex) in order.products" :key="itemIndex">
                        <td><i class="icofont-4x" :class="'icofont-' + getIcon(cartItem.itemName)"></i></td>
                        <td>{{ cartItem.itemName }}</td>
                        <td>${{ getPrice(cartItem.itemName).toFixed(2) }}</td>
                        <td>{{ cartItem.itemQuantity }}</td>
                        <td>${{ (cartItem.itemQuantity * getPrice(cartItem.itemName)).toFixed(2) }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <h4>${{ order.total }}</h4>
                        </td>
                    </tr>
                </tbody>
            </table>

            <hr>
        </div>

    </main>
</template>