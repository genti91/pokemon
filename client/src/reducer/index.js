
const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: {},
    loading: false
}

function sortAsc(a,b) {
    if (a<b) return -1;
    if (a>b) return 1;
    return 0;
}
function sortDesc(a,b) {
    if (a>b) return -1;
    if (a<b) return 1;
    return 0;
}


function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'GET_NAME_POKEMONS':
            return{
                ...state,
                pokemons: action.payload
            }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }
        case 'POST_POKEMON':
            return state
        case 'FILTER_BY_TYPE':
            const typeFilter = action.payload === 'all' ? state.allPokemons : state.allPokemons.filter(e => {
                if(e.types.includes(action.payload)) return true;
                if (!e.types[0].name) return false;
                for (let i = 0; i < e.types.length; i++) {
                    if (e.types[i].name === action.payload) return true;
                }
                return false;
            });
            return{
                ...state,
                pokemons: typeFilter
            }
        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ? state.allPokemons.filter(e => e.creadoDb) : state.allPokemons.filter(e => !e.creadoDb)
            return{
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons : createdFilter
            }
        case 'SORT_BY_NAME':
            const sortedPokemons = action.payload === 'asc' ? state.allPokemons.sort((a,b) => sortAsc(a.name, b.name)) : state.allPokemons.sort((a,b) => sortDesc(a.name, b.name));
            return{
                ...state,
                pokemons: sortedPokemons
            }
        case 'SORT_BY_ATTACK':
            const sortedPokemons2 = action.payload === 'less' ? state.allPokemons.sort((a,b) => sortAsc(a.attack, b.attack)) : state.allPokemons.sort((a,b) => sortDesc(a.attack, b.attack));
            return{
                ...state,
                pokemons: sortedPokemons2
            }
        case 'SET_LOADING':
            return{
                ...state,
                loading: !state.loading
            }
        default:
            return state;
    }
}

export default rootReducer;