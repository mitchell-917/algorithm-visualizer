# Architecture Documentation

## Overview

The Algorithm Visualizer is built with a modern, scalable architecture that emphasizes:
- **Separation of Concerns**: Clear boundaries between UI, logic, and state
- **Testability**: Every layer can be tested in isolation
- **Maintainability**: Consistent patterns and conventions
- **Performance**: Optimized for smooth animations and efficient rendering

## System Architecture

### High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Algorithm   │  │    Array     │  │   Control    │  │
│  │   Selector   │  │  Visualizer  │  │    Panel     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│          │                  │                  │         │
└──────────┼──────────────────┼──────────────────┼─────────┘
           │                  │                  │
           └──────────┬───────┴──────────┬───────┘
                      │                  │
┌─────────────────────┼──────────────────┼─────────────────┐
│                     │   Hook Layer     │                 │
│  ┌──────────────────┴─────┐  ┌────────┴──────────────┐  │
│  │ useSortingVisualization│  │ useKeyboardShortcuts  │  │
│  └────────────────────────┘  └───────────────────────┘  │
│                      │                  │                │
└──────────────────────┼──────────────────┼────────────────┘
                       │                  │
                       └─────────┬────────┘
                                 │
┌────────────────────────────────┼────────────────────────┐
│                    State Layer │                        │
│                  ┌──────────────┴──────────────┐        │
│                  │   Zustand Store             │        │
│                  │ - Algorithm Type            │        │
│                  │ - Selected Algorithm        │        │
│                  │ - Visualization State       │        │
│                  │ - Array/Grid Data           │        │
│                  └────────────────────────────┘         │
└──────────────────────────────────────────────────────────┘
                                 │
