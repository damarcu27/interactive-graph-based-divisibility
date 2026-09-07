let divisor = null;
let numero = "";
let eventos = [];
let intervalo = null;
let paso = 0;
let recorrido = [];
let flechasRojas = [];
let pos = [];
let preparado = false;
let automaticoActivo = false;
let indiceCifra = 0;
let pasosManuales = [];
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
// CREATE EVENTS
// =====================================

function crearEventos(divisor,numero){
    let eventos = [];
    let estado = 0;
    eventos.push({
        tipo:"inicio",
        estado:estado
    });
    for(let cifra of numero){
        let origen = estado;
        // MULTIPLY BY 10
        let destino10 = (10 * estado) % divisor;
        eventos.push({
            tipo:"multiplicar",
            origen:origen,
            destino:destino10
        });
        estado = destino10;
        // ADD THE DIGIT
        for(let i = 0; i < parseInt(cifra); i++){
            estado = (estado + 1) % divisor;
            eventos.push({
                tipo:"contar",
                estado:estado
            });
        }
        // FINAL STATE OF THIS DIGIT
        eventos.push({
            tipo:"final",
            origen:origen,
            destino:estado
        });
    }
    eventos.push({
        tipo:"fin",
        estado:estado
    });
    return eventos;
}

// =====================================
// CLEAR DRAWING
// =====================================

function limpiar(){
    svg.querySelectorAll(
        "circle,text,line,path:not(defs path)"
    )
    .forEach(
        e=>e.remove()
    );
}

// =====================================
// NODES (STATES)
// =====================================

function dibujarNodo(x,y,texto,color){
    let circulo =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    circulo.setAttribute("cx",x);
    circulo.setAttribute("cy",y);
    circulo.setAttribute("r",32);
    circulo.setAttribute("fill",color);
    circulo.setAttribute("stroke","black");
    circulo.setAttribute("stroke-width",2);
    svg.appendChild(circulo);
    let textoSVG =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );
    textoSVG.setAttribute("x",x);
    textoSVG.setAttribute("y",y+7);
    textoSVG.setAttribute("text-anchor","middle");
    textoSVG.setAttribute("font-size","20");
    textoSVG.setAttribute("font-weight","bold");
    textoSVG.textContent = texto;
    svg.appendChild(textoSVG);
}

// =====================================
// ARROWS
// =====================================

function dibujarFlecha(x1,y1,x2,y2,color="gray"){
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distancia = Math.sqrt(dx * dx + dy * dy);
    let margen = 40;
    x1 += dx / distancia * margen;
    y1 += dy / distancia * margen;
    x2 -= dx / distancia * margen;
    y2 -= dy / distancia * margen;
    let linea =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );
    linea.setAttribute("x1",x1);
    linea.setAttribute("y1",y1);
    linea.setAttribute("x2",x2);
    linea.setAttribute("y2",y2);
    linea.setAttribute("stroke",color);
    linea.setAttribute("stroke-width",3);
    if(color == "blue")
        linea.setAttribute("marker-end","url(#flechaAzul)");
    else if(color == "red")
        linea.setAttribute("marker-end","url(#flechaRoja)");
    else
        linea.setAttribute("marker-end","url(#flechaGris)");
    svg.appendChild(linea);
}

function dibujarFlechaDesplazada(x1,y1,x2,y2,color="red",lado=1){
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distancia = Math.sqrt(dx * dx + dy * dy);
    // REMOVE THE NODE AREA
    let margen = 40;
    x1 += dx / distancia * margen;
    y1 += dy / distancia * margen;
    x2 -= dx / distancia * margen;
    y2 -= dy / distancia * margen;
    // PERPENDICULAR VECTOR
    let px = -dy / distancia;
    let py = dx / distancia;
    let separacion = 12 * lado;
    x1 += px * separacion;
    y1 += py * separacion;
    x2 += px * separacion;
    y2 += py * separacion;
    let linea =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );
    linea.setAttribute("x1",x1);
    linea.setAttribute("y1",y1);
    linea.setAttribute("x2",x2);
    linea.setAttribute("y2",y2);
    linea.setAttribute("stroke",color);
    linea.setAttribute("stroke-width",3);
    linea.setAttribute("marker-end","url(#flechaRoja)");
    svg.appendChild(linea);
}

