# Simulador interactivo basado en grafos para el estudio de la divisibilidad 

![Tipo](https://img.shields.io/badge/tipo-recurso%20educativo-blue)
![Technología](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20SVG-orange)
![Código](https://img.shields.io/badge/código-GPLv3-green)
![Materiales%20y%20documentación](https://img.shields.io/badge/materiales%20y%20documentación-CC%20BY%204.0-red)

🌐 🇬🇧 Versión en inglés: [README_activity_simulator_en](README_activity_simulator_en)

## Descripción

**Simulador interactivo basado en grafos para el estudio de la divisibilidad** —*Interactive Graph-Based Divisibility Simulator*, en inglés— es un recurso educativo web diseñada para visualizar autómatas finitos asociados a reglas de divisibilidad.

La aplicación genera un grafo dirigido que representa un *autómata finito determinista* (AFD), donde cada estado corresponde a una clase de resto módulo un número entero determinado. Las transiciones del grafo representan la evolución del resto mientras se leen los dígitos de un número de entrada.

Mediante una animación interactiva, los usuarios pueden observar cómo un número es procesado dígito a dígito y comprender la relación entre las reglas de divisibilidad, la aritmética modular y la teoría de grafos.

Este recurso está destinado a actividades de enseñanza y aprendizaje en Educación Primaria y Secundaria relacionadas con: divisibilidad, aritmética modular, pensamiento computacional y razonamiento matemático.

---

## Fundamentos matemáticos

Las reglas de divisibilidad pueden modelarse mediante autómatas finitos deterministas. Para un módulo `m` dado, el autómata contiene `m` estados, cada uno de los cuales representa un posible resto:

`0, 1, 2, ..., m-1`.

Un estado `r` representa el resto obtenido después de procesar los dígitos leídos hasta ese momento. Cuando se introduce un nuevo dígito `d`, la función de transición se define como

`δ(r,d) = (10 ⋅ r + d) mod m`,

donde:

* `r` es el estado actual correspondiente al resto,
* `d` es el siguiente dígito que se está leyendo,
* `m` es el módulo seleccionado.

Después de procesar todos los dígitos del número de entrada, el autómata alcanza un estado final. El número es divisible por `m` si y solo si el estado final representa un resto igual a cero. 

---

## Funcionamiento interno de la simulación

Con el objetivo de hacer visible el proceso de obtención del resto, cada lectura de un dígito se descompone en dos fases diferenciadas de la animación:

1. **Multiplicación por diez**, representada mediante una transición azul entre estados (🔵). Esta operación conduce al estado correspondiente al resto `(10 ⋅ r) mod m`.
2. **Suma del valor del dígito**, representada mediante incrementos sucesivos sobre el ciclo de restos. Los desplazamientos realizados durante la animación se muestran en rojo (🔴).

Por ejemplo, al procesar el dígito `5` desde el estado `3` en el autómata asociado al módulo `7`, la simulación realiza las siguientes operaciones:

- Multiplicación por diez: `10 ⋅ 3 ≡ 2 (mod 7)`.

  El autómata realiza una transición desde el estado `3` hasta el estado `2`, representada mediante una flecha azul.

- Se realizan `5` incrementos consecutivos sobre los restos módulo `7`: `2 → 3 → 4 → 5 → 6 → 0`.

  Cada desplazamiento, representado en rojo, representa la suma de una unidad módulo `7`.

- Tras completar los `5` incrementos se alcanza el estado `0`, que coincide con el resultado de la transición definida por la función del autómata: `(10 ⋅ 3 + 5) mod 7 = 0`.

Gracias a esta representación visual, el simulador permite observar de forma explícita las operaciones que intervienen en el cálculo del resto, haciendo que el proceso sea más intuitivo y fácil de seguir desde un punto de vista didáctico.

---

## Algoritmo utilizado

Para un número de entrada formado por los dígitos a<sub>1</sub> a<sub>2</sub> a<sub>3</sub> ... a<sub>k</sub>, el simulador mantiene en todo momento un resto parcial `r`, que representa el resto del número procesado hasta ese instante.

Inicialmente, este resto se establece en `r = 0`. Para cada dígito leído, el algoritmo realiza dos operaciones:

1. Multiplicación del resto actual por diez: `r ← (10 ⋅ r) mod m`.
2. Suma del valor del dígito mediante incrementos sucesivos: `r ← (r + 1) mod m`. Esta operación se repite tantas veces como indique el valor del dígito procesado.

Cuando termina la lectura de todos los dígitos, el resto obtenido coincide exactamente con `N mod m`, donde `N` es el número introducido y `m` es el módulo seleccionado.

El resultado final determina la divisibilidad:

- Si `r = 0`, el número es divisible por `m`.
- Si `r ≠ 0`, el número no es divisible por `m`.

Esta implementación permite visualizar la operación matemática de forma equivalente a la transición clásica del autómata, pero descomponiéndola en operaciones elementales que pueden observarse durante la animación.

---

## Convenciones visuales

Durante la animación se utilizan diferentes elementos gráficos y colores para representar las operaciones que realiza el autómata y facilitar el seguimiento del cálculo del resto.

| Color | Significado |
|---|---|
| ⚫ Gris | Transiciones permanentes del autómata asociadas a la multiplicación por diez: `r → (10 ⋅ r) mod m`. |
| ⚪ Gris claro | Transiciones circulares correspondientes a la suma de una unidad: `r → (r + 1) mod m`. Estas conexiones forman el ciclo de incrementos utilizado para añadir el valor de cada dígito. |
| 🔵 Azul | Transición de multiplicación por diez que se está ejecutando en ese instante durante la animación. |
| 🔴 Rojo | Recorrido definitivo seguido por el autómata después de procesar cada dígito del número. |
| 🟢 Verde | Estado final alcanzado al terminar la lectura completa del número. |

Además de las transiciones y estados, la interfaz incorpora otros elementos visuales que ayudan a interpretar la simulación:

- El dígito que está siendo procesado aparece resaltado visualmente en la interfaz.
- El estado actual del autómata se muestra destacado durante la ejecución.
- El panel informativo muestra en tiempo real la secuencia de restos obtenidos durante el recorrido.
- Al finalizar la animación se indica el resto final alcanzado y si el número introducido es divisible o no divisible por el módulo seleccionado.

---

## Ejemplo

Consideremos el autómata de divisibilidad para el módulo `7` y el número de entrada `8778`.

El autómata contiene siete estados que representan los posibles restos:

`0, 1, 2, 3, 4, 5, 6`.

El cálculo comienza desde el estado `0` y procesa los dígitos de izquierda a derecha.

Las transiciones producidas por la lectura sucesiva de cada dígito son:

- Lectura del dígito `8` → `(10 × 0 + 8) mod 7 = 1`.

  El autómata se desplaza del estado `0` al estado `1`. 

- Lectura del dígito `7` → `(10 × 1 + 7) mod 7 = 3`.

  El autómata se desplaza del estado `1` al estado `3`.

- Lectura del dígito `7` → `(10 × 3 + 7) mod 7 = 2`.

  El autómata se desplaza del estado `3` al estado `2`.

- Lectura del dígito `8` → `(10 × 2 + 8) mod 7 = 0`.

  El autómata se desplaza del estado `2` al estado `0`.

Por tanto, el recorrido completo a través del grafo es

`0 → 1 → 3 → 2 → 0`.

Como el estado final es `0`, el número `8778` es divisible por `7`.

Este ejemplo muestra cómo una prueba de divisibilidad puede representarse como un recorrido a través de un grafo, transformando un procedimiento aritmético en un proceso visual y dinámico.

---

## Características

La aplicación proporciona las siguientes funcionalidades:

* Generación automática de autómatas de divisibilidad para un módulo seleccionado.
* Visualización basada en grafos de estados y transiciones.
* Simulación automática del procesamiento del número con velocidad de animación ajustable.
* Simulación manual, que permite navegar por los pasos del procesamiento mediante un deslizador, tanto hacia delante como hacia atrás.
* Resaltado del estado actual y del camino recorrido.
* Ajuste de la velocidad de animación.
* Controles de pausa y reanudación.
* Retroalimentación visual indicando si el número introducido es divisible por el módulo seleccionado.

---

## Propósito educativo

Esta herramienta ha sido desarrollada como un recurso interactivo de visualización para la enseñanza de las matemáticas, especialmente en Educación Primaria y Secundaria.

Puede utilizarse para introducir y explorar conceptos como:

* reglas de divisibilidad;
* aritmética modular;
* grafos dirigidos;
* grafos de divisibilidad;
* autómatas finitos;
* patrones numéricos;
* resolución de problemas;
* modelización matemática;
* pensamiento algorítmico.

La representación gráfica del autómata permite al alumnado visualizar cómo los números son procesados paso a paso y conectar el razonamiento numérico con modelos computacionales.

---

## Aplicaciones en el aula

Este recurso puede integrarse en actividades de aula de Educación Primaria y Secundaria de diferentes maneras.

- **Exploración de reglas de divisibilidad**: El alumnado puede utilizar el autómata para investigar por qué funcionan las reglas de divisibilidad y cómo las propiedades aritméticas pueden representarse mediante estados y transiciones. Por ejemplo, un docente puede introducir un módulo y pedir al alumnado que prediga el recorrido seguido por diferentes números a través del grafo.
- **Descubrimiento de patrones numéricos**: La visualización permite observar patrones en las secuencias de restos y relacionarlos con propiedades de los números. Los estudiantes pueden comparar diferentes módulos y analizar cómo cambia la estructura del grafo dependiendo del divisor seleccionado.
- **Introducción a la modelización matemática**: El autómata puede presentarse como un modelo matemático del proceso de divisibilidad. El alumnado puede analizar cómo un procedimiento numérico puede transformarse en una representación gráfica basada en estados, transiciones y reglas.
- **Conexión con el pensamiento computacional**: El recurso proporciona una introducción accesible a conceptos relacionados con la informática, como: estados, transiciones, algoritmos o procesamiento secuencial. Estas ideas pueden explorarse sin necesidad de conocimientos previos de programación.

---

## Tecnologías empleadas

La aplicación ha sido desarrollada utilizando únicamente tecnologías web estándar, sin depender de frameworks o bibliotecas externas.

Las tecnologías utilizadas son:

| Tecnología | Uso dentro del proyecto |
|------------|-------------------------|
| HTML5 | Definición de la estructura de la interfaz y los elementos de interacción. |
| CSS3 | Diseño visual de la aplicación, estilos de los controles y presentación de los elementos gráficos. |
| JavaScript ES6 | Implementación de la lógica del autómata, generación de eventos, animación y gestión de la interacción del usuario. |
| SVG | Representación dinámica del grafo y del recorrido mediante nodos, transiciones, flechas y autoarcos. |

El uso de tecnologías estándar permite que la aplicación sea ligera, fácilmente modificable y accesible desde cualquier navegador moderno. Además, al no utilizar frameworks ni dependencias externas, el código resulta más transparente y adecuado para su análisis, adaptación y reutilización con fines educativos.
    
---

## Requisitos

La aplicación funciona directamente en un navegador web: Chrome, Firefox, Edge, Safari o equivalente. No se requiere instalación, dependencias externas ni software adicional.

---

## Instalación y ejecución

1. Descarga los archivos del proyecto.
2. Abre el siguiente archivo con un navegador web: `activity-simulator-es.html`. La aplicación se ejecutará localmente.

---

## Cómo utilizarlo

La aplicación proporciona dos modos de simulación:

### Simulación automática

1. Introduce el módulo deseado.
2. Introduce el número que quieres analizar.
3. Ajusta la velocidad de la animación mediante el control deslizante.
4. Pulsa el botón **Iniciar**.
5. Observa el recorrido del autómata mientras procesa cada dígito.
6. Utiliza el botón **Pausar** para detener o reanudar la animación.

### Simulación manual

La aplicación también dispone de un modo de simulación manual, que permite explorar el recorrido del autómata paso a paso.

1. Introduce el módulo deseado.
2. Introduce el número que quieres analizar.
3. Utiliza el deslizador de pasos para desplazarte por la simulación.
4. Mueve el deslizador hacia delante para avanzar por los pasos o hacia atrás para volver a pasos anteriores.
5. Observa el estado del autómata y los dígitos procesados en cada paso.

El estado final alcanzado por el autómata determina si el número es divisible por el módulo seleccionado.

---

## Arquitectura del código

El archivo `automaton.js` está organizado en diferentes bloques funcionales que separan la generación del autómata, la representación gráfica y la lógica de animación.

| Bloque funcional | Función |
|------------------|---------|
| Posicionamiento de estados | Distribuye los estados del autómata sobre una circunferencia para obtener una representación gráfica equilibrada. |
| Generación de eventos | Construye la secuencia de operaciones que se ejecutarán durante la animación, incluyendo la multiplicación por diez, los incrementos asociados a cada dígito y los estados finales. |
| Dibujo SVG | Genera dinámicamente los elementos gráficos del autómata mediante SVG: nodos, flechas, transiciones y autoarcos. |
| Construcción del autómata | Dibuja la estructura completa del grafo, incluyendo las transiciones de multiplicación por diez y el ciclo de incrementos módulo n. |
| Animación | Procesa los eventos generados y actualiza progresivamente la representación visual del recorrido realizado por el número. |
| Controles de interacción | Gestiona las acciones del usuario, como iniciar la simulación, pausar la animación y reanudar la ejecución. |

Esta organización permite separar la lógica matemática del autómata de su representación visual, facilitando tanto la comprensión del código como futuras ampliaciones del simulador.

---

## Estructura del proyecto

```text
activity-simulator/
│
├── activity-simulator-en.html
├── activity-simulator-es.html
├── activity-simulator-script-en.js
├── activity-simulator-script-es.js
├── style-activity-simulator.css
├── README_activity_simulator_en.md
└── README_activity_simulator_es.md
```

###  Descripción de los archivos

* `activity-simulator-en.html`  
  Interfaz principal del simulador en inglés.

* `activity-simulator-es.html`  
  Interfaz principal del simulador en español.

* `activity-simulator-script-en.js`  
  Implementación en JavaScript del simulador en inglés. Contiene la generación del autómata, la lógica matemática, la construcción del grafo, el sistema de animación, la gestión de eventos y la interacción con el usuario.

* `activity-simulator-script-es.js`  
  Implementación en JavaScript del simulador en español, incluyendo la generación del autómata, la construcción del grafo, los cálculos matemáticos, la animación y la interacción con el usuario.

* `style-activity-simulator.css`  
  Estilos visuales comunes del simulador, incluyendo la distribución de la interfaz, los controles, los colores, los elementos gráficos, los nodos, las transiciones, las animaciones y los elementos de retroalimentación.

* `README_activity_simulator_en.md`  
  Documentación del simulador en inglés, incluyendo sus fundamentos matemáticos, el proceso interno de simulación, el algoritmo, el propósito educativo, las funcionalidades, las instrucciones de uso, la arquitectura del código y las posibles mejoras futuras.

* `README_activity_simulator_es.md`  
  Documentación del simulador en español, con la información e instrucciones equivalentes en español.

---

## Posibles ampliaciones futuras

Algunas mejoras que podrían incorporarse en futuras versiones son:

- **Selección de diferentes bases numéricas**: Ampliar el simulador para trabajar no únicamente en base decimal, sino también con otras bases de numeración. Esto permitiría estudiar cómo cambia la construcción del autómata y la evolución de los restos cuando se modifica la representación de los números.
- **Etiquetado de las transiciones del autómata**: Incorporar información asociada a cada transición, mostrando la operación matemática que representa o el dígito que provoca el cambio de estado. Esto facilitaría la interpretación del grafo y permitiría analizar el funcionamiento del autómata sin necesidad de ejecutar la animación completa.
- **Incorporación de ejemplos predefinidos**: Añadir una colección de ejemplos de números y módulos que permitan al usuario comenzar la exploración de forma inmediata. Estos ejemplos podrían incluir casos representativos de divisibilidad, diferentes tamaños de autómatas y situaciones especialmente interesantes desde el punto de vista didáctico.
- **Representación paso a paso de las operaciones internas**: Desarrollar una visualización más detallada del cálculo del resto, mostrando explícitamente cada operación intermedia realizada durante el procesamiento de un dígito, incluyendo la multiplicación por diez y los incrementos sucesivos asociados a la suma del dígito.
- **Exportación del grafo generado**: Incorporar la posibilidad de guardar la representación del autómata generado como imagen o archivo SVG. Esta funcionalidad permitiría utilizar los grafos creados como material educativo, incluirlos en documentos o reutilizarlos en actividades de aula.
- **Adaptación dinámica de la representación gráfica**: Actualmente, la distribución circular de los estados permite visualizar correctamente autómatas con un número moderado de nodos. Para módulos elevados (superiores a 20 estados), la representación puede perder legibilidad debido a la proximidad entre nodos y transiciones. Como mejora futura, se plantea desarrollar un sistema de escalado y reorganización automática del grafo que ajuste el tamaño de los nodos, el radio de distribución y la separación entre estados en función del número de elementos representados. De esta forma, módulos más grandes podrían visualizarse mediante una distribución adaptativa que mantenga la claridad del grafo y facilite su interpretación.
- **Interacción avanzada con el grafo**: Incorporar controles que permitan modificar dinámicamente la escala de visualización, aumentando o reduciendo el tamaño de los nodos, ajustando la disposición espacial del autómata y permitiendo adaptar la representación gráfica a las preferencias del usuario o a las necesidades de cada actividad educativa.

---

## Citación

Si utilizas este software en trabajos académicos, proyectos educativos, publicaciones de investigación o materiales docentes, cita el registro correspondiente de Zenodo. En este repositorio se incluye un archivo de citación (`CITATION.cff`) que proporciona los metadatos necesarios.

---

## Licencia

Este software se distribuye bajo la **Licencia Pública General de GNU versión 3.0 (GPLv3)**. Puede utilizarse, modificarse y redistribuirse de acuerdo con los términos especificados en el archivo `LICENSE-CODE`.

---

## Autor

> **Daniel Martín-Cudero**  
>
> Departamento de Economía Financiera y Contabilidad,  
> Área de Didáctica de las Matemáticas,  
> Miembro del Grupo de Investigación Consolidado en Educación STEM (GIESTEM),  
> Universidad Rey Juan Carlos,  
> Madrid, España.