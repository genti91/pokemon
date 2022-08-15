import React from "react";
import {Link} from 'react-router-dom';
import './Landing.css';

export default function LandingPage(){
    return(
        <div className="landingPage">
            <img className='pokemonLogo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png' alt=""/>
            <Link to ='/home'>
                <button className="landingButton">Ingresar</button>
            </Link>
        </div>
    )
}