<script setup lang="ts">
import { toRef } from 'vue';
import type { Result } from '@/characters/interfaces/character';
import { useRouter } from 'vue-router';

const props = defineProps<{ character: Result }>();
//toRef sirve para hacer referencia al objeto reactivo con sus props.
const character = toRef(props, 'character');

const router = useRouter();

const goTo = () => {
    router.push(`by/${ character.value.id }`)
}

</script>

<template>
    <div class="character-card" @click="goTo">
        <!-- <img v-if="[19].includes(character.id)" src="https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png" alt="No Avatar Png - Circle, Transparent Png@kindpng.com"> -->
        <img :src="character.image" :alt="character.name">
        <h3>{{ character.name }}</h3>
    </div>
</template>

<style scoped>
.character-card {
    margin-right: 5px;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
}

img {
    width: 150px;
    border-radius: 5px 5px 0px 0px;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
    transition: all .5s;
}

img:hover {
    box-shadow: 0px 2px 12px rgb(120, 62, 191);
    transition: all .5s;
}
</style>