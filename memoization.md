# ¿Qué es memoization? Técnicas de optimización en programación funcional
<hr>
La memoria de JavaScript no es infinita, existe un máximo de funciones y cálculos que podemos hacer. Incluso si no la usamos toda, gastarla excesivamente causará que nuestras aplicaciones corran lento, con mucho lag o sencillamente briden una muy mala experiencia a los usuarios.

Nuestro código puede parecer pequeño cuando utilizamos técnicas de programación funcional como currying y recursividad. Pero no te dejes engañar. Así estemos llamando a la misma función una y otra vez recursivamente, cada cálculo o llamado a esta función genera nuevos “bloques” en la pila de ejecuciones que debe hacer JavaScript. Esto afecta a la memoria de JavaScript y puede estropear nuestra aplicación.

La buena noticia es que muy seguramente no tienes de qué preocuparte. Este “problema” no será realmente un problema a menos que construyas aplicaciones muy, muy grandes (por ejemplo, videojuegos en el navegador) donde la optimización de memoria es vital.

¡Pero tampoco te relajes! Tu responsabilidad como desarrolladora web profesional es siempre prepararte para resolver cualquier problema de programación, incluso si requieren técnicas “avanzadas” de optimización para que nuestro programa funcione a la perfección y para todos nuestros usuarios.

### Aplica memoization para evitar cálculos innecesarios
<hr>
La memoización (sí, sin r) es una técnica muy útil para evitar cálculos innecesarios en nuestro código. Guardamos el resultado de nuestros cálculos cada vez que los hacemos para no tener que repetirlos en el futuro. En otras palabras, estamos ahorrando grandes cantidades de tiempo a cambio de “mucho” espacio de almacenamiento.

### Ejemplo práctico: calcular el factorial
<hr>
El factorial de un número es su multiplicación por todos los números anteriores a este hasta llegar al 1. La implementación por defecto de una función factorial utilizando recursividad en JavaScript se vería así:

```javascript
    function factorial(n) {
        if (n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
```

```javascript
    function factorial(n) {
        if (n === 1) {
            console.log(`return 1;`)
            return 1;
        } else {
            console.log(`return ${n} * factorial(${n} - 1)`)
            return n * factorial(n - 1);
        }
    }
```

Al calcular el factorial de 5 estamos multiplicando 5 * 4 * 3 * 2 * 1. Y si calculamos el factorial de 10 estamos multiplicando 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1. Si te fijas bien, ambos cálculos terminan igual, con las multiplicaciones del 5 hasta el 1. Esto significa que al ejecutar el factorial de 5 y luego el factorial de 10, estamos repitiendo la última parte del cálculo.

Vamos a crear una variable de tipo array que nos permita ir guardando el resultado de todos nuestros cálculos. Luego actualizaremos nuestra función para que antes de hacer los cálculos inspeccionamos nuestra variable para encontrar si el factorial de nuestro número ya fue realizado antes y no debemos volver a hacer el cálculo.

```javascript
    const memo = [];

    function memoFactorial(n) {
        if (n === 1) {
            return 1;
        } else if (!memo[n]) {
            memo[n] = n * memoFactorial(n - 1);
        }  
        return memo[n];
    }
```

```javascript
    const memo = [];

    function memoFactorial(n) {
        if (n === 1) {
            console.log(`return 1;`)
            return 1;
        } else if (memo[n]) {
            console.log(`memoFactorial(${n+1} - 1) esta memoizado en memo[${n}] (${memo[n]})`)
            memo[n] = n * memoFactorial(n - 1);
        } else if (!memo[n]) {
            console.log(`memo[${n}] = ${n} * memoFactorial(${n} - 1)`)
        }
        return memo[n];
    }
```

### Segundo ejemplo práctico: la secuencia Fibonacci
<hr>
La función Fibonacci es una sucesión de números que llega hasta el infinito. Cada nuevo número en la sucesión es la suma del cálculo Fibonacci de los dos números anteriores en la sucesión (que empieza con cero y uno)

`0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377...`

El código en JavaScript para encontrar el número que ocupa X posición en la secuencia Fibonacci utilizando recursividad sería el siguiente:

```javascript
    function fibonacci(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    }
```

```javascript
    function fibonacci(n) {
        console.log(`Calculamos fibonacci de ${n}`)
        if (n === 0 || n === 1) {
            console.log(`n es igual a ${n}`)
            return 1;
        } else {
            console.log(`requerimos calcular el fibonacci de ${n-1} y ${n-2}`)
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    }
```

El cálculo es correcto, el cuarto número en la sucesión Fibonacci es 5. El problema es que estamos repitiendo muchas veces el cálculo de varios números.

Repetimos 5 veces el cálculo de fibonacci(0), 3 veces fibonacci(1) y 2 veces fibonacci(2). Para calcular el fibonacci de 4 puede no ser tan grave, pero mientras más grande sean los números, más cálculos debemos realizar y, por lo tanto, más cálculos estaremos repitiendo.

La buena noticia es que utilizando memoization podemos evitar hacer los mismos cálculos una y otra vez. Así como en el ejemplo anterior, vamos a guardar el resultado de cada cálculo Fibonacci en una variable memo, así cuando debamos volver a calcular el Fibonacci de un número, podemos simplemente utilizar el resultado que previamente calculamos.


```javascript
    const memo = [];

    function memoFibonacci(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else if (!memo[n]) {
            memo[n] = memoFibonacci(n - 1) + memoFibonacci(n - 2);
        }  
        return memo[n];
    }
```

Ahora el cálculo de memoFibonacci(4) es mucho más corto:

```javascript
    const memo = [];

    function memoFibonacci(n) {
        console.group(`Calculamos fibonacci de ${n}`)
        if (n === 0 || n === 1) {
            console.log(`n es igual a ${n}`)
            return 1;
        } else if (!memo[n]) {
            console.log(`fibonacci de ${n} no está guardado en memo`)
            console.log(`calculando fibonacci de ${n-1} y ${n-2}`)
            memo[n] = memoFibonacci(n - 1) + memoFibonacci(n - 2);
        }  

        console.log(`fibonacci de ${n} es: ${memo[n]}`)
        return memo[n];
    }
```
