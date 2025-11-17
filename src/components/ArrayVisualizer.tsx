import React from 'react';
import { motion } from 'framer-motion';
import { ArrayElement } from '@/types';
import { getStateColor } from '@/utils/helpers';
import { clsx } from 'clsx';

interface ArrayVisualizerProps {
  array: ArrayElement[];
  maxHeight?: number;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array, maxHeight = 400 }) => {
  const maxValue = Math.max(...array.map((el) => el.value));
  const barWidth = Math.max(8, Math.min(40, 800 / array.length));
  const gap = Math.max(1, Math.min(4, 800 / array.length / 10));

  return (
    <div className="flex h-full w-full items-end justify-center gap-0.5 px-4">
      {array.map((element, index) => {
        const height = (element.value / maxValue) * maxHeight;
        const colorClass = getStateColor(element.state);

        return (
          <motion.div
            key={element.id}
            className={clsx(
              'relative flex items-end justify-center rounded-t-sm transition-colors duration-200',
              colorClass
            )}
            style={{
              width: `${barWidth}px`,
              marginRight: index < array.length - 1 ? `${gap}px` : 0,
            }}
            initial={{ height: 0 }}
            animate={{ height: `${height}px` }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {barWidth > 20 && (
              <span className="absolute bottom-1 text-[10px] font-semibold text-white">
                {element.value}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
