let divisor = null;
let pos = [];
const svg = document.getElementById("grafo");

// =====================================================
// CIRCULAR POSITIONS
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
// CLEAR GRAPH
// =====================================================

function limpiar() {
    svg.querySelectorAll(
        "circle,text,line,path:not(defs path)"
    ).forEach(elemento => {
        elemento.remove();
    });
}

// =====================================================
// DRAW NODE
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
// DRAW ARROW
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
// OFFSET ARROW
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
// SELF-LOOP
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
// +1 ARCS
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
// BASE GRAPH
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
// GET POSSIBLE DIGITS
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
// SHOW POSSIBILITIES FOR EACH STEP
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
        // IF THE STATES ARE NOT COMPLETE YET
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
            div.innerHTML = "<strong>Step " + (i + 1) + ":</strong>&nbsp;&nbsp;" +
                origenNumero + " → " + destinoNumero + "&nbsp;&nbsp;|&nbsp;&nbsp;" +
                "<span style='color:red'>" + "No possible digit" + "</span>";
        } else {
            div.innerHTML = "<strong>Step " + (i + 1) + ":</strong>&nbsp;&nbsp;" +
                origenNumero + " → " + destinoNumero + "&nbsp;&nbsp;|&nbsp;&nbsp;" +
                "<strong>Possible digits:</strong> " + "<span class='listaPosibilidades'>" +
                posibles.join(", ") + "</span>";
        }
        contenedor.appendChild(div);
    }
}

// =====================================================
// CREATE INVERSE WALK
// =====================================================

function crearRecorridoInverso() {
    const longitudInput = document.getElementById("longitudRecorrido");
    const moduloInput = document.getElementById("modulo");
    const contenedor = document.getElementById("contenedorRecorridoInverso");
    const botonReconstruir = document.getElementById("botonReconstruir");
    const longitud = parseInt(longitudInput.value);
    const modulo = parseInt(moduloInput.value);
    // VALIDATE MODULUS
    if (isNaN(modulo) || modulo < 2 || modulo > 20) {
        alert("Enter a modulus between 2 and 20.");
        return;
    }
    // VALIDATE LENGTH
    if (isNaN(longitud) || longitud < 1 || longitud > 50) {
        alert("Enter a length between 1 and 50.");
        return;
    }
    // CLEAR PREVIOUS EXERCISE RESULTS
    document.getElementById("posibilidadesRecorridoInverso").innerHTML = "";
    const numeroReconstruido = document.getElementById("numeroReconstruido");
    numeroReconstruido.innerHTML = "";
    numeroReconstruido.style.display = "none";
    // CLEAR PREVIOUS WALK
    contenedor.innerHTML = "";
    // CREATE NEW WALK
    const recorrido = document.createElement("div");
    recorrido.className = "recorridoInverso";
    for (let i = 0; i <= longitud; i++) {
        const caja = document.createElement("input");
        caja.type = "number";
        caja.min = 0;
        caja.max = modulo - 1;
        caja.className = "nodoRecorrido";
        caja.dataset.indice = i;
        // FIRST STATE = 0
        if (i === 0) {
            caja.value = 0;
            caja.readOnly = true;
        }
        // UPDATE WHEN CHANGED
        caja.addEventListener("input",actualizarRecorridoInverso);
        recorrido.appendChild(caja);
        // ARROW
        if (i < longitud) {
            const flecha = document.createElement("span");
            flecha.className = "flechaRecorrido";
            flecha.textContent = "→";
            recorrido.appendChild(flecha);
        }
    }
    contenedor.appendChild(recorrido);
    // ENABLE RECONSTRUCT BUTTON
    botonReconstruir.style.display = "block";
    botonReconstruir.disabled = false;
    // CREATE / RESET GRAPH
    divisor = modulo;
    pos = posiciones(modulo);
    limpiar();
    dibujarBase(pos);
    // MARK INITIAL NODE
    dibujarNodo(pos[0].x,pos[0].y,0,"red");
}

// =====================================================
// UPDATE WALK
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
// DRAW WALK
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
    // DRAW WALK
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
    // FINAL NODE
    const ultimo = estados[estados.length - 1];
    dibujarNodo(pos[ultimo].x,pos[ultimo].y,ultimo,"red");
    // PARTIAL RECONSTRUCTION
    if (estados.length >= 2) {
        mostrarPosibilidadesRecorrido();
    }
}

