import { Question } from '../../types/game';
import { elements } from '../elements';

export const periodicTrendsQuestions: Question[] = [
  {
    element: elements[0],
    question: "How does atomic radius change going down a group?",
    choices: ["Increases", "Decreases", "Stays the same", "Fluctuates randomly"],
    answer: "Increases",
    difficulty: "medium",
    year: 1
  },
  {
    element: elements[8],
    question: "Why is fluorine the most electronegative element?",
    choices: [
      "Largest atomic radius",
      "Smallest atomic radius and highest effective nuclear charge",
      "Most protons",
      "Most stable electron configuration"
    ],
    answer: "Smallest atomic radius and highest effective nuclear charge",
    difficulty: "hard",
    year: 9
  },
  {
    element: elements[9],
    question: "How does ionization energy change across a period?",
    choices: ["Decreases", "Increases", "Remains constant", "Changes randomly"],
    answer: "Increases",
    difficulty: "medium",
    year: 10
  },
  {
    element: elements[30], // Ga
    question: "Which element has the highest electrical conductivity?",
    choices: ["Copper", "Silver", "Gold", "Aluminum"],
    answer: "Silver",
    difficulty: "medium",
    year: 31
  },
  {
    element: elements[31], // Ge
    question: "How does metallic character change going from left to right across a period?",
    choices: ["Increases", "Decreases", "Stays the same", "Changes randomly"],
    answer: "Decreases",
    difficulty: "medium",
    year: 32
  },
  {
    element: elements[32], // As
    question: "Which has a higher first ionization energy?",
    choices: ["Sodium", "Magnesium", "Potassium", "Calcium"],
    answer: "Magnesium",
    difficulty: "hard",
    year: 33
  },
  {
    element: elements[33], // Se
    question: "As you move down Group 17 (halogens), what happens to reactivity?",
    choices: ["Increases", "Decreases", "Remains constant", "Fluctuates randomly"],
    answer: "Decreases",
    difficulty: "medium",
    year: 34
  },
  {
    element: elements[34], // Br
    question: "Which group of elements has the largest atomic radii relative to neighboring groups?",
    choices: ["Alkali metals", "Alkaline earth metals", "Transition metals", "Noble gases"],
    answer: "Alkali metals",
    difficulty: "hard",
    year: 35
  },
  {
    element: elements[35], // Kr
    question: "Which property generally increases across a period from left to right?",
    choices: ["Atomic radius", "Metallic character", "Electronegativity", "Electron affinity"],
    answer: "Electronegativity",
    difficulty: "medium",
    year: 36
  }
];