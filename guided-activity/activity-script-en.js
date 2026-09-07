let divisor = 0;
let posicionesNodos = [];
let nodoSeleccionado = null;
let flechasUsuario = [];
let modoRecorrido = false;
let numero = "";
let recorridoAlumno = [];
let flechasRecorrido = [];
let nodoFinalRecorrido = null;
let grafoCorrecto = false;
let recorridoCorrecto = false;
let resultadoDesbloqueado = false;
let svg = document.getElementById("grafo");

// =====================================
// CIRCULAR POSITIONS
// =====================================

function posiciones(divisor){
    let resultado = [];
    let radio = 260;
    for(let i = 0; i < divisor; i++){
        let angulo = -Math.PI / 2 + 2 * Math.PI * i / divisor;
        resultado.push({
            x:350 + radio * Math.cos(angulo),
            y:350 + radio * Math.sin(angulo)
        });
    }
    return resultado;
}

// =====================================
// CLEAN
// =====================================

function limpiar(){
    svg.querySelectorAll(
        "circle,text,line,path,polygon"
    )
    .forEach(
        e=>e.remove()
    );
}

// =====================================
// CREATE GRAPH
// =====================================

function crearGrafo(){
    divisor = parseInt(
        document.getElementById("modulo").value);
    // ALERT: ENTER A MODULUS BETWEEN 2 AND 20
    if (isNaN(divisor) || divisor < 2 || divisor > 20){
        alert("Enter a modulus between 2 and 20.");
        return;
    }
    posicionesNodos = posiciones(divisor);
    // RESET THE WHOLE EXERCISE
    flechasUsuario = [];
    flechasRecorrido = [];
    recorridoAlumno = [];
    nodoSeleccionado = null;
    nodoFinalRecorrido = null;
    modoRecorrido = false;
    numero = "";
    document.getElementById("numero").value = "";
    // RESET STATES
    grafoCorrecto = false;
    recorridoCorrecto = false;
    resultadoDesbloqueado = false;
    // LOCK SUBSEQUENT PHASES
    document.getElementById("botonRecorrido").disabled = true;
    document.getElementById("botonComprobarGrafo").disabled = true;
    document.getElementById("botonComprobarRecorrido").disabled = true;
    document.getElementById("botonResultadoFinal").disabled = true;
    document.getElementById("numero").disabled = true;
    document.getElementById("restoFinal").disabled = true;
    document.getElementById("botonNuevoNumero").disabled = true;
    document.querySelectorAll('input[name="divisible"]').forEach(o => o.disabled = true);
    document.getElementById("resultadoGrafo").innerHTML = "";
    document.getElementById("resultadoRecorrido").innerHTML = "";
    document.getElementById("resultadoFinal").innerHTML = "";
    document.getElementById("restoFinal").value = "";
    // CLEAR "DIVISIBLE" SELECTION
    let opciones = document.querySelectorAll('input[name = "divisible"]');
    opciones.forEach(o=>o.checked = false);
    // ENABLE GRAPH CHECK
    document.getElementById("botonComprobarGrafo").disabled = false;
    dibujarTodo();
}

// =====================================
// +1 CIRCLE
// =====================================

function dibujarCirculoMasUno(){
    if(divisor == 0){
        return;
    }
    let circulo = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    circulo.setAttribute("cx",350);
    circulo.setAttribute("cy",350);
    // PASS THROUGH NODE CENTERS
    circulo.setAttribute("r",260);
    circulo.setAttribute("fill","none");
    circulo.setAttribute("stroke","lightgray");
    circulo.setAttribute("stroke-width","3");
    svg.appendChild(circulo);
}

// =====================================
// SHOW ALL
// =====================================

function dibujarTodo(){
    limpiar();
    dibujarCirculoMasUno();
    dibujarFlechas();
    dibujarFlechasRecorrido();
    dibujarNodos();
}

// =====================================
// DRAW NODES
// =====================================

