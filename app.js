// document.queryselector es para decir al sistema, traeme esta definición y declarala como variable
// la funcion *variable*.innerHTML sirve para asignar dicho valor a la varibale
//Hoisting = Carga primero las funciones y luego las lineas de texto, optimizando asi el codigo.
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
//Para optimizar el código, se puede asignar una funcion generica para luego llamar a esta funcion y ejectuarla, asi reduciendo el código.
// la declaración de "Function" es para generar una funcion especifica que contendrá todo el script que será ejecutado en el HTML
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}
//Si colocamos # al inicio de una variable, estamos invocando el ID del HTML y no la función del JS.
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

//document.getelementbyid sirve para traer el elemento del HTML por su ID definida, esto se usa cuando tienes más de un elemento HTML igual, como el "Input"
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {        
        //Si el numero generado está incluido en la lista 
        // Recursividad es crear una especie de buclé en el que si el número está en la lista, se invoca a si misma nuevamente para generar otro que no esté en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)){
        return generarNumeroSecreto();
        } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
        }
    } 
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //Primero limpiamos la caja 
    limpiarCaja();
    //indicar mensaje de intervalo de numeros
    //generar el número aleatorio
    //inicializar el numero de intentos
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.querySelector("#reiniciar").setAttribute("disabled","true");
    //El setatribute requiere dos elementos, el primero que elemento agregas y el segundo si es verdadero o falso ese elemento.
}

condicionesIniciales();



