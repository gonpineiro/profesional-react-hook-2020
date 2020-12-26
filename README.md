### ¿Qué son los React Hooks y cómo cambian el desarrollo con React?
Es una característica que salió en la versión 16.8 en febrero de 2019.
Los Hooks vienen a cambiar la forma de desarrollo en React.
⠀
Vienen a resolver problemas ligados a React, como la complejidad de los componentes, no se podía compartir la lógica de estado entre componentes, Component Hell, etc.

Los Hooks presentan una alternativa al desarrollo con clases, ya que estos vienen a trabajar con funciones.
⠀
### ¿Qué es un Hook?
Un Hook es una función especial que nos permitirá conectarnos a características de React, para trabajar con métodos especiales, los cuales nos permitirán manejar el estado de mejor forma sin depender de clases.

⠀
Crear proyecto:
> npx create-react-app react-hooks
Ejecutar proyecto:
> npm run start

### useState

```javascript
    import React, { useState } from 'react';

    function Example() {
    // Declaración de una variable de estado que llamaremos "count"
    const [count, setCount] = useState(0);

    return (
        <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
        </div>
    );
    }
```

### useEffect

Te permite llevar a cabo efectos secundarios en componentes funcionales:

```javascript
    import React, { useState, useEffect } from 'react';

    function Example() {
    const [count, setCount] = useState(0);

    // De forma similar a componentDidMount y componentDidUpdate
    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
        </div>
    );
    }
```

### useContext

```javascript
    const value = useContext(MyContext);
```

Acepta un objeto de contexto (el valor devuelto de React.createContext) y devuelve el valor de contexto actual. El valor actual del contexto es determinado por la propiedad value del <MyContext.Provider> ascendentemente más cercano en el árbol al componente que hace la llamada.

Cuando el <MyContext.Provider> ascendentemente más cercano en el árbol se actualiza, el Hook activa una renderización con el value más reciente del contexto pasado a ese proveedor MyContext. Incluso sí un ancestro utiliza React.memo o shouldComponentUpdate, una nueva renderización aún pasará empezando con el componente en si mismo usando useContext.

No olvides que el argumento enviado a useContext debe ser el objeto del contexto en sí mismo:

<li><b>Correcto:</b> useContext(MyContext)</li>
<li><b>Incorrecto:</b> useContext(MyContext.Consumer)</li>
<li><b>Incorrecto:</b> useContext(MyContext.Provider)</li>


<br>
<b>Poniendo todo junto con Context.Provider:</b>

```javascript
    const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
    };

    const ThemeContext = React.createContext(themes.light);

    function App() {
    return (
        <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
        </ThemeContext.Provider>
    );
    }

    function Toolbar(props) {
    return (
        <div>
        <ThemedButton />
        </div>
    );
    }

    function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
        <button style={{ background: theme.background, color: theme.foreground }}>
        I am styled by theme context!
        </button>
    );
    }
```