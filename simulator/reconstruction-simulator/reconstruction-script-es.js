let divisor = null;
let pos = [];
const svg = document.getElementById("grafo");

// =====================================================
// POSICIONES CIRCULARES
// =====================================================

function posiciones(divisor) {
    const resultado = [];
    const radio = 260;
    for (let i = 0; i < divisor; i++) {
        const angulo = -Math.PI / 2 + 2 * Math.PI * i / divisor;
        resultado.push({
            x: 350 + radio * Math.cos(angulo),
            y: 350 + radio * Math.sin(angulo)
        });
    }
    return resultado;
}

// =====================================================
// LIMPIAR GRAFO
// =====================================================

function limpiar() {
    svg.querySelectorAll(
        "circle,text,line,path:not(defs path)"
    ).forEach(elemento => {
        elemento.remove();
    });
}

// =====================================================
// DIBUJAR NODO
// =====================================================

function dibujarNodo(x,y,texto,color) {
    const circulo =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
    circulo.setAttribute("cx", x);
    circulo.setAttribute("cy", y);
    circulo.setAttribute("r", 32);
    circulo.setAttribute("fill", color);
    circulo.setAttribute("stroke", "black");
    circulo.setAttribute("stroke-width", 2);
    svg.appendChild(circulo);
    const textoSVG =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
    textoSVG.setAttribute("x", x);
    textoSVG.setAttribute("y", y + 7);
    textoSVG.setAttribute("text-anchor", "middle");
    textoSVG.setAttribute("font-size", "20");
    textoSVG.setAttribute("font-weight", "bold");
    textoSVG.textContent = texto;
    svg.appendChild(textoSVG);
}

// =====================================================
// DIBUJAR FLECHA
// =====================================================

function dibujarFlecha(x1,y1,x2,y2,color = "gray") {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    const margen = 40;
    x1 += dx / distancia * margen;
    y1 += dy / distancia * margen;
    x2 -= dx / distancia * margen;
    y2 -= dy / distancia * margen;
    const linea =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
    linea.setAttribute("x1", x1);
    linea.setAttribute("y1", y1);
    linea.setAttribute("x2", x2);
    linea.setAttribute("y2", y2);
    linea.setAttribute("stroke", color);
    linea.setAttribute("stroke-width", 3);
    if (color === "blue") {
        linea.setAttribute(
            "marker-end",
            "url(#flechaAzul)"
        );
    } else if (color === "red") {
        linea.setAttribute(
            "marker-end",
            "url(#flechaRoja)"
        );
    } else {
        linea.setAttribute(
            "marker-end",
            "url(#flechaGris)"
        );
    }
    svg.appendChild(linea);
}

// =====================================================
// FLECHA DESPLAZADA
// =====================================================

function dibujarFlechaDesplazada(x1,y1,x2,y2,color = "red",lado = 1) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    const margen = 40;
    x1 += dx / distancia * margen;
    y1 += dy / distancia * margen;
    x2 -= dx / distancia * margen;
    y2 -= dy / distancia * margen;
    const px = -dy / distancia;
    const py = dx / distancia;
    const separacion = 12 * lado;
    x1 += px * separacion;
    y1 += py * separacion;
    x2 += px * separacion;
    y2 += py * separacion;
    const linea =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
    linea.setAttribute("x1", x1);
    linea.setAttribute("y1", y1);
    linea.setAttribute("x2", x2);
    linea.setAttribute("y2", y2);
    linea.setAttribute("stroke", color);
    linea.setAttribute("stroke-width", 3);
    linea.setAttribute("marker-end","url(#flechaRoja)");
    svg.appendChild(linea);
}

// =====================================================
// AUTOARCO
// =====================================================