// =====================================
// SELF-LOOP
// =====================================

function dibujarAutoarco(x,y,color="gray"){
    // GRAPH CENTER
    const cx = 350;
    const cy = 350;
    // RADIAL VECTOR
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
    // PERPENDICULAR VECTOR
    const px = -vy;
    const py = vx;
    // PARAMETERS
    const radioNodo = 32;
    const anchoLazo = 65;
    const profundidad = 65;
    // START AND END
    const inicioX = x + vx * radioNodo;
    const inicioY = y + vy * radioNodo;
    const finX = inicioX;
    const finY = inicioY;
    // SYMMETRICAL CONTROL POINTS
    const c1x = inicioX + px * anchoLazo + vx * profundidad;
    const c1y = inicioY + py * anchoLazo +vy * profundidad;
    const c2x = finX - px * anchoLazo + vx * profundidad;
    const c2y = finY - py * anchoLazo + vy * profundidad;
    let arco = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );
    arco.setAttribute(
        "d",
        `M ${inicioX} ${inicioY}
         C ${c1x} ${c1y},
           ${c2x} ${c2y},
           ${finX} ${finY}`
    );
    arco.setAttribute("fill","none");
    arco.setAttribute("stroke",color);
    arco.setAttribute("stroke-width",color=="gray"?3:4);
    if(color == "red")
        arco.setAttribute("marker-end","url(#flechaRojaPequena)");
    else if(color == "blue")
        arco.setAttribute("marker-end","url(#flechaAzulPequena)");
    else
        arco.setAttribute("marker-end","url(#flechaGris)");
    svg.appendChild(arco);
}

// =====================================
// BASE GRAPH
// =====================================

function dibujarBase(pos){
    for(let i = 0; i < divisor; i++){
        let destino = (10 * i) % divisor;
        if(i==destino){
            dibujarAutoarco(pos[i].x,pos[i].y);
        }
        else{
            dibujarFlecha(pos[i].x,pos[i].y,pos[destino].x,pos[destino].y);
        }
    }
    dibujarArcosIncremento(pos);
    for(let i = 0; i < divisor; i++){
        dibujarNodo(pos[i].x,pos[i].y,i,"lightblue");
    }
}

// =====================================
// +1 CIRCULAR CONNECTIONS
// =====================================

function dibujarArcosIncremento(pos){
    let cx = 350;
    let cy = 350;
    for(let i = 0; i < divisor; i++){
        let siguiente = (i + 1) % divisor;
        let x1 = pos[i].x;
        let y1 = pos[i].y;
        let x2 = pos[siguiente].x;
        let y2 = pos[siguiente].y;
        let arco = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        let radio = 260;
        let angulo1 = Math.atan2(y1-cy,x1-cx);
        let angulo2 = Math.atan2(y2-cy,x2-cx);
        // SHORTEST ARC BETWEEN BOTH POINTS
        arco.setAttribute("d",`M ${x1} ${y1}A ${radio} ${radio} 0 0 1 ${x2} ${y2}`);
        arco.setAttribute("fill","none");
        arco.setAttribute("stroke","lightgray");
        arco.setAttribute("stroke-width",3);
        svg.appendChild(arco);
    }
}

// =====================================
// DISPLAY NUMBER
// =====================================

function mostrarNumero(numero){
    const contenedor = document.getElementById("numeroAnimado");
    contenedor.innerHTML = "";
    for(const cifra of numero){
        const span = document.createElement("span");
        span.textContent = cifra;
        contenedor.appendChild(span);
    }
}

