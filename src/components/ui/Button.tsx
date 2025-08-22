"use client";
import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}) => {
  const baseStyles =
    "flex items-center text-white justify-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105";

  const variants = {
    primary:
      "bg-gradient-to-r from-rose-800 to-rose-900 text-black hover:shadow-lg",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-md",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
