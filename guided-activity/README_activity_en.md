# Interactive graph-based activity for divisibility

![Type](https://img.shields.io/badge/type-educational%20resource-blue)
![Technology](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20SVG-orange)
![Code](https://img.shields.io/badge/code-GPLv3-green)
![Materials%20%26%20Documentation](https://img.shields.io/badge/materials%20%26%20documentation-CC%20BY%204.0-red)

🌐🇪🇸 Spanish version: [README_activity_es.md](README_activity_es.md)

## Description

**Interactive graph-based divisibility activity** is a web-based educational resource designed for students to construct, traverse, and use a *deterministic finite automaton* (DFA) to determine whether a number is divisible by a given modulus.

Unlike automatic simulation, in this activity the student must actively perform the different stages of the procedure. The application guides the process through a sequence of phases in which the student:

1. Constructs the transition graph corresponding to the selected modulus.
2. Enters a number and manually traverses the automaton.
3. Determines the final remainder and decides whether the number is divisible or not.
4. Checks their answers and receives feedback on each phase.

The activity transforms the divisibility-checking procedure into a task involving construction and reasoning, allowing students to relate modular arithmetic to the concepts of states, transitions, walks, and finite automata.

It is designed as a resource for teaching and learning activities in Primary and Secondary Education, especially in contexts related to: divisibility, modular arithmetic, computational thinking, and mathematical reasoning.

---

## Mathematical foundations

Divisibility rules can be modeled using deterministic finite automata. For a given modulus `m`, the automaton contains `m` states, each representing a possible remainder:

`0, 1, 2, ..., m-1`.

A state `r` represents the remainder obtained after processing the digits read up to that point. When a new digit `d` is entered, the transition function is defined as

`δ(r,d) = (10 ⋅ r + d) mod m`,

where:

- `r` is the current state corresponding to the remainder;
- `d` is the next digit being read;
- `m` is the selected modulus.

After all the digits of the input number have been processed, the automaton reaches a final state. The number is divisible by `m` if and only if the final state represents a remainder equal to zero.

---

## Activity objective

The main objective is for students to understand that a divisibility test can be represented as a walk through a graph. The activity presents a sequence of steps in which each phase depends on the previous one:

`Graph construction → Walk construction → Final result`

In this way, students can progressively relate:

- automaton states to remainders;
- transitions to arithmetic operations;
- reading a number to traversing a graph;
- the final state to the remainder of the division.

---

## Activity structure

The application is organized into three phases: (1) graph construction; (2) walk construction; and (3) final result.

### Phase 1. Graph construction

The student begins by selecting the modulus they wish to study. The modulus must be between 2 and 20. Once selected, the application generates the automaton states and distributes them graphically around a circle. The states represent:

`0, 1, 2, ..., m-1`.

The student must manually construct the transitions corresponding to multiplication by ten. For each state `r`, the student must establish the transition:

`r → (10 ⋅ r) mod m`.

For example, for modulus 7, from state 3 the transition should be `3 → (10 ⋅ 3) mod 7`, that is, `3 → 2`.

The application subsequently checks that:

- there is exactly one transition for each state;
- all transitions correspond to the rule `(10 ⋅ r) mod m`;
- the total number of arrows is equal to the number of states.

If the graph is correct, the next phase is unlocked. If there is an error, the application informs the student and allows them to restart the graph construction.

***Representation of increments***

In addition to the transitions constructed by the student, the graph visually displays a circle representing the cycle of increments modulo `m`. This cycle corresponds to the operation

`r → (r + 1) mod m`.

Therefore, it allows the states to be interpreted as a cycle of remainders and serves as a reference for understanding the evolution of the values while processing the digits.

### Phase 2. Walk construction

Once the graph has been correctly validated, the student can enter the number they wish to analyze.

The number is processed from left to right. For each digit, the student must select the states that form the automaton walk. The application records the selected states and draws the transitions made during the walk in red (🔴).

The first state in the walk is always `0`. From there, each new click on a node adds a new state to the walk. The student must complete the walk corresponding to all the digits of the number.

The sequence is displayed on screen as it is constructed. If the student makes a mistake, they can restart the walk by clicking the "Start walk" button.

Internally, the application calculates the correct walk by successively applying

`r ← (10 ⋅ r + d) mod m`,

starting with

`r = 0`.

For each digit of the number, a new state is obtained. For example, for the number `8778` and modulus `7`:

`0 → 1 → 3 → 2 → 0`.

The application compares the walk entered by the student with the mathematically correct walk. If they match, the phase is validated and the final phase is unlocked. If they do not match, the student is informed of the error and can restart the walk.

### Phase 3. Final result

Once the walk has been completed correctly, the student must determine two elements:

1. The final remainder.
2. Whether the number is divisible by the selected modulus.

The final remainder must match the last state reached during the walk. This state will be highlighted in green The final remainder must match the last state reached during the walk. This state will be highlighted in green (🟢).

The divisibility decision is based on the condition: `remainder = 0`. Therefore:

- If `remainder = 0`, the number is divisible;
- If `remainder ≠ 0`, the number is not divisible.

The application checks both answers independently. For the final answer to be correct, the following must match:

- the remainder entered by the student;
- the selected divisibility option.

If both answers are correct, the application displays a confirmation together with the final remainder and the corresponding conclusion.

---

## Activity example

Consider modulus `7` and the number `8778`.

### 1. Graph construction

The automaton contains seven states:

`0, 1, 2, 3, 4, 5, 6`.

The student must construct the transitions

`r → (10 ⋅ r) mod 7`.

Among them:

- `0 → 0`;
- `1 → 3`;
- `2 → 6`;
- `3 → 2`;
- `4 → 5`;
- `5 → 1`;
- `6 → 4`.

Once all the transitions have been constructed, the student requests graph validation.

### 2. Number being processed

The number `8778` is processed from left to right.

**Digit 8**

`(10 ⋅ 0 + 8) mod 7 = 1` → `0 → 1`.

**Digit 7**

`(10 ⋅ 1 + 7) mod 7 = 3` → `1 → 3`.

**Digit 7**

`(10 ⋅ 3 + 7) mod 7 = 2` → `3 → 2`.

**Digit 8**

`(10 ⋅ 2 + 8) mod 7 = 0` → `2 → 0`.

The complete walk is:

`0 → 1 → 3 → 2 → 0`.

### 3. Final result

The final state is `0`. Therefore, the remainder is `8778 mod 7 = 0`, and consequently **8778 is divisible by 7**.

The activity allows the student to reach this conclusion through the construction of the graph and the walk they have created, rather than receiving the result directly.

---

## Validation system

The activity incorporates a progressive checking system. Each phase must be completed correctly before the next one can be accessed.

### Graph validation

The application checks that:

- the number of arrows entered matches the number of states;
- there is a corresponding transition for each state;
- the destination of each transition satisfies `(10 ⋅ r) mod m`.

### Walk validation

The correct sequence of states for the entered number is calculated internally and compared with the sequence constructed by the student. The comparison takes into account both:

- the number of states;
- the value of each state and its position within the walk.

### Final result validation

The application checks:

- the entered remainder;
- the answer regarding divisibility.

The activity is considered correctly completed only when both pieces of information are correct.

---

## Student feedback

The application provides specific feedback at each phase. When the graph is correct, a message is displayed indicating that the construction has been completed and that the student can now begin the walk. When the graph is incorrect, the student is informed of the error and given the opportunity to try again.

During the walk phase, the sequence of selected states is displayed in real time. When the walk is correct, the student is informed and the remainder input and divisibility selection are unlocked. If the walk is incorrect, the student can restart it.

Finally, the application informs the student whether the data entered in the final phase are correct or whether an error has occurred.

This system allows the activity to be used not only as an assessment exercise, but also as a learning tool through trial, checking, and correction.

---

## Main features

The activity provides the following functionality:

- Selection of moduli between `2` and `20`.
- Automatic generation of the automaton states.
- Circular distribution of the states.
- Manual construction of transitions by the student.
- Automatic graph validation.
- Progressive locking of phases until previous phases have been completed correctly.
- Number input after graph validation.
- Manual construction of the walk by selecting nodes.
- Visual representation of the walk using red arrows.
- Display of the sequence of states reached.
- Automatic walk validation.
- Identification of the final state reached.
- Manual input of the final remainder.
- Selection of the divisibility answer.
- Automatic validation of the final result.
- Ability to restart the graph.
- Ability to restart the walk.
- Ability to work with a new number while keeping the same modulus.
- Ability to start a new exercise.

---

## Interaction flow

The general operation of the activity can be summarized as follows:

```text
Select modulus
        ↓
Generate graph states
        ↓
Construct transitions
        ↓
Check graph
        ↓
Is the graph correct?
   ┌────┴────┐
  NO        YES
  ↓          ↓
Try again   Enter number
                    ↓
              Start walk
                    ↓
              Select states
                    ↓
              Check walk
                    ↓
              Is the walk correct?
               ┌────┴────┐
               NO        YES
               ↓          ↓
           Try again   Enter remainder
                              +
                       Indicate divisibility
                              ↓
                       Check final result
                              ↓
                       Final result
```
This flow establishes a didactic progression in which each answer builds upon the work completed previously.

---

## Activity controls and states

The interface uses a system for locking and unlocking controls to guide the student.

When creating a new graph:

- transition construction is enabled;
- number input is disabled;
- walk construction is disabled;
- the final answer is disabled.

After correctly validating the graph:

- number input is enabled;
- starting the walk is enabled.

During the walk:

- state selection is enabled;
- the constructed sequence is recorded;
- the walk arrows are drawn.

After correctly validating the walk:

- remainder input is enabled;
- the divisibility options are enabled.

Finally, once both pieces of information have been completed, validation of the final result is enabled.

This organization prevents the student from skipping essential stages of the procedure.

---

## Visual representation

- The graph is dynamically represented using SVG.
- The states are distributed around a circle, with each one represented by a circular node.
- The connections constructed during the activity are displayed using arrows.

### Colors and visual elements

| Color | Meaning |
| ------ | -------- |
| 🔵 Light blue | Automaton state available for selection. |
| ⚪ Light gray | Increment cycle modulo `m`. |
| ⚫ Gray | Transitions constructed in the graph. |
| 🔴 Red | Walk constructed by the student. |
| 🟢 Green | Final state reached after a correct walk. |

The red color is specifically used to distinguish the walk being constructed by the student from the general transitions of the automaton. When the walk is correctly validated, the final state is visually highlighted in green.

---

## Graph construction

The application represents two complementary mathematical structures. On the one hand, the student constructs the transitions corresponding to `r → (10 ⋅ r) mod m`. These transitions transform the current remainder when a new digit is incorporated. On the other hand, the circle connecting the states represents the increments `r → (r + 1) mod m`. This second structure allows the states to be interpreted as a cycle of remainders modulo `m`.

The combination of both representations facilitates the connection between the structure of the automaton and the arithmetic operations involved in calculating the remainder.

---

## Code architecture

The JavaScript file is organized into different functional blocks that separate graph generation, student interaction, answer validation, and management of the different phases of the activity.

| Functional block | Function |
| ---------------- | -------- |
| State positioning | Distributes the automaton states around a circle to obtain a balanced graphical representation. |
| Graph creation | Initializes the selected modulus, calculates the positions of the states, and resets the variables required to start a new activity. |
| `+1` cycle representation | Draws the circular structure representing increments modulo `m`. |
| Graph drawing | Generates the SVG elements that form the visual representation of the automaton. |
| Node management | Creates the automaton states and manages student interaction with each node. |
| Transition construction | Records the arrows that the student creates between the different states. |
| Graph validation | Verifies that there is exactly one transition per state and that each transition satisfies the rule `(10 ⋅ r) mod m`. |
| Walk management | Allows the student to select the states that form the walk corresponding to the entered number. |
| Walk representation | Draws the transitions selected by the student in red and displays the resulting sequence of states. |
| Walk validation | Calculates the correct walk using the expression `(10 ⋅ r + d) mod m` and compares it with the sequence entered by the student. |
| Final result validation | Checks the entered remainder and the answer regarding the divisibility of the number. |
| New number management | Allows a new walk to be performed using the same graph and modulus. |
| Activity reset | Allows the activity to be restarted from the beginning. |

The organization of the code makes it possible to separate the mathematical logic from the graphical representation and user interaction. In this way, each phase of the activity can be managed independently.

---

## Educational purpose

The activity is designed to promote an understanding of divisibility. Instead of presenting only an animation showing the correct procedure, the student must make decisions and progressively construct the solution.

This makes it possible to work on different mathematical and computational skills:

- interpretation of remainders;
- modular arithmetic;
- pattern recognition;
- logical reasoning;
- graphical representation;
- algorithm following;
- problem solving;
- sequential thinking;
- mathematical modeling;
- relationship between an algebraic representation and a graphical representation.

The activity also makes it possible to identify student errors at different levels: automaton construction, walk construction, or interpretation of the final result.

---

## Classroom applications

The resource can be used in Primary and Secondary Education as an individual activity, pair work, or a teacher-guided activity.

- **Collaborative construction**: The teacher can select a modulus and ask students to determine in advance which transitions should appear in the graph before entering them into the application.
- **Walk prediction**: Before entering a number, students can calculate the expected walk on paper and then check it using the activity.
- **Error analysis**: The validation of each phase makes it possible to use errors as part of the learning process.
- **Introduction to mathematical modeling**: The activity can be presented as a mathematical model of the divisibility process. Students can analyze how a numerical procedure can be transformed into a graphical representation based on states, transitions, and rules.

---

## Technologies used

The application has been developed using only standard web technologies, without relying on external frameworks or libraries.

The technologies used are:

| Technology | Use within the project |
| -----------| -----------------------|
| HTML5 | Definition of the interface structure and interaction elements. |
| CSS3 | Visual design of the application, control styles, and presentation of graphical elements. |
| JavaScript ES6 | Implementation of the mathematical logic, state management, validation, and interaction. |
| SVG | Dynamic representation of the graph and walk using nodes, transitions, arrows, and self-loops. |

The use of standard technologies makes the application lightweight, easy to modify, and accessible from any modern browser. In addition, since it does not use frameworks or external dependencies, the code is more transparent and suitable for analysis, adaptation, and reuse for educational purposes.

---

## Requirements

The application runs directly in a web browser: Chrome, Firefox, Edge, Safari, or equivalent. No additional software, external frameworks, or server connection is required to perform the calculations. Mathematical processing and interaction take place directly in the browser.

---

## Installation and execution

1. Download the project files.
2. Open the following file in a web browser: `activity-en.html`.
3. Follow the steps indicated in the `How to Use the Activity` section of this document to perform the activity.

---

## How to use the activity

1. Enter a modulus between 2 and 20.
2. Construct the graph transitions: Select two nodes consecutively to create each arrow.
3. Check the graph: Click the `Check Graph` button. If it is correct, you can continue. If it is not, you can try again.
4. Enter the number you want to analyze.
5. Construct the walk: Start by selecting state `0` and continue selecting the states corresponding to the successive processing of the digits. For example, if the walk is `0 → 1 → 3 → 2 → 0`, click on nodes `0, 1, 3, 2, 0`, in that order.
6. Check the walk: The application compares the entered sequence with the correct walk. Click the `Check walk` button. If it is correct, you can continue. If it is not, you can try again. If you make a mistake while entering the walk and want to start over, click the `Start walk` button to begin again.
7. Enter the final remainder and select whether the number is divisible by the modulus.
8. Check the final result: Click the `Check Final Result` button. The application verifies the entered data and displays the final result.

---

## Project Structure

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

### File description

* `activity-en.html`  
  Main application interface in English.

* `activity-es.html`  
  Main application interface in Spanish.

* `activity-script-en.js`  
  JavaScript implementation of the educational resource in English. It contains the mathematical logic, graph generation, student interaction, validation system, and management of the different activity phases.

* `activity-script-es.js`  
  JavaScript implementation of the educational resource in Spanish, including the mathematical logic, graph interaction, validation, and activity management.

* `style_activity.css`  
  Common visual styles for the application, including the interface layout, controls, colors, graph elements, nodes, transitions, and feedback messages.

* `README_activity_en.md`  
  Documentation of the activity in English, including its mathematical foundations, educational objectives, functionality, usage instructions, architecture, and possible future improvements.

* `README_activity_es.md`  
  Spanish documentation of the activity, providing the equivalent information and instructions in Spanish.

---

## Possible future improvements

Some improvements that could be incorporated into future versions include:

- **Selection of different numerical bases**: Extend the activity to work not only in decimal base but also with other numbering systems. This would allow users to study how automaton construction and remainder evolution change when the numerical representation is modified.
- **Automaton transition labels**: Add information associated with each transition, displaying the mathematical operation it represents or the digit that causes the state change. This would facilitate graph interpretation and allow users to analyze automaton behavior.
- **Inclusion of predefined examples**: Add a collection of example numbers and moduli that allow users to try the application. These examples could include representative divisibility cases, different automaton sizes, and situations of particular educational interest.
- **Different difficulty levels**: Establish exercises with moduli and numbers of varying complexity.
- **Step-by-step representation of internal operations**: Develop a more detailed visualization of the remainder calculation, explicitly displaying each intermediate operation performed while processing a digit, including multiplication by ten and the successive increments associated with digit addition. Explicitly reinforce the correspondence between each state and the remainder it represents.
- **Progressive hints**: Provide hints when the student makes an error while constructing the graph or walk.
- **Error logging**: Record which transitions or states have been entered incorrectly in order to provide more specific feedback.
- **Result export**: Allow the graph, walk, and final result to be saved as material for educational activities.
- **Dynamic adaptation of the graphical representation**: Currently, the circular distribution of states allows automata with a moderate number of nodes to be visualized correctly. For larger moduli (above 17 states), the representation may lose readability due to the proximity between nodes and transitions. A future improvement would be the development of an automatic graph scaling and reorganization system that adjusts node size, distribution radius, and state spacing according to the number of represented elements. This would allow larger moduli to be displayed through an adaptive layout that maintains graph clarity and facilitates interpretation.
- **Advanced graph interaction**: Incorporate controls that allow users to dynamically modify the visualization scale, increasing or decreasing node size, adjusting the spatial arrangement of the automaton, and adapting the graphical representation according to user preferences or educational activity requirements.

---

## Citation

If you use this software in academic work, educational projects, research publications, or teaching materials, cite the corresponding Zenodo record. This repository includes a citation file (`CITATION.cff`) that provides the necessary metadata.

---

## License

This software is distributed under the **GNU General Public License v3.0 (GPLv3)**. It may be used, modified, and redistributed according to the terms specified in the `LICENSE-CODE` file.

---

## Author

> **Daniel Martín-Cudero**  
>
> Department of Financial Economics and Accounting,  
> Area of Mathematics Education,  
> Member of the Consolidated Resarch Group in STEM Education (GIESTEM),  
> Rey Juan Carlos University,  
> Madrid, Spain.