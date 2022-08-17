import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons, filterPokemonByType, filterCreated, sortByName, sortByAttack, getTypes} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from './home.module.css';

export default function Home (){
    const dispatch = useDispatch();
    const pokemons = useSelector((state)=>state.pokemons);
    const types = useSelector((state) => state.types);
    const allPokemons = useSelector((state) => state.allPokemons);
    const loading = useSelector((state) => state.loading);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage/*, setPokemonsPerPage*/] = useState(12);
    const [orden, setOrden] = useState('');
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon-pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect ( () => {
        dispatch(getPokemons());
        dispatch(getTypes());
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterType(e) {
        dispatch(filterPokemonByType(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        console.log(orden)
        setOrden(e.target.value);
    }

    function handleSortByAttack(e) {
        e.preventDefault();
        dispatch(sortByAttack(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    return (
        <div className={styles.home}>
            <div className={styles.topBar}>
                <input className={styles.pokemonImg} type="Image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" onClick={e => {handleClick(e)}}/>
                <div className={styles.searchBar}><SearchBar setCurrentPage={setCurrentPage}/></div>
                <Link to = '/addpokemon'><button className={styles.crearPokemon}>Create Pokemon</button></Link>
            </div>
            <div className={styles.filtros}>
                <select className={styles.filtro} onClick={e => {handleSortByName(e)}}>
                    <option key='alp'>Alphabetic</option>
                    <option value='asc' key='asc'>Ascending (A-Z)</option>
                    <option value='desc' key='desc'>Descending (Z-A)</option>
                </select>
                <div className={styles.divider}/>
                <select className={styles.filtro} onClick={e => {handleSortByAttack(e)}}>
                    <option key='atta'>Attack</option>
                    <option value='less' key='less'>Less -</option>
                    <option value='more' key='more'>More +</option>
                </select>
                <div className={styles.divider}/>
                <select className={styles.filtro} onChange={e => handleFilterType(e)}>
                    <option key='type'>Type</option>
                    {types.map((type) => (
                        <option value={type.name} key={type.name}>{type.name}</option>
                    ))}
                </select>
                <div className={styles.divider}/>
                <select className={styles.filtro} onChange={e => handleFilterCreated(e)}>
                    <option key='src'>Source</option>
                    <option value='all' key='all'>All</option>
                    <option value='created' key='db'>Db</option>
                    <option value='api' key='api'>Api</option>
                </select>
            </div>
            {allPokemons.length === 0 || loading ? <img className={styles.loadingImg} src="http://superstorefinder.net/support/wp-content/uploads/2018/01/orange_circles.gif" width='200px' alt=""/>:
            currentPokemons.length !== 0 ?
                <div className={styles.cards}>
                    {
                        currentPokemons?.map((e,i) => {
                            return (
                                <Link key={i} className={styles.cardLink} to={'/home/' + e.id}>
                                    <Card pokemon={e}/>
                                </Link>
                            );
                        })
                    }
                </div> : 
                <div className={styles.warning}>There are no pokemons with those characteristics</div>
                }
                {!loading ? <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={pokemons.length}
                paginado={paginado}
                />:''}
        </div>
    )

}