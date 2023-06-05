const barita = document.getElementById('barita');
const txtTexto = document.getElementById('txtEncriptador');
const sombrero = document.getElementById('sombrero');
const btnEncriptar = document.getElementById('btnEncriptar');
const btnDesencriptar = document.getElementById('btnDesencriptar');
const btnCopiar = document.getElementById('boton-copiar');

const llavesEncryptDecrypt = new Map();
llavesEncryptDecrypt.set('a', 'ai');
llavesEncryptDecrypt.set('e', 'enter');
llavesEncryptDecrypt.set('i', 'imes');
llavesEncryptDecrypt.set('o', 'ober');
llavesEncryptDecrypt.set('u', 'ufat');

const regexLetrasPermitidas = /[a-z\s]/;


/**
 * Explicación general de las animaciones
 * 
 * - Animación varita
 *  + Duración: 1ms
 *  + Movimiento: Arriba y Abajo
 * 
 * - Animación texto
 *  + Duración: 1ms cada una, 6ms total
 *  + Movimiento: encoger, transparent, ocultar, ocultar-reverse, transparent-reverse, encoger-reverse
 * 
 * - Animación sombrero
 *  + Duración: 1ms
 *  + Movimiento: shake
 * 
 * Notas generales: Checar css para mayor comprensión.
 * 
 */


/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que Inicia las animaciones, llama a los métodos que agregan las clases para la animación
 */
function animate() {
    btnEncriptar.setAttribute('disabled', 'true');
    btnDesencriptar.setAttribute('disabled', 'true');
    txtTexto.setAttribute('disabled', 'true');
    animateBarita();
    animateCopiar();

    // Inicia la animación del texto, después de que la varita terminó su animación.
    // Nota: Checar css para mayor comprensión de los tiempos de las animaciones.
    setTimeout(() => {
        animateTexto();
    }, 1000);

    // Inicia la animación del sombrero 3s después y una vez que la animación del texto finalizó, para simular que el texto se encuentra dentro.
    // Nota: Checar css para mayor comprensión.
    setTimeout(() => {
        animateSombrero();
        barita.classList.remove('barita-animation');
    }, 3000);

    // Inicia la animación de la varita 4.5s después de la animación general, después de la animación del sombrero y justo antes de la animación del texto reapareciendo.
    // Nota: Checar css para mayor comprensión.
    setTimeout(() => {
        animateBarita();
    }, 4500);

    // Remueve todas las clases que contienen las animaciones para evitar conflictos al volver a reanimar los elementos.
    // Nota: Checar css para mayor comprensión.
    setTimeout(() => {
        limpiaAnimaciones();
    }, 7000)
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que agrega la animación del botón copiar.
 */
function animateCopiar() {
    btnCopiar.classList.add('hide-copiar-animation');
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que agrega la animación de la varita.
 * @notes Checar css para mayor comprensión.
 */
function animateBarita() {
    barita.classList.add('barita-animation');
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que agrega la animación del texto.
 * @notes Checar css para mayor comprensión.
 */
function animateTexto() {
    txtTexto.classList.add('txtEncriptador-animacion');
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que agrega la animación del sombrero.
 * @notes Checar css para mayor comprensión.
 */
function animateSombrero() {
    sombrero.classList.add('sombrero-animacion');
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que remueve las clases que contienen la animaciones antes de reasignarla para evitar conflictos y comportamientos extraños.
 * @notes Checar css para mayor comprensión.
 */
function limpiaAnimaciones() {
    barita.classList.remove('barita-animation');
    txtTexto.classList.remove('txtEncriptador-animacion');
    sombrero.classList.remove('sombrero-animacion');
    btnCopiar.classList.remove('hide-copiar-animation');
    btnEncriptar.removeAttribute('disabled');
    btnDesencriptar.removeAttribute('disabled');
    txtTexto.removeAttribute('disabled');
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que encripta el texto. Por cada letra dentro del arreglo, busca su valor correspondiente en el map especificado al inicio.
 */
function encriptaTexto(arregloLetras) {
    let textoEncriptado = '';
    arregloLetras.forEach(letra => {
        if(llavesEncryptDecrypt.has(letra)) {
            textoEncriptado = textoEncriptado.concat(llavesEncryptDecrypt.get(letra));
        } else {
            textoEncriptado = textoEncriptado.concat(letra);
        }
    });
    return textoEncriptado;
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que desencripta el texto. Revisa si el texto especificado contiene valores especificados en el map de llaves; si es correcto, reemplaza los valores por su llave correspondiente.
 */
function desencriptaTexto(texto) {
    llavesEncryptDecrypt.forEach((v, k) =>  {
        if(texto.includes(v)) {
            texto = texto.replaceAll(v, k);
        }
    })
    return texto;
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que separa el texto en un arreglo de letras.
 */
function obtieneArregloLetras(texto) {
    return texto.toLowerCase().split('');
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que inicia la acción de encriptar. LLama al método de encriptar texto.
 */
function actionEncriptar() {
    const arregloLetras = obtieneArregloLetras(txtTexto.value);
    const textoEncriptado = encriptaTexto(arregloLetras);
    animate();
    setTimeout(() => {
        animateSombrero();
        txtTexto.value = textoEncriptado;
    }, 3000);
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que inicia la acción de desencriptar. LLama al método de desencriptar texto.
 */
function actionDesencriptar() {
    const textoDesencriptado = desencriptaTexto(txtTexto.value);
    animate();
    setTimeout(() => {
        animateSombrero();
        txtTexto.value = textoDesencriptado;
    }, 3000);
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Función que revisa si el campo de texto está vacío, si lo está deshabiltia los botones de encriptar/desencriptar.
 */
function checkTextoVacio() {
    console.log(txtTexto.value === '')
    return txtTexto.value === '';
}

function disableBotones() {
    if(checkTextoVacio()) {
        btnEncriptar.setAttribute('disabled', 'true');
        btnDesencriptar.setAttribute('disabled', 'true');
        btnCopiar.classList.add('boton-copiar-disabled');
    } else {
        btnEncriptar.removeAttribute('disabled');
        btnDesencriptar.removeAttribute('disabled');
        btnCopiar.classList.remove('boton-copiar-disabled');
    }
}

function copiarAlClipboard() {    
    if(!checkTextoVacio()) {
        txtTexto.select();
        txtTexto.setSelectionRange(0, 99999); // para celulares
    
        navigator.clipboard.writeText(txtTexto.value);
    } 
}

/**
 * @author Ivan Abad
 * @since 02/06/2023
 * @description Asignación de las acciones a los botones correspondientes.
 */
btnEncriptar.onclick = actionEncriptar;
btnDesencriptar.onclick = actionDesencriptar;
txtTexto.onkeyup = disableBotones;
btnCopiar.onclick = copiarAlClipboard;

/**
 * @description Previene que el usurio ingrese letras o caracteres especiales no permitidos.
 */
txtTexto.addEventListener('keydown', e => {
    if(!regexLetrasPermitidas.test(e.key)) {
        return e.preventDefault();
    }
})