function mostrarCalculo(indice, terminado = false){
    const contenedor = document.getElementById("calculoAnimado");
    if(!contenedor){
        return;
    }
    if(indice >= numero.length){
        return;
    }
    // PREVIOUS REMAINDER
    let restoAnterior = 0;
    if(indice > 0){
        let numeroAnterior = numero.substring(0, indice);
        restoAnterior = parseInt(numeroAnterior) % divisor;
    }
    // CURRENT DIGIT
    let digito = parseInt(numero[indice]);
    // NEW REMAINDER
    let nuevoResto = (restoAnterior * 10 + digito) % divisor;
    // START A NEW OPERATION
    if(!terminado){
        const linea = document.createElement("div");
        linea.className = "operacionActual";
        linea.textContent = "(" + restoAnterior + " × 10 + " + digito + ") mod " + divisor;
        contenedor.appendChild(linea);
    }
    // COMPLETE THE OPERATION
    else{
        const linea = contenedor.lastElementChild;
        if(linea){
            linea.textContent = "(" + restoAnterior + " × 10 + " + digito + ") mod " +
            divisor + " = " + nuevoResto;
        }
    }
}

// =====================================
// HIGHLIGHT DIGIT
// =====================================

function iluminarCifra(indice){
    const cifras = document.querySelectorAll("#numeroAnimado span");
    cifras.forEach(c=>c.classList.remove("activo"));
    if(indice < cifras.length)
        cifras[indice].classList.add("activo");
}

// =====================================
// TURN OFF NUMBER
// =====================================

function apagarNumero(){
    document.querySelectorAll("#numeroAnimado span")
        .forEach(c=>c.classList.remove("activo"));
}

// =====================================
// START ANIMATION
// =====================================