function dibujarAutoarco(x,y,color = "gray") {
    const cx = 350;
    const cy = 350;
    let vx = x - cx;
    let vy = y - cy;
    let norma = Math.sqrt(vx * vx + vy * vy);
    if (norma === 0) {
        vx = 0;
        vy = -1;
        norma = 1;
    }
    vx /= norma;
    vy /= norma;
    const px = -vy;
    const py = vx;
    const radioNodo = 32;
    const anchoLazo = 65;
    const profundidad = 65;
    const inicioX = x + vx * radioNodo;
    const inicioY = y + vy * radioNodo;
    const finX = inicioX;
    const finY = inicioY;
    const c1x = inicioX + px * anchoLazo + vx * profundidad;
    const c1y = inicioY + py * anchoLazo + vy * profundidad;
    const c2x = finX - px * anchoLazo + vx * profundidad;
    const c2y = finY - py * anchoLazo + vy * profundidad;
    const arco =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
    arco.setAttribute(
        "d",
        `
        M ${inicioX} ${inicioY}
        C ${c1x} ${c1y},
          ${c2x} ${c2y},
          ${finX} ${finY}
        `
    );
    arco.setAttribute("fill","none");
    arco.setAttribute("stroke",color);
    arco.setAttribute("stroke-width",color === "gray" ? 3 : 4);
    if (color === "red") {
        arco.setAttribute("marker-end","url(#flechaRojaPequena)");
    } else if (color === "blue") {
        arco.setAttribute("marker-end","url(#flechaAzulPequena)");
    } else {
        arco.setAttribute("marker-end","url(#flechaGris)");
    }
    svg.appendChild(arco);
}

// =====================================================
// ARCO +1
// =====================================================

function dibujarArcosIncremento(pos) {
    const cx = 350;
    const cy = 350;
    const radio = 260;
    for (let i = 0; i < divisor; i++) {
        const siguiente = (i + 1) % divisor;
        const x1 = pos[i].x;
        const y1 = pos[i].y;
        const x2 = pos[siguiente].x;
        const y2 = pos[siguiente].y;
        const arco =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
        arco.setAttribute(
            "d",
            `
            M ${x1} ${y1}
            A ${radio} ${radio}
            0 0 1
            ${x2} ${y2}
            `
        );
        arco.setAttribute("fill","none");
        arco.setAttribute("stroke","lightgray");
        arco.setAttribute("stroke-width",3);
        svg.appendChild(arco);
    }
}

// =====================================================
// GRAFO BASE
// =====================================================

function dibujarBase(pos) {
    for (let i = 0; i < divisor; i++) {
        const destino = (10 * i) % divisor;
        if (i === destino) {
            dibujarAutoarco(pos[i].x,pos[i].y);
        } else {
            dibujarFlecha(pos[i].x,pos[i].y,pos[destino].x,pos[destino].y);
        }
    }
    dibujarArcosIncremento(pos);
    for (let i = 0; i < divisor; i++) {
        dibujarNodo(pos[i].x,pos[i].y,i,"lightblue");
    }
}

// =====================================================
// OBTENER DÍGITOS POSIBLES
// =====================================================

function obtenerDigitosPosibles(origen,destino,modulo) {
    const posibles = [];
    for (let digito = 0; digito <= 9; digito++) {
        const resultado = (10 * origen + digito) % modulo;
        if (resultado === destino) {
            posibles.push(digito);
        }
    }
    return posibles;
}

// =====================================================
// MOSTRAR POSIBILIDADES DE CADA PASO
// =====================================================

