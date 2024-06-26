"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { UserRoundMinus, X } from "lucide-react";
import type { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch } from "../../redux/store/store";
import {
  Reservation,
  getReservData,
} from "@/redux/slice/reservation/reservation";
type Props = {};

export default function LocationPage({}: Props) {
  const reservationsData = useSelector(
    (state: RootState) => state.reservations.reservations
  );
  const dispatch: AppDispatch = useDispatch();
  const [allData, setAllData] = useState<Reservation[]>({
    ...reservationsData,
  });

  useEffect(() => {
    dispatch(getReservData());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(reservationsData)) {
      setAllData(reservationsData);
    } else {
      setAllData([]);
    }
  }, [reservationsData]);


  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Reservations" />
      <div className="gap-5 flex flex-wrap w-full transitin-all gap-x-8">
        {allData &&
          Array.isArray(allData) &&
          allData.map((reserv) => <div>{reserv.market}</div>)}
      </div>
    </div>
  );
}
