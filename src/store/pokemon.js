import { baseUrl } from '../config';



const LOAD = 'pokedex/pokemon/LOAD';

const load = (pokeList) => {
    return {
        type: LOAD,
        pokeList,
    }
}

//thunks

export const getPokemon = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    // AJAX call

    try {
        const res = await fetch(`${baseUrl}/pokemon/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        // Handle response

        if (!res.ok) throw res;

        const pokeList = await res.json();
        dispatch(load(pokeList));

    } catch (e) { console.log(e) }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                pokeList: action.pokeList,
            };
        }
        default: return state;
    }
}