# Recursos educativos interactivos basados en grafos para el estudio de la divisibilidad

![Tipo](https://img.shields.io/badge/tipo-recurso%20educativo-blue)
![Technología](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20SVG-orange)
![Código](https://img.shields.io/badge/código-GPLv3-green)
![Materiales%20y%20documentación](https://img.shields.io/badge/materiales%20y%20documentación-CC%20BY%204.0-red)

🌐 🇬🇧 Versión en inglés: [README_en.md](README.md)

## Descripción

Este repositorio reúne tres recursos educativos web complementarios para el estudio de la divisibilidad mediante autómatas finitos, grafos y aritmética modular:

1. **Actividad interactiva basada en grafos para el estudio de la divisibilidad**.
2. **Simulador interactivo basado en grafos para el estudio de la divisibilidad**.
3. **Simulador interactivo de reconstrucción de números basado en grafos de divisibilidad**.

Estos recursos utilizan un *autómata finito determinista* (AFD) cuyos estados representan los posibles restos módulo un número determinado. A través de la representación gráfica de estados y transiciones, permiten relacionar el cálculo de restos con conceptos de divisibilidad, aritmética modular, grafos, algoritmos y pensamiento computacional.

Los tres recursos comparten los mismos fundamentos matemáticos, pero presentan diferentes formas de interacción:

- Los **simuladores** están orientados principalmente a la exploración y visualización del proceso.
- La **actividad guiada** está orientada a la participación activa, construcción y comprobación por parte del alumnado.

De este modo, pueden utilizarse conjuntamente dentro de una misma propuesta didáctica: primero para observar y comprender el funcionamiento del autómata y posteriormente para aplicar y comprobar los conocimientos mediante una actividad guiada. Asimismo, el simulador puede utilizarse después de la actividad como herramienta de verificación, permitiendo al alumnado comprobar mediante la visualización automática si el recorrido y el resultado que ha obtenido son correctos.

---

## Recursos incluidos 

### Actividad guiada 
 
La **Actividad guiada basada en grafos para el estudio de la divisibilidad** convierte el procedimiento de comprobación de la divisibilidad en una tarea de construcción y razonamiento. A diferencia del simulador, la aplicación no realiza automáticamente todo el procedimiento. El alumnado debe participar activamente en las diferentes fases: 
 
1. Construir las transiciones del grafo. 
2. Comprobar que el grafo construido es correcto. 
3. Introducir un número. 
4. Construir manualmente el recorrido del autómata. 
5. Determinar el resto final. 
6. Decidir si el número es divisible. 
7. Comprobar las respuestas. 
 
La actividad incorpora un sistema de **validación progresiva**, de manera que cada fase debe completarse correctamente antes de acceder a la siguiente. 
 
📁 Documentación específica: [README en español](guided-activity/README_activity_es.md) 
 
### Simulador 1 
 
El **Simulador interactivo basado en grafos para el estudio de la divisibilidad** permite visualizar el funcionamiento de un autómata de divisibilidad. El usuario introduce un módulo y un número. La aplicación genera automáticamente el autómata y muestra mediante una animación cómo el número es procesado dígito a dígito. 
 
Durante la simulación se visualizan: 
 
- los estados correspondientes a los restos módulo `m`; 
- las transiciones de multiplicación por diez; 
- los incrementos correspondientes a la suma de cada dígito; 
- el estado actual del autómata; 
- el recorrido realizado; 
- el resto final; 
- la conclusión sobre la divisibilidad. 
 
📁 Documentación específica: [README en español](simulator/activity-simulator/README_activity_simulator_es.md) 
 
### Simulador 2 
 
El **Simulador interactivo de reconstrucción de números basado en grafos de divisibilidad** plantea el proceso en sentido inverso. En lugar de partir de un número para determinar el recorrido que sigue en el grafo, el usuario define un recorrido entre estados y el simulador determina qué dígitos pueden producir cada transición. A partir del recorrido completo, la aplicación reconstruye todos los números compatibles con la secuencia de estados indicada. 
 
Durante la reconstrucción se visualizan y analizan: 
 
- los estados correspondientes a los restos módulo `m`; 
- las transiciones entre los estados seleccionados; 
- los dígitos compatibles con cada transición; 
- las posibilidades asociadas a cada paso del recorrido; 
- las transiciones que no pueden realizarse con ningún dígito; 
- las diferentes combinaciones de dígitos compatibles con el recorrido; 
- el número total de soluciones encontradas; 
- las combinaciones descartadas por comenzar con cero. 
 
Este recurso está especialmente orientado a **niveles educativos más avanzados**, como los últimos cursos de Educación Secundaria y etapas posteriores, y permite trabajar la reconstrucción de números, el análisis de posibilidades, la formulación de conjeturas y la búsqueda sistemática de soluciones a partir de información parcial o completa. 
 
📁 Documentación específica: [README en español](simulator/reconstruction-simulator/README_reconstruction_es.md) 
 
--- 

## Fundamentos matemáticos comunes

Para un módulo `m`, el autómata contiene `m` estados:

`0, 1, 2, ..., m-1`.

Cada estado representa un posible resto de la división módulo `m`.

Si el estado actual es `r` y se procesa un nuevo dígito `d`, la transición viene determinada por

`δ(r,d) = (10 · r + d) mod m`.

El algoritmo puede expresarse mediante la actualización del resto:

`r ← (10 · r + d) mod m`,

comenzando con

`r = 0`.

Después de procesar todos los dígitos del número, el estado alcanzado representa el resto de la división del número entre `m`. Por tanto, el número es divisible por `m` si y solo si `r = 0`.

---

## Propósito educativo

Los recursos están concebidos especialmente para su utilización en Educación Primaria y Secundaria, aunque pueden adaptarse a otros niveles educativos en función de los objetivos planteados. Están diseñados para apoyar actividades de enseñanza y aprendizaje relacionadas con:

- divisibilidad;
- aritmética modular;
- restos de una división;
- grafos dirigidos;
- autómatas finitos;
- patrones numéricos;
- pensamiento computacional;
- razonamiento matemático;
- modelización matemática;
- seguimiento de algoritmos;
- resolución de problemas;
- problemas inversos.

## Tecnologías empleadas

El recurso ha sido desarrollado utilizando tecnologías web estándar, sin frameworks ni bibliotecas externas.

| Tecnología | Uso dentro del proyecto|
|---|---|
| HTML5 | Estructura de las interfaces y elementos de interacción. |
| CSS3 | Diseño visual y presentación. |
| JavaScript ES6 | Lógica matemática, interacción, validación y animación. |
| SVG | Representación dinámica de grafos, nodos, transiciones y recorridos. |

El uso de tecnologías estándar permite que los recursos sean ligeros, fácilmente modificables y ejecutables directamente desde un navegador web moderno. Además, la ausencia de dependencias externas facilita su análisis, adaptación y reutilización con fines educativos.

---

## Requisitos

Los recursos funcionan directamente en un navegador web, como Chrome, Firefox, Edge o Safari. No requieren instalación de software adicional ni conexión con servidores para realizar los cálculos. Todo el procesamiento matemático y la interacción se realizan en el propio navegador.

---

## Estructura del proyecto

```text
interactive-graph-based-divisibility/
│
├── index.html                      
├── README.md                    
├── README_es.md                     
├── LICENSE-CODE
├── LICENSE-MATERIALS
├── CITATION.cff
│
├── guided-activity/
│   ├── activity-en.html           
│   ├── activity-es.html            
│   ├── activity-script-en.js
│   ├── activity-script-es.js
│   ├── style_activity.css
│   ├── README_activity_en.md      
│   └── README_activity_es.md     
│
├── simulator/
│   │
│   ├── activity-simulator/           
│   │   ├── activity-simulator-en.html            
│   │   ├── activity-simulator-es.html
│   │   ├── activity-simulator-script-en.js
│   │   ├── activity-simulator-script-es.js
│   │   ├── style-activity-simulator.css
│   │   ├── README_activity_simulator_en.md      
│   │   └── README_activity_simulator_es.md
│   │
│   └── reconstruction-simulator/           
│       ├── reconstruction-en.html            
│       ├── reconstruction-es.html
│       ├── reconstruction-script-en.js
│       ├── reconstruction-script-es.js
│       ├── style-reconstruction.css
│       ├── README_reconstruction_en.md      
│       └── README_reconstruction_es.md
│
└── materials/
    ├── example-guided-activity-en.pdf         
    ├── example-guided-activity-es.pdf  
    ├── example-activity-simulator-en.pdf
    ├──	example-activity-simulator-es.pdf
    ├──	example-reconstruction-en.pdf   
    ├──	example-reconstruction-es.pdf      
    ├── worksheet-en.pdf
    └── worksheet-es.pdf
```

### Descripción de los archivos

* `index.html`  
  Punto de entrada principal del recurso educativo. Proporciona acceso a la actividad guiada y a los dos simuladores.

* `README.md`  
  Documentación principal del recurso educativo en inglés. Describe los tres componentes del recurso —la actividad guiada y los dos simuladores—, sus fundamentos matemáticos, propósito educativo, relación, tecnologías, estructura e instrucciones de uso.

* `README_es.md`  
  Documentación principal del recurso educativo en español, con la información e instrucciones equivalentes en español.

* `LICENSE-CODE`  
  Contiene los términos de la Licencia Pública General de GNU versión 3.0 (GPLv3) aplicables a los componentes de software del repositorio, incluido el código HTML, CSS y JavaScript de la actividad guiada y de los dos simuladores.

* `LICENSE-MATERIALS`  
  Contiene los términos de la licencia Creative Commons Atribución 4.0 Internacional (CC BY 4.0) aplicables a los materiales educativos y a la documentación incluidos en el repositorio.

* `CITATION.cff`  
  Archivo de metadatos de citación que contiene la información necesaria para citar el recurso educativo y sus componentes en contextos académicos, educativos o de investigación.

#### `guided-activity/`

Contiene el recurso educativo interactivo centrado en la construcción guiada y la comprobación de autómatas de divisibilidad.

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

#### `simulator/activity-simulator/`

Contiene el recurso educativo interactivo centrado en la visualización automática y exploración de autómatas de divisibilidad.

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

#### `simulator/reconstruction-simulator/`

Contiene el recurso educativo interactivo centrado en la reconstrucción de números a partir de recorridos en grafos de divisibilidad y en el análisis de las posibilidades asociadas a las transiciones entre estados.

* `reconstruction-en.html`   
  Interfaz principal del simulador en inglés.

* `reconstruction-es.html`   
  Interfaz principal del simulador en español.

* `reconstruction-script-en.js`   
  Implementación en JavaScript del simulador en inglés. Contiene la generación del grafo de divisibilidad, la lógica matemática para analizar las transiciones, la construcción del recorrido, el cálculo de los dígitos posibles en cada transición y la reconstrucción de números compatibles con el recorrido introducido.

* `reconstruction-script-es.js`   
  Implementación en JavaScript del simulador en español, incluyendo la generación del grafo, el análisis de las transiciones entre estados, la obtención de los posibles dígitos asociados a cada transición, la validación del recorrido y la generación de todas las combinaciones de números compatibles.

* `style-reconstruction.css`   
  Estilos visuales comunes del simulador, incluyendo la distribución de la interfaz, los controles, los campos del recorrido, los colores, los elementos gráficos, los estados del grafo, las transiciones y la presentación de los resultados de la reconstrucción.

* `README_reconstruction_en.md`   
  Documentación del simulador en inglés, incluyendo sus fundamentos matemáticos, el funcionamiento del recorrido inverso, el proceso de reconstrucción, las funcionalidades, el propósito educativo, las instrucciones de uso, la arquitectura del código y las posibles aplicaciones en el aula.

* `README_reconstruction_es.md`   
  Documentación del simulador en español, con la información e instrucciones equivalentes en español.

#### `materials/`

* `example-guided-activity-en.pdf`   
  Documento complementario en inglés que explica el funcionamiento del recurso educativo **Guided Activity** mediante un ejemplo práctico y capturas de pantalla que ilustran las diferentes fases de la actividad.

* `example-guided-activity-es.pdf`   
  Documento complementario en español que explica el funcionamiento del recurso educativo **Actividad Guiada** mediante un ejemplo práctico y capturas de pantalla que ilustran las diferentes fases de la actividad.

* `example-activity-simulator-en.pdf`   
  Documento complementario en inglés que explica el funcionamiento del recurso educativo **Simulator 1** mediante un ejemplo práctico y capturas de pantalla que ilustran el proceso de simulación.

* `example-activity-simulator-es.pdf`   
  Documento complementario en español que explica el funcionamiento del recurso educativo **Simulador 1** mediante un ejemplo práctico y capturas de pantalla que ilustran el proceso de simulación.

* `example-reconstruction-en.pdf`   
  Documento complementario en inglés que explica el funcionamiento del recurso educativo **Simulator 2** mediante un ejemplo práctico y capturas de pantalla que ilustran el proceso de reconstrucción de números a partir de un recorrido en el grafo de divisibilidad.

* `example-reconstruction-es.pdf`   
  Documento complementario en español que explica el funcionamiento del recurso educativo **Simulador 2** mediante un ejemplo práctico y capturas de pantalla que ilustran el proceso de reconstrucción de números a partir de un recorrido en el grafo de divisibilidad.

* `worksheet-en.pdf`  
  Hoja de ejercicios en inglés que contiene actividades para practicar la divisibilidad, la aritmética modular y los conceptos presentados en los recursos educativos.

* `worksheet-es.pdf`  
  Hoja de ejercicios en español que contiene actividades para practicar la divisibilidad, la aritmética modular y los conceptos presentados en los recursos educativos.

---

## Instalación y ejecución

No es necesaria una instalación específica.

- **Actividad guiada**: Accede al directorio `guided-activity/` y abre `activity-es.html` para utilizar la versión en español. La versión inglesa se encuentra en `activity-en.html`.

- **Simulador 1**: Accede al directorio `simulator/` y abre `activity-simulator-es.html` para utilizar la versión en español. La versión inglesa se encuentra en `activity-simulator-en.html`.

- **Simulador 2**: Accede al directorio `simulator/` y abre `reconstruction-es.html` para utilizar la versión en español. La versión inglesa se encuentra en `reconstruction-en.html`.

---

## Citación

Si utilizas, reproduces, adaptas o amplías este recurso educativo en trabajos académicos, proyectos educativos, publicaciones de investigación o materiales docentes, consulta el archivo `CITATION.cff` incluido en el repositorio para obtener la información y los metadatos necesarios para su citación.

Se recomienda citar la versión concreta del recurso utilizada mediante el registro correspondiente de Zenodo y su DOI. En caso de adaptar o modificar el recurso, se deberá mantener la atribución al autor del recurso original e indicar claramente que se trata de una adaptación o modificación.

---

## Licencia

Este repositorio contiene diferentes componentes sujetos a licencias específicas:

- Los componentes de software del recurso educativo, incluidos el código HTML, CSS y JavaScript de la actividad guiada y de los dos simuladores, se distribuyen bajo la **Licencia Pública General de GNU versión 3.0 (GPLv3)**.

- Los materiales educativos y la documentación incluidos en el repositorio, incluidos los materiales en formato PDF, los archivos README y la documentación que acompaña a la actividad guiada y a los dos simuladores, se distribuyen bajo la **Licencia Creative Commons Atribución 4.0 Internacional (CC BY 4.0)**.

Los términos de las licencias aplicables se encuentran en los archivos `LICENSE-CODE` y `LICENSE-MATERIALS`, respectivamente.

---

## Autor

> **Daniel Martín-Cudero**  
> Departamento de Economía Financiera y Contabilidad  
> Área de Didáctica de las Matemáticas  
> Miembro del Grupo de Investigación Consolidado en Educación STEM (GIESTEM)  
> Universidad Rey Juan Carlos  
> Madrid, España