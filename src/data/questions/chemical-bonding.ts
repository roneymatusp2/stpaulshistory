import { Question } from '../../types/game';
import { elements } from '../elements';

export const chemicalBondingQuestions: Question[] = [
  {
    element: elements[5], // C
    question: "What type of bonding exists in diamond?",
    choices: ["Ionic", "Metallic", "Covalent", "Van der Waals"],
    answer: "Covalent",
    difficulty: "medium",
    year: 6
  },
  {
    element: elements[6], // N
    question: "What type of bond forms between nitrogen atoms in N₂?",
    choices: ["Single bond", "Double bond", "Triple bond", "Ionic bond"],
    answer: "Triple bond",
    difficulty: "hard",
    year: 7
  },
  {
    element: elements[8], // F
    question: "What type of bond forms in NaF?",
    choices: ["Covalent", "Metallic", "Ionic", "Hydrogen"],
    answer: "Ionic",
    difficulty: "medium",
    year: 9
  },
  {
    element: elements[16], // Cl
    question: "What is the bond angle in water (H₂O)?",
    choices: ["90°", "104.5°", "120°", "180°"],
    answer: "104.5°",
    difficulty: "hard",
    year: 17
  },
  {
    element: elements[25], // Fe
    question: "Which of the following compounds has covalent bonding?",
    choices: ["NaCl", "CaO", "CO₂", "MgF₂"],
    answer: "CO₂",
    difficulty: "easy",
    year: 26
  },
  {
    element: elements[26], // Co
    question: "What type of intermolecular force is responsible for hydrogen bonding?",
    choices: ["London dispersion forces", "Dipole-dipole forces", "Ion-dipole forces", "Electrostatic attraction between H and O, N, or F"],
    answer: "Electrostatic attraction between H and O, N, or F",
    difficulty: "medium",
    year: 27
  },
  {
    element: elements[27], // Ni
    question: "Which of the following molecules has a non-polar covalent bond?",
    choices: ["HCl", "H₂O", "NH₃", "Cl₂"],
    answer: "Cl₂",
    difficulty: "medium",
    year: 28
  },
  {
    element: elements[28], // Cu
    question: "What is the bond angle in a tetrahedral molecule like methane (CH₄)?",
    choices: ["90°", "104.5°", "109.5°", "120°"],
    answer: "109.5°",
    difficulty: "hard",
    year: 29
  },
  {
    element: elements[29], // Zn
    question: "Which type of bond typically has the highest bond energy?",
    choices: ["Single covalent bond", "Double covalent bond", "Triple covalent bond", "Ionic bond"],
    answer: "Triple covalent bond",
    difficulty: "medium",
    year: 30
  }
];