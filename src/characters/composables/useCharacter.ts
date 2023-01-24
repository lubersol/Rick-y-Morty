import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import breakingBadApi from '@/api/breakingBadApi';

import type { Result } from '@/characters/interfaces/character';

const characterSet = ref<{ [id: string]: Result }>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async(id: string ): Promise<Result> => {
    if ( characterSet.value[id] ) 
        return characterSet.value[id];

    try {
        const { data } = await breakingBadApi.get<Result>(`/character/${ id }`);
        return data;

    } catch ( error: any ) {
        throw new Error(error)
    }
}

const loadedCharacter = ( character: Result ) => {
    hasError.value                   = false;
    errorMessage.value               = null;

    characterSet.value[character.id] = character;
}

const loadedFailed = ( error: string ) => {
    hasError.value = true;
    errorMessage.value = error;
}

const useCharacter = ( id: string ) => {

    const { isLoading } = useQuery(
        [ 'characters', id ],
        () => getCharacter(id),
        {
            onSuccess: loadedCharacter,
            onError: loadedFailed,
        }
    )

    return {
        //Properties
        errorMessage,
        hasError,
        isLoading,
        list: characterSet,
        //Getters
        character: computed<Result | null>( ()=> characterSet.value[id] ),
        //Methods
    }
}


export default useCharacter;