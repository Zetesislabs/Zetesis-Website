import { Person, ResearchDirection, FrameworkPoint, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: '00_Index', href: '#intro', id: '00' },
  { label: '01_About', href: '#about', id: '01' },
  { label: '02_Framework', href: '#framework', id: '02' },
  { label: '03_Research', href: '#research', id: '03' },
  { label: '04_People', href: '#people', id: '04' },
];

export const INTRO_TEXT = [
  "Zetesis is a research lab focused on the formalization of knowledge and decision-making in real-world systems.",
  "We study how intelligent systems represent, manipulate, and revise knowledge under uncertainty, structural change, and high-cost decision constraints.",
  "Most contemporary AI systems optimize predictive performance over historical data. While effective for pattern recognition, these systems lack the ability to reason about causality, intervention, counterfactuals, and unknowns, capabilities required for decision-making in manufacturing, healthcare, infrastructure, and policy.",
  "Zetesis treats inquiry as a computable process and knowledge as an explicit system-level object. Our work targets the epistemic layer between data and action, where mechanisms must be represented explicitly, assumptions tracked, and uncertainty structured rather than collapsed into point probabilities.",
  "We develop decision-centric intelligence using formal methods from causal calculus, plausibility theory, and symbolic reasoning, combined with executable reasoning architectures. These systems are designed to reason over change, evaluate consequences of actions, and remain valid as environments evolve.",
  "Zetesis builds epistemic and computational infrastructure for constructing, validating, and operating knowledge-driven decision systems in the real world."
];

export const ABOUT_TEXT = [
  "Zetesis operates at the intersection of applied mathematics, systems engineering, and real-world decision intelligence.",
  "Across manufacturing, healthcare, energy, and infrastructure, we repeatedly observed the same failure mode: decisions were derived from correlations in data, while the underlying mechanisms governing outcomes remained unmodeled. As conditions changed, models degraded, confidence eroded, and human intuition was forced to compensate.",
  "This limitation is not computational but epistemic. Decision-making requires representations of cause-and-effect, explicit treatment of unknowns, and the ability to reason about interventions and “what-if” scenarios, capabilities absent from most data-centric systems until recent advances in mathematics.",
  "Zetesis builds on causal calculus and plausibility theory to formalize this missing layer. We treat intelligence as the efficient use of structured knowledge to make sound decisions, rather than as the optimization of predictive accuracy.",
  "Our work is evaluated through operational systems in environments where incorrect reasoning has visible cost, including manufacturing planning, industrial compliance, medical prognostics, and infrastructure decision-making. In these settings, value emerges from improved decision quality and robustness under uncertainty, not from automation alone."
];

export const FRAMEWORK_MATH = [
  { term: "Causal calculus", def: "Enabling reasoning about interventions and counterfactuals rather than correlations." },
  { term: "Plausibility theory", def: "Supporting directional reasoning when probabilities are undefined or when data is scarce." },
  { term: "Uncertainty geometry", def: "Modeling the structure of ignorance rather than compressing uncertainty into point estimates." }
];

export const SEPARATION_LAYERS = [
  "Axioms (assumptions and commitments)",
  "Mechanisms (how effects are produced)",
  "Representations (symbolic, algebraic, or executable)",
  "Empirical traces (data and measurements)"
];

export const RESEARCH_DIRECTIONS: ResearchDirection[] = [
  {
    title: "Formal Models of Inquiry",
    description: "Developing computable representations of inquiry as a structured process governing abstraction, systemization, and validation. This includes formal mechanisms for generating, evaluating, and revising questions, and for bounding the space of admissible explanations and actions."
  },
  {
    title: "Causal Knowledge Representation",
    description: "Constructing explicit structural causal models that support intervention, counterfactual reasoning, and mechanism-based explanation. Emphasis is placed on separating causal structure from statistical association and enabling causal composition across interacting subsystems."
  },
  {
    title: "Uncertainty Beyond Probability",
    description: "Studying mathematical representations of uncertainty that distinguish risk from ignorance. This includes the use of plausibility theory and geometric formulations of uncertainty to support directional reasoning and decision-making when probabilities are ill-defined or data is sparse."
  },
  {
    title: "Knowledge Architectures and Process Ontologies",
    description: "Advancing the Universal Representation Schema (URS) as a process ontology for organizing axioms, mechanisms, representations, and empirical traces. Research focuses on composability, auditability, and interoperability of knowledge across domains and time."
  },
  {
    title: "Causal Dataset Construction",
    description: "Developing methodologies for building datasets that encode causal structure rather than correlational features. Current work includes manufacturing operations, electrical compliance systems, and medical imaging, where physical mechanisms must be modeled explicitly to achieve invariance."
  },
  {
    title: "Decision Engineering Under Uncertainty",
    description: "Formulating decision systems that compare consequences across plausible futures rather than optimizing expected values. This includes defining decision primitives, uncertainty accounting, and criteria for decision robustness in high-stakes environments."
  },
  {
    title: "Validation Through Operational Systems",
    description: "Evaluating theoretical constructs through deployment in real-world systems where incorrect reasoning has observable cost. Validation focuses on decision stability, interpretability, and the ability to revise knowledge in response to new evidence or structural change."
  }
];

export const PEOPLE: Person[] = [
  {
    name: "Dhruv Gupta",
    role: "Principal Investigator",
    description: "Dhruv is the Principal Investigator, Neuroscientist (IISc), and Founder of Zetesis. He leads research across fundamental theory, system design, and applied deployments, guiding the lab’s direction and collaborations."
  },
  {
    name: "Samanway",
    role: "Co-Principal Investigator",
    description: "Samanway is the Co-Principal Investigator and Co-Founder of Zetesis. He leads the development of formal mathematical methods, uncertainty modeling, and the foundational structures behind the Universal Representation Schema."
  },
  {
    name: "Prof. Bharadwaj Amrutur",
    role: "Advisor",
    description: "Prof. Bharadwaj Amrutur serves as an advisor to Zetesis. He is a Professor at IISc and the Executive Director of ARTPARK, supporting research direction and institutional partnerships."
  }
];