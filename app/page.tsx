"use client";
import ActivitiesCard, { ActivitiesProps } from "@/components/ActivitiesCard";
import BarChart from "@/components/BarChart";
import Card, { CardContent, CardProps } from "@/components/Card";
import CircleChart, { CircleProps } from "@/components/CircleChart";
import Map from "@/components/Map";
import PageTitle from "@/components/PageTitle";
import WorkersValueChart from "@/components/WorkersValueChart";
import axios from "axios";

import {
  DollarSign,
  BriefcaseBusiness,
  TrendingUp,
  TrendingDown,
  Lock,
  Building2,
} from "lucide-react";
import { useEffect } from "react";

const cardData: CardProps[] = [
  {
    label: "Total Workers",
    amount: "1200",
    description: "+20.1% from last month",
    icon: BriefcaseBusiness,
  },
  {
    label: "Employment",
    amount: "20",
    description: "+14.3% from last month",
    icon: TrendingUp,
  },
  {
    label: "Resignation",
    amount: "15",
    description: "-10.9% from last month",
    icon: TrendingDown,
  },
  {
    label: "Locked",
    amount: "9",
    description: "+5.5% from last month",
    icon: Lock,
  },
];

const activityData: ActivitiesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    ActivityIcon: TrendingDown,
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    ActivityIcon: TrendingUp,
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    ActivityIcon: TrendingUp,
  },
  {
    district: "Baku, Nizami street",
    desc: "this is a description of the new building",
    ActivityIcon: Building2,
  },
];

const circleData: CircleProps[] = [
  {
    name: "WorkerAll",
    value: 80,
    color: "#0088FE",
  },
  {
    name: "Resignated",
    value: 6,
    color: "#FF8042",
  },
  {
    name: "Employed",
    value: 14,
    color: "#00C49F",
  },
];

export default function Home() {
   return (
    <div className="flex gap-5 w-full">
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title="Dashboard" />
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transitin-all sm:grid-cols-2 xl:grid-cols-4">
          {cardData.map((d, i) => (
            <Card
              key={i}
              amount={d.amount}
              description={d.description}
              icon={d.icon}
              label={d.label}
            />
          ))}
        </section>
        <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
          <CardContent>
            <p className="p-4 font-semibold">Overview</p>
            <BarChart />
          </CardContent>

          <CardContent className="flex justify-between gap-4">
            <section>
              <p>Recent Activities</p>
              <p className="text-sm text-gray-400">
                We made 75 activities this month
              </p>
            </section>
            {activityData.map((d, i) => (
              <ActivitiesCard
                key={i}
                ActivityIcon={d.ActivityIcon}
                name={d.name}
                email={d.email}
                desc={d.desc}
                district={d.district}
              />
            ))}
          </CardContent>
        </section>

        <section className="grid grid-cols-1 gap-4 transition-all">
          <CardContent className="grid w-full grid-cols-1 transitin-all  xl:grid-cols-2">
            <div className="xl:border-r">
              <p className="p-4 font-semibold">Percentage</p>
              <div className="grid grid-cols-1 gap-2 transitin-all xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3">
                {circleData.map((d, i) => (
                  <CircleChart
                    key={i}
                    name={d.name}
                    value={d.value}
                    color={d.color}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="p-4 font-semibold">Workers Value</p>
              <WorkersValueChart />
            </div>
          </CardContent>
        </section>
      </div>

      <div className="hidden 2xl:block">
        <div style={{ position: "sticky", right: 0, top: 30 }}>
          <section>
            <CardContent>
              <Map />
            </CardContent>
          </section>
        </div>
      </div>

      <div>
        <section></section>
      </div>
    </div>
  );
}
