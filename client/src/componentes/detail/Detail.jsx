import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./detail.module.css"

export default function Detail (){
    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    const myPokemon = useSelector ((state) => state.details);

    return (
        <div className={styles.detail}>
            <div className={styles.topBar}>
                <Link to='/home'>
                    <input className={styles.pokemonLogo} type="Image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"/>
                </Link>
                <Link to='/home'><button className={styles.goBack}>Go Back</button></Link>
            </div>
            <div className={styles.divider}/>
            {
                !myPokemon.id || myPokemon.id.toString() !== id ? 
                <img className={styles.loadingImg} src="http://superstorefinder.net/support/wp-content/uploads/2018/01/orange_circles.gif" width='200px' alt=""/> : 
                <div className={styles.pokemon}>
                    <img className={styles.pokImg} src={myPokemon.img} alt=""/>
                    <div className={styles.info}>
                        <h1>{myPokemon.name.toUpperCase()}</h1>
                        <h2>Health: {myPokemon.health} | Speed: {myPokemon.speed} | Attack: {myPokemon.attack}</h2>
                        <h2>Defense: {myPokemon.defense} | Height: {myPokemon.height} | Weight: {myPokemon.weight}</h2>
                        <h3>Type: {myPokemon.creadoDb ? myPokemon.types.map(e => e.name + (' ')) : myPokemon.types + ' '}</h3>
                    </div>
                </div>
            }
        </div>
    )
}