function iniciar(){
    let moduloIntroducido = parseInt(
        document.getElementById("modulo").value
    );
    if(
        isNaN(moduloIntroducido) ||
        moduloIntroducido < 2 ||
        moduloIntroducido > 20
    ){
        alert("Enter a modulus between 2 and 20.");
        return;
    }
    // CLEAR PREVIOUSLY PRINTED CONTENT BEFORE STARTING AUTOMATIC MODE
    if(!automaticoActivo){
        automaticoActivo = true;
        const botonPausa = document.getElementById("pausa");
        if(botonPausa){
            botonPausa.disabled = false;
            botonPausa.textContent = "Pause";
        }
        document.getElementById("calculoAnimado").innerHTML = "";
        document.getElementById("informacion").innerHTML = "";
    }
    if(intervalo){
        return;
    }
    if(!preparado){
        divisor = parseInt(document.getElementById("modulo").value);
        numero = document.getElementById("numero").value;
        eventos = crearEventos(divisor,numero);
        pos = posiciones(divisor);
        // ALERT: ENTER A NUMBER GREATER THAN ZERO
        if (numero === "" || !/^\d+$/.test(numero) || parseInt(numero) <= 0) {
            alert("Enter a positive number greater than 0.");
            return;
        }
        document.getElementById("informacion").style.display = "block";	
        // AUTOMATIC MODE
        prepararSliderManual();
        const sliderManual = document.getElementById("pasoManual");
        if(sliderManual){
            sliderManual.disabled = true;
        }
        recorrido = [eventos[0].estado];
        flechasRojas = [];
        paso = 0;
        preparado = true;
        // DISPLAY THE NUMBER AND HIGHLIGHT THE FIRST DIGIT
        mostrarNumero(numero);
        iluminarCifra(0);
        document.getElementById("calculoAnimado").innerHTML = "";
        // CREATE A NEW INFORMATION PANEL
        document.getElementById("informacion").innerHTML = "";
        document.getElementById("calculoAnimado").style.display = "block";
        // SHOW THE PANEL WHEN STARTING
        document.getElementById("contenedorInfo").style.display = "flex";
    }
    const slider = parseInt(document.getElementById("velocidad").value);
    const velocidad = 1600 - slider;
    intervalo = setInterval(()=>{
        limpiar();
        dibujarBase(pos);
        let e = eventos[paso];
        let actual;
        if(e.tipo == "inicio")
            actual = e.estado;
        if(e.tipo == "multiplicar")
            actual = e.destino;
        if(e.tipo == "contar")
            actual = e.estado;
        if(e.tipo == "final")
            actual = e.destino;
        if(e.tipo == "fin")
            actual = e.estado;
        // SAVE THE FINAL WALK
        if(e.tipo == "final"){
            let indiceCalculo = recorrido.length - 1;
            mostrarCalculo(indiceCalculo,true);
            let nueva = {
                origen:e.origen,
                destino:e.destino,
                invertida:false
            };
            for(let anterior of flechasRojas){
                if(
                    anterior.origen == nueva.destino &&
                    anterior.destino == nueva.origen
                ){
                    nueva.invertida = true;
                }
            }
            flechasRojas.push(nueva);
            recorrido.push(e.destino);
        }
        // DRAW RED ARROWS
        for(let flecha of flechasRojas){
            if(flecha.origen == flecha.destino){
                dibujarAutoarco(pos[flecha.origen].x,pos[flecha.origen].y,"red");
            }else{
                let lado = 1;
                let inversa =
                    flechasRojas.find(f => f.origen == flecha.destino && f.destino == flecha.origen);
                if(inversa){
                    let indice = flechasRojas.indexOf(flecha);
                    lado = indice % 2 == 0 ? 1 : -1;
                }
                dibujarFlechaDesplazada(
                    pos[flecha.origen].x,
                    pos[flecha.origen].y,
                    pos[flecha.destino].x,
                    pos[flecha.destino].y,
                    "red",
                    1
                );
            }
        }
        // BLUE ARROW
        if(e.tipo == "multiplicar"){
            if(e.origen == e.destino){
                dibujarAutoarco(pos[e.origen].x,pos[e.origen].y,"blue");
            }else{
                dibujarFlecha(pos[e.origen].x,pos[e.origen].y,pos[e.destino].x,pos[e.destino].y,"blue");
            }
        }
        let color = "red";
        if(e.tipo == "multiplicar")
            color = "dodgerblue";
        if(e.tipo == "fin")
            color = "limegreen";
        dibujarNodo(pos[actual].x,pos[actual].y,actual,color);
        document.getElementById("informacion").innerHTML =
            "<div class='recuadroRecorrido'>" + "Walk: " + recorrido.join(" → ") + "</div>";
        // CHANGE THE HIGHLIGHTED DIGIT WHEN STARTING A NEW ANIMATION
        if(e.tipo == "multiplicar"){
            let indice = recorrido.length - 1;
            if(indice < numero.length){
                iluminarCifra(indice);
                mostrarCalculo(indice,false);
            }
        }
        // TURN OFF THE LAST DIGIT WHEN FINISHED
        if(e.tipo == "fin"){
            apagarNumero();
        }
        paso++;
        if(paso >= eventos.length){
            clearInterval(intervalo);
            intervalo = null;
            preparado = false;
            // PAUSE BUTTON IS DISABLED WHEN AUTOMATIC SIMULATION FINISHES
            automaticoActivo = false;
            const botonPausa = document.getElementById("pausa");
            if(botonPausa){
                botonPausa.disabled = true;
                botonPausa.textContent = "Pause";
            }
            // RESET DIGIT COUNTER BEFORE THE NEXT ANIMATION
            indiceCifra = 0;
            document.getElementById("informacion").innerHTML =
                "<div class='recuadroRecorrido'>" + "Walk: " + recorrido.join(" → ") +
                "</div>" + "<div class='recuadroRestoFinal'>" + "Final remainder: " + actual +
                "</div>" + "<div class='resultadoFinal'>" + (actual == 0
                    ? "THE NUMBER " + numero + " IS DIVISIBLE BY " + divisor
                    : "THE NUMBER " + numero + " IS NOT DIVISIBLE BY " + divisor) + "</div>";
        }
    },velocidad);
}

// =====================================================
// START MANUAL MODE
// =====================================================

