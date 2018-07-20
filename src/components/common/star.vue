<template>
    <span class="star">
        <span v-for="n in Math.ceil(num)" :key="n">★</span>
    </span>
</template>

<script>
export default {
    props: {
        num: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style scoped>
.star {color: #ffcc00}
</style>