function dibujarNodos(){
    for(let i = 0; i < divisor; i++){
        let circulo = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circulo.setAttribute("cx",posicionesNodos[i].x);
        circulo.setAttribute("cy",posicionesNodos[i].y);
        circulo.setAttribute("r",32);
        // CORRECT FINAL STATE OF THE WALK
	if(i == nodoFinalRecorrido){
    		circulo.setAttribute("fill","#4CAF50");
	}
	else{
		// THE SELECTED NODE IS HIGHLIGHTED
    		circulo.setAttribute("fill","lightblue");
	}
        circulo.setAttribute("stroke","black");
        circulo.setAttribute("stroke-width",2);
        circulo.style.cursor = "pointer";
        svg.appendChild(circulo);
        let texto = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        texto.setAttribute("x",posicionesNodos[i].x);
        texto.setAttribute("y",posicionesNodos[i].y + 7);
        texto.setAttribute("text-anchor","middle");
        texto.setAttribute("font-size","20");
        texto.setAttribute("font-weight","bold");
        texto.textContent = i;
        svg.appendChild(texto);
        // HOVER EFFECT
        circulo.addEventListener(
            "mouseenter",
            ()=>{
                if(i !== nodoSeleccionado){
                    circulo.setAttribute("fill","#bfe8ff");
                }
            }
        );
        circulo.addEventListener(
    		"mouseleave",
    		()=>{
        		if(i == nodoFinalRecorrido){
           			circulo.setAttribute("fill","#4CAF50");
        		}
        		else if(i !== nodoSeleccionado){
           			circulo.setAttribute("fill","lightblue");
        		}
    		}
	);
        circulo.addEventListener("click",()=>seleccionarNodo(i));
    }
}

// =====================================
// NODE SELECTION
// =====================================

function seleccionarNodo(numeroNodo){
    // ALERT: START WALK BEFORE CONTINUING
    if(grafoCorrecto && !modoRecorrido){
	alert('Click the "Start walk" button before continuing.');
        return;
    }
    // IF THE GRAPH IS CORRECT BUT THE WALK HAS NOT STARTED,
    // PREVENT CREATING NEW ARROWS UNTIL "START WALK" IS PRESSED"
    if(grafoCorrecto && !modoRecorrido){
        return;
    }

    // =====================================
    // GRAPH CONSTRUCTION NODE
    // =====================================

    if(!modoRecorrido){
        if(nodoSeleccionado == null){
            nodoSeleccionado = numeroNodo;
        }
        else{
            flechasUsuario.push({
                origen:nodoSeleccionado,
                destino:numeroNodo
            });
            nodoSeleccionado = null;
            dibujarTodo();
        }
    }

    // =====================================
    // WALK MODE
    // =====================================

    else{
        // FIRST CLICK: SELECT THE SOURCE NODE
        if(nodoSeleccionado == null){
            nodoSeleccionado = numeroNodo;
	    recorridoAlumno = [numeroNodo];
	    mostrarRecorrido();
	    dibujarTodo();
	    return;
        }
        // SECOND CLICK: CREATE THE ARROW
        else{
            flechasRecorrido.push({
                origen:nodoSeleccionado,
                destino:numeroNodo
            });
            recorridoAlumno.push(numeroNodo);
	    mostrarRecorrido();
            // THE DESTINATION NODE BECOMES THE NEXT SOURCE NODE
            nodoSeleccionado = numeroNodo;
        }
        dibujarTodo();
    }
}

// =====================================
// DRAW ARROWS
// =====================================

function dibujarFlechas(){
    for(let flecha of flechasUsuario){
        let origen = posicionesNodos[flecha.origen];
        let destino = posicionesNodos[flecha.destino];
        dibujarFlecha(origen.x,origen.y,destino.x,destino.y);
    }
}

// =====================================
// ARROW WITH TRIANGLE
// =====================================

function dibujarFlecha(x1,y1,x2,y2,color="gray"){
    if(x1 == x2 && y1 == y2){
        dibujarAutoarco(x1,y1,color);
        return;
    }
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distancia = Math.sqrt(dx * dx + dy*dy);
    let margen = 40;
    x1 += dx / distancia * margen;
    y1 += dy / distancia * margen;
    x2 -= dx / distancia * margen;
    y2 -= dy / distancia * margen;
    let linea = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );
    linea.setAttribute("x1",x1);
    linea.setAttribute("y1",y1);
    linea.setAttribute("x2",x2);
    linea.setAttribute("y2",y2);
    linea.setAttribute("stroke",color);
    linea.setAttribute("stroke-width",3);
    svg.appendChild(linea);
    dibujarPunta(x1,y1,x2,y2,color);
}

// =====================================
// ARROWHEAD
// =====================================