┌────────────────────────────────┼────────────────────────┐
│                    Logic Layer │                        │
│  ┌──────────────┐  ┌───────────┴──────┐  ┌──────────┐  │
│  │   Sorting    │  │     Helpers      │  │  Config  │  │
│  │  Algorithms  │  │    Utilities     │  │          │  │
│  └──────────────┘  └──────────────────┘  └──────────┘  │
└──────────────────────────────────────────────────────────┘
\`\`\`

## Layer Descriptions

### 1. Presentation Layer (Components)

**Responsibility**: Rendering UI and handling user interactions

#### Key Components

##### AlgorithmSelector
- Displays available algorithms
- Shows complexity information
- Handles algorithm selection
- Highlights selected algorithm

##### ArrayVisualizer
- Renders array as bars
- Applies color coding based on state
- Animates bar transitions
- Scales to viewport

##### ControlPanel
- Playback controls (play, pause, reset)
- Step navigation
- Speed control
- Keyboard shortcuts display

**Design Patterns Used**:
- **Presentational/Container Pattern**: Components focus on rendering
- **Compound Components**: Related controls grouped together
- **Render Props**: Flexible composition where needed

### 2. Hook Layer

**Responsibility**: Encapsulating reusable logic and side effects

#### useSortingVisualization
\`\`\`typescript
Purpose: Manages animation loop and algorithm execution
Inputs: Store state, selected algorithm
Outputs: executeAlgorithm function, playback state
Side Effects: requestAnimationFrame, setTimeout
\`\`\`

Key Features:
- Calculates delay based on speed
- Updates array state on each step
- Manages animation frame lifecycle
- Cleans up on unmount

#### useKeyboardShortcuts
\`\`\`typescript
Purpose: Handles keyboard event listeners
Inputs: Callback functions for each shortcut
Outputs: None (side effects only)
Side Effects: window event listeners
\`\`\`

Key Features:
- Prevents default browser behavior
- Ignores shortcuts in input fields
- Cleans up listeners on unmount
- Configurable and composable

#### useMediaQuery
\`\`\`typescript
Purpose: Responds to screen size changes
Inputs: Media query string
Outputs: Boolean indicating if query matches
Side Effects: matchMedia listeners
\`\`\`

Key Features:
- SSR-safe implementation
- Automatic cleanup
- Predefined breakpoint hooks

### 3. State Layer (Zustand Store)

**Responsibility**: Centralized state management

#### Store Structure

\`\`\`typescript
{
  // Configuration
  algorithmType: 'sorting' | 'pathfinding' | 'tree',
  selectedAlgorithm: SortingAlgorithm | PathfindingAlgorithm | null,
  
  // Visualization State
  visualization: {
    isPlaying: boolean,
    isPaused: boolean,
    isComplete: boolean,
    currentStep: number,
    totalSteps: number,
    speed: 1-10,
    array: ArrayElement[],
    grid: GridCell[][],
    steps: AlgorithmStep[]
  },
  
  // Actions (12 total)
  setAlgorithmType,
  setSelectedAlgorithm,
  generateNewArray,
  startVisualization,
  pauseVisualization,
  // ... etc
}
\`\`\`

**Why Zustand?**
- Minimal boilerplate
- No Provider needed
- Easy to test
- TypeScript friendly
- Small bundle size (1KB)

### 4. Logic Layer

**Responsibility**: Pure business logic and algorithms

#### Sorting Algorithms

Each algorithm follows this interface:
\`\`\`typescript
export const algorithmName = (array: number[]): SortingResult => {
  const arr = [...array]; // Don't mutate input
  const steps: AlgorithmStep[] = [];
  
  // Algorithm implementation
  // Record each step for visualization
  
  return { steps, sortedArray: arr };
};
\`\`\`

**Step Recording Pattern**:
\`\`\`typescript
// Compare two elements
steps.push({
  type: 'compare',
  indices: [i, j],
  description: \`Comparing \${arr[i]} and \${arr[j]}\`
});

// Swap elements
[arr[i], arr[j]] = [arr[j], arr[i]];
steps.push({
  type: 'swap',
  indices: [i, j],
  description: \`Swapping \${arr[i]} and \${arr[j]}\`
});

// Mark as sorted
steps.push({
  type: 'sorted',
  indices: [i],
  description: \`Element \${arr[i]} is in final position\`
});
\`\`\`

#### Helper Utilities

**Pure Functions** (no side effects):
- Array generation and manipulation
- Distance calculations
- Color mapping
- Data transformations

**Why Pure Functions?**
- Easier to test
- Predictable behavior
- Can be memoized
- Thread-safe

## Data Flow

### Typical User Interaction Flow

\`\`\`
1. User selects algorithm
   → AlgorithmSelector calls setSelectedAlgorithm()
   → Store updates selectedAlgorithm
   → Components re-render with new selection

2. User clicks play
   → ControlPanel calls startVisualization()
   → Hook executes algorithm and gets steps
   → Hook starts animation loop
   → Each frame updates array state
   → ArrayVisualizer re-renders with new colors

3. User adjusts speed
   → ControlPanel calls setSpeed()
   → Store updates speed value
   → Hook recalculates delay
   → Animation continues at new speed
\`\`\`

### State Update Flow

\`\`\`
User Action
    ↓
Component Event Handler
    ↓
Store Action
    ↓
State Update (immutable)
    ↓
Subscribers Notified
    ↓
Components Re-render
    ↓
UI Updates
\`\`\`

## Performance Optimizations

### 1. Efficient Re-renders

\`\`\`typescript
// Store automatically does shallow comparison
// Only re-renders if selected state changes
const { array, currentStep } = useVisualizerStore(
  (state) => ({
    array: state.visualization.array,
    currentStep: state.visualization.currentStep
  })
);
\`\`\`

### 2. Animation Frame Management

\`\`\`typescript
// Use requestAnimationFrame for smooth 60fps
const animate = () => {
  // Update state
  requestAnimationFrame(animate);
};

// Cleanup on unmount
return () => {
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
  }
};
\`\`\`

### 3. Memoization

\`\`\`typescript
// Framer Motion's layoutId for optimized animations
<motion.div layoutId="selected-algorithm" />

// React's automatic memoization in React 18
// No need for React.memo() in most cases
\`\`\`

### 4. Code Splitting

\`\`\`typescript
// Vite automatically code-splits on dynamic imports
const HeavyComponent = lazy(() => import('./Heavy'));
\`\`\`

## Testing Strategy

### Test Pyramid

\`\`\`
         /\
        /  \
       / E2E\          (Few)
      /______\
     /        \
    /Integration\     (Some)
   /____________\
  /              \
 /  Unit Tests   \   (Many)
/________________\
\`\`\`

### Unit Tests (70%)
- Algorithm correctness
- Utility functions
- Store actions
- Pure logic

### Integration Tests (20%)
- Component + Hook interactions
- Store + Component integration
- User workflows

### Component Tests (10%)
- UI rendering
- User interactions
- Accessibility

## Error Handling

### Strategy

1. **Input Validation**: Validate at boundaries
2. **Graceful Degradation**: Fallback to defaults
3. **User Feedback**: Clear error messages
4. **Error Boundaries**: Catch React errors

### Example

\`\`\`typescript
// Validate and clamp speed
const handleSpeedChange = (value: number) => {
  const safeSpeed = clamp(value, 1, 10);
  setSpeed(safeSpeed);
};

// Default values in store
const defaultVisualization = {
  speed: 5, // Safe default
  array: createInitialArray(50),
  // ...
};
\`\`\`

## Scalability Considerations

### Adding New Algorithms

1. Implement algorithm following the interface
2. Add configuration to \`algorithms.ts\`
3. Write comprehensive tests
4. Update type definitions if needed

### Adding New Features

1. Consider impact on existing architecture
2. Add to appropriate layer (maintain separation)
3. Update tests
4. Document in README

### Performance at Scale

- Arrays up to 200 elements tested
- Animation frame rate maintained at 60fps
- Memory usage remains constant
- Bundle size kept under 250KB

## Security Considerations

1. **XSS Prevention**: React's built-in escaping
2. **Input Sanitization**: Validate all user inputs
3. **Dependency Security**: Regular updates via npm audit
4. **CSP Headers**: Recommended for production

## Future Architecture Enhancements

1. **Web Workers**: Move algorithm execution off main thread
2. **IndexedDB**: Persist user preferences
3. **WebGL**: Hardware-accelerated visualizations for large datasets
4. **Service Worker**: Offline functionality
5. **Module Federation**: Microfront end architecture for algorithms

## Conclusion

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Excellent testability
- ✅ Easy to understand and maintain
- ✅ Performant and scalable
- ✅ Type-safe with TypeScript
- ✅ Modern React best practices
