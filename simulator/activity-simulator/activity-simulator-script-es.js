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
// POSICIONES CIRCULARES
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
// CREAR EVENTOS
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
        // MULTIPLICAR POR 10
        let destino10 = (10 * estado) % divisor;
        eventos.push({
            tipo:"multiplicar",
            origen:origen,
            destino:destino10
        });
        estado = destino10;
        // SUMAR EL DÍGITO
        for(let i = 0; i < parseInt(cifra); i++){
            estado = (estado + 1) % divisor;
            eventos.push({
                tipo:"contar",
                estado:estado
            });
        }
        // ESTADO FINAL DE ESE DÍGITO
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
// LIMPIAR DIBUJO
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
// NODOS (ESTADOS)
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
// FLECHAS
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
    // ELIMINAR LA ZONA DEL NODO
    let margen = 40;
    x1 += dx / distancia * margen;
    y1 += dy / distancia * margen;
    x2 -= dx / distancia * margen;
    y2 -= dy / distancia * margen;
    // VECTOR PERPENDICULAR
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
// AUTOARCO
// =====================================

function dibujarAutoarco(x,y,color="gray"){
    // CENTRO DEL GRAFO
    const cx = 350;
    const cy = 350;
    // VECTOR RADIAL
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
    // VECTOR PERPENDICULAR
    const px = -vy;
    const py = vx;
    // PARÁMETROS
    const radioNodo = 32;
    const anchoLazo = 65;
    const profundidad = 65;
    // INICIO Y FIN
    const inicioX = x + vx * radioNodo;
    const inicioY = y + vy * radioNodo;
    const finX = inicioX;
    const finY = inicioY;
    // CONTROLES SIMÉTRICOS
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
// GRAFO BASE
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
// +1 CONEXIONES CIRCULARES
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
        // MENOR ARCO ENTRE AMBOS PUNTOS
        arco.setAttribute("d",`M ${x1} ${y1}A ${radio} ${radio} 0 0 1 ${x2} ${y2}`);
        arco.setAttribute("fill","none");
        arco.setAttribute("stroke","lightgray");
        arco.setAttribute("stroke-width",3);
        svg.appendChild(arco);
    }
}

// =====================================
// MOSTRAR NÚMERO
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
    // RESTO ANTERIOR
    let restoAnterior = 0;
    if(indice > 0){
        let numeroAnterior = numero.substring(0, indice);
        restoAnterior = parseInt(numeroAnterior) % divisor;
    }
    // DÍGITO ACTUAL
    let digito = parseInt(numero[indice]);
    // NUEVO RESTO
    let nuevoResto = (restoAnterior * 10 + digito) % divisor;
    // EMPIEZA UNA NUEVA OPERACIÓN
    if(!terminado){
        const linea = document.createElement("div");
        linea.className = "operacionActual";
        linea.textContent = "(" + restoAnterior + " × 10 + " + digito + ") mod " + divisor;
        contenedor.appendChild(linea);
    }
    // TERMINA LA OPERACIÓN
    else{
        const linea = contenedor.lastElementChild;
        if(linea){
            linea.textContent = "(" + restoAnterior + " × 10 + " + digito + ") mod " + 
	    divisor + " = " + nuevoResto;
        }
    }
}

// =====================================
// RESALTAR DÍGITO
// =====================================

function iluminarCifra(indice){
    const cifras = document.querySelectorAll("#numeroAnimado span");
    cifras.forEach(c=>c.classList.remove("activo"));
    if(indice < cifras.length)
        cifras[indice].classList.add("activo");
}

// =====================================
// APAGAR NÚMERO
// =====================================

function apagarNumero(){
    document.querySelectorAll("#numeroAnimado span")
        .forEach(c=>c.classList.remove("activo"));
}

