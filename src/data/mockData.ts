import { User, Task, StudyPlan, UnderstandingLevel } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alishba',
  email: 'alishba@example.com',
  major: 'Computer Science',
  createdAt: new Date().toISOString(),
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Data Structures Assignment',
    subject: 'Data Structures',
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Study for Calculus Midterm',
    subject: 'Calculus II',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Read Chapter 5: Object-Oriented Programming',
    subject: 'Software Engineering',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Complete Lab Report on Circuit Analysis',
    subject: 'Electronics',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Review Flashcards for Discrete Math',
    subject: 'Discrete Mathematics',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Watch Lecture Recording: Graph Theory',
    subject: 'Discrete Mathematics',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

const studyPlanTemplates: Record<string, Record<UnderstandingLevel, StudyPlan>> = {
  'object-oriented programming': {
    beginner: {
      subject: 'Object-Oriented Programming',
      level: 'beginner',
      recommendedHoursPerDay: 3,
      totalWeeks: 4,
      weeklyPlan: [
        {
          day: 'Monday',
          hours: 3,
          topics: ['Classes & Objects Fundamentals', 'Attributes and Methods'],
          tasks: [
            { time: '09:00', topic: 'Introduction to OOP Concepts', duration: '1h' },
            { time: '10:00', topic: 'Creating Your First Class', duration: '1h' },
            { time: '11:00', topic: 'Practice: Basic Class Exercises', duration: '1h' },
          ],
        },
        {
          day: 'Tuesday',
          hours: 3,
          topics: ['Encapsulation', 'Access Modifiers'],
          tasks: [
            { time: '09:00', topic: 'Understanding Encapsulation', duration: '1h' },
            { time: '10:00', topic: 'Public, Private, Protected', duration: '1h' },
            { time: '11:00', topic: 'Practice: Implementing Encapsulation', duration: '1h' },
          ],
        },
        {
          day: 'Wednesday',
          hours: 2.5,
          topics: ['Constructors', 'Destructor Basics'],
          tasks: [
            { time: '09:00', topic: 'Types of Constructors', duration: '1h' },
            { time: '10:00', topic: 'Constructor Overloading', duration: '1h' },
            { time: '11:00', topic: 'Practice: Constructor Exercises', duration: '30m' },
          ],
        },
        {
          day: 'Thursday',
          hours: 3,
          topics: ['Inheritance Fundamentals', 'Parent-Child Relationships'],
          tasks: [
            { time: '09:00', topic: 'Understanding Inheritance', duration: '1h' },
            { time: '10:00', topic: 'Extending Classes', duration: '1h' },
            { time: '11:00', topic: 'Practice: Inheritance Scenarios', duration: '1h' },
          ],
        },
        {
          day: 'Friday',
          hours: 2,
          topics: ['Review & Practice', 'Weekly Quiz'],
          tasks: [
            { time: '09:00', topic: 'Week Review & Notes', duration: '1h' },
            { time: '10:00', topic: 'Practice Problems Set', duration: '1h' },
          ],
        },
      ],
      coreTopics: [
        'Classes and Objects',
        'Encapsulation',
        'Constructors',
        'Inheritance',
        'Method Overriding',
        'Abstract Classes',
        'Interfaces',
        'Polymorphism',
      ],
    },
    intermediate: {
      subject: 'Object-Oriented Programming',
      level: 'intermediate',
      recommendedHoursPerDay: 2.5,
      totalWeeks: 3,
      weeklyPlan: [
        {
          day: 'Monday',
          hours: 2.5,
          topics: ['Advanced Inheritance', 'Multiple Inheritance'],
          tasks: [
            { time: '09:00', topic: 'Deep Dive inheritance', duration: '1h' },
            { time: '10:00', topic: 'Multiple Inheritance Challenges', duration: '1h' },
            { time: '11:00', topic: 'Practice: Diamond Problem', duration: '30m' },
          ],
        },
        {
          day: 'Tuesday',
          hours: 2.5,
          topics: ['Polymorphism', 'Virtual Functions'],
          tasks: [
            { time: '09:00', topic: 'Runtime Polymorphism', duration: '1h' },
            { time: '10:00', topic: 'Virtual Functions Deep Dive', duration: '1h' },
            { time: '11:00', topic: 'Practice: Polymorphism Patterns', duration: '30m' },
          ],
        },
        {
          day: 'Wednesday',
          hours: 2,
          topics: ['Abstract Classes', 'Interfaces'],
          tasks: [
            { time: '09:00', topic: 'Abstract Class Design', duration: '1h' },
            { time: '10:00', topic: 'Interface Implementation', duration: '1h' },
          ],
        },
        {
          day: 'Thursday',
          hours: 2.5,
          topics: ['Design Patterns Intro', 'Singleton Pattern'],
          tasks: [
            { time: '09:00', topic: 'Introduction to Design Patterns', duration: '1h' },
            { time: '10:00', topic: 'Singleton Implementation', duration: '1h' },
            { time: '11:00', topic: 'Practice: Singleton in Projects', duration: '30m' },
          ],
        },
      ],
      coreTopics: [
        'Advanced Polymorphism',
        'Abstract Classes',
        'Interfaces',
        'Design Patterns',
        'Factory Pattern',
        'Observer Pattern',
        'Strategy Pattern',
        'SOLID Principles',
      ],
    },
    advanced: {
      subject: 'Object-Oriented Programming',
      level: 'advanced',
      recommendedHoursPerDay: 2,
      totalWeeks: 2,
      weeklyPlan: [
        {
          day: 'Monday',
          hours: 2,
          topics: ['SOLID Principles', 'Architecture Design'],
          tasks: [
            { time: '09:00', topic: 'SOLID in Practice', duration: '1h' },
            { time: '10:00', topic: 'Architecture Decisions', duration: '1h' },
          ],
        },
        {
          day: 'Tuesday',
          hours: 2,
          topics: ['Design Patterns Mastery', 'MVC/MVVM'],
          tasks: [
            { time: '09:00', topic: 'Advanced Patterns', duration: '1h' },
            { time: '10:00', topic: 'MVC/MVVM Architecture', duration: '1h' },
          ],
        },
        {
          day: 'Wednesday',
          hours: 2,
          topics: ['Refactoring', 'Code smells'],
          tasks: [
            { time: '09:00', topic: 'Identifying Code Smells', duration: '1h' },
            { time: '10:00', topic: 'Refactoring Techniques', duration: '1h' },
          ],
        },
      ],
      coreTopics: [
        'SOLID Principles Deep Dive',
        'Design Patterns',
        'Clean Architecture',
        'Domain-Driven Design',
        'Testing Patterns',
        'Dependency Injection',
        'Anti-Patterns',
        'Refactoring',
      ],
    },
  },
  'discrete mathematics': {
    beginner: {
      subject: 'Discrete Mathematics',
      level: 'beginner',
      recommendedHoursPerDay: 2.5,
      totalWeeks: 4,
      weeklyPlan: [
        {
          day: 'Monday',
          hours: 2.5,
          topics: ['Sets & Set Operations', 'Venn Diagrams'],
          tasks: [
            { time: '09:00', topic: 'Introduction to Sets', duration: '1h' },
            { time: '10:00', topic: 'Set Operations', duration: '1h' },
            { time: '11:00', topic: 'Practice: Venn Diagrams', duration: '30m' },
          ],
        },
        {
          day: 'Tuesday',
          hours: 2.5,
          topics: ['Logic Fundamentals', 'Truth Tables'],
          tasks: [
            { time: '09:00', topic: 'Propositional Logic', duration: '1h' },
            { time: '10:00', topic: 'Truth Tables Construction', duration: '1h' },
            { time: '11:00', topic: 'Practice: Logical Equivalences', duration: '30m' },
          ],
        },
        {
          day: 'Wednesday',
          hours: 2,
          topics: ['Functions & Relations', 'Mappings'],
          tasks: [
            { time: '09:00', topic: 'Types of Functions', duration: '1h' },
            { time: '10:00', topic: 'Relations Introduction', duration: '1h' },
          ],
        },
        {
          day: 'Thursday',
          hours: 2.5,
          topics: ['Proof Techniques', 'Mathematical Induction'],
          tasks: [
            { time: '09:00', topic: 'Direct Proofs', duration: '1h' },
            { time: '10:00', topic: 'Proof by Contradiction', duration: '1h' },
            { time: '11:00', topic: 'Practice: Proof Problems', duration: '30m' },
          ],
        },
      ],
      coreTopics: [
        'Sets and Operations',
        'Logic and Proofs',
        'Functions',
        'Relations',
        'Combinatorics Basics',
        'Graph Theory Intro',
        'Number Theory',
        'Probability Basics',
      ],
    },
    intermediate: {
      subject: 'Discrete Mathematics',
      level: 'intermediate',
      recommendedHoursPerDay: 2,
      totalWeeks: 3,
      weeklyPlan: [
        {
          day: 'Monday',
          hours: 2,
          topics: ['Advanced Graph Theory', 'Graph Algorithms'],
          tasks: [
            { time: '09:00', topic: 'Graph Properties', duration: '1h' },
            { time: '10:00', topic: 'BFS and DFS', duration: '1h' },
          ],
        },
        {
          day: 'Tuesday',
          hours: 2,
          topics: ['Trees', 'Binary Trees'],
          tasks: [
            { time: '09:00', topic: 'Tree Properties', duration: '1h' },
            { time: '10:00', topic: 'Tree Traversals', duration: '1h' },
          ],
        },
        {
          day: 'Wednesday',
          hours: 2,
          topics: ['Combinatorics', 'Permutations & Combinations'],
          tasks: [
            { time: '09:00', topic: 'Counting Principles', duration: '1h' },
            { time: '10:00', topic: 'Advanced Combinatorics', duration: '1h' },
          ],
        },
      ],
      coreTopics: [
        'Graph Theory',
        'Trees',
        'Combinatorics',
        'Recurrence Relations',
        'Algorithms Analysis',
        'Number Theory',
        'Cryptography Intro',
        'Advanced Proofs',
      ],
    },
    advanced: {
      subject: 'Discrete Mathematics',
      level: 'advanced',
      recommendedHoursPerDay: 2,
      totalWeeks: 2,
      weeklyPlan: [
        {
          day: 'Monday',
          hours: 2,
          topics: ['Algorithm Complexity', 'Big-O Notation'],
          tasks: [
            { time: '09:00', topic: 'Complexity Analysis', duration: '1h' },
            { time: '10:00', topic: 'Advanced Big-O', duration: '1h' },
          ],
        },
        {
          day: 'Tuesday',
          hours: 2,
          topics: ['Cryptography', 'RSA Algorithm'],
          tasks: [
            { time: '09:00', topic: 'Number Theory for Crypto', duration: '1h' },
            { time: '10:00', topic: 'RSA Implementation', duration: '1h' },
          ],
        },
      ],
      coreTopics: [
        'Algorithmic Complexity',
        'Advanced Graph Algorithms',
        'Cryptography',
        'Formal Languages',
        'Automata Theory',
        'Advanced Combinatorics',
        'Probability Theory',
        'Mathematical Modeling',
      ],
    },
  },
};