function iniciarManual(){
    // DISABLE PAUSE WHILE MANUAL SIMULATION IS RUNNING
    automaticoActivo = false;
    const botonPausa = document.getElementById("pausa");
    if(botonPausa){
        botonPausa.disabled = true;
        botonPausa.textContent = "Pause";
    }
    // READ PARAMETERS
    let moduloIntroducido = parseInt(document.getElementById("modulo").value);
    let numeroIntroducido = document.getElementById("numero").value;
    // VALIDATE MODULUS
    if(
        isNaN(moduloIntroducido) ||
        moduloIntroducido < 2 ||
        moduloIntroducido > 20
    ){
        alert("Enter a modulus between 2 and 20.");
        return;
    }
    // VALIDATE NUMBER
    if(
        numeroIntroducido === "" ||
        !/^\d+$/.test(numeroIntroducido)
    ){
        alert("Enter a positive number greater than 0.");
        return;
    }
    document.getElementById("calculoAnimado").style.display = "block";
    // IF AUTOMATIC MODE IS RUNNING, STOP IT
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
    }
    // PREPARE DATA
    divisor = moduloIntroducido;
    numero = numeroIntroducido;
    pos = posiciones(divisor);
    eventos = crearEventos(divisor,numero);
    // PREPARE MANUAL STEPS
    pasosManuales = crearPasosManuales();
    const slider = document.getElementById("pasoManual");
    if(slider){
        slider.min = 0;
        slider.max = pasosManuales.length;
        slider.value = 0;
        slider.disabled = false;
    }
    // DISPLAY NUMBER
    mostrarNumero(numero);
    iluminarCifra(0);
    // CLEAR AND DRAW GRAPH
    limpiar();
    dibujarBase(pos);
    // RESET INFORMATION
    document.getElementById("informacion").style.display = "block";
    document.getElementById("contenedorInfo").style.display = "flex";
    document.getElementById("informacion").innerHTML = "";
    // CLEAR CALCULATIONS
    document.getElementById("calculoAnimado").innerHTML = "";
    // UPDATE SLIDER TEXT
    actualizarTextoSliderManual();
    // MARK AS PREPARED
    preparado = true;
    paso = 0;
    recorrido = [0];
    flechasRojas = [];
}

// =====================================================
// STOP ANIMATION
// =====================================================

function pausaReanudar(){
    if(!automaticoActivo){
        return;
    }
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
        document.getElementById("pausa").textContent = "Resume";
    }
    else{
        iniciar();
        document.getElementById("pausa").textContent = "Pause";
    }
}

// =====================================
// NEW SIMULATION
// =====================================

function nuevaSimulacion(){
    // STOP THE ANIMATION
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
    }
    // RESET VARIABLES
    divisor = null;
    numero = "";
    eventos = [];
    paso = 0;
    recorrido = [];
    flechasRojas = [];
    pos = [];
    preparado = false;
    automaticoActivo = false;
    indiceCifra = 0;
    // CLEAR THE GRAPH
    limpiar();
    // CLEAR THE NUMBER BEING PROCESSED
    document.getElementById("numeroAnimado").innerHTML = "";
    // CLEAR ANIMATED CALCULATION
    document.getElementById("calculoAnimado").innerHTML = "";
    document.getElementById("calculoAnimado").style.display = "none";
    // CLEAR INFORMATION
    document.getElementById("informacion").innerHTML = "";
    // HIDE THE INFORMATION BOX
    document.getElementById("informacion").style.display = "none";
    // RESET FIELDS
    document.getElementById("modulo").value = "";
    document.getElementById("numero").value = "";
    // RESET SPEED
    document.getElementById("velocidad").value = 700;
    // RESET PAUSE BUTTON
    document.getElementById("pausa").textContent = "Pause";
    document.getElementById("pausa").disabled = true;
    // RESET MANUAL SLIDER
    const sliderManual =
        document.getElementById("pasoManual");
    if(sliderManual){
        sliderManual.value = 0;
        sliderManual.max = 0;
        sliderManual.disabled = false;
    }
    const textoSliderManual = document.getElementById("textoPasoManual");
    if(textoSliderManual){
        textoSliderManual.textContent = "Step 0 / 0";
    }
    pasosManuales = [];
}

// =====================================================
// MANUAL STEP-BY-STEP MODE
// =====================================================
//
// IMPORTANT:
// This system is independent of the automatic animation.
// It does not modify crearEventos(), iniciar(), dibujarBase(), etc.
// =====================================================

