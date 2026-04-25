"use client";

import { AnimatePresence, type MotionProps, motion } from "motion/react";
import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export function AnimatedMessageItem({
  children,
}: {
  children: React.ReactNode;
}) {
  const animations: MotionProps = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="w-full shrink-0">
      {children}
    </motion.div>
  );
}

export interface AnimatedMessageListProps
  extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedMessageList = React.memo(
  ({
    children,
    className,
    delay = 1000,
    ...props
  }: AnimatedMessageListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null;

      if (index < childrenArray.length - 1) {
        timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
        }, delay);
      }

      return () => {
        if (timeout !== null) {
          clearTimeout(timeout);
        }
      };
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray],
    );

    return (
      <div
        className={cn("flex min-h-0 flex-col-reverse gap-4", className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedMessageItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedMessageItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedMessageList.displayName = "AnimatedMessageList";
