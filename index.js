//PRIMERA PRE-ENTREGA:

//PRUEBA INTERACCION CON EL USUARIO: 
 
function nombre (usuario){
    var usuario = prompt("Ingrese su nombre") 
  
    return alert("Hola " + usuario + " " + "espero que te encuentres bien")
    
}

 nombre()


//PRUEBA FUNCION POR CONSOLA: 
 let resultadoO = 0

 function calculadora(num1, num2, operador) {
     if (operador == '+') {
        resultadoO = num1 + num2
        console.log(resultadoO)
        
     } else if (operador == '-') {
        resultadoO= num1 - num2;
         console.log(resultado)
    } else if (operador == '*') {
        resultado = num1 * num2
    console.log(resultadoO)
        
     } else if (operador == '/') {
         if (num2 !== 0) {
           resultado = num1 / num2
          console.log(resultadoO)
          
         } else {
             return 'No se puede dividir por cero';
         }
     } else {
         //return 'Operador no válido';
     }
     
 }
 console.log(calculadora(5,8,"+"))


 //CALCULAR PRIMEDIO DE NOTAS USANDO ARREGLOS:  

 function promedio() {
    let notas = [];
    let seguirIngresando = true;

    // Hago un bucle para que itere mientras se ingresan notas
    while (seguirIngresando) {
        let nota = prompt("Ingrese una nota (o escriba 'fin' para terminar):");

        if (nota.toLowerCase() === 'fin') {
            seguirIngresando = false;
        } else {
            // Convierto a numero lo que el usuario ingresa para que sea valido el promedio y lo agrego al arreglo si es valido
            let notaNum = parseFloat(nota);
            if (!isNaN(notaNum)) {
                notas.push(notaNum);
            } else {
                alert("Por favor, ingrese una nota válida.");
            }
        }
    }

    // Si no me ingresa nada le tiro un mensaje 
    if (notas.length === 0) {
        return "No hay notas para calcular el promedio.";
    }

    // Calculo el promedio y lo muestro
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }
    let promedio = suma / notas.length;

    return promedio;
}

// Ejemplo de uso

console.log("El promedio de las notas es:", promedio());







//SEGUNDA PRE-ENTREGA:
let parrafoSubtitulo = document.getElementById("Estilo-parrado-subtitulo")
parrafoSubtitulo.style.backgroundColor = 'white'

let titulo = document.getElementById("titulo")
titulo.style.backgroundColor = "white"

let resultado = document.getElementById("resultado")
resultado.style.backgroundColor = "white"

function calcularMetrosCubicos() {
    let largo = parseFloat(document.getElementById("largo").value);
    let ancho = parseFloat(document.getElementById("ancho").value);
    let alto = parseFloat(document.getElementById("alto").value);

   
    if (isNaN(largo) || isNaN(ancho) || isNaN(alto)) {
        alert("Por favor, ingresa valores numéricos válidos.");
        return;
    }
    
    let metrosCubicos = largo * ancho * alto;
    localStorage.setItem('metrosCubicos', metrosCubicos);
    return metrosCubicos;
}

function calcularCosto(metrosCubicos) {
    let costo = metrosCubicos * 60;
    let mensaje = "";

    if (costo <= 3000) {
        mensaje = "La instalación sale aproximadamente $132,000.";
    } else if (costo <= 4500) {
        mensaje = "La instalación sale aproximadamente $148,000.";
    } else if (costo <= 6000) {
        mensaje = "La instalación sale aproximadamente $157,000.";
    } else {
        mensaje = "No se puede determinar el costo para esta cantidad de metros cúbicos.";
    }

    localStorage.setItem('costoMensaje', mensaje);
    return mensaje;
}

function calcular() {
    let metrosCubicos = calcularMetrosCubicos();
    let costo = calcularCosto(metrosCubicos);

    document.getElementById("resultado").innerText = "Los metros cúbicos de la habitación son: " + metrosCubicos.toFixed(2) + " metros cúbicos." + costo;
}



//TERCERA PRE-ENTREGA:

// URL del archivo JSON
const url = 'aires.json';

// Hacer la solicitud usando fetch
fetch(url)
  .then(response => {
    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Ocurrió un error al obtener los datos.');
    }
    // Parsear la respuesta como JSON
    return response.json();
  })
  .then(data => {
    // Manejar los datos obtenidos
    
    // Ejemplo de operación: Filtrar los aires acondicionados con eficiencia energética A
    document.getElementById('filtrarBtn').addEventListener('click', () => {
        const airesEficientes = data.aires_acondicionados.filter(aire => aire.eficiencia_energetica === 'A+');
        mostrarResultados(airesEficientes);
    });
    
    // Otro ejemplo de operación: Calcular el precio promedio de los aires acondicionados
    document.getElementById('calcularBtn').addEventListener('click', () => {
        const precios = data.aires_acondicionados.map(aire => aire.precio);
        const precioPromedio = precios.reduce((total, precio) => total + precio, 0) / precios.length;
        mostrarResultados('Precio promedio de los aires acondicionados: ' + precioPromedio);
    });
  })
  .catch(error => {
    // Capturar y manejar errores
    console.error('Error al obtener los datos:', error);
  });

  function mostrarResultados(resultado) {
    if (Array.isArray(resultado)) {
        // Si el resultado es un array (por ejemplo, aires eficientes), lo formateamos como una lista
        const lista = resultado.map(aire => {
            return `<li>${aire.modelo} - ${aire.marca} (${aire.eficiencia_energetica}): $${aire.precio}</li>`;
        }).join('');
        document.getElementById('resultados').innerHTML = `<ul>${lista}</ul>`;
    } else {
        // Si el resultado no es un array, lo mostramos como texto plano
        document.getElementById('resultados').textContent = resultado;
    }
}