// =====================================================
// CREATE DIDACTIC STEPS
// =====================================================
//
// Each digit generates TWO steps:
//
// 1. MULTIPLY BY 10
// 2. ADD THE DIGIT
//
// Example:
//
// 1234:
//
// step 1 -> (0 × 10) mod 7
// step 2 -> (0 × 10 + 1) mod 7
// step 3 -> (1 × 10) mod 7
// step 4 -> (3 × 10 + 2) mod 7
// ...

function crearPasosManuales() {
    let pasos = [];
    let estado = 0;
    for(let i = 0; i < numero.length; i++){
        let digito = parseInt(numero[i]);
        // BLUE STEP: MULTIPLY BY 10
        let restoAnterior = estado;
        let resultadoMultiplicacion = (restoAnterior * 10) % divisor;
        pasos.push({
            tipo: "multiplicar",
            indiceCifra: i,
            origen: restoAnterior,
            destino: resultadoMultiplicacion,
            restoAnterior: restoAnterior,
            digito: digito,
            resultado: resultadoMultiplicacion
        });
        estado = resultadoMultiplicacion;
        // RED STEP: ADD THE DIGIT
        let resultadoSuma = (restoAnterior * 10 + digito) % divisor;
        pasos.push({
            tipo: "sumar",
            indiceCifra: i,
            origen: restoAnterior,
            destino: resultadoSuma,
            restoAnterior: restoAnterior,
            digito: digito,
            resultado: resultadoSuma
        });
        estado = resultadoSuma;
    }
    return pasos;
}

// =====================================================
// PREPARE SLIDER
// =====================================================

function prepararSliderManual(){
    const slider = document.getElementById("pasoManual");
    if(!slider){
        return;
    }
    pasosManuales = crearPasosManuales();
    slider.min = 0;
    slider.max = pasosManuales.length;
    slider.value = 0;
    slider.disabled = false;
    actualizarTextoSliderManual();
}

// =====================================================
// SLIDER TEXT
// =====================================================

function actualizarTextoSliderManual(){
    const slider = document.getElementById("pasoManual");
    const texto = document.getElementById("textoPasoManual");
    if(!slider || !texto){
        return;
    }
    texto.textContent = "Step " + slider.value + " / " + slider.max;
}

// =====================================================
// CALCULATE STATE UP TO A STEP
// =====================================================
//
// This allows reconstructing the walk when the student
// moves the slider forwards OR backwards.

function obtenerEstadoHastaPaso(numeroPaso){
    let estado = 0;
    let recorridoManual = [0];
    let flechas = [];
    for(let i = 0; i < numeroPaso; i++){
        const pasoActual = pasosManuales[i];
        if(!pasoActual){
            continue;
        }
        if(pasoActual.tipo == "multiplicar"){
            estado = pasoActual.destino;
        }
        if(pasoActual.tipo == "sumar"){
            estado = pasoActual.destino;
            flechas.push({
                origen: pasoActual.origen,
                destino: pasoActual.destino
            });
            recorridoManual.push(estado);
        }
    }
    return {
        estado: estado,
        recorrido: recorridoManual,
        flechas: flechas
    };
}

// =====================================================
// DRAW RED WALK
// =====================================================

function dibujarRecorridoManual(flechas){
    for(let flecha of flechas){
        if(flecha.origen == flecha.destino){
            dibujarAutoarco(pos[flecha.origen].x,pos[flecha.origen].y,"red");
        }
        else{
            dibujarFlechaDesplazada(
                pos[flecha.origen].x,
                pos[flecha.origen].y,
                pos[flecha.destino].x,
                pos[flecha.destino].y,
                "red",
                1
            );
        }
    }
}

// =====================================================
// SHOW AUTOMATIC CALCULATION
// =====================================================

