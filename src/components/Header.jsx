import React, { useState } from 'react'

const Header = () => {
    const [darkMode, setDarkMode] = useState(false)

    const handleClick = () => {
        setDarkMode(!darkMode)
        if (darkMode) {
            document.getElementById('app').classList.add('dark-mode')
            document.getElementById('app').classList.remove('light-mode')
        } else {
            document.getElementById('app').classList.remove('dark-mode')
            document.getElementById('app').classList.add('light-mode')

        }
    }



    return (
        <div className="header">
            <h1>ReactHooks</h1>
            <button type="button" onClick={handleClick}>{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
        </div>
    )
}

export default Header