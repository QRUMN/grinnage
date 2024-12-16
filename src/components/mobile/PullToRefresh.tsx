import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { usePullToRefresh } from '@/lib/utils/mobile';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  className
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const controls = useAnimation();

  const handleRefresh = async () => {
    setRefreshing(true);
    controls.start({
      opacity: 1,
      y: 20,
      transition: { duration: 0.2 }
    });

    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
      controls.start({
        opacity: 0,
        y: -20,
        transition: { duration: 0.2 }
      });
    }
  };

  usePullToRefresh(handleRefresh);

  return (
    <div className={cn('relative', className)}>
      <motion.div
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
        className="absolute top-0 left-0 right-0 flex justify-center"
      >
        <Loader2 
          className={cn(
            "h-6 w-6 text-primary",
            refreshing && "animate-spin"
          )}
        />
      </motion.div>
      {children}
    </div>
  );
};
