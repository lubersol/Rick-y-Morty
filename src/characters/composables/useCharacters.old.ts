import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { Character } from '@/characters/interfaces/character';
import breakingBadApi from '@/api/breakingBadApi';

const characters = ref<Character>();
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharactersOld = () => {

    onMounted(() => {
        loadCharacters();
    });

    const loadCharacters = async() => {
        isLoading.value = true;
        try {
            const { data } = await breakingBadApi.get<Character>('/character');
            characters.value = data;    
            isLoading.value = false;
        } catch (error){
            hasError.value = true;
            if ( axios.isAxiosError(error) ) {
                return errorMessage.value = error.message;
            }
            
            errorMessage.value = JSON.stringify(error);
        }

    }
        // .then( resp => {
        //     // const name = resp.data.results[0].name;
        //     // console.log({ name });
        //     characters.value = resp.data;
        //     isLoading.value = false;
        // });
    
    return {
        characters,
        isLoading,
        hasError,
        errorMessage
    }
}