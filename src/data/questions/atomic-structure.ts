import { Question } from '../../types/game';
import { elements } from '../elements';

export const atomicStructureQuestions: Question[] = [
  {
    element: elements[0], // H
    question: "What is the atomic number of Hydrogen?",
    choices: ["0", "1", "2", "3"],
    answer: "1",
    difficulty: "easy",
    year: 1
  },
  {
    element: elements[0],
    question: "How many electrons does a H⁺ ion have?",
    choices: ["0", "1", "2", "3"],
    answer: "0",
    difficulty: "medium",
    year: 1
  },
  {
    element: elements[1],
    question: "What is the electron configuration of helium?",
    choices: ["1s¹", "1s²", "2s¹", "2s²"],
    answer: "1s²",
    difficulty: "medium",
    year: 2
  },
  {
    element: elements[2],
    question: "What is the atomic number of lithium?",
    choices: ["1", "2", "3", "4"],
    answer: "3",
    difficulty: "easy",
    year: 3
  },
  {
    element: elements[3],
    question: "How many valence electrons does beryllium have?",
    choices: ["1", "2", "3", "4"],
    answer: "2",
    difficulty: "medium",
    year: 4
  },
  {
    element: elements[20], // Sc
    question: "What is the charge of a proton?",
    choices: ["0", "+1", "-1", "+2"],
    answer: "+1",
    difficulty: "easy",
    year: 21
  },
  {
    element: elements[21], // Ti
    question: "Which subatomic particle has approximately the same mass as a proton but no charge?",
    choices: ["Electron", "Neutron", "Positron", "Photon"],
    answer: "Neutron",
    difficulty: "easy",
    year: 22
  },
  {
    element: elements[22], // V
    question: "What is the mass number of an atom with 6 protons and 7 neutrons?",
    choices: ["6", "7", "13", "1"],
    answer: "13",
    difficulty: "medium",
    year: 23
  },
  {
    element: elements[23], // Cr
    question: "In which orbital would you find the outermost electrons of potassium?",
    choices: ["3d", "4s", "4p", "3p"],
    answer: "4s",
    difficulty: "hard",
    year: 24
  },
  {
    element: elements[24], // Mn
    question: "What is the approximate atomic radius of sodium compared to fluorine?",
    choices: ["Smaller", "Larger", "The same", "Cannot be compared"],
    answer: "Larger",
    difficulty: "medium",
    year: 25
  }
];