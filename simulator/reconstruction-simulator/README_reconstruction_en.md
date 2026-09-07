# Interactive divisibility graph number reconstruction simulator

![Type](https://img.shields.io/badge/type-educational%20resource-blue)
![Technology](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20SVG-orange)
![Code](https://img.shields.io/badge/code-GPLv3-green)
![Materials%20%26%20Documentation](https://img.shields.io/badge/materials%20%26%20documentation-CC%20BY%204.0-red)
 
🌐 🇪🇸 Spanish version: [README_reconstruction_es.md](README_reconstruction_es.md) 
 
## Description 
 
**Interactive divisibility graph number reconstruction simulator** is a web-based educational resource designed to visually and interactively explore the relationship between the digits of a number, the states of a divisibility graph, and the transitions between those states. 
 
Unlike a conventional simulator in which a complete number is entered and its corresponding walk is observed, this tool approaches the process in reverse: the user defines a modulus and constructs a walk between states of the graph. From this partial or complete walk, the simulator determines which digits can produce each transition and, when the walk is complete, reconstructs all numbers compatible with the indicated sequence of states. In this way, the resource allows divisibility to be explored not only as a calculation procedure, but as a problem of reconstruction, reasoning, possibility analysis, and solution search within a graph. 
 
The simulator is especially aimed at **more advanced educational levels**, such as the final years of Secondary Education and subsequent educational stages, where it can be used to deepen the analysis of walks, the possibilities associated with each transition, and the reconstruction of numbers from partial information. 
 
This resource can be used to work on concepts related to: 
 
* divisibility;
* modular arithmetic;
* directed graphs;
* finite automata; 
* relationships between digits and states; 
* transition analysis; 
* number reconstruction; 
* mathematical reasoning; 
* conjecture formulation;
* problem solving. 
 
--- 
 
## Mathematical foundations 
 
The simulator is based on the deterministic finite automaton associated with the divisibility of integers in base ten. 
 
For a modulus `m`, the graph contains `m` states: 
 
`0, 1, 2, ..., m-1` .
 
Each state represents a possible remainder modulo `m`. 
 
If a number being processed has remainder `r` and a new digit `d` is added, the new remainder is determined by
 
`δ(r,d) = (10 ⋅ r + d) mod m`, 
 
where: 
 
* `r` is the current state, 
* `d` is the new digit, 
* `m` is the selected modulus, 
* `δ(r,d)` is the state reached after incorporating the digit. 
 
Therefore, each graph transition can be interpreted as a relationship between a source state, a digit, and a destination state. 
 
The simulator uses this relationship to perform the reverse process. Given a source state `rᵢ` and a destination state `rᵢ₊₁`, it searches for all digits `d` between `0` and `9` that satisfy
 
`(10 ⋅ rᵢ + d) mod m = rᵢ₊₁`. 
 
The digits that satisfy this condition are precisely the possible digits that can produce that transition. 
 
--- 
 
## How the simulator works 
 
The simulator allows the user to select: 
 
1. A modulus `m`. 
2. A walk length. 
3. A sequence of graph states. 
 
The first state of the walk is automatically set to `0`. The user can then enter the successive states of the walk: 
 
`0 → r₁ → r₂ → r₃ → ... → rₖ`.
 
Each state must be between `0` and `m-1`. 
 
As the user enters the states, the simulator visually represents the walk on the graph and analyzes each transition. 
 
For each step `rᵢ → rᵢ₊₁` all digits `d` satisfying `(10 ⋅ rᵢ + d) mod m = rᵢ₊₁` are calculated. The result is displayed in the interface as the set of **possible digits for that transition**. 
 
For example, if a particular transition is `2 → 1` and the digits satisfying the relationship are `2, 9`, the simulator indicates that both digits can produce that transition. In this way, the user can observe how the same sequence of states can be compatible with different sequences of digits. 
 
--- 
 
## Number reconstruction 
 
When the walk is completed, the simulator uses the possibilities calculated for each transition to generate all possible combinations of digits. 
 
Suppose a walk produces the following possibilities: 
 
- `Step 1: 0 → 1 | Possible digits: {1, 8}`. 
- `Step 2: 1 → 1 | Possible digits: {5}`. 
- `Step 3: 1 → 3 | Possible digits: {0, 7}`. 
- `Step 4: 3 → 1 | Possible digits: {6}`. 
 
The simulator generates all `2 ⋅ 1 ⋅ 2 ⋅ 1 = 4` possible combinations: 
 
- `1506`
- `1576` 
- `8506`  
- `8576` 
 
Each of these numbers is compatible with the specified sequence of states. 
 
The procedure therefore makes it possible to move from a sequence of states to a set of numbers that could have generated that sequence. 
 
--- 
 
## Leading-zero restriction 
 
During reconstruction, combinations whose first digit is `0` may appear. For example, `0275`. 
 
Although this combination may mathematically satisfy the transition conditions, it is not considered a four-digit number. For this reason, the simulator automatically discards combinations whose first digit is `0`. 
 
The interface also reports how many combinations have been discarded for this reason. 
 
--- 
 
## Walk validation 
 
Not every sequence of states represents a possible walk for a given modulus. 
 
For each transition `rᵢ → rᵢ₊₁` the simulator checks whether there is at least one digit `d` such that `(10 ⋅ rᵢ + d) mod m = rᵢ₊₁`. If no digit satisfies this condition, the transition is not compatible with the selected modulus. In this case, the simulator informs the user that the step is invalid. 
 
This check allows the resource to be used not only to reconstruct numbers, but also to analyze which walks are possible within the divisibility graph. 
 
--- 
 
## Visual conventions 
 
Different colors are used during interaction to distinguish the elements of the graph. 
 
| Color | Meaning | 
|---|---| 
| 🔵 Light blue | Graph states representing the possible remainders modulo `m`. | 
| ⚪ Light gray | Auxiliary cycle of increments `r → (r + 1) mod m`. | 
| ⚫ Gray | Permanent graph transitions associated with multiplication by ten. | 
| 🔴 Red | Transitions selected by the user while constructing the walk. | 
 
--- 
 
## Example 
 
Consider a modulus `7`. The graph contains the states: 
 
`0, 1, 2, 3, 4, 5, 6`. 
 
Suppose the user constructs a walk of length `3`: 
 
`0 → 1 → 3 → 2`. 
 
For each transition, the compatible digits are determined. 
 
### First transition 
 
For `0 → 1`, we search for the digits `d` satisfying `(10 ⋅ 0 + d) mod 7 = 1`. Therefore, `d mod 7 = 1` and the possible digits are `{1, 8}`.
 
### Second transition 
 
For `1 → 3`, we search for the digits satisfying `(10 ⋅ 1 + d) mod 7 = 3`. Therefore, `(10 + d) mod 7 = 3` and the possible digits are `{0, 7}`. 
 
### Third transition 
 
For `3 → 2`, we search for the digits satisfying `(10 ⋅ 3 + d) mod 7 = 2`. Therefore, `(30 + d) mod 7 = 2` and the possible digits are `{0, 7}`. 
 
The simulator can then reconstruct the combinations: 
 
- `100`
- `107`
- `170` 
- `177`  
- `800` 
- `807`  
- `870` 
- `877` 
 
All of them produce the walk `0 → 1 → 3 → 2` in the graph associated with modulus `7`. 
 
This procedure shows how a sequence of states can be used to recover information about the digits that originated the walk. 
 
--- 
 
## Features 
 
The application provides the following functionalities: 
 
* Automatic generation of the divisibility graph for a selected modulus. 
* Construction of walks with configurable length. 
* Automatic setting of the initial state to `0`. 
* Manual entry of the successive states of the walk. 
* Validation of entered states. 
* Visual representation of the walk on the graph. 
* Automatic identification of the digits compatible with each transition. 
* Detection of transitions with no possible digits. 
* Generation of all combinations of digits compatible with a complete walk. 
* Automatic removal of numbers with leading zeros. 
* Information about the total number of solutions found. 
* Information about combinations discarded because they begin with zero. 
* Ability to generate new exercises using the corresponding button. 
* Restriction of the modulus to values between `2` and `20`. 
* Restriction of the walk length to values between `1` and `50`. 
 
--- 
 
## Educational purpose 
 
This tool has been developed as an interactive resource for deepening the study of divisibility through graphs. 
 
Unlike an activity focused solely on determining whether a number is divisible by a given modulus, the simulator presents a reverse-reasoning situation: instead of starting from the number to obtain the walk, the user starts from the walk to investigate which numbers may produce it. 
 
This perspective is particularly useful for working on: 
 
* combinatorics: analysis of possibilities;
* interpretation of transitions; 
* modular arithmetic; 
* information reconstruction; 
* formulation and verification of conjectures; 
* systematic search for solutions; 
* algorithmic reasoning. 
 
The resource is especially intended for **more advanced educational levels**, such as the final years of Secondary Education and subsequent educational stages. 
 
--- 
 
## Classroom applications 
 
The simulator can be integrated into classroom activities focused on mathematical reasoning and exploration. 
 
- **Number reconstruction**: The teacher can provide a partial or complete walk through the graph and ask students to determine which numbers can produce it. This activity makes it possible to move from a direct calculation problem to a reconstruction problem. 
- **Transition analysis**: Students can study a specific transition `rᵢ → rᵢ₊₁` and determine which digits can produce it. From different examples, they can investigate patterns and formulate conjectures about the relationship between states and digits. 
- **Comparison of moduli**: The same walk can be analyzed for different moduli. Students can observe how the set of possible digits changes and how the structure of the graph depends on the selected modulus. 
- **Exploration of impossible walks**: The teacher can propose sequences of states that are not compatible with any number. Students must identify which transition makes the walk impossible and mathematically justify why no digit exists that allows it to occur. 
- **Problems involving partial information**: Partial walks can be presented in which only some states are known. Students can investigate what additional information is necessary to reconstruct the possible numbers. 
- **Conjecture formulation**: By exploring different moduli and walks, students can formulate conjectures about: the number of possible digits for a transition, the existence of impossible transitions, the relationship between moduli and digits, the number of numbers compatible with a walk, or the patterns that appear in different graphs. These conjectures can then be tested through new examples or mathematical reasoning. 
 
--- 
 
## Technologies used 
 
The application has been developed using only standard web technologies, without relying on external frameworks or libraries. 
 
The technologies used are: 
 
| Technology | Use within the project | 
|------------|-------------------------| 
| HTML5 | Definition of the interface structure and interaction elements. | 
| CSS3 | Visual design of the application, control styles, and presentation of graphical elements. | 
| JavaScript ES6 | Implementation of the mathematical logic, graph generation, transition analysis, number reconstruction, and user interaction management. | 
| SVG | Dynamic representation of the graph, states, transitions, walks, and self-loops. | 
 
The use of standard technologies makes the application lightweight, easily modifiable, and accessible from any modern browser. In addition, since it does not use frameworks or external dependencies, the code is transparent and suitable for analysis, adaptation, and reuse for educational purposes. 
 
--- 
 
## Requirements 
 
The application runs directly in a web browser: Chrome, Firefox, Edge, Safari, or equivalent. No installation, external dependencies, or additional software are required. 
 
--- 
 
## Installation and execution 
 
1. Download the project files. 
2. Open the following file with a web browser: `reconstruction-en.html`. The application will run locally. 
 
--- 
 
## How to use it 
 
1. Enter the desired modulus, between `2` and `20`, and the walk length, between `1` and `50`. 
2. Click the **Create walk** button. The initial state `0` will appear automatically. 
3. Enter the successive states of the walk. Observe how the entered walk is represented on the graph. 
4. Click the **Reconstruct number** button. The simulator will generate all numbers compatible with the walk. Numbers whose first digit is `0` will be discarded automatically. 
 
To analyze another walk with the same length associated with the same divisibility graph, click the **Create walk** button again. To start a new activity, click the **New exercise** button. 
 
--- 
 
## Code architecture 
 
The JavaScript file is organized into different functional blocks that separate graph generation, visual representation of the walk, mathematical analysis of transitions, and number reconstruction. 
 
| Functional block | Function | 
|------------------|---------| 
| State positioning | Distributes the graph states around a circle. | 
| Graph cleanup | Removes previously generated SVG elements. | 
| Node drawing | Visually generates the graph states using SVG elements. | 
| Arrow drawing | Represents directed transitions between states. | 
| Offset arrows | Allows the transitions selected by the user to be visually highlighted. | 
| Self-loops | Represents transitions that begin and end at the same state. | 
| Increment arcs | Builds the auxiliary cycle of increments modulo `m`. | 
| Base graph construction | Generates all permanent graph transitions. | 
| Possible digit determination | Determines which digits produce a specific transition. | 
| Possibility display | Shows the digits compatible with each step of the walk. | 
| Walk creation | Generates the input fields corresponding to the states of the walk. | 
| Walk updating | Validates the entered states and updates the graphical representation. | 
| Walk drawing | Highlights the sequence of states entered on the graph. | 
| Reconstruction | Generates all digit combinations compatible with the walk. | 
| Filtering | Discards numbers whose first digit is `0`. | 
| Result presentation | Displays the solutions found and the discarded combinations. | 
| New exercise | Resets the application to start a new activity. | 
 
This organization makes it possible to separate the mathematical logic from the visual representation, facilitating both understanding of the code and future extensions of the simulator. 
 
--- 
 
## Project structure 
 
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

### File descriptions

* `reconstruction-en.html`   
  Main interface of the simulator in English.

* `reconstruction-es.html`   
  Main interface of the simulator in Spanish.

* `reconstruction-script-en.js`   
  JavaScript implementation of the simulator in English. It contains the generation of the divisibility graph, the mathematical logic for analysing transitions, the construction of the inverse walk, the calculation of the possible digits for each transition, and the reconstruction of numbers from a partial walk.

* `reconstruction-script-es.js`   
  JavaScript implementation of the simulator in Spanish. It includes graph generation, reconstruction logic, analysis of transitions between states, determination of the possible digits associated with each step, and generation of all number combinations compatible with the walk entered by the user.

* `style-reconstruction.css`   
  Common visual styles for the simulator, including interface layout, controls, walk input fields, graphical elements, graph states, transitions, and presentation of reconstruction results.

* `README_reconstruction_en.md`   
  Documentation of the simulator in English, including its mathematical foundations, inverse walk operation, reconstruction algorithm, features, educational purpose, usage instructions, code architecture, and possible classroom applications.

* `README_reconstruction_es.md`   
  Documentation of the simulator in Spanish, with equivalent information and instructions in Spanish.

---

## Future extensions

Some improvements that could be incorporated into future versions include:

- **Control of the number of solutions**: Incorporate tools to analyse in advance how many combinations can be generated from a given walk.
- **Automatic exercise generation**: Create random walks or walks specifically designed to produce different levels of difficulty and allow the automatic generation of activities.
- **Step-by-step interactive reconstruction**: Progressively show how the different number combinations are constructed from the possibilities associated with each transition.
- **Comparison of different walks**: Allow several walks to be stored and compared in order to study how small modifications to the states affect the set of possible numbers.
- **Dynamic adaptation of the graph representation**: Currently, the circular distribution of the states allows graphs with a moderate number of nodes to be displayed correctly. For larger modules, the representation may become less readable due to the proximity of nodes and transitions. As a future improvement, an automatic scaling and reorganisation system could be developed to adjust node size, distribution radius, and spacing between states according to the number of elements represented.
- **Advanced graph interaction**: Incorporate controls that allow the visualisation scale to be modified dynamically, increase or decrease the size of the nodes, adjust the spatial arrangement of the graph, and adapt the graphical representation to the needs of each educational activity.

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