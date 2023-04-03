<script setup lang='ts'>
import { toRefs } from 'vue';
import type { StockProduct } from '@/utils/types';

defineEmits<{
    (event: 'addToCartClick', productToAdd: string, amount: number): void
}>()

const props = defineProps<{
    inventory: StockProduct[],
    recommended: StockProduct[],
}>()

const { inventory, recommended } = toRefs(props);

</script>


<template>
    <main class="wrapper">
        <h1>Products</h1>

        <div class="card-container">
            <div class="card" v-for="(inventoryItem, index) in inventory" :key="index">
                <div class="card-title">
                    {{ inventoryItem.name }}
                </div>
                <div class="card-body">
                    <i class="icofont-10x" :class="'icofont-' + inventoryItem.icon"></i>
                    <form>
                        <div class="row">
                            <div class="cell">
                                <label>Type:</label>
                            </div>
                            <div class="cell">
                                <em>{{ inventoryItem.type }}</em>
                            </div>
                        </div>
                        <div class="row">
                            <div class="cell">
                                <label>Price:</label>
                            </div>
                            <div class="cell">
                                ${{ inventoryItem.price.USD }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="cell">
                                <label>Quantity:</label>
                            </div>
                            <div class="cell">
                                <input type="number" v-model="inventoryItem.quantity">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <button class="btn btn-light"
                        @click="$emit('addToCartClick', inventoryItem.name, inventoryItem.quantity)">Add to cart</button>
                </div>
            </div>

        </div>
    </main>
</template>