// =====================================
// EMPEZAR ANIMACIÓN
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
        alert("Introduce un módulo entre 2 y 20.");
        return;
    }
    // BORRAR LO IMPRESO ANTES DE COMENZAR AUTOMÁTICA
    if(!automaticoActivo){
        automaticoActivo = true;
        const botonPausa = document.getElementById("pausa");
        if(botonPausa){
            botonPausa.disabled = false;
            botonPausa.textContent = "Pausar";
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
	// ALERTA: INTRODUCE UN NÚMERO MAYOR QUE CERO
	if (numero === "" || !/^\d+$/.test(numero) || parseInt(numero) <= 0) {
    	    alert("Introduce un número positivo mayor que 0.");
    	    return;
	}
        document.getElementById("informacion").style.display = "block";
	// MODO AUTOMÁTICO
   	prepararSliderManual();
    	const sliderManual = document.getElementById("pasoManual");
    	if(sliderManual){
            sliderManual.disabled = true;
        }
        recorrido = [eventos[0].estado];
        flechasRojas = [];
        paso = 0;
        preparado = true;
        // MOSTRAR EL NÚMERO Y RESALTAR EL PRIMER DÍGITO
        mostrarNumero(numero);
        iluminarCifra(0);
        document.getElementById("calculoAnimado").innerHTML = "";
	// CREAR UN NUEVO PANEL DE INFORMACIÓN
	document.getElementById("informacion").innerHTML = "";
	document.getElementById("calculoAnimado").style.display = "block";
	// OCULTAR EL PANEL AL INICIAR
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
        // GUARDAR EL RECORRIDO FINAL
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
        // DIBUJAR FLECHAS ROJAS
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
        // FLECHA AZUL
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
     	    "<div class='recuadroRecorrido'>" + "Recorrido: " + recorrido.join(" → ") + "</div>";
        // CAMBIAR EL DÍGITO RESALTADO AL EMPEZAR UNA NUEVA ANIMACIÓN
        if(e.tipo == "multiplicar"){
            let indice = recorrido.length - 1;
            if(indice < numero.length){
                iluminarCifra(indice);
		mostrarCalculo(indice,false);
            }
        }
        // APAGAR EL ÚLTIMO DÍGITO AL TERMINAR
        if(e.tipo == "fin"){
            apagarNumero();
        }
        paso++;
        if(paso >= eventos.length){
            clearInterval(intervalo);
            intervalo = null;
            preparado = false;
	    // PAUSAR VUELVE A DESACTIVARSE CUANDO SIMULACIÓN AUTOMÁTICA TERMINA
	    automaticoActivo = false;
	    const botonPausa = document.getElementById("pausa");
	    if(botonPausa){
   		botonPausa.disabled = true;
    		botonPausa.textContent = "Pausar";
	    }
            // RESTABLECER EL CONTADOR DE DÍGITOS ANTES DE LA SIGUIENTE ANIMACIÓN
   	    indiceCifra = 0;
	    document.getElementById("informacion").innerHTML =
    		"<div class='recuadroRecorrido'>" + "Recorrido: " + recorrido.join(" → ") +
    		"</div>" + "<div class='recuadroRestoFinal'>" + "Resto final: " + actual +
    		"</div>" + "<div class='resultadoFinal'>" + (actual == 0
        	    ? "EL NÚMERO " + numero + " ES DIVISIBLE POR " + divisor
        	    : "EL NÚMERO " + numero + " NO ES DIVISIBLE POR " + divisor) + "</div>";
        }
    },velocidad);
}

// =====================================================
// INICIAR MODO MANUAL
// =====================================================

function iniciarManual(){
    // DESACTIVAR PAUSAR MIENTRAS ESTÁ SIMULACIÓN MANUAL
    automaticoActivo = false;
    const botonPausa = document.getElementById("pausa");
    if(botonPausa){
    	botonPausa.disabled = true;
    	botonPausa.textContent = "Pausar";
    }
    // LEER PARÁMETROS
    let moduloIntroducido = parseInt(document.getElementById("modulo").value);
    let numeroIntroducido = document.getElementById("numero").value;
    // VALIDAR MÓDULO
    if(
        isNaN(moduloIntroducido) ||
        moduloIntroducido < 2 ||
        moduloIntroducido > 20
    ){
        alert("Introduce un módulo entre 2 y 20.");
        return;
    }
    // VALIDAR NÚMERO
    if(
        numeroIntroducido === "" ||
        !/^\d+$/.test(numeroIntroducido)
    ){
        alert("Introduce un número positivo mayor que 0.");
        return;
    }
    document.getElementById("calculoAnimado").style.display = "block";
    // SI HAY AUTOMÁTICO FUNCIONANDO, PARARLO
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
    }
    // PREPARAR DATOS
    divisor = moduloIntroducido;
    numero = numeroIntroducido;
    pos = posiciones(divisor);
    eventos = crearEventos(divisor,numero);
    // PREPARAR PASOS MANUALES
    pasosManuales = crearPasosManuales();
    const slider = document.getElementById("pasoManual");
    if(slider){
        slider.min = 0;
        slider.max = pasosManuales.length;
        slider.value = 0;
        slider.disabled = false;
    }
    // MOSTRAR NÚMERO
    mostrarNumero(numero);
    iluminarCifra(0);
    // LIMPIAR Y DIBUJAR GRAFO
    limpiar();
    dibujarBase(pos);
    // REINICIAR INFORMACIÓN
    document.getElementById("informacion").style.display = "block";
    document.getElementById("contenedorInfo").style.display = "flex";
    document.getElementById("informacion").innerHTML = "";
    // LIMPIAR CÁLCULOS
    document.getElementById("calculoAnimado").innerHTML = "";
    // ACTUALIZAR TEXTO DEL SLIDER
    actualizarTextoSliderManual();
    // MARCAR COMO PREPARADO
    preparado = true;
    paso = 0;
    recorrido = [0];
    flechasRojas = [];
}