function mostrarPosibilidadesRecorrido() {
    const modulo = parseInt(document.getElementById("modulo").value);
    const cajas = document.querySelectorAll("#contenedorRecorridoInverso .nodoRecorrido");
    const contenedor = document.getElementById("posibilidadesRecorridoInverso");
    if (isNaN(modulo) || !cajas.length || !contenedor) {
        return;
    }
    contenedor.innerHTML = "";
    for (let i = 0; i < cajas.length - 1; i++) {
        const origen = cajas[i].value;
        const destino = cajas[i + 1].value;
        // SI TODAVÍA NO ESTÁN COMPLETOS LOS ESTADOS
        if (origen === "" || destino === "") {
            continue;
        }
        const origenNumero = parseInt(origen);
        const destinoNumero = parseInt(destino);
        if (
            isNaN(origenNumero) ||
            isNaN(destinoNumero) ||
            origenNumero < 0 ||
            origenNumero >= modulo ||
            destinoNumero < 0 ||
            destinoNumero >= modulo
        ) {
            continue;
        }

        const posibles = obtenerDigitosPosibles(origenNumero,destinoNumero,modulo);
        const div = document.createElement("div");
        div.className = "posibilidadesPaso";
        if (posibles.length === 0) {
            div.innerHTML = "<strong>Paso " + (i + 1) + ":</strong>&nbsp;&nbsp;" +
                origenNumero + " → " + destinoNumero + "&nbsp;&nbsp;|&nbsp;&nbsp;" +
                "<span style='color:red'>" + "Ningún dígito posible" + "</span>";
        } else {
            div.innerHTML = "<strong>Paso " + (i + 1) + ":</strong>&nbsp;&nbsp;" +
                origenNumero + " → " + destinoNumero + "&nbsp;&nbsp;|&nbsp;&nbsp;" +
                "<strong>Dígitos posibles:</strong> " + "<span class='listaPosibilidades'>" +
                posibles.join(", ") + "</span>";
        }
        contenedor.appendChild(div);
    }
}

// =====================================================
// CREAR RECORRIDO
// =====================================================

function crearRecorridoInverso() {
    const longitudInput = document.getElementById("longitudRecorrido");
    const moduloInput = document.getElementById("modulo");
    const contenedor = document.getElementById("contenedorRecorridoInverso");
    const botonReconstruir = document.getElementById("botonReconstruir");
    const longitud = parseInt(longitudInput.value);
    const modulo = parseInt(moduloInput.value);
    // VALIDAR MÓDULO
    if (isNaN(modulo) || modulo < 2 || modulo > 20) {
        alert("Introduce un módulo entre 2 y 20.");
        return;
    }
    // VALIDAR LONGITUD
    if (isNaN(longitud) || longitud < 1 || longitud > 50) {
        alert("Introduce una longitud entre 1 y 50.");
        return;
    }
    // LIMPIAR RESULTADOS DEL EJERCICIO ANTERIOR
    document.getElementById("posibilidadesRecorridoInverso").innerHTML = "";
    const numeroReconstruido = document.getElementById("numeroReconstruido");
    numeroReconstruido.innerHTML = "";
    numeroReconstruido.style.display = "none";
    // LIMPIAR RECORRIDO ANTERIOR
    contenedor.innerHTML = "";
    // CREAR NUEVO RECORRIDO
    const recorrido = document.createElement("div");
    recorrido.className = "recorridoInverso";
    for (let i = 0; i <= longitud; i++) {
        const caja = document.createElement("input");
        caja.type = "number";
        caja.min = 0;
        caja.max = modulo - 1;
        caja.className = "nodoRecorrido";
        caja.dataset.indice = i;
        // PRIMER ESTADO = 0
        if (i === 0) {
            caja.value = 0;
            caja.readOnly = true;
        }
        // ACTUALIZAR AL CAMBIAR
        caja.addEventListener("input",actualizarRecorridoInverso);
        recorrido.appendChild(caja);
        // FLECHA
        if (i < longitud) {
            const flecha = document.createElement("span");
            flecha.className = "flechaRecorrido";
            flecha.textContent = "→";
            recorrido.appendChild(flecha);
        }
    }
    contenedor.appendChild(recorrido);
    // ACTIVAR BOTÓN RECONSTRUIR
    botonReconstruir.style.display = "block";
    botonReconstruir.disabled = false;
    // CREAR / REINICIAR GRAFO
    divisor = modulo;
    pos = posiciones(modulo);
    limpiar();
    dibujarBase(pos);
    // MARCAR NODO INICIAL
    dibujarNodo(pos[0].x,pos[0].y,0,"red");
}

// =====================================================
// ACTUALIZAR RECORRIDO
// =====================================================

