import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons, setLoading } from "../../actions";
import styles from './searchBar.module.css'

export default function SearchBar ({currentPokemons}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    currentPokemons.hola = 'loading';
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(setLoading());
        await dispatch(getNamePokemons(name));
        dispatch(setLoading());
        setName('');
    }

    return(
        <div className={styles.searchBar}>
            <input className="searchInput" type= 'text' name="name" value={name} placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
            <button className="searchButton" href="#" type="submit" onClick={(e) => handleSubmit(e)}>
                <i className="material-icons">search</i>
            </button>
        </div>
    )
}