// =====================================================
// SHOW PARTIAL NUMBER
// =====================================================

function mostrarNumeroReconstruido(numero) {
    const contenedor = document.getElementById("numeroReconstruido");
    contenedor.style.display = "block";
    contenedor.innerHTML =
        `
        <div class="tituloNumerosPosibles">
            Processed number
        </div>

        <div>
            ${numero}
        </div>
        `;
}

// =====================================================
// PROCESS COMPLETE WALK
// =====================================================

function procesarRecorridoInverso() {
    const modulo = parseInt(document.getElementById("modulo").value);
    const cajas = document.querySelectorAll("#contenedorRecorridoInverso .nodoRecorrido");
    // CLEAR PREVIOUS RESULT
    const contenedorResultado = document.getElementById("numeroReconstruido");
    contenedorResultado.innerHTML = "";
    contenedorResultado.style.display = "none";
    // ALERT
    if (!cajas.length) {
        alert("Create the walk first.");
        return;
    }
    // GET STATES
    const estados = [];
    for (const caja of cajas) {
        if (caja.value === "") {
            alert("Complete all the walk fields.");
            return;
        }
        const valor = parseInt(caja.value);
        if (isNaN(valor) || valor < 0 || valor >= modulo) {
            alert("States must be between 0 and " + (modulo - 1) + ".");
            return;
        }
        estados.push(valor);
    }
    // POSSIBILITIES FOR EACH TRANSITION
    const posibilidadesPorPaso = [];
    for (let i = 0; i < estados.length - 1; i++) {
        const origen = estados[i];
        const destino = estados[i + 1];
        const posibles = obtenerDigitosPosibles(origen,destino,modulo);
        if (posibles.length === 0) {
            alert(
                "Step " +
                (i + 1) +
                " (" +
                origen +
                " → " +
                destino +
                ") is not compatible with modulus " +
                modulo +
                "."
            );
	    return;
        }
        posibilidadesPorPaso.push(posibles);
    }
    // GENERATE ALL COMBINATIONS
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
    // REMOVE NUMBERS STARTING WITH 0
    const cantidadAntesDeDescartar = numerosPosibles.length;
    numerosPosibles = numerosPosibles.filter(numero => !numero.startsWith("0"));
    const numerosDescartadosPorCero = cantidadAntesDeDescartar - numerosPosibles.length;
    // SHOW RESULT
    mostrarTodosLosNumerosPosibles(numerosPosibles,numerosDescartadosPorCero);
}

// =====================================================
// SHOW ALL POSSIBLE NUMBERS
// =====================================================

function mostrarTodosLosNumerosPosibles(numeros,numerosDescartadosPorCero) {
    const contenedor = document.getElementById("numeroReconstruido");
    contenedor.style.display = "block";
    let html = "";
    html +=
        `
        <div class="cantidadNumeros">
            ${numeros.length} possible numbers found
        </div>
        `;
    // INFORMATIONAL MESSAGE
    if (numerosDescartadosPorCero > 0) {
        html += `
            <div class="avisoCerosIniciales">
                ${numerosDescartadosPorCero} numbers were discarded because their first digit is 0.
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
// DISABLED WALK
// =====================================================

function crearRecorridoDesactivado() {
    const contenedor = document.getElementById("contenedorRecorridoInverso");
    contenedor.innerHTML = "";
    const recorrido = document.createElement("div");
    recorrido.className = "recorridoInverso";
    // SHOW INITIAL FIELDS
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
// NEW EXERCISE
// =====================================================

function nuevoEjercicio() {
    // CLEAR MODULUS AND LENGTH
    document.getElementById("modulo").value = "";
    document.getElementById("longitudRecorrido").value = "";
    // CLEAR WALK
    document.getElementById("contenedorRecorridoInverso").innerHTML = "";
    // CLEAR STEPS
    document.getElementById("posibilidadesRecorridoInverso").innerHTML = "";
    // CLEAR POSSIBLE NUMBERS
    const numeroReconstruido = document.getElementById("numeroReconstruido");
    numeroReconstruido.innerHTML = "";
    numeroReconstruido.style.display = "none";
    // DISABLE RECONSTRUCT BUTTON
    document.getElementById("botonReconstruir").disabled = true;
    // CLEAR VARIABLES
    divisor = null;
    pos = [];
    // CLEAR GRAPH
    limpiar();
}