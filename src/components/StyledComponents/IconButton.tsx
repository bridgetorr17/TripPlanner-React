// IconButton.jsx
import React from "react";
import clsx from "clsx";

type IconButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: "blue" | "gray" | "red";
  className?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string; // allow aria-label
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton({
  onClick,
  color = "blue",
  children,
  className = "",
  type = "button",
    "aria-label": ariaLabel, // 👈 allow passing aria-label
  ...props
}: IconButtonProps) {
  const base = "p-2 rounded-md transition focus:outline-none";

  const colors = {
    blue: "text-blue-600 hover:text-blue-800",
    gray: "text-gray-500 hover:text-gray-700",
    red: "text-red-500 hover:text-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(base, colors[color], className)}
      {...props}
    >
      {children}
    </button>
  );
}
