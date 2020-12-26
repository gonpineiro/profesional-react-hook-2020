import React, { useState, useEffect, useReducer } from 'react';

/* State */
const initialState = {
    favorites: []
}

/* Reducer */
const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }

        default:
            return state;
    }
}

const Characters = () => {
    const [characters, setCharacters] = useState([])
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(res => res.json())
            .then(data => setCharacters(data.results))
    }, [])

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
    }

    const chardCard = (char) => (
        <div className="card" key={char.id}>
            <h2>{char.name}</h2>
            <img src={char.image} alt={char.name} />
            <button type="button" onClick={() => handleClick(char)}>Agregar a favoritos</button>
        </div>
    )

    return (
        <div className="characters">
            {
                favorites.favorites.map(favorite => (
                    <li key={favorite.id}>
                        {favorite.name}
                    </li>
                ))
            }

            {characters.map(character => (
                chardCard(character)
            ))}
        </div>
    );
}

export default Characters;
