function romanize(n) {
    var
        values = [1, 5, 10, 50, 100, 500, 1000],
        letras = ['I', 'V', 'X', 'L', 'C', 'D', 'M'],
        res = [],
        num, letra, val, pos, insert

    for (var i = 6; num = values[i], letra = letras[i]; i--) {
        // Suficientemente grande
        if (n >= num) {
            // Número de letras repetidas
            var r = Math.floor(n / num);

            // Restamos el actual
            n -= r * num;

            if (r < 4) {
                // Metemos las letras
                while (r--) {
                    res.push(letra);
                }
            } else {
                // No se pueden repetir 4+ veces
                val = res.pop(); // Última letra

                // Si es el string vacío o letra == "M" (no hay anterior)
                // usamos la letra anterior a esta
                pos = (val ? letras.indexOf(val) : i) + 1;

                // Y si letra == "M" -> letras[pos] no existirá y usamos M
                insert = letra + (letras[pos] || 'M');

                // Insertamos el string
                res.push(insert);
            }
        } else {
            // Si no vamos a poner letra usamos un ""
            // para que no afecte pop
            res.push('');
        }
    }

    return res.join('');
}

function decimal(romano) {

    var Rom = [' ', 'I', 'V', 'X', 'L', 'C', 'D', 'M']; //GUARDAN LETRAS A COMPARAR

    var valor = [0, 1, 5, 10, 50, 100, 500, 1000]; //SE LE DA VALOR A LA LETRAS

    var ant = 0;

    var suma = 0;
    //var romano = 0;

    var letra = ' ';

    for (var i = 0; i < romano.length; i++) { //RECORRER TODA LA FRASE(numero romano)

        letra = romano[i];

        for (var j = 0; j < Rom.length; j++) { //RECORRE ARREGLO ROM

            if (letra == Rom[j]) { //si letra recorrida = a letra contenida en rom                 

                suma = suma + valor[j]; //sumar el valor de la letra

                if (ant < valor[j]) { //si el valor de letra anterior menor a valor letra   //actual

                    suma = suma - ant * 2; // restale el doble del menor de los dos

                    ant = valor[j]; // valor anterior = valor letra actual

                } else { //si no se cumple lo anterior  

                    ant = valor[j]; //el dato actual se guarda en anterior

                }

            }

        }

    }

    return suma
}

const todos = [];
const todosD = [];
window.onload = () => {

    const formD = document.getElementById('input-group-decimal')
    formD.onsubmit = (e) => {
        e.preventDefault();
        const numeroDecimal = document.getElementById('form-numero');
        const todoTextD = romanize(numeroDecimal.value);
        numeroDecimal.value = '';
        todosD.push(todoTextD);
        const todoDecimal = document.getElementById('todoDecimal');
        todoDecimal.innerHTML = '';
        console.log(todoDecimal)
        for (let i = 0; i < todosD.length; i++) {
            todoDecimal.innerHTML += '<li>' + todosD[i] + '</li>'
        }
    }


    const form = document.getElementById('input-group-romano')
    form.onsubmit = (a) => {
        a.preventDefault();
        const numeroRomano = document.getElementById('form-romano');
        const todoText = decimal(numeroRomano.value);
        numeroRomano.value = '';
        todos.push(todoText);
        const todoRomano = document.getElementById('todoRomano');
        todoRomano.innerHTML = '';
        for (let i = 0; i < todos.length; i++) {
            todoRomano.innerHTML += '<li>' + todos[i] + '</li>'
        }
    }
}