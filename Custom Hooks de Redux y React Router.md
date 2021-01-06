Los React Hooks cambiaron tanto la forma de hacer nuestro código para crear aplicaciones que otras herramientas también han creado sus propios custom hooks, de forma que podemos usarlos para que nuestro código sea más legible y fácil de mantener.

#### React Redux

Seguramente conoces react-redux, aquí podrás encontrar dos custom hooks que son muy útiles al momento de usar esta biblioteca: useSelector y useDispatcher. Estos los encontrarás a partir de la versión 7.1.0 de la biblioteca y a continuación te explicaré para qué sirven:

<li><b>useSelector</b>: nos permite elegir de qué contenido en nuestro estado queremos leer información para usarla en nuestro componente. </li>

```javascript
    // Primero debemos importar el hook desde react-redux
    import { useSelector } from 'react-redux';

    // El hook recibe una función y aquí indicamos qué parte del estado queremos
    const myProperty= useSelector(state => state.myProperty);
```

<li><b>useDispatcher</b>: nos permite ejecutar las acciones hacia nuestro estado. </li>

```javascript
    // Importamos el hook
    import { useDispatcher} from 'react-redux';

    // Creamos una variable donde vivirá nuestro dispatcher
    const dispatcher = useDispatcher();

    // Ahora solo debemos pasarle la información de la acción que se ejecutará en nuestro reducer
    dispatcher({ type: actionType, payload });
```

#### React Router

React Router también contiene diferentes custom hooks para acceder a varias funcionalidades e información de la navegación del usuario en nuestra aplicación.

<li><b>useHistory</b>: nos permite acceder a los métodos de navegación para movernos a través de ella de la forma que lo veamos más conveniente.</li>

```javascript
    import { useHistory } from 'react-router-dom';
    let history = useHistory();
    history.push('/home');
```

<li><b>useLocation</b>: nos permite acceder a la información de la URL actual en la que se encuentran nuestros usuarios.</li>

```javascript
    import { useLocation } from 'react-router-dom';
    let location = useLocation();
    console.log(location.pathname);
```

<li><b>useParams</b>: nos permite acceder a un objeto con la información de los parámetros que tendremos en la ruta que estamos navegando, por ejemplo, el slug de un blogpost.</li>

```javascript
    import { useParams } from 'react-router-dom';
    let { slug } = useParams();
    console.log(slug);
```

<li><b>useRouteMatch</b>: funciona al igual que los componentes <Route>, pero este hook también nos permitirá saber si existe algún match adicional que podremos usar para mostrar o no otra información en la misma vista.</li>

```javascript
    import { useRouteMatch } from 'react-router-dom';
    let match = useRouteMatch('/blog/:slug');

    return (
        <div>
            <h1>Hello World</h1>
            {match && <p>Route matches</p>}
        </div>
    )
```