function actualizarRecorridoInverso() {
    const modulo = parseInt(document.getElementById("modulo").value);
    const cajas = document.querySelectorAll("#contenedorRecorridoInverso .nodoRecorrido");
    if (isNaN(modulo) || cajas.length === 0) {
        return;
    }
    for (const caja of cajas) {
        if (caja.value === "") {
            continue;
        }
        const valor = parseInt(caja.value);
        if (valor < 0 || valor >= modulo) {
            caja.style.borderColor = "red";
        } else {
            caja.style.borderColor = "#93c5fd";
        }
    }
    dibujarRecorridoInverso();
    mostrarPosibilidadesRecorrido();
}

// =====================================================
// DIBUJAR RECORRIDO
// =====================================================

function dibujarRecorridoInverso() {
    const modulo = parseInt(document.getElementById("modulo").value);
    const cajas = document.querySelectorAll("#contenedorRecorridoInverso .nodoRecorrido");
    if (isNaN(modulo) || !cajas.length) {
        return;
    }
    pos = posiciones(modulo);
    divisor = modulo;
    limpiar();
    dibujarBase(pos);
    const estados = [];
    for (const caja of cajas) {
        if (caja.value === "") {
            break;
        }
        const valor = parseInt(caja.value);
        if (isNaN(valor) || valor < 0 || valor >= modulo) {
            break;
        }
        estados.push(valor);
    }
    if (estados.length === 0) {
        return;
    }
    // DIBUJAR RECORRIDO
    for (let i = 0; i < estados.length - 1; i++) {
        const origen = estados[i];
        const destino = estados[i + 1];
        if (origen === destino) {
            dibujarAutoarco(pos[origen].x,pos[origen].y,"red");
        } else {
            dibujarFlechaDesplazada(
                pos[origen].x,
                pos[origen].y,
                pos[destino].x,
                pos[destino].y,
                "red",
                1
            );
        }
    }
    // NODO FINAL
    const ultimo = estados[estados.length - 1];
    dibujarNodo(pos[ultimo].x,pos[ultimo].y,ultimo,"red");
    // RECONSTRUCCIÓN PARCIAL
    if (estados.length >= 2) {
        mostrarPosibilidadesRecorrido();
    }
}

// =====================================================
// MOSTRAR NÚMERO PARCIAL
// =====================================================

function mostrarNumeroReconstruido(numero) {
    const contenedor = document.getElementById("numeroReconstruido");
    contenedor.style.display = "block";
    contenedor.innerHTML =
        `
        <div class="tituloNumerosPosibles">
            Número procesado
        </div>

        <div>
            ${numero}
        </div>
        `;
}

// =====================================================
// PROCESAR RECORRIDO COMPLETO
// =====================================================

function procesarRecorridoInverso() {
    const modulo = parseInt(document.getElementById("modulo").value);
    const cajas = document.querySelectorAll("#contenedorRecorridoInverso .nodoRecorrido");
    // LIMPIAR RESULTADO ANTERIOR
    const contenedorResultado = document.getElementById("numeroReconstruido");
    contenedorResultado.innerHTML = "";
    contenedorResultado.style.display = "none";
    // ALERTA
    if (!cajas.length) {
        alert("Primero crea el recorrido.");
        return;
    }
    // OBTENER ESTADOS
    const estados = [];
    for (const caja of cajas) {
        if (caja.value === "") {
            alert("Completa todas las casillas del recorrido.");
            return;
        }
        const valor = parseInt(caja.value);
        if (isNaN(valor) || valor < 0 || valor >= modulo) {
            alert("Los estados deben estar entre 0 y " + (modulo - 1) + ".");
            return;
        }
        estados.push(valor);
    }
    // POSIBILIDADES DE CADA TRANSICIÓN
    const posibilidadesPorPaso = [];
    for (let i = 0; i < estados.length - 1; i++) {
        const origen = estados[i];
        const destino = estados[i + 1];
        const posibles = obtenerDigitosPosibles(origen,destino,modulo);
        if (posibles.length === 0) {
	    alert(
    		"El paso " +
    		(i + 1) +
    		" (" +
    		origen +
    		" → " +
    		destino +
    		") no es compatible con el módulo " +
    		modulo +
    		"."
	    );
	    return;
        }
        posibilidadesPorPaso.push(posibles);
    }
    // GENERAR TODAS LAS COMBINACIONES
    let numerosPosibles = [""];
    for (const posibilidades of posibilidadesPorPaso) {
        const nuevasCombinaciones = [];
        for (const numeroActual of numerosPosibles) {
            for (const digito of posibilidades) {
                nuevasCombinaciones.push(numeroActual + digito);
            }
        }
        numerosPosibles = nuevasCombinaciones;
    }
    // DESCARTAR NÚMEROS QUE EMPIEZAN POR 0
    const cantidadAntesDeDescartar = numerosPosibles.length;
    numerosPosibles = numerosPosibles.filter(numero => !numero.startsWith("0"));
    const numerosDescartadosPorCero = cantidadAntesDeDescartar - numerosPosibles.length;
    // MOSTRAR RESULTADO
    mostrarTodosLosNumerosPosibles(numerosPosibles,numerosDescartadosPorCero);
}

