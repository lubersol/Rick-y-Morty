<script setup lang="ts">
import type { RouterLink } from '@/router/link-routes';

// const props = defineProps({
//     title: {
//         type: String, 
//         default: 'Hola Mundo'
//     }
// });

//CUANDO TENGAMOS MÁS PROPS ES MEJOR HACERLO ASÍ
interface Props {
    title?: string;
    links: RouterLink[];
    showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showIcon: true, 
    links: () => [],
});

// OTRA FORMA DE HACERLO
// const props = defineProps<{ title?: string }>();
</script>

<template>
    <nav>
        <img v-if="props.showIcon" src="@/assets/logo.svg" alt="Vue Logo" height="25" width="25" />
        <span v-if="props.title">{{ props.title }}</span>

        <RouterLink
            v-for="link of props.links"
            :key="link.path"
            :to="link.path"
        >
            {{ link.title }}
        </RouterLink>

        <!-- <RouterLink to="/">Inicio</RouterLink> -->
        <!-- <RouterLink to="/about">Sobre</RouterLink> -->

    </nav>
</template>



<style scoped>
nav {
    align-items: flex-start;
    display: flex;
    font-size: 20px;
    margin-top: 10px;
    text-align: center;
    width: 100%;
}

img {
    margin-right: 5px;
}

span {
    margin-right: 10px;
}

a {
    margin-right: 5px;
}
</style>