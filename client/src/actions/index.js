import axios from 'axios';

export function getPokemons(){
    return async function (dispatch){
        var json = await axios.get('/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        });
    }
}

export function setLoading(){
    return {
        type: 'SET_LOADING'
    }
}

export function filterPokemonByType(payload){
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function sortByName(payload){
    return {
        type: 'SORT_BY_NAME',
        payload
    }
}

export function sortByAttack(payload){
    return {
        type: 'SORT_BY_ATTACK',
        payload
    }
}

export function getNamePokemons(name){
    return async function (dispatch){
        try{
            var json = await axios.get(`/pokemons?name=${name}`);
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            });
        } catch (err){
            console.log(err);
        }
    }
}

export function getTypes(){
    return async function (dispatch){
        try{
            var json = await axios.get('/types');
            return dispatch({
                type: 'GET_TYPES',
                payload: json.data
            });
        }catch(err){
            console.log(err);
        }
    }
}

export function postPokemon(payload){
    return async function (dispatch){
        var response = await axios.post('/pokemons', payload);
        return response;
    }
}

export function getDetails(id){
    return async function (dispatch){
        try{
            var json = await axios.get(`/pokemons/${id}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            });
        } catch (err){
            console.log(err);
        }
    }
}