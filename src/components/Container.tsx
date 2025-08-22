import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`container mx-auto px-2 md:px-8 py-8 md:py-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
