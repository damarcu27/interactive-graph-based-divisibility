# Interactive graph-based simulator for divisibility

![Type](https://img.shields.io/badge/type-educational%20resource-blue)
![Technology](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20SVG-orange)
![Code](https://img.shields.io/badge/code-GPLv3-green)
![Materials%20%26%20Documentation](https://img.shields.io/badge/materials%20%26%20documentation-CC%20BY%204.0-red)

🌐🇪🇸 Spanish version: [README_activity_simulator_es.md](README_activity_simulator_es.md)

## Description

**Interactive graph-based simulator for divisibility** is a web-based educational resource designed to visualize finite automata associated with divisibility rules.

The application generates a directed graph representing a *deterministic finite automaton* (DFA), where each state corresponds to a remainder class modulo a given integer. The graph transitions represent the evolution of the remainder while the digits of an input number are processed.

Through an interactive animation, users can observe how a number is processed digit by digit and understand the relationship between divisibility rules, modular arithmetic, and graph theory.

This resource is intended for teaching and learning activities in Primary and Secondary Education related to: divisibility, modular arithmetic, computational thinking, and mathematical reasoning.

---

## Mathematical foundations

Divisibility rules can be modeled using deterministic finite automata. For a given modulus `m`, the automaton contains `m` states, each representing a possible remainder:

`0, 1, 2, ..., m-1`.

A state `r` represents the remainder obtained after processing the digits read up to that moment. When a new digit `d` is introduced, the transition function is defined as

`δ(r,d) = (10 ⋅ r + d) mod m`,

where:

* `r` is the current state corresponding to the remainder,
* `d` is the next digit being processed,
* `m` is the selected modulus.

After processing all digits of the input number, the automaton reaches a final state. The number is divisible by `m` if and only if the final state represents a remainder equal to zero.

---

## Internal simulation process

In order to make the remainder calculation visible, each digit-processing operation is divided into two different animation phases:

1. **Multiplication by ten**, represented by a blue transition between states (🔵). This operation leads to the state corresponding to the remainder `(10 ⋅ r) mod m`.
2. **Addition of the digit value**, represented by successive increments along the remainder cycle. The movements performed during the animation are displayed in red (🔴).

For example, when processing digit `5` from state `3` in the automaton for modulus `7`, the simulation performs the following operations:

- Multiplication by ten: `10 ⋅ 3 ≡ 2 (mod 7)`.

  The automaton performs a transition from state `3` to state `2`, represented by a blue arrow.

- `5` consecutive increments are performed over the remainders modulo `7`: `2 → 3 → 4 → 5 → 6 → 0`.

  Each movement, represented in red, corresponds to the addition of one unit modulo `7`.

- After completing the `5` increments, state `0` is reached, which matches the result of the transition defined by the automaton function: `(10 ⋅ 3 + 5) mod 7 = 0`.

Thanks to this visual representation, the simulator allows users to explicitly observe the operations involved in the remainder calculation, making the process more intuitive and easier to follow from a teaching perspective.

---

## Algorithm used

For an input number formed by the digits a<sub>1</sub> a<sub>2</sub> a<sub>3</sub> ... a<sub>k</sub>, the simulator continuously maintains a partial remainder `r`, which represents the remainder of the number processed up to that moment.

Initially, this remainder is set to `r = 0`. For each digit read, the algorithm performs two operations:

1. Multiplication of the current remainder by ten: `r ← (10 ⋅ r) mod m`.

2. Addition of the digit value through successive increments: `r ← (r + 1) mod m`. This operation is repeated as many times as the value of the processed digit.

When the reading of all digits is completed, the resulting remainder exactly matches `N mod m`, where `N` is the input number and `m` is the selected modulus.

The final result determines divisibility:

- If `r = 0`, the number is divisible by `m`.
- If `r ≠ 0`, the number is not divisible by `m`.

This implementation allows the mathematical operation to be visualized in an equivalent way to the classical automaton transition, while decomposing it into elementary operations that can be observed during the animation.

---

## Visual conventions

During the animation, different graphical elements and colors are used to represent the operations performed by the automaton and facilitate the understanding of the remainder calculation.

| Color | Meaning |
|---|---|
| ⚫ Gray | Permanent automaton transitions associated with multiplication by ten: `r → (10 ⋅ r) mod m`. |
| ⚪ Light gray | Circular transitions corresponding to the addition of one unit: `r → (r + 1) mod m`. These connections form the increment cycle used to add the value of each digit. |
| 🔵 Blue | Multiplication by ten transition currently being executed during the animation. |
| 🔴 Red | Definitive walk followed by the automaton after processing each digit of the number. |
| 🟢 Green | Final state reached after the complete reading of the number. |

In addition to transitions and states, the interface incorporates other visual elements that help interpret the simulation:

- The **digit currently being processed** is visually highlighted in the interface.
- The **current automaton state** is highlighted during execution.
- The information panel displays in real time the **sequence of remainders** obtained during the traversal.
- At the end of the animation, the **final remainder reached** and whether the input number is **divisible or not divisible** by the selected modulus are displayed.

---

## Example

Consider the divisibility automaton for modulus `7` and the input number `8778`.

The automaton contains seven states representing the possible remainders:

`0, 1, 2, 3, 4, 5, 6`.

The calculation begins from state `0` and processes the digits from left to right.

The transitions produced by the successive reading of each digit are:

- Reading digit `8` → `(10 × 0 + 8) mod 7 = 1`.

  The automaton moves from state `0` to state `1`.

- Reading digit `7` → `(10 × 1 + 7) mod 7 = 3`.

  The automaton moves from state `1` to state `3`.

- Reading digit `7` → `(10 × 3 + 7) mod 7 = 2`.

  The automaton moves from state `3` to state `2`.

- Reading digit `8` → `(10 × 2 + 8) mod 7 = 0`.

  The automaton moves from state `2` to state `0`.

Therefore, the complete traversal through the graph is:

`0 → 1 → 3 → 2 → 0`.

This sequence corresponds to the successive remainders obtained after processing the prefixes `0`, `8`, `87`,  `877`, and `8778`. Since the final state is `0`, the number `8778` is divisible by `7`.

This example shows how a divisibility test can be represented as a graph traversal, transforming an arithmetic procedure into a visual and dynamic process.

---

## Features

The application provides the following functionalities:

* Automatic generation of divisibility automata for a selected modulus.
* Graph-based visualization of states and transitions.
* Automatic simulation of number processing with adjustable animation speed.
* Manual simulation allowing the user to navigate through the processing steps using a slider, both forward and backward.
* Highlighting of the current state and the followed walk.
* Animation speed adjustment.
* Pause and resume controls.
* Visual feedback indicating whether the input number is divisible by the selected modulus.

---

## Educational purpose

This tool has been developed as an interactive visualization resource for mathematics education, especially in Primary and Secondary Education.

It can be used to introduce and explore concepts such as:

* divisibility rules;
* modular arithmetic;
* directed graphs;
* divisibility graphs;
* finite automata;
* numerical patterns;
* problem solving;
* mathematical modeling;
* algorithmic thinking.

The graphical representation of the automaton allows students to visualize how numbers are processed step by step and connect numerical reasoning with computational models.

---

## Classroom applications

This resource can be integrated into Primary and Secondary Education classroom activities in different ways.

- **Exploration of divisibility rules**: Students can use the automaton to investigate why divisibility rules work and how arithmetic properties can be represented through states and transitions. For example, a teacher can introduce a modulus and ask students to predict the walk followed by different numbers through the graph.
- **Discovery of numerical patterns**: The visualization allows students to observe patterns in remainder sequences and relate them to numerical properties. Students can compare different moduli and analyze how the structure of the graph changes depending on the selected divisor.
- **Introduction to mathematical modeling**: The automaton can be presented as a mathematical model of the divisibility process. Students can analyze how a numerical procedure can be transformed into a graphical representation based on states, transitions, and rules.
- **Connection with computational thinking**: The resource provides an accessible introduction to computer science concepts such as states, transitions, algorithms, and sequential processing. These ideas can be explored without prior programming knowledge.

---

## Technologies used

The application has been developed exclusively with standard web technologies, without relying on external frameworks or libraries.

The technologies used are:

| Technology | Use within the project |
|------------|-------------------------|
| HTML5 | Definition of the interface structure and interactive elements. |
| CSS3 | Visual design of the application, control styling, and presentation of graphical elements. |
| JavaScript ES6 | Implementation of the automaton logic, event generation, animation, and user interaction management. |
| SVG | Dynamic representation of the graph and walk through nodes, transitions, arrows, and self-loops. |

The use of standard technologies makes the application lightweight, easily modifiable, and accessible from any modern browser. Furthermore, since it does not use frameworks or external dependencies, the code is more transparent and suitable for analysis, adaptation, and educational reuse.

---

## Requirements

The application runs directly in a web browser: Chrome, Firefox, Edge, Safari, or equivalent. No installation, external dependencies, or additional software are required.

---

## Installation and execution

1. Download the project files.
2. Open the following file with a web browser: `activity-simulator-en.html`. The application will run locally.

---

## How to use it

The application provides two simulation modes:

### Automatic simulation

1. Enter the desired modulus.
2. Enter the number you want to analyze.
3. Adjust the animation speed using the slider control.
4. Press the **Start** button.
5. Observe the automaton traversal while each digit is processed.
6. Use the **Pause** button to stop or resume the animation.

### Manual simulation

The application also provides a manual simulation mode, which allows you to inspect the automaton traversal step by step.

1. Enter the desired modulus.
2. Enter the number you want to analyze.
3. Use the step slider to navigate through the simulation.
4. Move the slider forward to advance through the steps or backward to return to previous steps.
5. Observe the automaton state and the processed digits at each step.

The final state reached by the automaton determines whether the number is divisible by the selected modulus.

---

## Code architecture

The file `automaton.js` is organized into different functional blocks that separate automaton generation, graphical representation, and animation logic.

| Functional block | Function |
|------------------|----------|
| State positioning | Distributes the automaton states around a circumference to obtain a balanced graphical representation. |
| Event generation | Builds the sequence of operations executed during the animation, including multiplication by ten, digit-related increments, and final states. |
| SVG drawing | Dynamically generates the automaton graphical elements using SVG: nodes, arrows, transitions, and self-loops. |
| Automaton construction | Draws the complete graph structure, including multiplication-by-ten transitions and the increment cycle modulo `m`. |
| Animation | Processes generated events and progressively updates the visual representation of the traversal performed by the number. |
| Interaction controls | Manages user actions such as starting the simulation, pausing the animation, and resuming execution. |

This organization separates the mathematical logic of the automaton from its visual representation, facilitating both code understanding and future extensions of the simulator.

---

## Project structure

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

### File description

* `activity-simulator-en.html`  
  Main application interface of the simulator in English.

* `activity-simulator-es.html`  
  Main application interface of the simulator in Spanish.

* `activity-simulator-script-en.js`  
  JavaScript implementation of the simulator in English. It contains the automaton generation, mathematical logic, graph construction, animation system, event management, and user interaction.

* `activity-simulator-script-es.js`  
  JavaScript implementation of the simulator in Spanish, including automaton generation, graph construction, mathematical calculations, animation, and user interaction.

* `style-activity-simulator.css`  
  Common visual styles for the simulator, including the interface layout, controls, colors, graph elements, nodes, transitions, animations, and feedback elements.

* `README_activity_simulator_en.md`  
  Documentation of the simulator in English, including its mathematical foundations, internal simulation process, algorithm, educational purpose, features, usage instructions, code architecture, and possible future improvements.

* `README_activity_simulator_es.md`  
  Documentation of the simulator in Spanish, providing the equivalent information and instructions in Spanish.

---

## Possible future improvements

Some improvements that could be incorporated in future versions are:

- **Selection of different numerical bases**: Extend the simulator to work not only in decimal base but also with other numbering systems. This would allow users to study how automaton construction and remainder evolution change when the numerical representation is modified.
- **Automaton transition labels**: Add information associated with each transition, displaying the mathematical operation it represents or the digit that causes the state change. This would facilitate graph interpretation and allow users to analyze automaton behavior without running the complete animation.
- **Integration of predefined examples**: Add a collection of example numbers and moduli that allow users to start exploring immediately. These examples could include representative divisibility cases, different automaton sizes, and situations of particular educational interest.
- **Step-by-step representation of internal operations**: Develop a more detailed visualization of the remainder calculation, explicitly displaying each intermediate operation performed while processing a digit, including multiplication by ten and the successive increments associated with digit addition.
- **Export of generated graphs**: Add the possibility of saving the generated automaton representation as an image or SVG file. This functionality would allow users to include generated graphs in documents, reuse them in classroom activities, or use them as educational material.
- **Dynamic adaptation of the graphical representation**: Currently, the circular distribution of states allows automata with a moderate number of nodes to be visualized correctly. For larger moduli (above 20 states), the representation may lose readability due to the proximity between nodes and transitions. A future improvement would be the development of an automatic graph scaling and reorganization system that adjusts node size, distribution radius, and state spacing according to the number of represented elements. This would allow larger moduli to be displayed through an adaptive layout that maintains graph clarity and facilitates interpretation.
- **Advanced graph interaction**: Incorporate controls that allow users to dynamically modify the visualization scale, increasing or decreasing node size, adjusting the spatial arrangement of the automaton, and adapting the graphical representation according to user preferences or educational activity requirements.

---

## Citation

If you use this software in academic works, educational projects, research publications, or teaching materials, please cite the corresponding Zenodo record. This repository includes a citation file (`CITATION.cff`) containing the required metadata.

---

## License

This software is distributed under the **GNU General Public License v3.0 (GPLv3)**. It can be used, modified, and redistributed according to the terms specified in the `LICENSE-CODE` file.

---

## Author

> **Daniel Martín-Cudero**  
>
> Department of Financial Economics and Accounting,  
> Area of Mathematics Education,  
> Member of the Consolidated Resarch Group in STEM Education (GIESTEM),  
> Rey Juan Carlos University,  
> Madrid, Spain.