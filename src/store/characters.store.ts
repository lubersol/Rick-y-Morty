import { reactive } from 'vue';

import breakingBadApi from '@/api/breakingBadApi';
import type { Result } from '@/characters/interfaces/character';
import type { Character } from '@/characters/interfaces/character';

interface Store {
    characters: {
        list: Result[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    ids: {
        list: {
            [id: string]: Result;
        };
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    //Metodos de Characters
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Result[] ) => void;
    loadedCharactersFailed: ( error: string ) => void;

    //Metodos de Characters por IDs
    startLoadingCharacter: () => void;
    checkIdInStore: (id: string) => boolean;
    loadedCharacter: ( character: Result ) => void;
}

//Initial State
const characterStore = reactive<Store>({
    characters: {
        list: [],
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: false,
    },
    ids: {
        list: {},
        isLoading: false, 
        hasError: false,
        errorMessage: null,
    },
//METODOS DE CHARACTERS
    async startLoadingCharacters() {
        const { data } = await breakingBadApi.get<Character>('/character');
        this.loadedCharacters(data.results);
    },
    // loadedCharacters( data: Result[] ) {
    //     const characters = data.filter( character => ![19].includes(character.id));
    //     this.characters = {
    //         count: characters.length,
    //         errorMessage: null,
    //         hasError: false,
    //         isLoading: false,
    //         list: characters,
    //     };
    // },
//EJEMPLO PARA MANEJAR ERRORES EN LA PETICION PQ ALGUNAS APIS DAN 200 PERO NO DEVUELVEN NADA Y ES X ERROR EN LA PETICION(DARIA UN <!DOCTYPE)
    loadedCharacters(data: Result[] | string) {
        if (typeof data === 'string') {
            return this.loadedCharactersFailed('La respuesta no es un arreglo de personajes');
        }
        const characters = data.filter(character => ![19].includes(character.id));

        this.characters = {
            count: characters.length,
            errorMessage: null,
            hasError: false,
            isLoading: false,
            list: characters,
        };
    },
    loadedCharactersFailed(error: string) {
        this.characters = {
            count: 0,
            errorMessage: error,
            hasError: true,
            isLoading: false,
            list: [],
        };
    },
//METODOS DE CHARACTERS POR ID
    startLoadingCharacter() {
        this.ids = {
            ...this.ids,
            isLoading: true,
            hasError: false,
            errorMessage: null,
        }
    },
    checkIdInStore(id: string) {
        return !!this.ids.list[id];
    },
    loadedCharacter(character: Result) {
        this.ids.isLoading = false;
        this.ids.list[character.id] = character;
    },
});


characterStore.startLoadingCharacters();


export default characterStore;