function generateGenericPlan(subject: string, level: UnderstandingLevel): StudyPlan {
  const hoursMap = { beginner: 3, intermediate: 2.5, advanced: 2 };
  const weeksMap = { beginner: 4, intermediate: 3, advanced: 2 };

  return {
    subject,
    level,
    recommendedHoursPerDay: hoursMap[level],
    totalWeeks: weeksMap[level],
    weeklyPlan: [
      {
        day: 'Monday',
        hours: hoursMap[level],
        topics: ['Introduction & Fundamentals', 'Core Concepts Overview'],
        tasks: [
          { time: '09:00', topic: `Introduction to ${subject}`, duration: '1h' },
          { time: '10:00', topic: 'Core Principles', duration: '1h' },
          { time: '11:00', topic: 'Practice: Basic Problems', duration: '1h' },
        ],
      },
      {
        day: 'Tuesday',
        hours: hoursMap[level],
        topics: ['Deep Dive: Theory', 'Key Techniques'],
        tasks: [
          { time: '09:00', topic: 'Advanced Theory', duration: '1h' },
          { time: '10:00', topic: 'Technique Practice', duration: '1h' },
          { time: '11:00', topic: 'Problem Solving', duration: '1h' },
        ],
      },
      {
        day: 'Wednesday',
        hours: hoursMap[level] - 0.5,
        topics: ['Practical Applications', 'Real-world Examples'],
        tasks: [
          { time: '09:00', topic: 'Application Study', duration: '1h' },
          { time: '10:00', topic: 'Case Studies', duration: '1h' },
          { time: '11:00', topic: 'Practice Assignment', duration: '30m' },
        ],
      },
      {
        day: 'Thursday',
        hours: hoursMap[level],
        topics: ['Advanced Topics', 'Integration'],
        tasks: [
          { time: '09:00', topic: 'Advanced Concepts', duration: '1h' },
          { time: '10:00', topic: 'Integration with Prior Knowledge', duration: '1h' },
          { time: '11:00', topic: 'Complex Problem Practice', duration: '1h' },
        ],
      },
      {
        day: 'Friday',
        hours: hoursMap[level] - 0.5,
        topics: ['Review & Assessment', 'Week Summary'],
        tasks: [
          { time: '09:00', topic: 'Weekly Review', duration: '1h' },
          { time: '10:00', topic: 'Self-Assessment Quiz', duration: '1h' },
        ],
      },
    ],
    coreTopics: [
      `Introduction to ${subject}`,
      'Core Fundamentals',
      'Key Techniques',
      'Practical Applications',
      'Advanced Concepts',
      'Problem Solving',
      'Integration & Review',
      'Mastery Assessment',
    ],
  };
}

export function generateStudyPlan(subject: string, level: UnderstandingLevel): StudyPlan {
  const normalizedName = subject.toLowerCase().trim();

  if (studyPlanTemplates[normalizedName]) {
    return studyPlanTemplates[normalizedName][level];
  }

  for (const [key, templates] of Object.entries(studyPlanTemplates)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return templates[level];
    }
  }

  return generateGenericPlan(subject, level);
}
