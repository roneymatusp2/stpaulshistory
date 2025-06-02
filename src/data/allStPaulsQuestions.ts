export interface Question {
  year: number;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: string;
}

export const ALL_STPAULS_QUESTIONS: Question[] = [
  // 1926
  {
    year: 1926,
    question: "Who was appointed as the founding Headmaster of St. Paul's School when it formally opened in February 1926?",
    options: {
      A: "Mr. Hindley",
      B: "Mr. J. A. Dodd",
      C: "Mr. John Nelson",
      D: "Mr. Titus Edge"
    },
    answer: "B"
  },
  {
    year: 1926,
    question: "What was the original incorporated name of St. Paul's School, São Paulo?",
    options: {
      A: "The British Academy of São Paulo",
      B: "São Paulo British College",
      C: "Escola Britânica S.A.",
      D: "The Jardins International School"
    },
    answer: "C"
  },
  {
    year: 1926,
    question: "Which British-owned company played a leading role in the founding of St. Paul's School?",
    options: {
      A: "The British East India Company",
      B: "The São Paulo Tramway, Light and Power Company",
      C: "The Royal Mail Steam Packet Company",
      D: "The São Paulo Railway Company"
    },
    answer: "D"
  },

  // 1928
  {
    year: 1928,
    question: "To which leafy district in São Paulo did St. Paul's School relocate in 1928, establishing its current site?",
    options: {
      A: "Vila Madalena",
      B: "Jardins (on Rua Juquiá)",
      C: "Higienópolis",
      D: "Morumbi"
    },
    answer: "B"
  },
  {
    year: 1928,
    question: "What was a primary reason for the school's relocation in 1928?",
    options: {
      A: "To be closer to the São Paulo Railway Company headquarters.",
      B: "To accommodate a growing number of pupils and operate from a larger campus.",
      C: "To escape urban development in its original location.",
      D: "To merge with another existing British school."
    },
    answer: "B"
  },
  {
    year: 1928,
    question: "Reflecting traditional British schooling norms at the time, how were boys and girls generally taught in the early years after the 1928 relocation?",
    options: {
      A: "In fully integrated co-educational classes from the start.",
      B: "Boys and girls were taught separately despite sharing the school.",
      C: "Only boys were admitted to the new campus.",
      D: "Girls attended a separate sister school in a different district."
    },
    answer: "B"
  },

  // 1930
  {
    year: 1930,
    question: "By the 1930s, St. Paul's School had become a focal point for which community in São Paulo, offering a 'little piece of England abroad'?",
    options: {
      A: "The American expatriate community",
      B: "The German immigrant community",
      C: "The British community",
      D: "The Italian merchant community"
    },
    answer: "C"
  },
  {
    year: 1930,
    question: "Which elements, typical of British schools, were observable at St. Paul's in the 1930s, contributing to its 'piece of England' atmosphere?",
    options: {
      A: "A curriculum focused solely on Brazilian history and Portuguese language.",
      B: "Its house system, uniforms, and observance of British traditions.",
      C: "Mandatory teaching of French and German as primary languages.",
      D: "A campus designed to replicate American Ivy League universities."
    },
    answer: "B"
  },
  {
    year: 1930,
    question: "Even in its formative years in the 1930s, St. Paul's set high academic standards within what type of curriculum, foreshadowing its later international programmes?",
    options: {
      A: "A strictly vocational curriculum.",
      B: "A curriculum based entirely on the French Lycée system.",
      C: "A bilingual Anglo-Brazilian curriculum.",
      D: "A curriculum focused only on classical studies like Latin and Greek."
    },
    answer: "C"
  },

  // 1944
  {
    year: 1944,
    question: "Which notable St. Paul's alumnus, a Scottish Old Paulean, was killed in action in Italy in 1944 whilst serving with the Queen's Own Cameron Highlanders?",
    options: {
      A: "J. A. Dodd",
      B: "Mr. Hindley",
      C: "William Norman Cameron Anderson",
      D: "John Nelson"
    },
    answer: "C"
  },
  {
    year: 1944,
    question: "Who was the Headmaster of St. Paul's School around 1944-45, guiding the school during the latter part of World War II?",
    options: {
      A: "Mr. J. A. Dodd",
      B: "Mr. Hindley",
      C: "Mr. Casey McCann",
      D: "Ms. Louise Simpson"
    },
    answer: "B"
  },
  {
    year: 1944,
    question: "What role did St. Paul's School reinforce for British youngsters in São Paulo during World War II under Mr. Hindley's guidance?",
    options: {
      A: "A centre for military training.",
      B: "A 'home away from home'.",
      C: "A recruitment centre for the armed forces.",
      D: "A diplomatic liaison office."
    },
    answer: "B"
  },

  // 1951
  {
    year: 1951,
    question: "What significant institutional change occurred for St. Paul's School in 1951 regarding its governance and legal status?",
    options: {
      A: "It became a state-owned Brazilian school.",
      B: "The Fundação Anglo-Brasileira de Educação e Cultura was established to transform it into a not-for-profit foundation.",
      C: "It merged with the American School of São Paulo.",
      D: "It was officially renamed 'The Royal British School of São Paulo'."
    },
    answer: "B"
  },
  {
    year: 1951,
    question: "The establishment of the Fundação Anglo-Brasileira de Educação e Cultura (FABEC) in 1951 ensured the school would be overseen by what kind of body?",
    options: {
      A: "The Brazilian Ministry of Education directly.",
      B: "A Board of Governors and trustees dedicated to its educational mission.",
      C: "The São Paulo Railway Company's board of directors.",
      D: "An elected committee of parents and teachers."
    },
    answer: "B"
  },
  {
    year: 1951,
    question: "What was a key aim of transforming St. Paul's from a limited company to a not-for-profit foundation in 1951?",
    options: {
      A: "To increase school fees significantly.",
      B: "To focus solely on educating children of British diplomats.",
      C: "To reinforce its close relationship with São Paulo's British community and its educational mission.",
      D: "To prepare the school for sale to a private education group."
    },
    answer: "C"
  },

  // 1961
  {
    year: 1961,
    question: "In 1961, updated statutes for which foundation ensured that St. Paul's School would be overseen by a Board of Governors and trustees dedicated to its educational mission?",
    options: {
      A: "The São Paulo Cultural Heritage Foundation",
      B: "The British Council for Overseas Education",
      C: "The Fundação Anglo-Brasileira de Educação e Cultura (FABEC)",
      D: "The International Schools Accreditation Body"
    },
    answer: "C"
  },
  {
    year: 1961,
    question: "The 1961 updated statutes for FABEC reinforced the school's close relationship with São Paulo's British community and what other entities?",
    options: {
      A: "Only with schools in the United States.",
      B: "Other expatriate institutions.",
      C: "Exclusively with Brazilian state schools.",
      D: "International sporting federations."
    },
    answer: "B"
  },
  {
    year: 1961,
    question: "What was the primary legal status of St. Paul's School following the formalisation of FABEC with updated statutes by 1961?",
    options: {
      A: "A private limited company.",
      B: "A state-controlled educational institution.",
      C: "A not-for-profit foundation.",
      D: "A subsidiary of a UK-based educational trust."
    },
    answer: "C"
  },

  // 1965
  {
    year: 1965,
    question: "What new facility, fondly remembered as the 'Old Wing', did St. Paul's School inaugurate in 1965?",
    options: {
      A: "A dedicated arts and drama centre.",
      B: "A new wing to house modern science labs and separate Prep and Senior sections.",
      C: "An Olympic-sized swimming pool.",
      D: "A new boarding house for international pupils."
    },
    answer: "B"
  },
  {
    year: 1965,
    question: "Alongside the new science wing, what other type of facility was constructed in 1965 to serve as a theatre, sports hall, and venue for community events?",
    options: {
      A: "A dedicated library building.",
      B: "A multi-purpose hall.",
      C: "An outdoor athletics stadium.",
      D: "A new administrative block."
    },
    answer: "B"
  },
  {
    year: 1965,
    question: "The expansion in the 1960s, including the 1965 additions, reflected what ongoing trend at St. Paul's?",
    options: {
      A: "A decrease in pupil enrolment.",
      B: "A shift towards becoming a boarding-only school.",
      C: "The campus keeping pace with growth in enrolment and educational needs.",
      D: "A focus on reducing the number of subjects offered."
    },
    answer: "C"
  },

  // 1976
  {
    year: 1976,
    question: "What significant milestone did St. Paul's School celebrate in 1976?",
    options: {
      A: "Its 25th (Silver) Anniversary.",
      B: "Its 50th (Golden Jubilee) Anniversary.",
      C: "Its 75th (Diamond) Anniversary.",
      D: "Its Centenary."
    },
    answer: "B"
  },
  {
    year: 1976,
    question: "During the 1976 Jubilee celebrations, a message from which government was read out, commending the school's role in fostering UK-Brazil cultural ties?",
    options: {
      A: "The Brazilian Government.",
      B: "The United States Government.",
      C: "Her Majesty's Government (UK).",
      D: "The Canadian Government."
    },
    answer: "C"
  },
  {
    year: 1976,
    question: "By the end of the 1970s, St. Paul's had established itself as one of Brazil's premier international schools, blending which two characteristics?",
    options: {
      A: "French traditions with Brazilian warmth.",
      B: "American educational models with European rigor.",
      C: "English traditions with Brazilian warmth.",
      D: "Strictly British curriculum with minimal local adaptation."
    },
    answer: "C"
  },

  // 1983
  {
    year: 1983,
    question: "What important academic milestone was achieved by St. Paul's Sixth Formers in 1983?",
    options: {
      A: "They were the first to sit for A-Level examinations at the school.",
      B: "They received their Brazilian graduation certificates (Segundo Grau) for the first time.",
      C: "They all received scholarships to British universities.",
      D: "They participated in the first international school sports tournament."
    },
    answer: "B"
  },
  {
    year: 1983,
    question: "Registering with São Paulo state education authorities as 'Escola Britânica de São Paulo' in the early 1980s allowed St. Paul's leaving students to achieve what?",
    options: {
      A: "Automatic British citizenship.",
      B: "Exemption from all Brazilian university entrance exams.",
      C: "To earn the Brazilian Segundo Grau (high school diploma).",
      D: "To teach English in Brazilian state schools without further qualification."
    },
    answer: "C"
  },
  {
    year: 1983,
    question: "The ability for Paulean alumni to directly enter Brazilian universities after 1983 was a result of which key change spearheaded by Headmaster John Nelson?",
    options: {
      A: "The school adopting Portuguese as its primary language of instruction.",
      B: "The school formally registering with São Paulo state education authorities.",
      C: "A bilateral agreement between the UK and Brazilian governments.",
      D: "The school ceasing to offer any British qualifications."
    },
    answer: "B"
  },

  // 1987
  {
    year: 1987,
    question: "In 1987, the first class of St. Paul's students sat for which prestigious pre-university examinations, making the school a pioneer in Latin America?",
    options: {
      A: "Cambridge Pre-U Diploma",
      B: "Advanced Placement (AP) Exams",
      C: "International Baccalaureate (IB) Diploma",
      D: "French Baccalauréat"
    },
    answer: "C"
  },
  {
    year: 1987,
    question: "The introduction of the IB Diploma Programme at St. Paul's in the 1980s was a watershed moment because it:",
    options: {
      A: "Replaced all Brazilian curriculum requirements.",
      B: "Focused solely on arts and humanities subjects.",
      C: "Broadened the academic horizons of St. Paul's, placing it on par with elite international schools worldwide.",
      D: "Was only available to students of British nationality."
    },
    answer: "C"
  },
  {
    year: 1987,
    question: "The dual qualification approach of IGCSE followed by IB Diploma complemented which existing style of curriculum at St. Paul's?",
    options: {
      A: "The American High School Diploma system.",
      B: "The Brazilian Vestibular preparation system.",
      C: "The British O-level/GCSE style curriculum.",
      D: "The German Abitur system."
    },
    answer: "C"
  },

  // 1988
  {
    year: 1988,
    question: "In 1988, St. Paul's School became a founding member of which organisation, linking up with peer schools across the continent?",
    options: {
      A: "The European Council of International Schools (ECIS)",
      B: "The Latin American Heads Conference (LAHC)",
      C: "The Global Alliance of British Schools (GABS)",
      D: "The Pan-American Education Forum (PAEF)"
    },
    answer: "B"
  },
  {
    year: 1988,
    question: "By the end of the 1980s, St. Paul's had truly become a bilingual, bicultural institution, marrying the finest elements of the British National Curriculum with the Brazilian curriculum and what other framework?",
    options: {
      A: "The American AP (Advanced Placement) system.",
      B: "The French Baccalauréat framework.",
      C: "The IB (International Baccalaureate) framework.",
      D: "The German Abitur system."
    },
    answer: "C"
  },
  {
    year: 1988,
    question: "The school's reputation as a leading academic school in South America by the late 1980s was bolstered by accolades such as being lauded in UK educational circles for what?",
    options: {
      A: "Its traditional teaching methods unchanged since 1926.",
      B: "Its exclusive focus on British expatriate children.",
      C: "Its forward-thinking approach to education.",
      D: "Its large-scale sporting achievements."
    },
    answer: "C"
  },

  // 1991
  {
    year: 1991,
    question: "Which members of the British Royal Family visited St. Paul's School in April 1991 during their official tour of Brazil?",
    options: {
      A: "Queen Elizabeth II and Prince Philip.",
      B: "Prince Andrew and Sarah, Duchess of York.",
      C: "Charles, Prince of Wales, and Diana, Princess of Wales.",
      D: "Princess Anne and Captain Mark Phillips."
    },
    answer: "C"
  },
  {
    year: 1991,
    question: "What did Diana, Princess of Wales, formally inaugurate during her visit to St. Paul's School in 1991?",
    options: {
      A: "The new Senior School library.",
      B: "The school's new Pre-Preparatory wing.",
      C: "The underground Sports Centre.",
      D: "The Queen Elizabeth II Academic Centre."
    },
    answer: "B"
  },
  {
    year: 1991,
    question: "Michael 'Casey' McCann, who became Headmaster in the early 1990s, had previously been a senior master at which renowned school in Kent, UK?",
    options: {
      A: "Eton College",
      B: "Harrow School",
      C: "Sevenoaks School",
      D: "Winchester College"
    },
    answer: "C"
  },

  // 2000
  {
    year: 2000,
    question: "Which Headmaster, known for his push for modern pastoral care and student welfare reforms, led St. Paul's through much of the 1990s until his untimely death in São Paulo in 2000?",
    options: {
      A: "Mr. J. A. Dodd",
      B: "Mr. Hindley",
      C: "Mr. Michael 'Casey' McCann",
      D: "Mr. John Nelson"
    },
    answer: "C"
  },
  {
    year: 2000,
    question: "Dra. Silvia Fortes Siqueira, who served as Diretora Oficial for 21 years, began her impactful tenure in which decade, spanning into the 2020s?",
    options: {
      A: "The 1980s",
      B: "The 1990s",
      C: "The 2000s",
      D: "The 1970s"
    },
    answer: "C"
  },
  {
    year: 2000,
    question: "The leadership of St. Paul's in the new millennium, following Mr. McCann, passed to a new generation including heads like Mr. Kevin Benamar and Mr. Alex Nelson. What did their leadership continue?",
    options: {
      A: "A reduction in the school's international programmes.",
      B: "The school's development and commitment to its values.",
      C: "A shift back to being a boys-only boarding school.",
      D: "The closure of the Brazilian curriculum section."
    },
    answer: "B"
  },

  // 2006
  {
    year: 2006,
    question: "Under the guidance of Diretora Oficial Dra. Silvia Fortes Siqueira, St. Paul's Brazilian programme was aligned with new federal requirements, including what change to Ensino Fundamental in 2006?",
    options: {
      A: "Reducing it by one year.",
      B: "Making it optional for international students.",
      C: "Adding a year to Ensino Fundamental.",
      D: "Replacing it entirely with the British curriculum."
    },
    answer: "C"
  },
  {
    year: 2006,
    question: "Dra. Siqueira's PhD in Bilingual Education was instrumental in seamlessly integrating Brazilian curriculum changes with which other programmes at St. Paul's?",
    options: {
      A: "Only with the school's sports programmes.",
      B: "The IB and international programmes.",
      C: "The school's adult education courses.",
      D: "The nursery and early years programmes exclusively."
    },
    answer: "B"
  },
  {
    year: 2006,
    question: "The dual leadership model at St. Paul's, comprising a British Headmaster and a Brazilian Diretora like Dra. Siqueira, became a hallmark of the school's governance, ensuring what?",
    options: {
      A: "A primary focus on British traditions only.",
      B: "Compliance, quality, and a blend of educational cultures.",
      C: "The eventual phasing out of the Brazilian curriculum.",
      D: "Separation of British and Brazilian students into different campuses."
    },
    answer: "B"
  },

  // 2008
  {
    year: 2008,
    question: "What significant outreach endeavour was established by St. Paul's School in 2008 to offer full scholarships to talented local children?",
    options: {
      A: "The St. Paul's International Exchange Programme.",
      B: "The St. Paul's Foundation Scholarship Programme.",
      C: "The British Council Language Initiative.",
      D: "The Paulean Alumni Support Fund."
    },
    answer: "B"
  },
  {
    year: 2008,
    question: "The St. Paul's Foundation Scholarship Programme, established in 2008, primarily aims to provide education for whom?",
    options: {
      A: "Children of British expatriates working in Brazil.",
      B: "Talented children from São Paulo's local community who could not otherwise afford a St. Paul's education.",
      C: "Students from other Latin American countries.",
      D: "Children of St. Paul's School alumni exclusively."
    },
    answer: "B"
  },
  {
    year: 2008,
    question: "The establishment of the scholarship programme in 2008 underscores St. Paul's commitment to which value, particularly pertinent in modern Brazil?",
    options: {
      A: "Academic elitism.",
      B: "Sporting excellence above all.",
      C: "Social responsibility and community engagement.",
      D: "Maintaining a purely British student body."
    },
    answer: "C"
  },

  // 2012
  {
    year: 2012,
    question: "In 2012, St. Paul's became the first school in Latin America to achieve what official recognition from the UK government?",
    options: {
      A: "Queen's Award for Enterprise.",
      B: "Royal Charter status.",
      C: "Recognition as a British School Overseas (BSO).",
      D: "Affiliation with the University of Cambridge."
    },
    answer: "C"
  },
  {
    year: 2012,
    question: "Which body of inspectors evaluated St. Paul's School, leading to its BSO accreditation in 2012?",
    options: {
      A: "Ofsted (Office for Standards in Education, Children's Services and Skills).",
      B: "The Brazilian Ministry of Education (MEC).",
      C: "ISI (Independent Schools Inspectorate).",
      D: "The International Baccalaureate Organisation (IBO)."
    },
    answer: "C"
  },
  {
    year: 2012,
    question: "What royal event did St. Paul's School celebrate in 2012 with a large community fête on campus?",
    options: {
      A: "The wedding of Prince William and Catherine Middleton.",
      B: "Queen Elizabeth II's Diamond Jubilee.",
      C: "The birth of Prince George.",
      D: "Prince Charles's 60th Birthday."
    },
    answer: "B"
  },

  // 2014
  {
    year: 2014,
    question: "Who was appointed as Head of St. Paul's School in 2014, becoming the 18th Headmaster and the first female head?",
    options: {
      A: "Dra. Silvia Fortes Siqueira",
      B: "Ms. Louise Simpson",
      C: "Mrs. Angela Fregonesi",
      D: "Miss Hofsteter"
    },
    answer: "B"
  },
  {
    year: 2014,
    question: "What state-of-the-art, multimillion-dollar facility was unveiled at St. Paul's School in 2014, built entirely below ground?",
    options: {
      A: "The Queen Elizabeth II Academic Centre.",
      B: "A new Pre-Preparatory School building.",
      C: "An underground Sports Centre.",
      D: "A dedicated Arts and Technology wing."
    },
    answer: "C"
  },
  {
    year: 2014,
    question: "During her tenure (2014-2020), Ms. Louise Simpson championed educational innovation, including the introduction of what whole-school initiative?",
    options: {
      A: "A mandatory Latin language programme.",
      B: "A whole-school bilingual literacy initiative.",
      C: "A focus on vocational training.",
      D: "The phasing out of the IB Diploma."
    },
    answer: "B"
  },

  // 2016
  {
    year: 2016,
    question: "What significant anniversary did St. Paul's School celebrate with a particularly grand affair in 2016?",
    options: {
      A: "Its 75th Anniversary.",
      B: "Its 80th Anniversary.",
      C: "Its 90th Anniversary.",
      D: "Its Centenary."
    },
    answer: "C"
  },
  {
    year: 2016,
    question: "Which new state-of-the-art building, named in honour of the monarch, was opened as part of the 90th-anniversary celebrations in 2016?",
    options: {
      A: "The King Charles III Science Wing.",
      B: "The Princess Diana Arts Pavilion.",
      C: "The Queen Elizabeth II Academic Centre.",
      D: "The J.A. Dodd Memorial Library."
    },
    answer: "C"
  },
  {
    year: 2016,
    question: "The Queen Elizabeth II Academic Centre includes which of these facilities?",
    options: {
      A: "An underground car park and administrative offices only.",
      B: "A modern learning resources library, art studios, a music school with recording suites, and science laboratories.",
      C: "A primary school and a nursery.",
      D: "A large theatre and an exhibition hall."
    },
    answer: "B"
  },

  // 2018
  {
    year: 2018,
    question: "In 2018, St. Paul's School gained particular distinction in educational technology by being selected for which two prestigious statuses simultaneously?",
    options: {
      A: "Google Reference School and Raspberry Pi Certified School.",
      B: "Microsoft Showcase School and Apple Distinguished School.",
      C: "IB World School for Technology and COBIS Digital Learning Hub.",
      D: "UNESCO Centre for Digital Innovation and HMC Tech Pioneer School."
    },
    answer: "B"
  },
  {
    year: 2018,
    question: "These dual honours awarded in 2018 were in recognition of St. Paul's exemplary integration of what into teaching and learning?",
    options: {
      A: "Traditional Brazilian teaching methods.",
      B: "Outdoor education programmes.",
      C: "Technology, from iPads to innovative online learning platforms.",
      D: "Classical languages and philosophy."
    },
    answer: "C"
  },
  {
    year: 2018,
    question: "The school's advanced EdTech tools and one-to-one device programme, highlighted by the 2018 recognitions, proved prescient for what global event?",
    options: {
      A: "The 2016 Rio Olympics.",
      B: "The rise of social media influencers.",
      C: "The COVID-19 pandemic.",
      D: "The launch of 5G networks in Brazil."
    },
    answer: "C"
  },

  // 2020
  {
    year: 2020,
    question: "Who was welcomed as the new Headmaster of St. Paul's School in 2020, arriving from Gordonstoun in Scotland?",
    options: {
      A: "Mr. Kevin Benamar",
      B: "Ms. Louise Simpson",
      C: "Mr. Titus Edge",
      D: "Mr. Alex Nelson"
    },
    answer: "C"
  },
  {
    year: 2020,
    question: "Mr. Titus Edge assumed leadership of St. Paul's amidst what extraordinary global challenge in 2020?",
    options: {
      A: "A major economic recession in Brazil.",
      B: "The COVID-19 pandemic.",
      C: "Significant political unrest in São Paulo.",
      D: "A global shortage of qualified teachers."
    },
    answer: "B"
  },
  {
    year: 2020,
    question: "For how many years did Dra. Silvia Fortes Siqueira serve as the impactful Diretora Oficial of St. Paul's, with her tenure concluding around the 2000s-2020s period?",
    options: {
      A: "10 years",
      B: "15 years",
      C: "21 years",
      D: "5 years"
    },
    answer: "C"
  },

  // 2021
  {
    year: 2021,
    question: "By late 2021, under Mr. Titus Edge's leadership, what had St. Paul's School introduced to support students readjusting to in-person schooling after pandemic-related remote learning?",
    options: {
      A: "A permanent shift to a four-day school week.",
      B: "The complete discontinuation of all digital learning tools.",
      C: "Hybrid learning models and enhanced wellness support.",
      D: "Mandatory boarding for all senior students."
    },
    answer: "C"
  },
  {
    year: 2021,
    question: "The COVID-19 crisis underscored which strengths of St. Paul's School and its community, as noted during Mr. Edge's early tenure?",
    options: {
      A: "Its reliance on traditional, non-digital teaching methods.",
      B: "Its resilience and the strength of its community bonds.",
      C: "Its ability to operate without parental involvement.",
      D: "Its focus on individual learning with minimal collaboration."
    },
    answer: "B"
  },
  {
    year: 2021,
    question: "What did Mr. Titus Edge reflect made his family feel 'instantly at home' at St. Paul's, despite the challenge of moving to São Paulo amidst a pandemic?",
    options: {
      A: "The similarity of São Paulo's climate to Scotland.",
      B: "The 'warmth of the people' at St. Paul's.",
      C: "The availability of direct flights back to Scotland.",
      D: "The school's exclusive use of the Scottish curriculum."
    },
    answer: "B"
  },

  // 2022
  {
    year: 2022,
    question: "In June 2022, St. Paul's School marked which Royal event with a special assembly and tree-planting on campus?",
    options: {
      A: "The Queen's 90th Birthday.",
      B: "The Diamond Jubilee of Queen Elizabeth II.",
      C: "The Platinum Jubilee of Queen Elizabeth II.",
      D: "The coronation of King Charles III."
    },
    answer: "C"
  },
  {
    year: 2022,
    question: "Mr. Titus Edge, the 19th Headmaster, has a personal connection to São Paulo as his wife is Brazilian and what else?",
    options: {
      A: "A former teacher at St. Paul's.",
      B: "An Old Paulean alumna.",
      C: "A member of the Brazilian diplomatic service.",
      D: "A leading Brazilian architect who designed parts of the school."
    },
    answer: "B"
  },
  {
    year: 2022,
    question: "Under Mr. Edge's guidance, the school navigated pandemic disruptions with resilience and has focused on what for its future?",
    options: {
      A: "A reduction in academic programmes.",
      B: "A strategic vision leading into its second century.",
      C: "Closing its doors to new international pupils.",
      D: "Merging with another international school in São Paulo."
    },
    answer: "B"
  },

  // 2023
  {
    year: 2023,
    question: "A 2023 Forbes report on Brazil's most prestigious schools placed St. Paul's in what position?",
    options: {
      A: "Among the top 50, but not leading.",
      B: "As a newly emerging institution.",
      C: "At the forefront of elite institutions.",
      D: "Primarily recognised for its sports programmes."
    },
    answer: "C"
  },
  {
    year: 2023,
    question: "In recent years, St. Paul's aligned its strategic plan with which global framework, launching student-led initiatives on issues like climate action?",
    options: {
      A: "The G20 Economic Development Goals.",
      B: "The UNESCO Charter for Cultural Preservation.",
      C: "The United Nations Sustainable Development Goals (SDGs).",
      D: "The World Health Organisation's Health for All initiative."
    },
    answer: "C"
  },
  {
    year: 2023,
    question: "What new student leadership position was created in the Sixth Form at St. Paul's in recent years to champion environmental issues?",
    options: {
      A: "Head of Digital Innovation.",
      B: "Sustainability Prefect.",
      C: "Arts and Culture Ambassador.",
      D: "Sports Captain General."
    },
    answer: "B"
  },

  // 2024
  {
    year: 2024,
    question: "As St. Paul's prepares for its Centenary, what is one of the eco-friendly initiatives underway to make the campus more sustainable?",
    options: {
      A: "Replacing all green spaces with artificial turf.",
      B: "Installing solar panels on a building and a new tree-planting scheme.",
      C: "Increasing the school's reliance on fossil fuels for energy.",
      D: "Demolishing older buildings to reduce maintenance."
    },
    answer: "B"
  },
  {
    year: 2024,
    question: "The curriculum at St. Paul's has recently been refreshed to include more discussion of global issues, for instance, through an annual cross-curricular project week known as what?",
    options: {
      A: "Brazilian Cultural Heritage Week.",
      B: "'Global Perspectives' week.",
      C: "British History and Literature Symposium.",
      D: "STEM Innovation Challenge."
    },
    answer: "B"
  },
  {
    year: 2024,
    question: "What is the stated vision for St. Paul's future, as noted by Headmaster Titus Edge in a recent interview, drawing on its heritage whilst looking forward?",
    options: {
      A: "To become the largest school in Brazil by pupil numbers.",
      B: "To focus exclusively on the British curriculum and phase out Brazilian elements.",
      C: "One of creativity and confidence, looking forward with imagination.",
      D: "To relocate the school to a more rural setting outside São Paulo."
    },
    answer: "C"
  },

  // 2025
  {
    year: 2025,
    question: "As St. Paul's School approaches its Centenary in 2026, current projects for future facilities include the creation of an Outdoor Education Centre and what other cutting-edge facility?",
    options: {
      A: "A dedicated Equestrian Centre.",
      B: "An on-campus Planetarium.",
      C: "An Innovation Centre focused on digital fabrication, robotics, and entrepreneurship.",
      D: "A new wing for classical studies and ancient history."
    },
    answer: "C"
  },
  {
    year: 2025,
    question: "The planned Outdoor Education Centre is primarily intended for what kind of studies?",
    options: {
      A: "Advanced astrophysics and astronomy.",
      B: "Ecology studies and adventure education.",
      C: "Marine biology and oceanography.",
      D: "Urban planning and architecture."
    },
    answer: "B"
  },
  {
    year: 2025,
    question: "The development of new facilities like the Innovation Centre, slated around 2025-2026, underlines which aspect of St. Paul's School's approach as it nears its centenary?",
    options: {
      A: "A focus on reducing pupil numbers.",
      B: "A shift away from its British heritage.",
      C: "Its forward-looking approach and commitment to continual innovation.",
      D: "A decision to specialise only in STEM subjects."
    },
    answer: "C"
  }
];