function dibujarPunta(x1,y1,x2,y2,color){
    let angulo = Math.atan2(y2-y1,x2-x1);
    let tam = 7;
    let ancho = 7;
    let desplazamiento = 8;
    let p1x = x2 + desplazamiento * Math.cos(angulo);
    let p1y = y2 + desplazamiento * Math.sin(angulo);
    let p2x = x2 - tam * Math.cos(angulo) + ancho * Math.sin(angulo);
    let p2y = y2 - tam * Math.sin(angulo) - ancho * Math.cos(angulo);
    let p3x = x2 - tam * Math.cos(angulo) - ancho * Math.sin(angulo);
    let p3y = y2 - tam * Math.sin(angulo) + ancho * Math.cos(angulo);
    let punta = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
    );
    punta.setAttribute(
        "points",
        `
        ${p1x},${p1y}
        ${p2x},${p2y}
        ${p3x},${p3y}
        `
    );
    punta.setAttribute("fill",color);
    svg.appendChild(punta);
}

// =====================================
// AUTOARC
// =====================================

function dibujarAutoarco(x,y,color="gray"){
    const cx = 350;
    const cy = 350;
    let vx = x - cx;
    let vy = y - cy;
    let norma = Math.sqrt(vx * vx + vy * vy);
    if(norma === 0){
        vx = 0;
        vy = -1;
        norma = 1;
    }
    vx /= norma;
    vy /= norma;
    let px = -vy;
    let py = vx;
    let radioNodo = 32;
    let anchoLazo = 65;
    let profundidad = 65;
    let inicioX = x + vx * radioNodo;
    let inicioY = y + vy * radioNodo;
    let c1x = inicioX + px * anchoLazo + vx * profundidad;
    let c1y = inicioY + py * anchoLazo + vy * profundidad;
    let c2x = inicioX - px * anchoLazo + vx * profundidad;
    let c2y = inicioY - py * anchoLazo + vy * profundidad;
    let arco = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );
    arco.setAttribute(
        "d",
        `
        M ${inicioX} ${inicioY}
        C ${c1x} ${c1y},
          ${c2x} ${c2y},
          ${inicioX} ${inicioY}
        `
    );
    arco.setAttribute("fill","none");
    arco.setAttribute("stroke",color);
    arco.setAttribute("stroke-width",3);
    svg.appendChild(arco);
    // SELF-LOOP ARROWHEAD
    let dx = inicioX - c2x;
    let dy = inicioY - c2y;
    let angulo = Math.atan2(dy,dx);
    let tam = 15;
    let ancho = 7;
    let p1x = inicioX;
    let p1y = inicioY;
    let p2x = inicioX - tam * Math.cos(angulo) + ancho * Math.sin(angulo);
    let p2y = inicioY - tam * Math.sin(angulo) - ancho * Math.cos(angulo);
    let p3x = inicioX - tam * Math.cos(angulo) - ancho * Math.sin(angulo);
    let p3y = inicioY - tam * Math.sin(angulo) + ancho * Math.cos(angulo);
    let punta = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
    );
    punta.setAttribute(
        "points",
        `
        ${p1x},${p1y}
        ${p2x},${p2y}
        ${p3x},${p3y}
        `
    );
    punta.setAttribute("fill",color);
    svg.appendChild(punta);
}

// =====================================
// CHECK GRAPH
// =====================================

function comprobarGrafo(){
    let correcto = true;
    // THERE MUST BE EXACTLY ONE ARROW PER NODE
    if(flechasUsuario.length != divisor){
        correcto = false;
    }
    // VERIFY THAT ALL TRANSITIONS ARE VALID
    for(let i = 0; i < divisor; i++){
        let destinoCorrecto = (10 * i) % divisor;
        let existe = flechasUsuario.some(
            f => f.origen == i && f.destino == destinoCorrecto
        );
        if(!existe){
            correcto = false;
            console.log("Falta:",i,"→",destinoCorrecto);
        }
    }
    let resultado = document.getElementById("resultadoGrafo");
    if(correcto){
	grafoCorrecto = true;
	// ENABLE NUMBER INPUT
	document.getElementById("numero").disabled = false;
	// ENABLE WALK BUTTON
	document.getElementById(
        "botonRecorrido"
    	).disabled = false;
        resultado.innerHTML =
        `
        ✅ <b>The graph has been built correctly.
        You can now start the walk. Enter the number
        and press the "Start walk" button.
        `;
    }
    else{
	grafoCorrecto = false;
        resultado.innerHTML =
        `
        ❌ <b>The graph is not correct<br>
        <button onclick = "reiniciarGrafo()">
            Try it again
        </button>
        `;
    }
}