// =====================================================
// MOSTRAR TODOS LOS NÚMEROS
// =====================================================

function mostrarTodosLosNumerosPosibles(numeros,numerosDescartadosPorCero) {
    const contenedor = document.getElementById("numeroReconstruido");
    contenedor.style.display = "block";
    let html = "";
    html +=
        `
        <div class="cantidadNumeros">
            Se han encontrado
            ${numeros.length}
            números posibles
        </div>
        `;
    // MENSAJE INFORMATIVO
    if (numerosDescartadosPorCero > 0) {
        html += `
            <div class="avisoCerosIniciales">
                Se han descartado
                ${numerosDescartadosPorCero}
                números cuyo primer dígito es 0.
            </div>
        `;
    }
    html +=
        `
        <div class="listaNumerosPosibles">
        `;
    for (const numero of numeros) {
        html +=
            `
            <div class="numeroPosible">
                ${numero}
            </div>
            `;
    }
    html +=
        `
        </div>
        `;
    contenedor.innerHTML = html;
}

// =====================================================
// BOTÓN RECORRIDO DESACTIVADO
// =====================================================

function crearRecorridoDesactivado() {
    const contenedor = document.getElementById("contenedorRecorridoInverso");
    contenedor.innerHTML = "";
    const recorrido = document.createElement("div");
    recorrido.className = "recorridoInverso";
    // MOSTRAMOS CASILLAS INICIALES
    for (let i = 0; i < 4; i++) {
        const caja = document.createElement("input");
        caja.type = "number";
        caja.className = "nodoRecorrido";
        caja.disabled = true;
        recorrido.appendChild(caja);
        if (i < 3) {
            const flecha = document.createElement("span");
            flecha.className = "flechaRecorrido";
            flecha.textContent = "→";
            recorrido.appendChild(flecha);
        }
    }
    contenedor.appendChild(recorrido);
}

// =====================================================
// NUEVO EJERCICIO
// =====================================================

function nuevoEjercicio() {
    // LIMPIAR MÓDULO Y LONGITUD
    document.getElementById("modulo").value = "";
    document.getElementById("longitudRecorrido").value = "";
    // LIMPIAR RECORRIDO
    document.getElementById("contenedorRecorridoInverso").innerHTML = "";
    // LIMPIAR PASOS
    document.getElementById("posibilidadesRecorridoInverso").innerHTML = "";
    // LIMPIAR NÚMEROS POSIBLES
    const numeroReconstruido = document.getElementById("numeroReconstruido");
    numeroReconstruido.innerHTML = "";
    numeroReconstruido.style.display = "none";
    // DESACTIVAR BOTÓN RECONSTRUIR
    document.getElementById("botonReconstruir").disabled = true;
    // LIMPIAR VARIABLES
    divisor = null;
    pos = [];
    // LIMPIAR GRAFO
    limpiar();
}