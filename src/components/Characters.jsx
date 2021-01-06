import React, { useState, useEffect, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from './Search';

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
    /* useState */
    const [characters, setCharacters] = useState([])

    /* useReducer */
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

    /* useMemo */
    const [search, setSearch] = useState('')

    /* useRef */
    const searchInput = useRef(null)

    /* useEffect */
    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(res => res.json())
            .then(data => setCharacters(data.results))
    }, [])

    /* useReducer */
    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
    }

    /* useMemo, useRef, useCallback */
    /* const handleSearch = () => {
        setSearch(searchInput.current.value)
    } */

    const handleSearch = useCallback(() =>{
        setSearch(searchInput.current.value)
    }, [])

    /* const filteredUsers = characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase())
    }) */

    const filteredUsers = useMemo(() =>
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase())
        }),
        [characters, search]
    )

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

            <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>

            {filteredUsers.map(character => (
                chardCard(character)
            ))}
        </div>
    );
}

export default Characters;
