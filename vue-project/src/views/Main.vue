<script setup lang="ts">
import type { StockProduct } from '@/utils/types';
import { toRefs } from 'vue';

defineEmits<{
    (event: 'addToCartClick', productToAdd: string, amount: number): void
}>()

const props = defineProps<{
    recommended: StockProduct[],
    inventory: StockProduct[],
    getPrice: (itemName: string, priceType: 'USD' | 'NOK') => number,
    getIcon: (itemName: string) => string
}>()

const { recommended, inventory } = toRefs(props)

</script>

<template>
    <div class="splash-container">
        <div class="splash">
            <h1>Splendid Food</h1>
        </div>
    </div>

    <main class="wrapper">

        <h2>Recommended</h2>

        <div class="recommended">

            <div class="card" v-for="(product, ind) in recommended" :key="ind">
                <div class="card-title">
                    {{ product.name }}
                </div>
                <div class="card-body">
                    <i class="icofont-10x" :class="'icofont-' + product.icon"></i>
                    <form>
                        <div class="row">
                            <div class="cell">
                                <label>Type:</label>
                            </div>
                            <div class="cell">
                                <em>{{ product.type }}</em>
                            </div>
                        </div>
                        <div class="row">
                            <div class="cell">
                                <label>Price:</label>
                            </div>
                            <div class="cell">
                                ${{ product.price.USD }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="cell">
                                <label>Quantity:</label>
                            </div>
                            <div class="cell">
                                <input type="number" v-model="product.quantity">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <button @click="$emit('addToCartClick', product.name, product.quantity)" class="btn btn-light">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>

    </main>
</template>