import { cn } from "@/lib/utils";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
};

export default function Card(props: CardProps) {
  return <CardContent>
    <section className="flex justify-between gap-2">
        <p className="text-sm">{props.label}</p>
        <props.icon className="h-4 w-4 text-gray-400"  color={
          props.icon === TrendingDown
            ? "#FF7B5F"
            : props.icon === TrendingUp
            ? "#00DBC8"
            : "gray"
        }/>
    </section>
    <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
    </section>
  </CardContent>;
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>){
    return (
      <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5",
        props.className
      )}
      style={{
        boxShadow: "2px 2px 1px rgba(20, 35, 75, 0.5)",
      }}
    /> )
}