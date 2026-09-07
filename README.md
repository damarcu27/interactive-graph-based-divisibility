# Interactive educational graph-based resources for divisibility

![Type](https://img.shields.io/badge/type-educational%20resource-blue)
![Technology](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20SVG-orange)
![Code](https://img.shields.io/badge/code-GPLv3-green)
![Materials%20%26%20Documentation](https://img.shields.io/badge/materials%20%26%20documentation-CC%20BY%204.0-red)

🌐 🇪🇸 Spanish version: [README_es.md](README_es.md)

## Description

This repository brings together three complementary web-based educational resources for the study of divisibility through finite automata, graphs, and modular arithmetic:

1. **Interactive graph-based activity for divisibility**.
2. **Interactive graph-based simulator for divisibility**.
3. **Interactive divisibility graph number reconstruction simulator**.

These resources use a *deterministic finite automaton* (DFA) whose states represent the possible remainders modulo a given number. Through the graphical representation of states and transitions, they allow students to connect remainder calculations with concepts from divisibility, modular arithmetic, graph theory, algorithms, and computational thinking.

The three resources share the same mathematical foundations but provide different forms of interaction:

- The **guided activity** is aimed at active participation, construction, and verification by the student.
- The **simulators** are primarily aimed at exploring and visualizing the process.

In this way, they can be used together within the same educational proposal: initially to observe and understand how the automaton works and subsequently to apply and check this knowledge through a guided activity. The simulator can also be used after completing the activity as a verification tool, allowing students to check through automatic visualization whether the walk and result they obtained are correct.

---

## Included resources

### Guided Activity
 
The **Graph-Based Guided Activity for the Study of Divisibility** transforms the procedure for checking divisibility into a task involving construction and reasoning. Unlike the simulator, the application does not automatically perform the entire procedure. Students actively participate in the different stages:
 
1. Construct the graph transitions.
2. Check that the constructed graph is correct.
3. Enter a number.
4. Manually construct the automaton's walk.
5. Determine the final remainder.
6. Decide whether the number is divisible.
7. Check the answers.
 
The activity incorporates a **progressive validation system**, so that each stage must be completed correctly before accessing the next one.
 
📁 Specific documentation: [README in English](guided-activity/README_activity_en.md)
 
### Simulator 1
 
The **Interactive Graph-Based Divisibility Simulator** allows users to visualize the operation of a divisibility automaton. The user enters a modulus and a number. The application automatically generates the automaton and uses an animation to show how the number is processed digit by digit.
 
During the simulation, the following are visualized:
 
- the states corresponding to the remainders modulo `m`;
- the multiplication-by-ten transitions;
- the increments corresponding to the addition of each digit;
- the current state of the automaton;
- the walk followed;
- the final remainder;
- the conclusion regarding divisibility.
 
📁 Specific documentation: [README in English](simulator/activity-simulator/README_activity_simulator_en.md)
 
### Simulator 2
 
The **Interactive Divisibility Graph Number Reconstruction Simulator** approaches the process in reverse. Instead of starting from a number to determine the walk it follows through the graph, the user defines a walk between states and the simulator determines which digits can produce each transition. Once the walk is complete, the application reconstructs all numbers compatible with the specified sequence of states.
 
During the reconstruction process, the following are visualized and analysed:
 
- the states corresponding to the remainders modulo `m`;
- the transitions between the selected states;
- the digits compatible with each transition;
- the possibilities associated with each step of the walk;
- transitions that cannot be performed with any digit;
- the different combinations of digits compatible with the walk;
- the total number of solutions found;
- the combinations discarded because they begin with zero.
 
This resource is especially aimed at **more advanced educational levels**, such as the final years of Secondary Education and beyond, and allows students to work on number reconstruction, analysis of possibilities, conjecture formulation, and systematic search for solutions based on partial or complete information.
 
📁 Specific documentation: [README in English](simulator/reconstruction-simulator/README_reconstruction_en.md)

---

## Common mathematical foundations

For a modulus `m`, the automaton contains `m` states:

`0, 1, 2, ..., m-1`.

Each state represents a possible remainder modulo `m`.

If the current state is `r` and a new digit `d` is processed, the transition is defined by

`δ(r,d) = (10 · r + d) mod m`.

The algorithm can be expressed by updating the remainder as follows:

`r ← (10 · r + d) mod m`,

starting with

`r = 0`

After all the digits of the number have been processed, the state reached represents the remainder of the number divided by `m`. Therefore, a number is divisible by `m` if and only if `r = 0`.

---

## Educational purpose

The resources are specifically intended for use in Primary and Secondary Education, although they can be adapted to other educational levels depending on the objectives. They are designed to support teaching and learning activities related to:

- divisibility;
- modular arithmetic;
- remainders;
- directed graphs;
- finite automata;
- numerical patterns;
- computational thinking;
- mathematical reasoning;
- mathematical modelling;
- algorithmic thinking;
- problem solving.

---

## Technologies used

The resource has been developed using standard web technologies, without frameworks or external libraries.

| Technology | Use within the project |
|---|---|
| HTML5 | Interface structure and interaction elements. |
| CSS3 | Visual design and presentation. |
| JavaScript ES6 | Mathematical logic, interaction, validation, and animation. |
| SVG | Dynamic representation of graphs, nodes, transitions, and walks. |

The use of standard technologies makes the resources lightweight, easily modifiable, and directly executable in a modern web browser. In addition, the absence of external dependencies facilitates their analysis, adaptation, and reuse for educational purposes.

---

## Requirements

The resources run directly in a web browser such as Chrome, Firefox, Edge, or Safari. They do not require additional software or a connection to external servers to perform the calculations. All mathematical processing and user interaction take place directly in the browser.

---

## Project structure

```text
interactive-graph-based-divisibility-v1.0.0/
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

### File descriptions

* `index.html`  
  Main entry point to the educational resource. It provides access to the guided activity and the two simulators.

* `README.md`  
  Main documentation for the educational resource in English. It describes the three components of the resource—the guided activity and the two simulators—their mathematical foundations, educational purpose, relationship, technologies, structure, and instructions for use.

* `README_es.md`  
  Main documentation for the educational resource in Spanish, providing the equivalent information and instructions in Spanish.

* `LICENSE-CODE`  
  Contains the terms of the GNU General Public License v3.0 (GPLv3) applicable to the software components of the repository, including the HTML, CSS, and JavaScript code of the guided activity and the two simulators.

* `LICENSE-MATERIALS`  
  Contains the terms of the Creative Commons Attribution 4.0 International (CC BY 4.0) license applicable to the educational materials and documentation included in the repository.

* `CITATION.cff`  
  Citation metadata file containing the information required to cite the educational resource and its components in academic, educational, or research contexts.

#### `guided-activity/`

Contains the interactive educational resource focused on the guided construction and verification of divisibility automata.

* `activity-en.html`  
  Main interface of the application in English.

* `activity-es.html`  
  Main interface of the application in Spanish.

* `activity-script-en.js`  
  JavaScript implementation of the educational resource in English. It contains the mathematical logic, graph generation, student interaction, validation system, and management of the different stages of the activity.

* `activity-script-es.js`  
  JavaScript implementation of the educational resource in Spanish, including the mathematical logic, graph interaction, validation system, and activity management.

* `style_activity.css`  
  Common visual styles for the application, including interface layout, controls, colours, graphical elements, nodes, transitions, and feedback messages.

* `README_activity_en.md`  
  Documentation of the activity in English, including its mathematical foundations, educational objectives, features, usage instructions, architecture, and possible future improvements.

* `README_activity_es.md`  
  Documentation of the activity in Spanish, with equivalent information and instructions in Spanish.

#### `simulator/activity-simulator/`

Contains the interactive educational resource focused on the automatic visualisation and exploration of divisibility automata.

* `activity-simulator-en.html`  
  Main interface of the simulator in English.

* `activity-simulator-es.html`  
  Main interface of the simulator in Spanish.

* `activity-simulator-script-en.js`  
  JavaScript implementation of the simulator in English. It contains automaton generation, mathematical logic, graph construction, the animation system, event management, and user interaction.

* `activity-simulator-script-es.js`  
  JavaScript implementation of the simulator in Spanish, including automaton generation, graph construction, mathematical calculations, animation, and user interaction.

* `style-activity-simulator.css`  
  Common visual styles for the simulator, including interface layout, controls, colours, graphical elements, nodes, transitions, animations, and feedback elements.

* `README_activity_simulator_en.md`  
  Documentation of the simulator in English, including its mathematical foundations, internal simulation process, algorithm, educational purpose, features, usage instructions, code architecture, and possible future improvements.

* `README_activity_simulator_es.md`  
  Documentation of the simulator in Spanish, with equivalent information and instructions in Spanish.

#### `simulator/reconstruction-simulator/`

Contains the interactive educational resource focused on reconstructing numbers from walks in divisibility graphs and analysing the possibilities associated with transitions between states.

* `reconstruction-en.html`   
  Main interface of the simulator in English.

* `reconstruction-es.html`   
  Main interface of the simulator in Spanish.

* `reconstruction-script-en.js`   
  JavaScript implementation of the simulator in English. It contains divisibility graph generation, the mathematical logic for analysing transitions, walk construction, calculation of the possible digits for each transition, and reconstruction of numbers compatible with the walk entered by the user.

* `reconstruction-script-es.js`   
  JavaScript implementation of the simulator in Spanish, including graph generation, analysis of transitions between states, determination of the possible digits associated with each transition, walk validation, and generation of all number combinations compatible with the walk entered by the user.

* `style-reconstruction.css`   
  Common visual styles for the simulator, including interface layout, controls, walk input fields, colours, graphical elements, graph states, transitions, and presentation of the reconstruction results.

* `README_reconstruction_en.md`   
  Documentation of the simulator in English, including its mathematical foundations, inverse walk operation, reconstruction process, features, educational purpose, usage instructions, code architecture, and possible classroom applications.

* `README_reconstruction_es.md`   
  Documentation of the simulator in Spanish, with equivalent information and instructions in Spanish.

#### `materials/`

* `example-guided-activity-en.pdf`   
  Supplementary document in English explaining how the **Guided Activity** educational resource works through a practical example and screenshots illustrating the different stages of the activity.

* `example-guided-activity-es.pdf`   
  Supplementary document in Spanish explaining how the **Guided Activity** educational resource works through a practical example and screenshots illustrating the different stages of the activity.

* `example-activity-simulator-en.pdf`   
  Supplementary document in English explaining how the **Activity Simulator** educational resource works through a practical example and screenshots illustrating the simulation process.

* `example-activity-simulator-es.pdf`   
  Supplementary document in Spanish explaining how the **Activity Simulator** educational resource works through a practical example and screenshots illustrating the simulation process.

* `example-reconstruction-en.pdf`   
  Supplementary document in English explaining how the **Reconstruction Simulator** educational resource works through a practical example and screenshots illustrating the process of reconstructing numbers from a walk in the divisibility graph.

* `example-reconstruction-es.pdf`   
  Supplementary document in Spanish explaining how the **Reconstruction Simulator** educational resource works through a practical example and screenshots illustrating the process of reconstructing numbers from a walk in the divisibility graph.

* `worksheet-en.pdf`  
  Worksheet in English containing activities for practising divisibility, modular arithmetic, and the concepts presented in the educational resources.

* `worksheet-es.pdf`  
  Worksheet in Spanish containing activities for practising divisibility, modular arithmetic, and the concepts presented in the educational resources.

---

## Installation and execution

No specific installation is required.

- **Guided Activity**: Go to the `guided-activity/` directory and open `activity-en.html` to use the English version. The Spanish version is available in `activity-es.html`.

- **Simulator 1**: Go to the `simulator/` directory and open `activity-simulator-en.html` to use the English version. The Spanish version is available in `activity-simulator-es.html`.

- **Simulator 2**: Go to the `simulator/` directory and open `reconstruction-en.html` to use the English version. The Spanish version is available in `reconstruction-es.html`.

---

## Citation

If you use, reproduce, adapt, or extend this educational resource in academic work, educational projects, research publications, or teaching materials, please consult the `CITATION.cff` file included in the repository for the information and metadata required for citation.

The specific version of the resource used should preferably be cited through the corresponding Zenodo record and its DOI. If the resource is adapted or modified, attribution to the author of the original resource must be retained, and the work should clearly indicate that it is an adaptation or modification.

---

## License

This repository contains different components subject to specific licenses:

- The software components of the educational resource, including the HTML, CSS, and JavaScript code of the guided activity and the two simulators, are distributed under the **GNU General Public License v3.0 (GPLv3)**.

- The educational materials and documentation included in the repository, including the materials provided in PDF format, the README files, and the documentation accompanying the guided activity and the two simulators, are distributed under the **Creative Commons Attribution 4.0 International (CC BY 4.0) License**.

The terms of the applicable licenses are provided in the `LICENSE-CODE` and `LICENSE-MATERIALS` files, respectively.

---

## Author

> **Daniel Martín-Cudero**  
> Department of Financial Economics and Accounting  
> Area of Mathematics Education  
> Member of the Consolidated Research Group in STEM Education (GIESTEM)  
> Rey Juan Carlos University  
> Madrid, Spain