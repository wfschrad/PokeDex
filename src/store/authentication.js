import { baseUrl } from '../config';
import { Switch } from 'react-router-dom';

const SET_TOKEN = 'pokedex/authentication/SET_TOKEN';

//actions

export const setToken = (token) => (
    {
        type: SET_TOKEN,
        token
    }
);

export const login = (email, password) => async dispatch => {
    try {
        const response = await fetch(`${baseUrl}/session`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) throw new Error('login fetch failed');

        const { token } = await response.json();
        dispatch(setToken(token));

    } catch (e) { console.log('error', e); };
}

//reducers

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            };
        }

        default: return state;
    }
}