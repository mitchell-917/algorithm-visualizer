import { motion } from 'framer-motion';
import { useVisualizerStore } from '@/store/visualizerStore';
import { useMemo } from 'react';

const algorithmCode: Record<string, string[]> = {
  bubble: [
    'function bubbleSort(arr) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    for (let j = 0; j < arr.length - i - 1; j++) {',
    '      if (arr[j] > arr[j + 1]) {',
    '        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];',
    '      }',
    '    }',
    '  }',
    '  return arr;',
    '}',
  ],
  quick: [
    'function quickSort(arr, low, high) {',
    '  if (low < high) {',
    '    const pi = partition(arr, low, high);',
    '    quickSort(arr, low, pi - 1);',
    '    quickSort(arr, pi + 1, high);',
    '  }',
    '}',
    '',
    'function partition(arr, low, high) {',
    '  const pivot = arr[high];',
    '  let i = low - 1;',
    '  for (let j = low; j < high; j++) {',
    '    if (arr[j] < pivot) {',
    '      i++;',
    '      [arr[i], arr[j]] = [arr[j], arr[i]];',
    '    }',
    '  }',
    '  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];',
    '  return i + 1;',
    '}',
  ],
  merge: [
    'function mergeSort(arr) {',
    '  if (arr.length <= 1) return arr;',
    '  const mid = Math.floor(arr.length / 2);',
    '  const left = mergeSort(arr.slice(0, mid));',
    '  const right = mergeSort(arr.slice(mid));',
    '  return merge(left, right);',
    '}',
    '',
    'function merge(left, right) {',
    '  const result = [];',
    '  let i = 0, j = 0;',
    '  while (i < left.length && j < right.length) {',
    '    if (left[i] <= right[j]) {',
    '      result.push(left[i++]);',
    '    } else {',
    '      result.push(right[j++]);',
    '    }',
    '  }',
    '  return result.concat(left.slice(i), right.slice(j));',
    '}',
  ],
  insertion: [
    'function insertionSort(arr) {',
    '  for (let i = 1; i < arr.length; i++) {',
    '    const key = arr[i];',
    '    let j = i - 1;',
    '    while (j >= 0 && arr[j] > key) {',
    '      arr[j + 1] = arr[j];',
    '      j--;',
    '    }',
    '    arr[j + 1] = key;',
    '  }',
    '  return arr;',
    '}',
  ],
  selection: [
    'function selectionSort(arr) {',
    '  for (let i = 0; i < arr.length - 1; i++) {',
    '    let minIdx = i;',
    '    for (let j = i + 1; j < arr.length; j++) {',
    '      if (arr[j] < arr[minIdx]) {',
    '        minIdx = j;',
    '      }',
    '    }',
    '    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];',
    '  }',
    '  return arr;',
    '}',
  ],
  heap: [
    'function heapSort(arr) {',
    '  buildMaxHeap(arr);',
    '  for (let i = arr.length - 1; i > 0; i--) {',
    '    [arr[0], arr[i]] = [arr[i], arr[0]];',
    '    heapify(arr, 0, i);',
    '  }',
    '  return arr;',
    '}',
    '',
    'function heapify(arr, i, n) {',
    '  const left = 2 * i + 1;',
    '  const right = 2 * i + 2;',
    '  let largest = i;',
    '  if (left < n && arr[left] > arr[largest]) largest = left;',
    '  if (right < n && arr[right] > arr[largest]) largest = right;',
    '  if (largest !== i) {',
    '    [arr[i], arr[largest]] = [arr[largest], arr[i]];',
    '    heapify(arr, largest, n);',
    '  }',
    '}',
  ],
};

export const CodeViewer = () => {
  const { selectedAlgorithm } = useVisualizerStore();

  const code = useMemo(() => {
    if (!selectedAlgorithm) return [];
    return algorithmCode[selectedAlgorithm] || [];
  }, [selectedAlgorithm]);

  if (!selectedAlgorithm) {
    return (
      <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-white">Code Implementation</h3>
        <p className="text-white/60 text-center py-8">Select an algorithm to view its implementation</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl"
    >
      <h3 className="text-xl font-bold mb-4 text-white">Code Implementation</h3>
      <div className="bg-gray-900/50 rounded-xl p-4 overflow-x-auto">
        <code className="text-sm font-mono">
          {code.map((line, index) => (
            <div key={index} className="flex hover:bg-white/5">
              <span className="text-white/40 select-none mr-4 text-right" style={{ minWidth: '2rem' }}>
                {index + 1}
              </span>
              <span className="text-white/90">{line || '\u00A0'}</span>
            </div>
          ))}
        </code>
      </div>
    </motion.div>
  );
};
