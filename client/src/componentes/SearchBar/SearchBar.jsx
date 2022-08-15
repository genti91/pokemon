import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions";
import styles from './searchBar.module.css'

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNamePokemons(name));
    }

    return(
        <div className={styles.searchBar}>
            <input className="searchInput" type= 'text' name="" placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
            <button className="searchButton" href="#" type="submit" onClick={(e) => handleSubmit(e)}>
                <i className="material-icons">search</i>
            </button>
        </div>
    )
}