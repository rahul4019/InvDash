import React from "react";

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  return <div className="text-2xl font-semibold text-primary">{name}</div>;
}