// =====================================================
// PARAR ANIMACIÓN
// =====================================================

function pausaReanudar(){
    if(!automaticoActivo){
        return;
    }
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
	document.getElementById("pausa").textContent = "Reanudar";
    }
    else{
	iniciar();
	document.getElementById("pausa").textContent = "Pausar";
    }
}

// =====================================
// NUEVA SIMULACIÓN
// =====================================

function nuevaSimulacion(){
    // PARAR LA ANIMACIÓN
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
    }
    // RESTABLECER VARIABLES
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
    // LIMPIAR EL GRAFO
    limpiar();
    // LIMPIAR EL NÚMERO EN PROCESO
    document.getElementById("numeroAnimado").innerHTML = "";
    // LIMPIAR CÁLCULO ANIMADO
    document.getElementById("calculoAnimado").innerHTML = "";
    document.getElementById("calculoAnimado").style.display = "none";
    // LIMPIAR LA INFORMACIÓN
    document.getElementById("informacion").innerHTML = "";
    // OCULTAR EL RECUADRO DE INFORMACIÓN
    document.getElementById("informacion").style.display = "none";
    // RESTABLECER LOS CAMPOS
    document.getElementById("modulo").value = "";
    document.getElementById("numero").value = "";
    // RESTABLECER LA VELOCIDAD
    document.getElementById("velocidad").value = 700;
    // RESTABLECER EL BOTÓN DE PAUSA
    document.getElementById("pausa").textContent = "Pausar";
    document.getElementById("pausa").disabled = true;
    // REINICIAR SLIDER MANUAL
    const sliderManual =
    	document.getElementById("pasoManual");
    if(sliderManual){
    	sliderManual.value = 0;
    	sliderManual.max = 0;
    	sliderManual.disabled = false;
    }
    const textoSliderManual = document.getElementById("textoPasoManual");
    if(textoSliderManual){
    	textoSliderManual.textContent = "Paso 0 / 0";
    }
    pasosManuales = [];
}

// =====================================================
// MODO MANUAL PASO A PASO
// =====================================================
//
// IMPORTANTE:
// Este sistema es independiente de la animación automática.
// No modifica crearEventos(), iniciar(), dibujarBase(), etc.
// =====================================================

// =====================================================
// CREAR LOS PASOS DIDÁCTICOS
// =====================================================
//
// Cada cifra genera DOS pasos:
//
// 1. MULTIPLICAR POR 10
// 2. SUMAR EL DÍGITO
//
// Ejemplo:
//
// 1234:
//
// paso 1 -> (0 × 10) mod 7
// paso 2 -> (0 × 10 + 1) mod 7
// paso 3 -> (1 × 10) mod 7
// paso 4 -> (3 × 10 + 2) mod 7
// ...

