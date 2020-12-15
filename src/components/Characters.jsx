import React, { useState, useEffect } from 'react';

const Characters = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(res => res.json())
            .then(data => setCharacters(data.results))
    }, [])

    const chardCard = (char) => (
        <div className="card">
            <h2>{char.name}</h2>
            <img src={char.image} alt={char.name} />
        </div>
    )

    return (
        <div className="characters">
            {characters.map(character => (
                chardCard(character)
            ))}
        </div>
    );
}

export default Characters;
