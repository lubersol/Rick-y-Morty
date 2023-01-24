<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '@/characters/composables/useCharacter';

const router = useRouter();
const route = useRoute();

const { id } = route.params as {id: string};
const { character, errorMessage, hasError, isLoading } = useCharacter( id );

watchEffect(() => {
   if( !isLoading.value && hasError.value ) {
        //redirección en caso de que no exista el personaje
        router.replace('/characters');
   }
        
}); 

// const getCharacterCacheFirst = async( characterId: string ):Promise<Result> => {
//     if ( characterStore.checkIdInStore(characterId) ) {
//         return characterStore.ids.list[characterId];
//     }

//     const { data } = await breakingBadApi.get<Result>(`/character/${ characterId }`);
//     console.log({data});
    
//     return data;
// }

// const { data: character } = useQuery(
//     [ 'characters', id ],
//     () => getCharacterCacheFirst(id),
//     {
//         onSuccess( character ) {
//             characterStore.loadedCharacter(character);
//         }
//     }
// )

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>
    
    <div v-else-if="character">
        <h1>{{ character.name }}</h1>
        <div class="character-container">
            <img :src="character.image" :alt="character.name">
            <ul>
                <li>Status: {{ character.status }}</li>
                <li>Gender: {{ character.gender }}</li>
                <li>Species: {{ character.species }}</li>
                <li>Origen: {{ character.origin.name }}</li>
                <!-- <li>Temporadas: {{ character.episode.join(', ') }}</li> -->
            </ul>
        </div>
</div>
</template>


<style scoped>
.character-container {
    display: flex;
    flex-direction: row;
}
img {
    width: 150px;
    border-radius: 5px;
}
</style>