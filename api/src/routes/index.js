const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Pokemon, Type} = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getPokemonApi = async () => {
    const pokemonUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const pokemonUrlNext = await axios.get(pokemonUrl.data.next);
    const allUrl = [...pokemonUrl.data.results, ...pokemonUrlNext.data.results];
    const allPokemon = allUrl.map(el => axios.get(el.url));
    var pokemons = Promise.all(allPokemon).then(res => {
        var arreglo = [];
        res.forEach(({data}) => {
            arreglo.push(
                {
                    name: data.name,
                    health: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    speed: data.stats[5].base_stat,
                    height: data.height,
                    weight: data.weight,
                    img: data.sprites.other.home.front_default,
                    id: data.id,
                    types: data.types.map(el => el.type.name),
                }
            );
        });
        return arreglo;
    });
    return pokemons;
};

const getPokemonDb = async () => {
    return await Pokemon.findAll({
        include:[{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }]
    })
};

const getAllPokemons = async () => {
    var apiPokemon = await getPokemonApi();
    var dbPokemon = await getPokemonDb();
    return [...apiPokemon, ...dbPokemon];
}

router.get('/pokemons', async (req, res) => {
    var name = req.query.name
    var allPokemons = await getAllPokemons();
    if (name) {
        name = name.toLowerCase();
        var pokemon = allPokemons.filter(e => e.name === name);
        res.status(200).send(pokemon);
    } else {
        res.status(200).send(allPokemons);
    }
});

router.get('/types', async (req, res) => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const types = typesApi.data.results.map(e => e.name);
    types.forEach(e => {
        Type.findOrCreate({
            where: {name: e}
        });
    });
    const allTypes = await Type.findAll();
    res.send(allTypes);
});

router.post('/pokemons', async (req, res) => {
    var {name,health,attack,defense,speed,height,weight,img,type,creadoEnDb} = req.body;
    var crearPokemon = await Pokemon.create({
        name,
        health,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
        creadoEnDb,
        type
    });
    var typeDb = await Type.findAll({ where: { name:type } });
    crearPokemon.addType(typeDb);
    res.send('Pokemon creado exitosamente');
});

router.get('/pokemons/:id', async (req, res) => {
    var {id} = req.params;
    const allPokemons = await getAllPokemons();
    if (id) {
        let pokemon = allPokemons.filter(e => e.id == id);
        pokemon.length?
        res.status(200).json(pokemon[0]):
        res.status(404).send('No se encontro el pokemon');
    }
});

module.exports = router;