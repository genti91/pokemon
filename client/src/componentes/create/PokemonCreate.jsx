import React, {useState,useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postPokemon, getTypes} from "../../actions/index"
import { useDispatch, useSelector } from "react-redux";
import styles from './pokemonCreate.module.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Name is required.";
    } else if (input.health > 255 || input.health < 1 || isNaN(input.health) || !input.health) {
        errors.health = "Health must be between 1 and 255."
    } else if (input.weight > 1000 || input.weight < 1 || isNaN(input.weight) || !input.weight) {
        errors.weight = "Weight must be between 1 and 1000."
    } else if (input.height > 1000 || input.height < 1 || isNaN(input.height) || !input.height) {
        errors.height = "Height must be between 1 and 1000."
    } else if (input.attack > 255 || input.attack < 1 || isNaN(input.attack) || !input.attack) {
        errors.attack = "Attack must be between 1 and 255."
    } else if (input.defense > 255 || input.defense < 1 || isNaN(input.defense) || !input.defense) {
        errors.defense = "Defense must be between 1 and 255."
    } else if (input.speed > 255 || input.speed < 1 || isNaN(input.speed) || !input.speed) {
        errors.speed = "Speed must be between 1 and 255."
    } else if (!input.img) {
        errors.img = "Image is required.";
    } else if (input.type[0] === 'null' && input.type[1] === 'null') {
        errors.type = "At least one type is required."
    }
    console.log(errors);
    return errors;
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({
        name:'',
        img:'',
        type:'',
        health:'',
        weight:'',
        height:'',
        attack:'',
        defense:'',
        speed:''
    });
    const [input, setInput] = useState({
        name:'',
        img:'',
        type:['null','null'],
        health:'',
        weight:'',
        height:'',
        attack:'',
        defense:'',
        speed:''
    });

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(errors);
        console.log(input)
    }

    function hadleSelect1(e){
        setInput({
            ...input,
            type: [e.target.value, input.type[1]]
        })
    }
    function hadleSelect2(e){
        setInput({
            ...input,
            type: [input.type[0], e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setInput({
            ...input,
            type: input.type.filter((e) => e !== 'null')
        })
        console.log(errors);
        console.log(input);
        if(Object.keys(errors).length === 0 && input.name !== ''){
            dispatch(postPokemon(input));
            console.log(input);
            alert("Pokemon Created!");
            setInput({
                name:'',
                img:'',
                type:[],
                health:'',
                weight:'',
                height:'',
                attack:'',
                defense:'',
                speed:''
            });
            history.push('/home');
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.goBack}><Link to='/home'><img className={styles.goBackImg} src="https://cdn-icons-png.flaticon.com/512/469/469375.png?w=360" alt=''/></Link></div>
                <div className={styles.title}>Welcome</div>
                <div className={styles.subtitle}>Let's create your Pokemon!</div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.inputContainer1}>
                        <input className={styles.input} type='text' placeholder=" " value={input.name} name='name' onChange={(e) => handleChange(e)}/>
                        {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                        <div className={styles.cut}></div>
                        <label className={styles.placeholder}>Name:</label>
                    </div>
                    <div className={styles.inputContainer2}>
                        <input className={styles.input} type='text' placeholder=" " value={input.health} name='health' onChange={(e) => handleChange(e)}/>
                        {errors.health && (<p className={styles.error}>{errors.health}</p>)}
                        <div className={styles.cut}></div>
                        <label className={styles.placeholder}>Health:</label>
                    </div>
                    <div className={styles.inputContainer2}>
                        <input className={styles.input} type='text' placeholder=" " value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
                        {errors.weight && (<p className={styles.error}>{errors.weight}</p>)}
                        <div className={styles.cut}></div>
                        <label className={styles.placeholder}>Weight:</label>
                    </div>
                    <div className={styles.inputContainer2}>
                        <input className={styles.input} type='text' placeholder=" " value={input.height} name='height' onChange={(e) => handleChange(e)}/>
                        {errors.height && (<p className={styles.error}>{errors.height}</p>)}
                        <div className={styles.cut}></div>
                        <label className={styles.placeholder}>Height:</label>
                    </div>
                    <div className={styles.inputContainer2}>
                        <input className={styles.input} type='text' placeholder=" " value={input.attack} name='attack' onChange={(e) => handleChange(e)}/>
                        {errors.attack && (<p className={styles.error}>{errors.attack}</p>)}
                        <div className={styles.cut}></div>
                        <label className={styles.placeholder}>Attack:</label>
                    </div>
                    <div className={styles.inputContainer2}>
                        <input className={styles.input} type='text' placeholder=" " value={input.defense} name='defense' onChange={(e) => handleChange(e)}/>
                        {errors.defense && (<p className={styles.error}>{errors.defense}</p>)}
                        <div className={styles.cut}></div>
                        <label className={styles.placeholder}>Defense:</label>
                    </div>
                    <div className={styles.inputContainer2}>
                        <input className={styles.input} type='text' placeholder=" " value={input.speed} name='speed' onChange={(e) => handleChange(e)}/>
                        {errors.speed && (<p className={styles.error}>{errors.speed}</p>)}
                        <div className={styles.cut}></div>
                        <label className={styles.placeholder}>Speed:</label>
                    </div>
                    <div className={styles.inputContainer2}>
                        <input className={styles.input} type='text' placeholder=" " value={input.img} name='img' onChange={(e) => handleChange(e)}/>
                        {errors.img && (<p className={styles.error}>{errors.img}</p>)}
                        {errors.type && (<p className={styles.error}>{errors.type}</p>)}
                        <div className={styles.cut}></div>
                        <label className={styles.placeholder}>Image:</label>
                    </div>

                    <div>
                        <select className={styles.types} onChange={(e) => hadleSelect1(e)}>
                            <option value='null' key='type1'>Type 1</option>
                            {types.map((type) => (<option value={type.name} key={type.name}>{type.name}</option>))}
                        </select>
                        <div className={styles.divider}/>
                        <select className={styles.types} onChange={(e) => hadleSelect2(e)}>
                            <option value='null' key='type2'>Type 2</option>
                            {types.map((type) => (<option value={type.name} key={type.name + '2'}>{type.name}</option>))}
                        </select>
                    </div>

                    <div>
                        <button className={styles.submit} type="submit">Create Pokmon</button>
                    </div>
                </form>
            </div>
        </div>
    )
}