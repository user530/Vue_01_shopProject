<script setup lang="ts">
import { toRefs } from 'vue';

defineEmits<{
    (event: 'openCartClick'): void
}>();

const props = defineProps<{
    cartQuantity: Number,
}>()

const { cartQuantity } = toRefs(props);

</script>

<template>
    <header class="top-bar spread">
        <nav class="top-bar-nav">
            <router-link to="/" class="top-bar-link">
                <i class="icofont-spoon-and-fork"></i>
                <span>Home</span>
            </router-link>
            <router-link to="products" class="top-bar-link">
                <span>Products</span>
            </router-link>
            <router-link to="past-orders" class="top-bar-link">
                <span>Past Orders</span>
            </router-link>
        </nav>
        <div class="top-bar-cart-link">
            <i class="icofont-cart-alt icofont-1x"></i>
            <span @click="(e) => $emit('openCartClick')">Cart ({{ cartQuantity }})</span>
        </div>
    </header>
</template>