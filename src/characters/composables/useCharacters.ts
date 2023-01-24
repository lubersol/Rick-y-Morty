import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import breakingBadApi from '@/api/breakingBadApi';
import type { Result } from '@/characters/interfaces/character';
import type { Character } from '@/characters/interfaces/character';

const characters   = ref(<Result[]>([]));
const hasError     = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async(): Promise<Result[]> => {
    
    if( characters.value.length > 0 ) {
        return characters.value;
    }

    const { data } = await breakingBadApi.get<Character>('/character');
    return data.results;
}

const loadedCharacters = ( data: Result[] ) => {
    hasError.value     = false;
    errorMessage.value = null;
    characters.value   = data.filter( character => ![19].includes(character.id));
}

const useCharacters = () => {

    const { isLoading } = useQuery(
            ['characters'],
            getCharacters,
            {
                onSuccess: loadedCharacters,
            }
        );


    return {
        //Properties
        characters,
        errorMessage,
        hasError,
        isLoading,

        //Getters
        count: computed( () => characters.value.length),  
        //Methods
    }
}

export default useCharacters;