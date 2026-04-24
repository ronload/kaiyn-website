import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-(--page-inline)", {
  variants: {
    variant: {
      narrow: "max-w-3xl",
      default: "max-w-7xl",
      wide: "max-w-screen-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ContainerProps = ComponentProps<"div"> &
  VariantProps<typeof containerVariants>;

export function Container({ className, variant, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ variant }), className)}
      {...props}
    />
  );
}

export { containerVariants };
