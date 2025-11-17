# Contributing to Algorithm Visualizer

First off, thank you for considering contributing to Algorithm Visualizer! It's people like you that make this project such a great tool for learning algorithms.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots or GIFs if possible**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

1. Fork the repo and create your branch from \`main\`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Issue that pull request!

## Development Process

### Setting Up Your Development Environment

\`\`\`bash
# Fork and clone the repository
git clone https://github.com/your-username/algorithm-visualizer.git
cd algorithm-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Project Structure

\`\`\`
src/
├── algorithms/      # Algorithm implementations
├── components/      # React components
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── store/           # State management
├── types/           # TypeScript types
└── utils/           # Utility functions
\`\`\`

### Coding Standards

#### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid \`any\` type unless absolutely necessary
- Use strict mode

\`\`\`typescript
// Good
interface Props {
  value: number;
  onChange: (value: number) => void;
}

// Bad
interface Props {
  value: any;
  onChange: any;
}
\`\`\`

#### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Implement proper error boundaries

\`\`\`typescript
// Good
export const MyComponent: React.FC<Props> = ({ value, onChange }) => {
  return <div>...</div>;
};

// Bad
export function MyComponent(props: any) {
  return <div>...</div>;
}
\`\`\`

#### Naming Conventions

- **Components**: PascalCase (e.g., \`ArrayVisualizer\`)
- **Functions**: camelCase (e.g., \`calculateDelay\`)
- **Constants**: UPPER_SNAKE_CASE (e.g., \`MAX_ARRAY_SIZE\`)
- **Files**: Match the export name
- **Test files**: \`*.test.ts\` or \`*.test.tsx\`

#### Code Organization

- One component per file
- Keep files under 300 lines
- Extract complex logic to hooks or utilities
- Group related functionality

### Testing

We use Vitest and Testing Library. All new features must include tests.

\`\`\`bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Open test UI
npm run test:ui
\`\`\`

#### Test Structure

\`\`\`typescript
describe('ComponentName', () => {
  describe('feature or method', () => {
    it('should do something specific', () => {
      // Arrange
      const input = ...;
      
      // Act
      const result = ...;
      
      // Assert
      expect(result).toBe(...);
    });
  });
});
\`\`\`

#### Test Coverage Goals

- Algorithms: 100%
- Utilities: 100%
- Store: 100%
- Components: 90%+

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

\`\`\`
<type>(<scope>): <subject>

<body>

<footer>
\`\`\`

**Types:**
- \`feat\`: New feature
- \`fix\`: Bug fix
- \`docs\`: Documentation changes
- \`style\`: Code style changes (formatting)
- \`refactor\`: Code refactoring
- \`test\`: Test additions or changes
- \`chore\`: Build process or tool changes

**Examples:**

\`\`\`
feat(algorithms): add heap sort implementation

Implement heap sort algorithm with step-by-step visualization.
Includes comprehensive test suite and documentation.

Closes #123
\`\`\`

\`\`\`
fix(visualizer): correct animation timing issues

Fixed race condition in animation loop that caused
visual glitches at high speeds.

Fixes #456
\`\`\`

### Code Review Process

1. All submissions require review
2. Reviewers will check:
   - Code quality and style
   - Test coverage
   - Documentation
   - Performance implications
   - Breaking changes
3. Address feedback promptly
4. Squash commits before merging

## Adding New Algorithms

### 1. Implement the Algorithm

Create your algorithm in \`src/algorithms/\`:

\`\`\`typescript
export const mySort = (array: number[]): SortingResult => {
  const arr = [...array];
  const steps: AlgorithmStep[] = [];
  
  // Your implementation
  // Record steps for visualization
  
  return { steps, sortedArray: arr };
};
\`\`\`

### 2. Add Configuration

Update \`src/config/algorithms.ts\`:

\`\`\`typescript
export const sortingAlgorithms: Record<SortingAlgorithm, AlgorithmConfig> = {
  // ...existing algorithms
  mysort: {
    name: 'My Sort',
    type: 'sorting',
    description: 'Description of your algorithm',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
};
\`\`\`

### 3. Update Types

Add to \`src/types/index.ts\`:

\`\`\`typescript
export type SortingAlgorithm =
  | 'bubble'
  | 'quick'
  // ... existing
  | 'mysort'; // Add your algorithm
\`\`\`

### 4. Write Tests

Create \`src/algorithms/mySort.test.ts\`:

\`\`\`typescript
describe('mySort', () => {
  it('should sort an unsorted array', () => {
    const result = mySort([3, 1, 2]);
    expect(result.sortedArray).toEqual([1, 2, 3]);
  });
  
  // Add more tests...
});
\`\`\`

### 5. Update Documentation

Add your algorithm to the README.md with:
- Name and description
- Time/space complexity
- Any special characteristics

## Style Guide

### ESLint and Prettier

We use ESLint and Prettier for code consistency:

\`\`\`bash
# Lint your code
npm run lint

# Fix linting issues
npm run lint:fix

# Format your code
npm run format
\`\`\`

### Import Order

\`\`\`typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

// 3. Internal imports (aliased)
import { useVisualizerStore } from '@/store/visualizerStore';
import { ArrayElement } from '@/types';
import { generateId } from '@/utils/helpers';

// 4. Relative imports
import { SubComponent } from './SubComponent';

// 5. Styles
import './styles.css';
\`\`\`

### Component Structure

\`\`\`typescript
// 1. Imports

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // 3a. Hooks
  const [state, setState] = useState();
  const store = useVisualizerStore();
  
  // 3b. Derived state/memoization
  const computed = useMemo(() => ..., [deps]);
  
  // 3c. Effects
  useEffect(() => {
    // ...
  }, [deps]);
  
  // 3d. Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 3e. Render helpers
  const renderItem = (item) => {
    // ...
  };
  
  // 3f. Main render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
\`\`\`

## Questions?

Feel free to:
- Open an issue with your question
- Join our discussions
- Reach out to maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉
