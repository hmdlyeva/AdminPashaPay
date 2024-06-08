"use client";
import ActivitiesCard, { ActivitiesProps } from "@/components/ActivitiesCard";
import BarChart from "@/components/BarChart";
import Card, { CardContent, CardProps } from "@/components/Card";
import CircleChart, { CircleProps } from "@/components/CircleChart";
import Map from "@/components/Map";
import PageTitle from "@/components/PageTitle";
import WorkersValueChart from "@/components/WorkersValueChart";
import {
  BriefcaseBusiness,
  TrendingUp,
  TrendingDown,
  Lock,
  Building2,
} from "lucide-react";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { Location, getLocData } from "@/redux/slice/locations/locations";
import { useEffect, useState } from "react";
import { getData } from "@/redux/slice/volunteers/volunteers";
import {
  Teamleader,
  getTeamLeader,
} from "@/redux/slice/teamleader/teamleaders";

export default function Dashboard() {
  const dispatch: AppDispatch = useDispatch();

  const locationsData = useSelector(
    (state: RootState) => state.locations.locations
  );
  const volunteersData = useSelector(
    (state: RootState) => state.volunteers.volunteers
  );
  const teamleadersData = useSelector(
    (state: RootState) => state.teamleaders.teamleaders
  );

  // console.log(teamleadersData);

  // const [updatedTeamData, setTeamleadersData] = useState<Teamleader[]>({
  //   ...teamleadersData,
  // });

  // useEffect(() => {
  //   if (Array.isArray(teamleadersData)) {
  //     setTeamleadersData(teamleadersData);
  //   } else {
  //     setTeamleadersData([]);
  //   }
  // }, [teamleadersData]);

  const [recentActivities, setRecentActivities] = useState<ActivitiesProps[]>(
    []
  );

  useEffect(() => {
    dispatch(getLocData());
    dispatch(getData());
    dispatch(getTeamLeader());
  }, [dispatch]);
  // console.log(updatedTeamData);


  useEffect(() => {
    if (
      locationsData.length > 0 ||
      volunteersData.length > 0 ||
      teamleadersData.length > 0
    ) {
      const latestLocation = locationsData[locationsData.length - 1];
     
      const latestTeamleader = teamleadersData[teamleadersData.length - 1];

      // console.log(latestTeamleader);

      const latestLocationActivity = {
        type: "location",
        target: latestLocation.target,
        desc: latestLocation.desc,
        district: latestLocation.district,
        ActivityIcon: Building2,
      };
      const latestTeamleaderActivity = latestTeamleader && {
        type: "teamleader",
        name: `${latestTeamleader.name} ${latestTeamleader.surname}`,
        phoneNumber: latestTeamleader.phoneNumber,
        ActivityIcon: TrendingUp,
      } ;
      const combinedData = [
        ...volunteersData.map((volunteer) => ({
          type: "volunteer",
          createdAt: volunteer.createdAt,
          name: `${volunteer.name} ${volunteer.surname}`,
          phoneNumber: volunteer.phoneNumber,
          ActivityIcon: TrendingUp,
        })),
      ];

      const sortedData = combinedData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const recentVolunteersActivities = sortedData.slice(0, 3);

      setRecentActivities([
        latestLocationActivity,
        latestTeamleaderActivity,
        ...recentVolunteersActivities,
      ].filter(activity => activity));
    }
  }, [locationsData, volunteersData, teamleadersData]);

  const TotalWorkers = volunteersData.length;
  const TotalCapacity = locationsData.reduce(
    (total, location) => total + location.capacity,
    0
  );
  // const LockedWorkersCount = volunteersData.filter(
  //   (volunteer) => volunteer.user && volunteer.user.accountNonLocked === false
  // ).length;

  const EmployedWorkersCount = volunteersData.filter(
    (volunteer) => volunteer.formStatus
  ).length;

  const ResignatedWorkersCount = volunteersData.filter(
    (volunteer) => volunteer.dateOfResignation
  ).length;

  const WorkersPercentageOfCapacity = TotalCapacity
    ? Math.round((TotalWorkers / TotalCapacity) * 100)
    : 0;

  const ResignatedWorkersPercentageOfCapacity = TotalCapacity
    ? Math.round((ResignatedWorkersCount / TotalCapacity) * 100)
    : 0;

  const EmployedWorkersPercentageOfCapacity = TotalCapacity
    ? Math.round((EmployedWorkersCount / TotalCapacity) * 100)
    : 0;

  const circleData: CircleProps[] = [
    {
      name: "WorkerAll",
      value: WorkersPercentageOfCapacity,
      color: "#0088FE",
    },
    {
      name: "Resignated",
      value: 0,
      color: "#FF8042",
    },
    {
      name: "Employed",
      value: EmployedWorkersPercentageOfCapacity,
      color: "#00C49F",
    },
  ];

  const cardData: CardProps[] = [
    {
      label: "Total Capacity",
      amount: `${TotalCapacity}`,
      description: "+20.1% from last month",
      icon: Building2,
    },
    {
      label: "Employment",
      amount: `${TotalWorkers}`,
      description: "+14.3% from last month",
      icon: TrendingUp,
    },
    {
      label: "Resignation",
      amount: "0",
      description: "-10.9% from last month",
      icon: TrendingDown,
    },
    {
      label: "Team Leader",
      amount: `${teamleadersData.length}`,
      description: "±0% from last month",
      icon: Lock,
    },
  ];

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
            {recentActivities.map((recentActivity, i) => (
              <ActivitiesCard
                key={i}
                ActivityIcon={recentActivity.ActivityIcon}
                name={recentActivity.name}
                phoneNumber={recentActivity.phoneNumber}
                desc={recentActivity.desc}
                district={recentActivity.district}
                target={recentActivity.target}
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
