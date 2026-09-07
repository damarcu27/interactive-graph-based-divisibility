# Simulador interactivo de reconstrucción de números basado en grafos de divisibilidad

![Tipo](https://img.shields.io/badge/tipo-recurso%20educativo-blue)
![Technología](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20SVG-orange)
![Código](https://img.shields.io/badge/código-GPLv3-green)
![Materiales%20y%20documentación](https://img.shields.io/badge/materiales%20y%20documentación-CC%20BY%204.0-red)

🌐 🇬🇧 Versión en inglés: [README_reconstruction_en.md](README_reconstruction_en.md)

## Descripción

**Simulador interactivo de reconstrucción de números basado en grafos de divisibilidad** —*Interactive Divisibility Graph Number Reconstruction Simulator*, en inglés— es un recurso educativo web diseñado para explorar de forma visual e interactiva la relación entre los dígitos de un número, los estados de un grafo de divisibilidad y las transiciones entre dichos estados.

A diferencia del simulador convencional en el que se introduce un número completo y se observa el recorrido correspondiente, esta herramienta plantea el proceso en sentido inverso: el usuario define un módulo y construye un recorrido entre estados del grafo. A partir de este recorrido parcial o completo, el simulador determina qué dígitos pueden producir cada transición y, cuando el recorrido está completo, reconstruye todos los números compatibles con la secuencia de estados indicada. De este modo, el recurso permite explorar la divisibilidad no únicamente como un procedimiento de cálculo, sino como un problema de reconstrucción, razonamiento, análisis de posibilidades y búsqueda de soluciones dentro de un grafo.

El simulador está especialmente orientado a **niveles educativos más avanzados**, como los últimos cursos de Educación Secundaria y etapas posteriores, donde puede utilizarse para profundizar en el análisis de recorridos, las posibilidades asociadas a cada transición y la reconstrucción de números a partir de información parcial.

Este recurso puede utilizarse para trabajar conceptos relacionados con:

* divisibilidad;
* aritmética modular;
* grafos dirigidos;
* autómatas finitos;
* relaciones entre dígitos y estados;
* análisis de transiciones;
* reconstrucción de números;
* razonamiento matemático;
* formulación de conjeturas;
* resolución de problemas.

---

## Fundamentos matemáticos

El simulador se basa en el autómata finito determinista asociado a la divisibilidad de números enteros en base decimal.

Para un módulo `m`, el grafo contiene `m` estados:

`0, 1, 2, ..., m-1`.

Cada estado representa un posible resto módulo `m`.

Si un número que se está procesando tiene resto `r` y se añade un nuevo dígito `d`, el nuevo resto viene determinado por

`δ(r,d) = (10 ⋅ r + d) mod m`,

donde:

* `r` es el estado actual;
* `d` es el nuevo dígito;
* `m` es el módulo seleccionado;
* `δ(r,d)` es el estado alcanzado después de incorporar el dígito.

Por tanto, cada transición del grafo puede interpretarse como una relación entre un estado de origen, un dígito y un estado de destino.

El simulador aprovecha esta relación para realizar el proceso inverso. Dados un estado de origen `rᵢ` y un estado de destino `rᵢ₊₁`, busca todos los dígitos `d` entre `0` y `9` que satisfacen

`(10 ⋅ rᵢ + d) mod m = rᵢ₊₁`.

Los dígitos que cumplen esta condición son precisamente los posibles dígitos que pueden producir dicha transición.

---

## Funcionamiento del simulador

El simulador permite seleccionar:

1. Un módulo `m`.
2. Una longitud del recorrido.
3. Una secuencia de estados del grafo.

El primer estado del recorrido se establece automáticamente en `0`. A continuación, el usuario puede introducir los estados sucesivos del recorrido:

`0 → r₁ → r₂ → r₃ → ... → rₖ`.

Cada estado debe encontrarse entre `0` y `m-1`.

A medida que el usuario introduce los estados, el simulador representa visualmente el recorrido sobre el grafo y analiza cada transición.

Para cada paso `rᵢ → rᵢ₊₁` se calculan todos los dígitos `d` que satisfacen `(10 ⋅ rᵢ + d) mod m = rᵢ₊₁`. El resultado se muestra en la interfaz como el conjunto de **dígitos posibles para esa transición**.

Por ejemplo, si para una transición concreta se obtiene `2 → 1` y los dígitos que satisfacen la relación son `2, 9`, el simulador indica que ambos dígitos pueden producir esa transición. De esta manera, el usuario puede observar cómo una misma secuencia de estados puede ser compatible con diferentes secuencias de dígitos.

---

## Reconstrucción de números

Cuando el recorrido se completa, el simulador utiliza las posibilidades calculadas para cada transición para generar todas las combinaciones posibles de dígitos.

Supongamos que un recorrido produce las siguientes posibilidades:

- `Paso 1: 0 → 1 | Dígitos posibles: {1, 8}`.
- `Paso 2: 1 → 1 | Dígitos posibles: {5}`.
- `Paso 3: 1 → 3 | Dígitos posibles: {0, 7}`.
- `Paso 4: 3 → 1 | Dígitos posibles: {6}`.

El simulador genera todas las `2 ⋅ 1 ⋅ 2 ⋅ 1 = 4` combinaciones posibles:

- `1506`
- `1576`
- `8506`
- `8576`

Cada uno de estos números es compatible con el recorrido de estados especificado.

El procedimiento permite pasar, por tanto, de una secuencia de estados a un conjunto de números que pueden haber generado dicha secuencia.

---

## Restricción de los ceros iniciales

Durante la reconstrucción pueden aparecer combinaciones cuyo primer dígito es `0`. Por ejemplo, `0275`.

Aunque esta combinación puede satisfacer matemáticamente las condiciones de las transiciones, no se considera un número de cuatro cifras. Por este motivo, el simulador descarta automáticamente las combinaciones cuyo primer dígito es `0`.

La interfaz informa además de cuántas combinaciones han sido descartadas por esta razón.

---

## Validación de los recorridos

No todas las secuencias de estados representan recorridos posibles para un determinado módulo.

Para cada transición `rᵢ → rᵢ₊₁` el simulador comprueba si existe al menos un dígito `d` tal que `(10 ⋅ rᵢ + d) mod m = rᵢ₊₁`. Si no existe ningún dígito que satisfaga esta condición, la transición no es compatible con el módulo seleccionado. En ese caso, el simulador informa al usuario de que el paso no es válido.

Esta comprobación permite utilizar el recurso no solamente para reconstruir números, sino también para analizar qué recorridos son posibles dentro del grafo de divisibilidad.

---

## Convenciones visuales

Durante la interacción se utilizan diferentes colores para distinguir los elementos del grafo.

| Color | Significado |
|---|---|
| 🔵 Azul claro | Estados del grafo que representan los posibles restos módulo `m`. |
| ⚪ Gris claro | Ciclo auxiliar de incrementos `r → (r + 1) mod m`. |
| ⚫ Gris | Transiciones permanentes del grafo asociadas a la multiplicación por diez. |
| 🔴 Rojo | Transiciones seleccionadas por el usuario durante la construcción del recorrido. |

---

## Ejemplo

Consideremos un módulo `7`. El grafo contiene los estados:

`0, 1, 2, 3, 4, 5, 6`.

Supongamos que el usuario construye el recorrido de longitud `3`:

`0 → 1 → 3 → 2`.

Para cada transición se buscan los dígitos compatibles.

### Primera transición

Para `0 → 1` se buscan los dígitos `d` que satisfacen `(10 ⋅ 0 + d) mod 7 = 1`. Por tanto, `d mod 7 = 1` y los dígitos posibles son `{1, 8}`.

### Segunda transición

Para `1 → 3` se buscan los dígitos que satisfacen `(10 ⋅ 1 + d) mod 7 = 3`. Por tanto, `(10 + d) mod 7 = 3` y los dígitos posibles son `{0, 7}`.

### Tercera transición

Para `3 → 2` se buscan los dígitos que satisfacen `(10 ⋅ 3 + d) mod 7 = 2`. Por tanto, `(30 + d) mod 7 = 2` y los dígitos posibles son `{0, 7}`.

El simulador puede reconstruir entonces las combinaciones:

- `100`
- `107`
- `170`
- `177`
- `800`
- `807`
- `870`
- `877`

Todas ellas producen el recorrido `0 → 1 → 3 → 2` en el grafo asociado al módulo `7`.

Este procedimiento muestra cómo una secuencia de estados puede utilizarse para recuperar información sobre los dígitos que originaron el recorrido.

---

## Características

La aplicación proporciona las siguientes funcionalidades:

* Generación automática del grafo de divisibilidad para un módulo seleccionado.
* Construcción de recorridos de longitud configurable.
* Establecimiento automático del estado inicial `0`.
* Introducción manual de los estados sucesivos del recorrido.
* Validación de los estados introducidos.
* Representación visual del recorrido sobre el grafo.
* Identificación automática de los dígitos compatibles con cada transición.
* Detección de transiciones sin ningún dígito posible.
* Generación de todas las combinaciones de dígitos compatibles con un recorrido completo.
* Eliminación automática de números con ceros iniciales.
* Información sobre el número total de soluciones encontradas.
* Información sobre las combinaciones descartadas por comenzar por cero.
* Posibilidad de generar nuevos ejercicios mediante el botón correspondiente.
* Restricción del módulo a valores entre `2` y `20`.
* Restricción de la longitud del recorrido a valores entre `1` y `50`.

---

## Propósito educativo

Esta herramienta ha sido desarrollada como un recurso interactivo para profundizar en el estudio de la divisibilidad mediante grafos.

A diferencia de una actividad centrada únicamente en determinar si un número es divisible por un determinado módulo, el simulador plantea una situación de razonamiento inverso: en lugar de partir del número para obtener el recorrido, se parte del recorrido para investigar qué números pueden producirlo.

Esta perspectiva permite trabajar especialmente:

* combinatoria: análisis de posibilidades;
* interpretación de transiciones;
* aritmética modular;
* reconstrucción de información;
* formulación y comprobación de conjeturas;
* búsqueda sistemática de soluciones;
* razonamiento algorítmico.

El recurso está especialmente pensado para **niveles educativos más avanzados**, como los últimos cursos de Educación Secundaria y etapas posteriores.

---

## Aplicaciones en el aula

El simulador puede integrarse en actividades de aula orientadas al razonamiento y la exploración matemática.

- **Reconstrucción de números**: El docente puede proporcionar un recorrido parcial o completo del grafo y pedir al alumnado que determine qué números pueden producirlo. Esta actividad permite pasar de un problema de cálculo directo a un problema de reconstrucción.
- **Análisis de transiciones**: Los estudiantes pueden estudiar una transición concreta `rᵢ → rᵢ₊₁` y determinar qué dígitos pueden producirla. A partir de diferentes ejemplos pueden investigar patrones y formular conjeturas sobre la relación entre los estados y los dígitos.
- **Comparación de módulos**: El mismo recorrido puede analizarse para diferentes módulos. Los estudiantes pueden observar cómo cambia el conjunto de dígitos posibles y cómo la estructura del grafo depende del módulo seleccionado.
- **Exploración de recorridos imposibles**: El docente puede proponer secuencias de estados que no sean compatibles con ningún número. El alumnado debe identificar qué transición hace imposible el recorrido y justificar matemáticamente por qué no existe ningún dígito que permita realizarla.
- **Problemas de información parcial**: Se pueden plantear recorridos incompletos en los que solamente se conocen algunos estados. El alumnado puede investigar qué información adicional es necesaria para reconstruir los posibles números.
- **Formulación de conjeturas**: A partir de la exploración de diferentes módulos y recorridos, los estudiantes pueden formular conjeturas sobre: el número de dígitos posibles para una transición, la existencia de transiciones imposibles, la relación entre módulos y dígitos, la cantidad de números compatibles con un recorrido o los patrones que aparecen en diferentes grafos. Posteriormente, estas conjeturas pueden comprobarse mediante nuevos ejemplos o razonamiento matemático.

---

## Tecnologías empleadas

La aplicación ha sido desarrollada utilizando únicamente tecnologías web estándar, sin depender de frameworks o bibliotecas externas.

Las tecnologías utilizadas son:

| Tecnología | Uso dentro del proyecto |
|------------|-------------------------|
| HTML5 | Definición de la estructura de la interfaz y los elementos de interacción. |
| CSS3 | Diseño visual de la aplicación, estilos de los controles y presentación de los elementos gráficos. |
| JavaScript ES6 | Implementación de la lógica matemática, generación del grafo, análisis de transiciones, reconstrucción de números y gestión de la interacción del usuario. |
| SVG | Representación dinámica del grafo, estados, transiciones, recorridos y autoarcos. |

El uso de tecnologías estándar permite que la aplicación sea ligera, fácilmente modificable y accesible desde cualquier navegador moderno. Además, al no utilizar frameworks ni dependencias externas, el código resulta transparente y adecuado para su análisis, adaptación y reutilización con fines educativos.

---

## Requisitos

La aplicación funciona directamente en un navegador web: Chrome, Firefox, Edge, Safari o equivalente. No se requiere instalación, dependencias externas ni software adicional.

---

## Instalación y ejecución

1. Descarga los archivos del proyecto.
2. Abre el siguiente archivo con un navegador web: `reconstruction-es.html`. La aplicación se ejecutará localmente.

---

## Cómo utilizarlo

1. Introduce el módulo deseado, entre `2` y `20` y la longitud del recorrido, entre `1` y `50`.
2. Pulsa el botón **Crear recorrido**. El estado inicial `0` aparecerá automáticamente.
3. Introduce los estados sucesivos del recorrido. Observa cómo el recorrido introducido se representa sobre el grafo.
4. Pulsa el botón **Reconstruir número**. El simulador generará todos los números compatibles con el recorrido. Los números cuyo primer dígito sea `0` serán descartados automáticamente.

Para analizar otro recorrido con la misma longitud asociado al mismo grafo de divisibilidad, pulsa de nuevo al botón **Crear recorrido**. Para comenzar una nueva actividad pulsa el botón **Nuevo ejercicio**. 

---

## Arquitectura del código

El archivo JavaScript está organizado en diferentes bloques funcionales que separan la generación del grafo, la representación visual del recorrido, el análisis matemático de las transiciones y la reconstrucción de los números.

| Bloque funcional | Función |
|------------------|---------|
| Posicionamiento de estados | Distribuye los estados del grafo sobre una circunferencia. |
| Limpieza del grafo | Elimina los elementos SVG generados anteriormente. |
| Dibujo de nodos | Genera visualmente los estados del grafo mediante elementos SVG. |
| Dibujo de flechas | Representa las transiciones dirigidas entre estados. |
| Flechas desplazadas | Permite destacar visualmente las transiciones seleccionadas por el usuario. |
| Autoarcos | Representa las transiciones que comienzan y terminan en el mismo estado. |
| Arcos de incremento | Construye el ciclo auxiliar de incrementos módulo `m`. |
| Construcción del grafo base | Genera todas las transiciones permanentes del grafo. |
| Obtención de dígitos posibles | Determina qué dígitos producen una transición concreta. |
| Visualización de posibilidades | Muestra los dígitos compatibles con cada paso del recorrido. |
| Creación del recorrido | Genera las casillas correspondientes a los estados del recorrido. |
| Actualización del recorrido | Valida los estados introducidos y actualiza la representación gráfica. |
| Dibujo del recorrido | Resalta sobre el grafo la secuencia de estados introducida. |
| Reconstrucción | Genera todas las combinaciones de dígitos compatibles con el recorrido. |
| Filtrado | Descarta los números cuyo primer dígito es `0`. |
| Presentación de resultados | Muestra las soluciones encontradas y las combinaciones descartadas. |
| Nuevo ejercicio | Restablece la aplicación para comenzar una nueva actividad. |

Esta organización permite separar la lógica matemática de la representación visual, facilitando tanto la comprensión del código como futuras ampliaciones del simulador.

---

## Estructura del proyecto

```text
reconstruction-simulator/
│
├── reconstruction-en.html
├── reconstruction-es.html
├── reconstruction-script-en.js
├── reconstruction-script-es.js
├── style-reconstruction.css
├── README_reconstruction_en.md
└── README_reconstruction_es.md
```

### Descripción de los archivos

* `reconstruction-en.html`  
  Interfaz principal del simulador en inglés.

* `reconstruction-es.html`  
  Interfaz principal del simulador en español.

* `reconstruction-script-en.js`  
  Implementación en JavaScript del simulador en inglés. Contiene la generación del grafo de divisibilidad, la lógica matemática para analizar las transiciones, la construcción del recorrido inverso, el cálculo de los dígitos posibles en cada transición y la reconstrucción de números a partir de un recorrido parcial.

* `reconstruction-script-es.js`  
  Implementación en JavaScript del simulador en español. Incluye la generación del grafo, la lógica de reconstrucción, el análisis de las transiciones entre estados, la obtención de los posibles dígitos asociados a cada paso y la generación de todas las combinaciones de números compatibles con el recorrido introducido.

* `style-reconstruction.css`  
  Estilos visuales comunes del simulador, incluyendo la distribución de la interfaz, los controles, los campos del recorrido, los elementos gráficos, los estados del grafo, las transiciones y la presentación de los resultados de la reconstrucción.

* `README_reconstruction_en.md`  
  Documentación del simulador en inglés, incluyendo sus fundamentos matemáticos, el funcionamiento del recorrido inverso, el algoritmo de reconstrucción, las funcionalidades, el propósito educativo, las instrucciones de uso, la arquitectura del código y las posibles aplicaciones en el aula.

* `README_reconstruction_es.md`  
  Documentación del simulador en español, con la información e instrucciones equivalentes en español.

---

## Posibles ampliaciones futuras

Algunas mejoras que podrían incorporarse en futuras versiones son:

- **Control del número de soluciones**: Incorporar herramientas que permitan analizar previamente cuántas combinaciones pueden generarse a partir de un recorrido determinado.
- **Generación automática de ejercicios**: Crear recorridos aleatorios o diseñados específicamente para producir diferentes niveles de dificultad y permitir la generación automática de actividades.
- **Reconstrucción interactiva paso a paso**: Mostrar progresivamente cómo se construyen las diferentes combinaciones de números a partir de las posibilidades asociadas a cada transición.
- **Comparación entre diferentes recorridos**: Permitir almacenar y comparar varios recorridos para estudiar cómo pequeñas modificaciones en los estados afectan al conjunto de números posibles.
- **Adaptación dinámica de la representación gráfica**: Actualmente, la distribución circular de los estados permite visualizar correctamente grafos con un número moderado de nodos. Para módulos elevados, la representación puede perder legibilidad debido a la proximidad entre nodos y transiciones. Como mejora futura, se plantea desarrollar un sistema de escalado y reorganización automática del grafo que ajuste el tamaño de los nodos, el radio de distribución y la separación entre estados en función del número de elementos representados.
- **Interacción avanzada con el grafo**: Incorporar controles que permitan modificar dinámicamente la escala de visualización, aumentar o reducir el tamaño de los nodos, ajustar la disposición espacial del grafo y adaptar la representación gráfica a las necesidades de cada actividad educativa.

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