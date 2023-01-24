<script setup lang="ts">
// import { useQuery } from '@tanstack/vue-query';
// import characterStore from '@/store/characters.store';

import CardList from '@/characters/components/CardList.vue';
// import breakingBadApi from '@/api/breakingBadApi';
// import type { Character } from '@/characters/interfaces/character';
// import type { Result } from '@/characters/interfaces/character';
import useCharacters from '@/characters/composables/useCharacters';

const props = defineProps<{ title: string, visible: boolean }>();

const { isLoading, hasError, errorMessage, characters, count } = useCharacters();
//Permite que solo se haga una recarga de personajes y si cb de pag y volvemos no vuelve a hacer la llamada
// const getCharactersCacheFirst = async(): Promise<Result[]> => {
//     if( characterStore.characters.count > 0 ) {
//         return characterStore.characters.list;
//     }
//     const { data } = await breakingBadApi.get<Character>('/character');
//     return data.results;
// }

// const getCharacters = async(): Promise<Character> => {
//     const { data } = await breakingBadApi.get<Character>('/character');
//     console.log({ data });
//     // const characters = data.results.filter(character=>![19].includes(character.id));
//     // console.log({ characters });
//     return data;
// }

// console.log(getCharacters);

// const { isLoading, data } = useQuery(
//     ['characters'],
//     // getCharactersCacheFirst,
//     {
//         onSuccess( data ) {
//             characterStore.loadedCharacters(data);
//         },
//         // onError() {
//         //     characterStore.loadedCharactersFailed('Fallo al cargar la petición');
//         // }
//     }
// );
// const getCharactersSlow = async():Promise<Character> => {
//     return new Promise( (resolve) => {
//         setTimeout( async() => {
//             const { data } = await breakingBadApi.get<Character>('/character')
//             resolve(data);
//         }, 1)
//     })
// //     // .filter( character => ![18].includes(character.id) )
// }

</script>

<template>
        <h1 v-if="isLoading">Loading...</h1>

        <div v-else-if="hasError">
            <h1>Error al cargar</h1>
            <p>{{ errorMessage }}</p>
        </div>


        <template v-else>
            <h2>{{ props.title }} - ({{ count }})</h2>
            <CardList :characters="characters" />
    </template>
</template>


<style scoped>

</style>