function mostrarCalculo(indice, terminado = false){
    const contenedor = document.getElementById("calculoAnimado");
    if(!contenedor){
        return;
    }
    if(indice >= numero.length){
        return;
    }
    // PREVIOUS REMAINDER
    let restoAnterior = 0;
    if(indice > 0){
        const numeroAnterior = numero.substring(0, indice);
        restoAnterior = parseInt(numeroAnterior) % divisor;
    }
    // CURRENT DIGIT
    const digito = parseInt(numero[indice]);
    // ×10 RESULT
    const resultadoMultiplicacion = (restoAnterior * 10) % divisor;
    // ×10 + DIGIT RESULT
    const nuevoResto = (restoAnterior * 10 + digito) % divisor;
    // ×10 STEP
    if(!terminado){
        const linea = document.createElement("div");
        linea.className = "operacionActual";
        const etiquetaPaso = document.createElement("span");
        etiquetaPaso.innerHTML = "<strong>Step " + ((indice * 2) + 1) + ":</strong>";
        etiquetaPaso.style.display = "inline-block";
        etiquetaPaso.style.width = "75px";
        const calculo = document.createElement("span");
        calculo.textContent = "(" + restoAnterior + " × 10) mod " + divisor + " = " + resultadoMultiplicacion;
        linea.appendChild(etiquetaPaso);
        linea.appendChild(calculo);
        contenedor.appendChild(linea);
        return;
    }
    // ×10 + DIGIT STEP
    const linea = document.createElement("div");
    linea.className = "operacionActual";
    const etiquetaPaso = document.createElement("span");
    etiquetaPaso.innerHTML = "<strong>Step " + ((indice * 2) + 2) + ":</strong>";
    etiquetaPaso.style.display = "inline-block";
    etiquetaPaso.style.width = "75px";
    const calculo = document.createElement("span");
    calculo.textContent = "(" + restoAnterior + " × 10 + " + digito + ") mod " + divisor + " = " + nuevoResto;
    linea.appendChild(etiquetaPaso);
    linea.appendChild(calculo);
    contenedor.appendChild(linea);
}

// =====================================================
// SHOW CALCULATIONS IN MANUAL MODE
// =====================================================
//
// Step 0 -> shows nothing
// Step 1 -> shows ×10 for digit 1
// Step 2 -> shows ×10 + digit for digit 1
// Step 3 -> adds ×10 for digit 2
// Step 4 -> adds ×10 + digit for digit 2
// etc.
//
// Previous calculations are NOT deleted.
// =====================================================

function mostrarCalculoManual(numeroPaso){
    const contenedor = document.getElementById("calculoAnimado");
    if(!contenedor){
        return;
    }
    // CLEAR PREVIOUS CALCULATIONS
    contenedor.innerHTML = "";
    // SHOW ALL STEPS UP TO HERE
    for(let i = 0; i < numeroPaso; i++){
        const pasoActual = pasosManuales[i];
        if(!pasoActual){
            continue;
        }
        const linea = document.createElement("div");
        linea.className = "operacionActual";
        // STEP LABEL
        const etiquetaPaso = document.createElement("span");
        etiquetaPaso.textContent = "Step " + (i + 1) + ":";
        etiquetaPaso.style.fontWeight = "bold";
        // INDENTATION
        etiquetaPaso.style.display = "inline-block";
        etiquetaPaso.style.width = "75px";
        // CALCULATION
        const calculo = document.createElement("span");
        if(pasoActual.tipo == "multiplicar"){
            calculo.textContent = "(" + pasoActual.restoAnterior + " × 10) mod " + divisor +
                " = " + pasoActual.resultado;
        }
        if(pasoActual.tipo == "sumar"){
            calculo.textContent = "(" + pasoActual.restoAnterior + " × 10 + " +
                pasoActual.digito + ") mod " + divisor + " = " + pasoActual.resultado;
        }
        // ADD TO THE LINE
        linea.appendChild(etiquetaPaso);
        linea.appendChild(calculo);
        contenedor.appendChild(linea);
    }
}

// =====================================================
// DRAW A MANUAL STEP
// =====================================================