// =====================================
// RESET GRAPH
// =====================================

function reiniciarGrafo(){
    flechasUsuario = [];
    nodoSeleccionado = null;
    document.getElementById("resultadoGrafo").innerHTML = "";
    dibujarTodo();
}

// =====================================
// START WALK
// =====================================

function iniciarRecorrido(){
    let numeroIntroducido = document.getElementById("numero").value;
    // ALERT: ENTER A NUMBER BEFORE CONTINUING
    if(numeroIntroducido == ""){
	alert("Enter a number before continuing.");
    	return;
    }
    // ALERT: POSITIVE NUMBER GREATER THAN ZERO
    if(parseInt(numeroIntroducido) <= 0){
        alert("Enter a positive number greater than 0.");
        return;
    }
    numero = numeroIntroducido;
    // CLEAR AS IF "NEW NUMBER" HAD BEEN PRESSED
    limpiarNuevoNumero();
    modoRecorrido = true;
    document.getElementById("botonNuevoNumero").disabled = false;
    // BLOCK FINAL RESULT BUTTON
    document.getElementById("botonResultadoFinal").disabled = true;
    document.getElementById("botonComprobarRecorrido").disabled = false;
    // REMOVE GRAPH VALIDATION MESSAGE
    document.getElementById("resultadoGrafo").innerHTML = "";
    dibujarTodo();
}

// =====================================
// RED ARROWS FOR THE WALK
// =====================================

function dibujarFlechasRecorrido(){
    for(let flecha of flechasRecorrido){
        let origen = posicionesNodos[flecha.origen];
        let destino = posicionesNodos[flecha.destino];
        // SPECIAL CASE: AUTOARC
        if(flecha.origen == flecha.destino){
            dibujarAutoarco(origen.x,origen.y,"red");
            continue;
        }
        // NORMAL OFFSET
        let dx = destino.x - origen.x;
        let dy = destino.y - origen.y;
        let distancia = Math.sqrt(dx * dx + dy * dy);
        let px =- dy / distancia;
        let py = dx / distancia;
        let separacion = 12;
        let x1 = origen.x + px * separacion;
        let y1 = origen.y + py * separacion;
        let x2 = destino.x + px * separacion;
        let y2 = destino.y + py * separacion;
        dibujarFlecha(x1,y1,x2,y2,"red");
    }
}

// =====================================
// SHOW WALK
// ===================================== 

function mostrarRecorrido(){
    let texto = recorridoAlumno.join(" → ");
    document.getElementById("resultadoRecorrido").innerHTML =
    `
    <b>Walk: ${texto}
    <div id = "mensajeRecorrido"></div>
    `;
}

// =====================================
// CHECK WALK
// =====================================

function comprobarRecorrido(){
    let estado = 0;
    let correcto = [estado];
    for(let cifra of numero){
    	estado = (estado * 10 + parseInt(cifra)) % divisor;
    	correcto.push(estado);
    }
    let bien = true;
    if(correcto.length != recorridoAlumno.length){
        bien = false;
    }
    else{
        for(let i = 0; i < correcto.length; i++){
            if(correcto[i] != recorridoAlumno[i]){
                bien = false;
            }
        }
    }
    let resultado = document.getElementById("resultadoRecorrido");
    if(bien){
	recorridoCorrecto = true;
	// ENABLE FINAL RESULT PHASE
	document.getElementById("restoFinal").disabled = false;
	document.querySelectorAll('input[name="divisible"]').forEach(o => o.disabled = false);
        // EL BOTÓN SIGUE BLOQUEADO HASTA COMPLETAR LOS DATOS
	document.getElementById("botonResultadoFinal").disabled = true;
	nodoFinalRecorrido = recorridoAlumno[recorridoAlumno.length-1];
        document.getElementById("mensajeRecorrido").innerHTML =
	`
	✅ Correct walk
	`;
    	dibujarTodo();
    }
    else{
	recorridoCorrecto = false;
        document.getElementById("mensajeRecorrido").innerHTML =
	`
	❌ The walk is not correct<br>
        <button onclick = "reiniciarRecorrido()">
            Try it again
        </button>
        `;
    }
}

// =====================================
// RESET WALK
// =====================================

