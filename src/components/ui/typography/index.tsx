import { cn } from "@/lib/utils";
import React from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> { }

const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
H1.displayName = "H1";


const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        className={cn(
          "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
H2.displayName = "H2";


const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn(
          "scroll-m-20 text-2xl font-semibold tracking-tight",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
H3.displayName = "H3";

const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        className={cn(
          "scroll-m-20 text-xl font-semibold tracking-tight",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
H4.displayName = "H4";


export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> { }

const P = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn(
          "leading-7",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
P.displayName = "P";


export { H1, H2, H3, H4, P }