function dibujarPasoManual(numeroPaso){
    if(!pasosManuales.length){
        return;
    }
    // STEP 0
    if(numeroPaso <= 0){
        limpiar();
        dibujarBase(pos);
        iluminarCifra(0);
        document.getElementById("calculoAnimado").innerHTML = "";
        document.getElementById("informacion").innerHTML = "";
        dibujarNodo(pos[0].x,pos[0].y,0,"red");
        return;
    }
    // GET STATE
    const estado =obtenerEstadoHastaPaso(numeroPaso);
    // CLEAR
    limpiar();
    // DRAW BASE GRAPH
    dibujarBase(pos);
    // DRAW RED WALK
    dibujarRecorridoManual(estado.flechas);
    // CURRENT STEP
    const pasoActual = pasosManuales[numeroPaso - 1];
    // BLUE ARROW
    if(pasoActual.tipo == "multiplicar"){
        if(pasoActual.origen == pasoActual.destino){
            dibujarAutoarco(pos[pasoActual.origen].x,pos[pasoActual.origen].y,"blue");
        }
        else{
            dibujarFlecha(
                pos[pasoActual.origen].x,
                pos[pasoActual.origen].y,
                pos[pasoActual.destino].x,
                pos[pasoActual.destino].y,
                "blue"
            );
        }
    }
    // CURRENT NODE
    let colorNodo ="dodgerblue";
    if(pasoActual.tipo == "sumar"){
        colorNodo = "red";
        if(numeroPaso == pasosManuales.length){
            colorNodo = "limegreen";
        }
    }
    dibujarNodo(pos[pasoActual.destino].x,pos[pasoActual.destino].y,pasoActual.destino,colorNodo);
    // WALK + FINAL RESULT
    const informacion = document.getElementById("informacion");
    let textoInformacion =
        "<div class='recuadroRecorrido'>" +
        "Walk: " +
        estado.recorrido.join(" → ") +
        "</div>";
    if(numeroPaso == pasosManuales.length){
        const restoFinal = estado.estado;
        textoInformacion += "<div class='recuadroRestoFinal'>" + "Final remainder: " + restoFinal + "</div>";
        textoInformacion += "<div class='resultadoFinal'>" + (restoFinal == 0
            ? "THE NUMBER " + numero + " IS DIVISIBLE BY " + divisor
            : "THE NUMBER " + numero + " IS NOT DIVISIBLE BY " + divisor) + "</div>";
    }
    informacion.innerHTML = textoInformacion;
    // HIGHLIGHT DIGIT
    iluminarCifra(pasoActual.indiceCifra);
    // SHOW CALCULATION
    mostrarCalculoManual(numeroPaso);
    // UPDATE SLIDER TEXT
    actualizarTextoSliderManual();
}

// =====================================================
// SLIDER EVENT
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function(){
        const slider = document.getElementById("pasoManual");
        if(!slider){
            return;
        }
        slider.addEventListener(
            "input",
            function(){
                // IF ANIMATION IS RUNNING, PAUSE IT
                if(intervalo){
                    clearInterval(intervalo);
                    intervalo = null;
                    const botonPausa = document.getElementById("pausa");
                    if(botonPausa){
                        botonPausa.textContent = "Resume";
                    }
                }
                // GET STEP
                const numeroPaso = parseInt(this.value);
                // DRAW
                dibujarPasoManual(numeroPaso);
                actualizarTextoSliderManual();
            }
        );
        // PAUSE DISABLED ON LOAD
        const botonPausa = document.getElementById("pausa");
        if(botonPausa){
            botonPausa.disabled = true;
        }
    }
);

// =====================================================
// START FROM ZERO
// =====================================================

function iniciarDesdeCero(){
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
    }
    // DELETE EVERYTHING FROM THE PREVIOUS SIMULATION
    paso = 0;
    recorrido = [];
    flechasRojas = [];
    preparado = false;
    document.getElementById("calculoAnimado").innerHTML = "";
    document.getElementById("informacion").innerHTML = "";
    limpiar();
    document.getElementById("pausa").textContent = "Pause";
    // START AUTOMATIC MODE FROM THE BEGINNING
    iniciar();
}