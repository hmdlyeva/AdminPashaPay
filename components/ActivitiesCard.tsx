import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export type ActivitiesProps = {
  name?: string;
  phoneNumber?: string;
  district?: string;
  desc?: string;
  ActivityIcon: LucideIcon;
  target?: string;
};

export default function ActivitiesCard(props: ActivitiesProps) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1 overflow-hidden">
          <img
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
            src={
              props.phoneNumber
                ? `https://api.dicebear.com/8.x/lorelei/svg?seed=${props.name}`
                : `https://api.dicebear.com/8.x/thumbs/svg?seed=Patches`
            }
            alt="avatar"
          />
        </div>
        <div className="text-sm">
          <p>{props.name ? props.name : props.district}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
            {props.phoneNumber ? props.phoneNumber : props.desc}
          </div>
        </div>
      </section>
      <props.ActivityIcon
        className="h-4 w-4 text-gray-400"
        color={
          props.ActivityIcon === TrendingDown
            ? "#FF7B5F"
            : props.ActivityIcon === TrendingUp
            ? "#00DBC8"
            : "gray"
        }
      />
    </div>
  );
}
