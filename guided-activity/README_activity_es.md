# Actividad interactiva basada en grafos para el estudio de la divisibilidad

![Tipo](https://img.shields.io/badge/tipo-recurso%20educativo-blue)
![Technología](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20SVG-orange)
![Código](https://img.shields.io/badge/código-GPLv3-green)
![Materiales%20y%20documentación](https://img.shields.io/badge/materiales%20y%20documentación-CC%20BY%204.0-red)

🌐 🇬🇧 Versión en inglés: [README_activity_en.md](README_activity_en.md)

## Descripción

**Actividad interactiva basada en grafos para el estudio de la divisibilidad** —*Interactive graph-based activity for divisibility*, en inglés— es un recurso educativo web diseñado para que el alumnado construya, recorra y utilice un *autómata finito determinista* (AFD) para determinar si un número es divisible por un módulo determinado. 

A diferencia de la simulación automática, en esta actividad el alumno debe realizar de forma activa las diferentes etapas del procedimiento. La aplicación guía el proceso mediante una secuencia de fases en las que el estudiante:

1. Construye el grafo de transiciones correspondiente al módulo seleccionado.
2. Introduce un número y realiza manualmente el recorrido del autómata.
3. Determina el resto final y decide si el número es divisible o no.
4. Comprueba sus respuestas y recibe retroalimentación sobre cada fase.

La actividad convierte el procedimiento de comprobación de la divisibilidad en una tarea de construcción y razonamiento, permitiendo relacionar la aritmética modular con los conceptos de estados, transiciones, recorridos y autómatas finitos.

Está concebida como un recurso para actividades de enseñanza y aprendizaje en Educación Primaria y Secundaria, especialmente en contextos relacionados con: divisibilidad, aritmética modular, pensamiento computacional y razonamiento matemático.

---

## Fundamentos matemáticos

Las reglas de divisibilidad pueden modelarse mediante autómatas finitos deterministas. Para un módulo `m` dado, el autómata contiene `m` estados, cada uno de los cuales representa un posible resto:

`0, 1, 2, ..., m-1`.

Un estado `r` representa el resto obtenido después de procesar los dígitos leídos hasta ese momento. Cuando se introduce un nuevo dígito `d`, la función de transición se define como

`δ(r,d) = (10 ⋅ r + d) mod m`,

donde:

* `r` es el estado actual correspondiente al resto;
* `d` es el siguiente dígito que se está leyendo;
* `m` es el módulo seleccionado.

Después de procesar todos los dígitos del número de entrada, el autómata alcanza un estado final. El número es divisible por `m` si y solo si el estado final representa un resto igual a cero. 

---

## Objetivo de la actividad

El objetivo principal es que el alumnado comprenda que una prueba de divisibilidad puede representarse como un recorrido dentro de un grafo. La actividad plantea una secuencia de trabajo en la que cada fase depende de la anterior:

`Construcción del grafo → Construcción del recorrido → Resultado final`

De esta manera, el estudiante puede relacionar progresivamente:

* los estados del autómata con los restos;
* las transiciones con las operaciones aritméticas;
* la lectura de un número con un recorrido por el grafo;
* el estado final con el resto de la división.

---

## Estructura de la actividad

La aplicación está organizada en tres fases: (1) construcción del grafo; (2) construcción del recorrido; y (3) resultado final.

### Fase 1. Construcción del grafo

El alumno comienza seleccionando el módulo que desea estudiar. El módulo debe encontrarse entre 2 y 20. Una vez seleccionado, la aplicación genera los estados del autómata y los distribuye gráficamente sobre una circunferencia. Los estados representan:

`0, 1, 2, ..., m-1`.

El alumnado debe construir manualmente las transiciones correspondientes a la multiplicación por diez. Para cada estado `r`, debe establecer la transición:

`r → (10 ⋅ r) mod m`.

Por ejemplo, para el módulo 7, desde el estado 3 la transición debe ser `3 → (10 ⋅ 3) mod 7`, es decir, `3 → 2`.

La aplicación comprueba posteriormente que:

* existe exactamente una transición por cada estado;
* todas las transiciones corresponden a la regla `(10 ⋅ r) mod m`;
* el número total de flechas es igual al número de estados.

Si el grafo es correcto, la siguiente fase queda desbloqueada. Si existe algún error, la aplicación informa al alumno y permite reiniciar la construcción del grafo.

***Representación de los incrementos***

Además de las transiciones construidas por el alumno, el grafo muestra visualmente un círculo que representa el ciclo de incrementos módulo `m`. Este ciclo corresponde a la operación

`r → (r + 1) mod m`.

Por tanto, permite interpretar los estados como un ciclo de restos y sirve como referencia para comprender la evolución de los valores durante el procesamiento de los dígitos.

### Fase 2. Construcción del recorrido

Una vez validado correctamente el grafo, el alumno puede introducir el número que desea analizar.

El número se procesa de izquierda a derecha. Para cada dígito, el estudiante debe seleccionar los estados que forman el recorrido del autómata. La aplicación registra los estados seleccionados y dibuja las transiciones realizadas durante el recorrido en color rojo (🔴).

El primer estado del recorrido es siempre `0`. A partir de ahí, cada nuevo clic sobre un nodo añade un nuevo estado al recorrido. El alumno debe completar el recorrido correspondiente a todos los dígitos del número.

La secuencia se va mostrando en pantalla. Si el alumno se equivoca puede comenzar de nuevo el recorrido pulsando al botón "Comenzar recorrido".

Internamente, la aplicación calcula el recorrido correcto aplicando sucesivamente

`r ← (10 ⋅ r + d) mod m`,

comenzando con

`r = 0`.

Para cada dígito del número se obtiene un nuevo estado. Por ejemplo, para un número `8778` y módulo `7`: 

`0 → 1 → 3 → 2 → 0`.

La aplicación compara el recorrido introducido por el alumno con el recorrido matemáticamente correcto. Si ambos coinciden, la fase se valida y se desbloquea la fase final. Si no coinciden, se informa del error y el alumno puede reiniciar el recorrido.

### Fase 3. Resultado final

Una vez completado correctamente el recorrido, el alumno debe determinar dos elementos:

1. El resto final.
2. Si el número es divisible por el módulo seleccionado.

El resto final debe coincidir con el último estado alcanzado durante el recorrido. Este estado se marcará en verde (🟢).

La decisión de divisibilidad se basa en la condición: `resto = 0`. Por tanto:

- Si `resto = 0`, el número es divisible;
- Si `resto ≠ 0`, el número no es divisible.

La aplicación comprueba ambas respuestas de forma independiente. Para que la respuesta final sea correcta, deben coincidir:

- el resto introducido por el alumno;
- la opción seleccionada sobre la divisibilidad.

Si ambas respuestas son correctas, la aplicación muestra una confirmación junto con el resto final y la conclusión correspondiente.

---

## Ejemplo de actividad

Consideremos el módulo `7` y el número `8778`.

### 1. Construcción del grafo

El autómata contiene siete estados:

`0, 1, 2, 3, 4, 5, 6`.

El alumno debe construir las transiciones

`r → (10 ⋅ r) mod 7`.

Entre ellas:

- `0 → 0`;
- `1 → 3`;
- `2 → 6`;
- `3 → 2`;
- `4 → 5`;
- `5 → 1`;
- `6 → 4`.

Una vez construidas todas las transiciones, el alumno solicita la comprobación del grafo.

### 2. Recorrido del número

El número `8778` se procesa de izquierda a derecha.

**Dígito 8**

`(10 ⋅ 0 + 8) mod 7 = 1` → `0 → 1`.

**Dígito 7**

`(10 ⋅ 1 + 7) mod 7 = 3` → `1 → 3`.

**Dígito 7**

`(10 ⋅ 3 + 7) mod 7 = 2` → `3 → 2`.

**Dígito 8**

`(10 ⋅ 2 + 8) mod 7 = 0` → `2 → 0`.

El recorrido completo es:

`0 → 1 → 3 → 2 → 0`.

### 3. Resultado final

El estado final es `0`. Por tanto, el resto es `8778 mod 7 = 0` y, en consecuencia, **8778 es divisible por 7**.

La actividad permite que el alumno llegue a esta conclusión a partir de la construcción del grafo y del recorrido realizado, en lugar de recibir directamente el resultado.

---

## Sistema de validación

La actividad incorpora un sistema de comprobación progresiva. Cada fase debe completarse correctamente antes de acceder a la siguiente.

### Validación del grafo

Se comprueba que:

- el número de flechas introducidas coincide con el número de estados;
- para cada estado existe la transición correspondiente;
- el destino de cada transición satisface `(10 ⋅ r) mod m`.

### Validación del recorrido

Se calcula internamente la secuencia correcta de estados para el número introducido y se compara con la secuencia construida por el alumno.

La comparación tiene en cuenta tanto:

- el número de estados;
- como el valor de cada estado y su posición dentro del recorrido.

### Validación del resultado final

Se comprueba:

- el resto introducido;
- la respuesta sobre la divisibilidad.

Solo cuando ambos datos son correctos se considera completada correctamente la actividad.

---

## Retroalimentación al alumnado

La aplicación proporciona retroalimentación específica en cada fase. Cuando el grafo es correcto, se muestra un mensaje indicando que la construcción ha sido completada y que ya puede comenzar el recorrido. Cuando el grafo es incorrecto, se informa del error y se ofrece la posibilidad de volver a intentarlo.

Durante la fase de recorrido, la secuencia de estados seleccionados se muestra en tiempo real. Cuando el recorrido es correcto, se informa al alumno y se desbloquea la introducción del resto y la elección de la divisibilidad. Si el recorrido es incorrecto, se permite reiniciarlo.

Finalmente, la aplicación informa de si los datos introducidos en la fase final son correctos o si existe algún error.

Este sistema permite utilizar la actividad no solo como ejercicio de evaluación, sino también como herramienta de aprendizaje mediante ensayo, comprobación y corrección.

---

## Características principales

La actividad proporciona las siguientes funcionalidades:

- Selección de módulos entre `2` y `20`.
- Generación automática de los estados del autómata.
- Distribución circular de los estados.
- Construcción manual de las transiciones por parte del alumno.
- Comprobación automática del grafo.
- Bloqueo progresivo de las fases hasta completar correctamente las anteriores.
- Introducción de números después de validar el grafo.
- Construcción manual del recorrido mediante selección de nodos.
- Representación visual del recorrido mediante flechas rojas.
- Visualización de la secuencia de estados alcanzados.
- Comprobación automática del recorrido.
- Identificación del estado final alcanzado.
- Introducción manual del resto final.
- Selección de la respuesta sobre la divisibilidad.
- Comprobación automática del resultado final.
- Posibilidad de reiniciar el grafo.
- Posibilidad de reiniciar el recorrido.
- Posibilidad de trabajar con un nuevo número manteniendo el mismo módulo.
- Posibilidad de comenzar un nuevo ejercicio.

---

## Flujo de interacción

El funcionamiento general de la actividad puede resumirse de la siguiente manera:

```text
Seleccionar módulo
        ↓
Generar estados del grafo
        ↓
Construir las transiciones
        ↓
Comprobar grafo
        ↓
¿Grafo correcto?
   ┌────┴────┐
  NO        SÍ
  ↓          ↓
Reintentar  Introducir número
                    ↓
            Comenzar recorrido
                    ↓
            Seleccionar estados
                    ↓
            Comprobar recorrido
                    ↓
            ¿Recorrido correcto?
               ┌────┴────┐
               NO        SÍ
               ↓          ↓
           Reintentar  Introducir resto
                              +
                       Indicar divisibilidad
                              ↓
                       Comprobar resultado
                              ↓
                       Resultado final
```

Este flujo establece una progresión didáctica en la que cada respuesta se apoya en el trabajo realizado anteriormente.

---

## Controles y estados de la actividad

La interfaz utiliza un sistema de bloqueo y desbloqueo de controles para guiar al alumno.

Al crear un nuevo grafo:

- se habilita la construcción de las transiciones;
- se bloquea la introducción del número;
- se bloquea el recorrido;
- se bloquea la respuesta final.

Después de comprobar correctamente el grafo:

- se habilita la introducción del número;
- se habilita el inicio del recorrido.

Durante el recorrido:

- se habilita la selección de estados;
- se registra la secuencia construida;
- se dibujan las flechas del recorrido.

Después de validar correctamente el recorrido:

- se habilita la introducción del resto;
- se habilitan las opciones de divisibilidad.

Finalmente, cuando se han completado ambos datos, se habilita la comprobación del resultado final.

Esta organización evita que el alumno pueda saltarse fases esenciales del procedimiento.

---

## Representación visual

- El grafo se representa dinámicamente mediante SVG.
- Los estados se distribuyen sobre una circunferencia y cada uno se representa mediante un nodo circular.
- Las conexiones construidas durante la actividad se muestran mediante flechas.

### Colores y elementos visuales

| Color | Significado |
|-------|-------------|
| 🔵 Azul claro | Estado del autómata disponible para su selección. |
| ⚪ Gris claro | Ciclo de incrementos módulo `m`. |
| ⚫ Gris | Transiciones construidas en el grafo. |
| 🔴 Rojo | Recorrido realizado por el alumno. |
| 🟢 Verde | Estado final alcanzado tras un recorrido correcto. |

El color rojo se utiliza específicamente para diferenciar el recorrido que el alumno está construyendo de las transiciones generales del autómata. Cuando el recorrido se valida correctamente, el estado final se destaca visualmente en verde.

---

## Construcción del grafo

La aplicación representa dos estructuras matemáticas complementarias. Por una parte, el alumno construye las transiciones correspondientes a `r → (10 ⋅ r) mod m`. Estas transiciones permiten transformar el resto actual al incorporar un nuevo dígito. Por otra parte, el círculo que conecta los estados representa los incrementos `r → (r + 1) mod m`. Esta segunda estructura permite interpretar los estados como un ciclo de restos módulo `m`.

La combinación de ambas representaciones facilita la conexión entre la estructura del autómata y las operaciones aritméticas que intervienen en el cálculo del resto.

---

## Arquitectura del código

El archivo JavaScript está organizado en diferentes bloques funcionales que separan la generación del grafo, la interacción del alumno, la validación de las respuestas y la gestión de las diferentes fases de la actividad.

| Bloque funcional | Función |
| ---------------- | ------- |
| Posicionamiento de estados | Distribuye los estados del autómata sobre una circunferencia para obtener una representación gráfica equilibrada. |
| Creación del grafo | Inicializa el módulo seleccionado, calcula las posiciones de los estados y reinicia las variables necesarias para comenzar una nueva actividad. |
| Representación del ciclo `+1` | Dibuja la estructura circular que representa los incrementos módulo `m`. |
| Dibujo del grafo | Genera los elementos SVG que forman la representación visual del autómata. |
| Gestión de nodos | Crea los estados del autómata y gestiona la interacción del alumno con cada nodo. |
| Construcción de transiciones | Registra las flechas que el alumno crea entre los diferentes estados. |
| Comprobación del grafo | Verifica que existe exactamente una transición por estado y que cada transición cumple la regla `(10 ⋅ r) mod m`. |
| Gestión del recorrido | Permite al alumno seleccionar los estados que forman el recorrido correspondiente al número introducido. |
| Representación del recorrido | Dibuja en rojo las transiciones seleccionadas por el alumno y muestra la secuencia de estados obtenida. |
| Comprobación del recorrido | Calcula el recorrido correcto mediante la expresión `(10 ⋅ r + d) mod m` y lo compara con la secuencia introducida por el alumno. |
| Comprobación del resultado final | Comprueba el resto introducido y la respuesta sobre la divisibilidad del número. |
| Gestión de nuevos números | Permite realizar un nuevo recorrido utilizando el mismo grafo y módulo. |
| Reinicio de la actividad | Permite comenzar nuevamente la actividad desde el principio. |

La organización del código permite separar la lógica matemática de la representación gráfica y de la interacción con el usuario. De esta manera, cada fase de la actividad puede gestionarse de forma independiente.

---

## Propósito educativo

La actividad está diseñada para favorecer una comprensión de la divisibilidad. En lugar de presentar únicamente una animación que muestra el procedimiento correcto, el alumno debe tomar decisiones y construir progresivamente la solución.

Esto permite trabajar diferentes competencias matemáticas y computacionales:

- interpretación de restos;
- cálculo modular;
- reconocimiento de patrones;
- razonamiento lógico;
- representación gráfica;
- seguimiento de algoritmos;
- resolución de problemas;
- pensamiento secuencial;
- modelización matemática;
- relación entre una representación algebraica y una representación gráfica.

La actividad también permite observar los errores del alumnado en diferentes niveles: construcción del autómata, recorrido o interpretación del resultado final.

--- 

## Aplicaciones en el aula

El recurso puede utilizarse, en Educación Primaria y Secundaria, como actividad individual, trabajo por parejas o actividad guiada por el docente.

- **Construcción colaborativa**: El docente puede seleccionar un módulo y pedir al alumnado que determine previamente las transiciones que deben aparecer en el grafo antes de introducirlas en la aplicación.
- **Predicción del recorrido**: Antes de introducir un número, el alumnado puede calcular en papel el recorrido esperado y posteriormente comprobarlo mediante la actividad.
- **Análisis de errores**: La comprobación de cada fase permite utilizar los errores como parte del proceso de aprendizaje. 
- **Introducción a la modelización matemática**: La actividad puede presentarse como un modelo matemático del proceso de divisibilidad. El alumnado puede analizar cómo un procedimiento numérico puede transformarse en una representación gráfica basada en estados, transiciones y reglas.

---

## Tecnologías empleadas

La aplicación ha sido desarrollada utilizando únicamente tecnologías web estándar, sin depender de frameworks o bibliotecas externas.

Las tecnologías utilizadas son:

| Tecnología | Uso dentro del proyecto |
|------------|-------------------------|
| HTML5 | Definición de la estructura de la interfaz y los elementos de interacción. |
| CSS3 | Diseño visual de la aplicación, estilos de los controles y presentación de los elementos gráficos. |
| JavaScript ES6 | Implementación de la lógica matemática, gestión de estados, validación e interacción. |
| SVG | Representación dinámica del grafo y del recorrido mediante nodos, transiciones, flechas y autoarcos. |

El uso de tecnologías estándar permite que la aplicación sea ligera, fácilmente modificable y accesible desde cualquier navegador moderno. Además, al no utilizar frameworks ni dependencias externas, el código resulta más transparente y adecuado para su análisis, adaptación y reutilización con fines educativos.

---

## Requisitos

La aplicación funciona directamente en un navegador web: Chrome, Firefox, Edge, Safari o equivalente.
No se requiere instalación de software adicional, frameworks externos ni conexión con servidores para realizar los cálculos. El procesamiento matemático y la interacción se realizan en el propio navegador.

---

## Instalación y ejecución

1. Descarga los archivos del proyecto.
2. Abre el siguiente archivo con un navegador web: `activity-es.html`.
3. Sigue los pasos indicados en la sección `Cómo utilizar la actividad` de este documento para realizar la actividad.

---

## Cómo utilizar la actividad

1. Introduce un módulo comprendido entre 2 y 20.
2. Construye las transiciones del grafo: Selecciona dos nodos consecutivamente para crear cada flecha.
3. Comprueba el grafo: Pulsa el botón `Comprobar grafo`. Si es correcto, podrás continuar. Si no lo es, tienes la opción de volver a intentarlo.
4. Introduce el número que quieres analizar.
5. Construye el recorrido: Comienza seleccionando el estado `0` y continúa seleccionando los estados que corresponden al procesamiento sucesivo de los dígitos. Por ejemplo, si el recorrido es `0 → 1 → 3 → 2 → 0`, pulsa sobre los nodos `0, 1, 3, 2, 0`, en orden.
6. Comprueba el recorrido: La aplicación compara la secuencia introducida con el recorrido correcto. Pulsa el botón `Comprobar recorrido`. Si es correcto, podrás continuar. Si no lo es, tienes la opción de volver a intentarlo. Si al introducir el recorrido, cometes un fallo y quieres volver a empezar, pulsa al botón `Comenzar recorrido` para empezar de nuevo. 
7. Introduce el resto final y selecciona si el número es divisible o no por el módulo.
8. Comprueba el resultado final: Pulsa el botón `Comprobar resultado final`. La aplicación verifica los datos introducidos y muestra el resultado final.

---

## Estructura del proyecto

```text
guided-activity/
│
├── activity-en.html
├── activity-es.html
├── activity-script-en.js
├── activity-script-es.js
├── style_activity.css
├── README_activity_en.md
└── README_activity_es.md
```

### Descripción de archivos

* `activity-en.html`  
  Interfaz principal de la aplicación en inglés.

* `activity-es.html`  
  Interfaz principal de la aplicación en español.

* `activity-script-en.js`  
  Implementación en JavaScript del recurso educativo en inglés. Contiene la lógica matemática, la generación del grafo, la interacción con el estudiante, el sistema de validación y la gestión de las diferentes fases de la actividad.

* `activity-script-es.js`  
  Implementación en JavaScript del recurso educativo en español, incluyendo la lógica matemática, la interacción con el grafo, el sistema de validación y la gestión de la actividad.

* `style_activity.css`  
  Estilos visuales comunes de la aplicación, incluyendo la distribución de la interfaz, los controles, los colores, los elementos gráficos, los nodos, las transiciones y los mensajes de retroalimentación.

* `README_activity_en.md`  
  Documentación de la actividad en inglés, incluyendo sus fundamentos matemáticos, objetivos educativos, funcionalidades, instrucciones de uso, arquitectura y posibles mejoras futuras.

* `README_activity_es.md`  
  Documentación de la actividad en español, con la información e instrucciones equivalentes en español.

---

## Posibles ampliaciones futuras

Algunas mejoras que podrían incorporarse en futuras versiones son:

- **Selección de diferentes bases numéricas**: Ampliar la actividad para trabajar no únicamente en base decimal, sino también con otras bases de numeración. Esto permitiría estudiar cómo cambia la construcción del autómata y la evolución de los restos cuando se modifica la representación de los números.
- **Etiquetado de las transiciones del autómata**: Incorporar información asociada a cada transición, mostrando la operación matemática que representa o el dígito que provoca el cambio de estado. Esto facilitaría la interpretación del grafo y permitiría analizar el funcionamiento del autómata sin necesidad de ejecutar la animación completa.
- **Incorporación de ejemplos predefinidos**: Añadir una colección de ejemplos de números y módulos que permitan al usuario probar la aplicación. Estos ejemplos podrían incluir casos representativos de divisibilidad, diferentes tamaños de autómatas y situaciones especialmente interesantes desde el punto de vista didáctico.
- **Diferentes niveles de dificultad**: Establecer ejercicios con módulos y números de distinta complejidad.
- **Representación paso a paso de las operaciones internas**: Desarrollar una visualización más detallada del cálculo del resto, mostrando explícitamente cada operación intermedia realizada durante el procesamiento de un dígito, incluyendo la multiplicación por diez y los incrementos sucesivos asociados a la suma del dígito. Reforzar explícitamente la correspondencia entre cada estado y el resto que representa.
- **Ayudas progresivas**: Ofrecer pistas cuando el alumno comete un error en la construcción del grafo o del recorrido.
- **Registro de errores**: Almacenar qué transiciones o estados han sido introducidos incorrectamente para proporcionar una retroalimentación más específica.
- **Exportación de resultados**: Permitir guardar el grafo, el recorrido y el resultado final como material para actividades educativas.
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