function reiniciarRecorrido(){
    flechasRecorrido = [];
    recorridoAlumno = [];
    nodoSeleccionado = null;
    nodoFinalRecorrido = null;
    document.getElementById("resultadoRecorrido").innerHTML = "";
    dibujarTodo();
    // LOCK FINAL RESULT PHASE AGAIN
    document.getElementById("botonResultadoFinal").disabled = true;
    document.getElementById("restoFinal").disabled = true;
    document.querySelectorAll('input[name = "divisible"]').forEach(o => o.disabled = true);
}

// =====================================
// CONTROL FINAL RESULT BUTTON
// =====================================

function comprobarDatosFinales(){
    let resto = document.getElementById("restoFinal").value;
    let opcion = document.querySelector('input[name="divisible"]:checked');
    if(resto !== "" && opcion){
    	document.getElementById("botonResultadoFinal").disabled = false;
    }
    else{
    	document.getElementById("botonResultadoFinal").disabled = true;
    }
}

// =====================================
// CHECK FINAL RESULT
// =====================================

function comprobarResultadoFinal(){
    // KEEP THE WALK AND REMOVE THE CORRECT WALK MESSAGE
    mostrarRecorrido();
    // CALCULATE THE FINAL REMAINDER
    let estado = 0;
    for(let cifra of numero){
    	estado = (estado * 10 + parseInt(cifra)) % divisor;
    }
    let restoAlumno = parseInt(document.getElementById("restoFinal").value);
    let opcion = document.querySelector('input[name="divisible"]:checked');
    let divisibleAlumno = opcion.value == "si";
    let divisibleCorrecto = estado == 0;
    let correcto = true;
    if(restoAlumno != estado){
        correcto = false;
    }
    if(divisibleAlumno != divisibleCorrecto){
        correcto = false;
    }
    let resultado = document.getElementById("resultadoFinal");
    if(correcto){
        resultado.innerHTML =
        `
        ✅ <b>Very good!<br>
        Final remainder: ${estado}<br>
        ${
        divisibleCorrecto
        ?
        `The number ${numero} is divisible by ${divisor}`
        :
        `The number ${numero} is not divisible by ${divisor}`
        }
        `;
    }
    else{
        resultado.innerHTML =
        `
        ❌ <b>There is an error<br>
    	Try again!
   	`;
    }
}

// =====================================
// NEW EXERCISE
// =====================================

function nuevoEjercicio(){
    location.reload();
}

// =====================================
// NEW NUMBER (SAME MODULUS)
// =====================================

function nuevoNumero(){
    numero = "";
    modoRecorrido = false;
    recorridoAlumno = [];
    flechasRecorrido = [];
    nodoSeleccionado = null;
    nodoFinalRecorrido = null;
    recorridoCorrecto = false;
    document.getElementById("numero").value = "";
    document.getElementById("botonNuevoNumero").disabled = true;
    document.getElementById("restoFinal").value = "";
    document.getElementById("restoFinal").disabled = true;
    document.querySelectorAll('input[name="divisible"]').forEach(o=>{
        o.checked = false;
        o.disabled = true;
    });
    document.getElementById("resultadoRecorrido").innerHTML = "";
    document.getElementById("resultadoFinal").innerHTML = "";
    document.getElementById("botonComprobarRecorrido").disabled = true;
    document.getElementById("botonResultadoFinal").disabled = true;
    document.getElementById("botonRecorrido").disabled = false;
    document.getElementById("botonNuevoNumero").disabled = true;
    dibujarTodo();
}

// =====================================
// ACTIVATE NEW NUMBER
// =====================================

function activarNuevoNumero(){
    let valor = document.getElementById("numero").value;
    if(valor !== ""){
        document.getElementById("botonNuevoNumero").disabled = false;
    }
    else{
        document.getElementById("botonNuevoNumero").disabled = true;
    }
}

// =====================================
// CLEAN NEW NUMBER
// =====================================

function limpiarNuevoNumero(){
    modoRecorrido = false;
    recorridoAlumno = [];
    flechasRecorrido = [];
    nodoSeleccionado = null;
    nodoFinalRecorrido = null;
    recorridoCorrecto = false;
    document.getElementById("restoFinal").value = "";
    document.getElementById("restoFinal").disabled = true;
    document.querySelectorAll('input[name="divisible"]').forEach(o=>{
        o.checked = false;
        o.disabled = true;
    });
    document.getElementById("resultadoRecorrido").innerHTML = "";
    document.getElementById("resultadoFinal").innerHTML = "";
    document.getElementById("botonComprobarRecorrido").disabled = true;
    document.getElementById("botonResultadoFinal").disabled = true;
    dibujarTodo();
}