import React from "react";
import styles from './card.module.css';

export default function Card ({pokemon}) {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function mapDbTypes(pokemon){
        var arr = [];
        if (pokemon.creadoDb) {
            arr = pokemon.types.map((e) => e.name);
        } else {
            arr = pokemon.types
        }
        if (arr.length === 2) {
            return `${arr[0].toUpperCase()} | ${arr[1].toUpperCase()}`
        }
        return arr[0].toUpperCase();
    }

    return (
        <div className={styles.card}>
            <img src={pokemon.img} alt='img not found' width='auto' height='250px' />
            <div className={styles.divider}/>
            <h3 className={styles.name}>
                {capitalizeFirstLetter(pokemon.name)}
            </h3>
            <div className={styles.divider2}/>
            <div className={styles.typesContainer}>
            <h5 className={styles.types}>{mapDbTypes(pokemon)}</h5>
            </div>
        </div>
    )
}