<script setup lang="ts">
import type { Result } from '../interfaces/character';
import CharacterCard from './CharacterCard.vue';

interface Props{
    characters: Result[],
}

const props = defineProps<Props>();
// import { useCharacters } from '../composables/useCharacters';
// import { useQuery } from '@tanstack/vue-query';
// import breakingBadApi from '@/api/breakingBadApi';


//! 1- NORMAL SUSPENSE
//const { data: characters } = await breakingBadApi.get<Character>('/character');
//const characters = ref<Character>(data);

//! 2- COMPOSABLE FUNCTIONS
// const { characters, isLoading, hasError, errorMessage } = useCharacters() 

// const getCharactersSlow = async():Promise<Character> => {

//     return new Promise( (resolve) => {

//         setTimeout( async() => {
//             const { data } = await breakingBadApi.get<Character>('/character')
//             resolve(data);
//         }, 1)
//     })
//     // .filter( character => ![19].includes(character.id) )
// }

//! 3- TANSTACK QUERY
// const { isError, data:characters, error } = useQuery(
//     ['characters'],
//     // getCharactersSlow,
//     // {
//     //     cacheTime: 1000 * 60,
//     //     refetchOnReconnect: 'always'
//     // }
// );

</script>

<template>
    <!-- <h1 v-if="isLoading">Loading...</h1> -->
    <div class="card-list">
        <CharacterCard 
            v-for="character of props.characters"
            :key="character.id"
            :character="character"
        />
        <!-- <li 
            v-for="{ id, name } of characters?.results"
            :key="id"
        >
        {{ name }}
        </li> -->
    </div>
</template>



<style scoped>
.card-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>