function crearPasosManuales() {
    let pasos = [];
    let estado = 0;
    for(let i = 0; i < numero.length; i++){
        let digito = parseInt(numero[i]);
        // PASO AZUL: MULTIPLICAR POR 10
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
        // PASO ROJO: SUMAR EL DÍGITO
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
// PREPARAR EL DESLIZADOR
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
// TEXTO DEL DESLIZADOR
// =====================================================

function actualizarTextoSliderManual(){
    const slider = document.getElementById("pasoManual");
    const texto = document.getElementById("textoPasoManual");
    if(!slider || !texto){
        return;
    }
    texto.textContent = "Paso " + slider.value + " / " + slider.max;
}

// =====================================================
// CALCULAR EL ESTADO HASTA UN PASO
// =====================================================
//
// Esto permite reconstruir el recorrido cuando el alumno
// mueve el deslizador hacia delante O hacia atrás.

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
// DIBUJAR EL RECORRIDO ROJO
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
// MOSTRAR CÁLCULO AUTOMÁTICO
// =====================================================

function mostrarCalculo(indice, terminado = false){
    const contenedor = document.getElementById("calculoAnimado");
    if(!contenedor){
        return;
    }
    if(indice >= numero.length){
        return;
    }
    // RESTO ANTERIOR
    let restoAnterior = 0;
    if(indice > 0){
        const numeroAnterior = numero.substring(0, indice);
        restoAnterior = parseInt(numeroAnterior) % divisor;
    }
    // DÍGITO ACTUAL
    const digito = parseInt(numero[indice]);
    // RESULTADO ×10
    const resultadoMultiplicacion = (restoAnterior * 10) % divisor;
    // RESULTADO ×10 + DÍGITO
    const nuevoResto = (restoAnterior * 10 + digito) % divisor;
    // PASO ×10
    if(!terminado){
        const linea = document.createElement("div");
        linea.className = "operacionActual";
	const etiquetaPaso = document.createElement("span");
	etiquetaPaso.innerHTML = "<strong>Paso " + ((indice * 2) + 1) + ":</strong>";
	etiquetaPaso.style.display = "inline-block";
	etiquetaPaso.style.width = "75px";
	const calculo = document.createElement("span");
	calculo.textContent = "(" + restoAnterior + " × 10) mod " + divisor + " = " + resultadoMultiplicacion;
	linea.appendChild(etiquetaPaso);
	linea.appendChild(calculo);
	contenedor.appendChild(linea);
        return;
    }
    // PASO ×10 + DÍGITO
    const linea = document.createElement("div");
    linea.className = "operacionActual";
    const etiquetaPaso = document.createElement("span");
    etiquetaPaso.innerHTML = "<strong>Paso " + ((indice * 2) + 2) + ":</strong>";
    etiquetaPaso.style.display = "inline-block";
    etiquetaPaso.style.width = "75px";
    const calculo = document.createElement("span");
    calculo.textContent = "(" + restoAnterior + " × 10 + " + digito + ") mod " + divisor + " = " + nuevoResto;
    linea.appendChild(etiquetaPaso);
    linea.appendChild(calculo);
    contenedor.appendChild(linea);
}

// =====================================================
// MOSTRAR CÁLCULOS EN MODO MANUAL
// =====================================================
//
// Paso 0 -> no muestra nada
// Paso 1 -> muestra ×10 de la cifra 1
// Paso 2 -> muestra ×10 + dígito de la cifra 1
// Paso 3 -> añade ×10 de la cifra 2
// Paso 4 -> añade ×10 + dígito de la cifra 2
// etc.
//
// Los cálculos anteriores NO se borran.
// =====================================================

function mostrarCalculoManual(numeroPaso){
    const contenedor = document.getElementById("calculoAnimado");
    if(!contenedor){
        return;
    }
    // LIMPIAR CÁLCULOS ANTERIORES
    contenedor.innerHTML = "";
    // MOSTRAR TODOS LOS PASOS HASTA AQUÍ
    for(let i = 0; i < numeroPaso; i++){
        const pasoActual = pasosManuales[i];
        if(!pasoActual){
            continue;
        }
        const linea = document.createElement("div");
        linea.className = "operacionActual";
        // ETIQUETA DEL PASO
        const etiquetaPaso = document.createElement("span");
        etiquetaPaso.textContent = "Paso " + (i + 1) + ":";
        etiquetaPaso.style.fontWeight = "bold";
        // TABULACIÓN
        etiquetaPaso.style.display = "inline-block";
        etiquetaPaso.style.width = "75px";
        // CÁLCULO
        const calculo = document.createElement("span");
        if(pasoActual.tipo == "multiplicar"){
            calculo.textContent = "(" + pasoActual.restoAnterior + " × 10) mod " + divisor +
                " = " + pasoActual.resultado;
        }
        if(pasoActual.tipo == "sumar"){
            calculo.textContent = "(" + pasoActual.restoAnterior + " × 10 + " +
                pasoActual.digito + ") mod " + divisor + " = " + pasoActual.resultado;
        }
        // AÑADIR A LA LÍNEA
        linea.appendChild(etiquetaPaso);
        linea.appendChild(calculo);
        contenedor.appendChild(linea);
    }
}

// =====================================================
// DIBUJAR UN PASO MANUAL
// =====================================================

function dibujarPasoManual(numeroPaso){
    if(!pasosManuales.length){
        return;
    }
    // PASO 0
    if(numeroPaso <= 0){
        limpiar();
        dibujarBase(pos);
        iluminarCifra(0);
        document.getElementById("calculoAnimado").innerHTML = "";
        document.getElementById("informacion").innerHTML = "";
        dibujarNodo(pos[0].x,pos[0].y,0,"red");
        return;
    }
    // OBTENER ESTADO
    const estado =obtenerEstadoHastaPaso(numeroPaso);
    // LIMPIAR
    limpiar();
    // DIBUJAR GRAFO BASE
    dibujarBase(pos);
    // DIBUJAR RECORRIDO ROJO
    dibujarRecorridoManual(estado.flechas);
    // PASO ACTUAL
    const pasoActual = pasosManuales[numeroPaso - 1];
    // FLECHA AZUL
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
    // NODO ACTUAL
    let colorNodo ="dodgerblue";
    if(pasoActual.tipo == "sumar"){
        colorNodo = "red";
	if(numeroPaso == pasosManuales.length){
	    colorNodo = "limegreen";
	}
    }
    dibujarNodo(pos[pasoActual.destino].x,pos[pasoActual.destino].y,pasoActual.destino,colorNodo);
    // RECORRIDO + RESULTADO FINAL 
    const informacion = document.getElementById("informacion");
    let textoInformacion =
    	"<div class='recuadroRecorrido'>" +
    	"Recorrido: " +
    	estado.recorrido.join(" → ") +
    	"</div>";
    if(numeroPaso == pasosManuales.length){
    	const restoFinal = estado.estado;
    	textoInformacion += "<div class='recuadroRestoFinal'>" + "Resto final: " + restoFinal + "</div>";
   	textoInformacion += "<div class='resultadoFinal'>" + (restoFinal == 0
            	? "EL NÚMERO " + numero + " ES DIVISIBLE POR " + divisor
            	: "EL NÚMERO " + numero + " NO ES DIVISIBLE POR " + divisor) + "</div>";
    }
    informacion.innerHTML = textoInformacion;
    // RESALTAR CIFRA
    iluminarCifra(pasoActual.indiceCifra);
    // MOSTRAR CÁLCULO
    mostrarCalculoManual(numeroPaso);
    // ACTUALIZAR TEXTO DEL SLIDER
    actualizarTextoSliderManual();
}

// =====================================================
// EVENTO DEL DESLIZADOR
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
                // SI LA ANIMACIÓN ESTÁ FUNCIONANDO, SE PAUSA
                if(intervalo){
                    clearInterval(intervalo);
                    intervalo = null;
                    const botonPausa = document.getElementById("pausa");
                    if(botonPausa){
                        botonPausa.textContent = "Reanudar";
                    }
                }
                // OBTENER PASO
                const numeroPaso = parseInt(this.value);
                // DIBUJAR
                dibujarPasoManual(numeroPaso);
                actualizarTextoSliderManual();
            }
        );
        // PAUSAR DESACTIVADO AL CARGAR
        const botonPausa = document.getElementById("pausa");
        if(botonPausa){
            botonPausa.disabled = true;
        }
    }
);

// =====================================================
// INICIAR DESDE CERO
// =====================================================

function iniciarDesdeCero(){
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
    }
    // BORRAR TODO LO ANTERIOR
    paso = 0;
    recorrido = [];
    flechasRojas = [];
    preparado = false;
    document.getElementById("calculoAnimado").innerHTML = "";
    document.getElementById("informacion").innerHTML = "";
    limpiar();
    document.getElementById("pausa").textContent = "Pausar";
    // INICIAR AUTOMÁTICA DESDE EL PRINCIPIO
    iniciar();
}
