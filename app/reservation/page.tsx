"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { UserRoundMinus, X } from "lucide-react";
import type { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { ChevronRight } from "lucide-react";
import reservation, {
  Reservation,
  getReservData,
} from "@/redux/slice/reservation/reservation";
import { CardContent } from "@/components/Card";
import {
  getLocData,
  Location,
  locationImgs,
} from "@/redux/slice/locations/locations";
import { Volunteer, getData } from "@/redux/slice/volunteers/volunteers";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import VolunteerImageDialog from "@/components/VolunteerImageDialog";
type Props = {};

export default function LocationPage({}: Props) {
  const reservationsData = useSelector(
    (state: RootState) => state.reservations.reservations
  );
  const dispatch: AppDispatch = useDispatch();
  // const [allData, setAllData] = useState<Reservation[]>({
  //   ...reservationsData,
  // });

  const [groupedData, setGroupedData] = useState<Record<string, Reservation[]>>(
    {}
  );

  useEffect(() => {
    dispatch(getReservData());
    dispatch(getLocData());
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(reservationsData)) {
      const grouped = reservationsData.reduce((acc, reserv) => {
        const { locationId } = reserv;
        if (!acc[locationId]) {
          acc[locationId] = [];
        }
        acc[locationId].push(reserv);
        return acc;
      }, {} as Record<string, Reservation[]>);

      setGroupedData(grouped);
    } else {
      setGroupedData({});
    }
  }, [reservationsData]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Reservations" />
      <div className="gap-5 flex flex-wrap w-full transitin-all gap-x-8">
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transitin-all sm:grid-cols-2 xl:grid-cols-4">
          {Object.keys(groupedData).map((locationId) => (
            <Card
              key={locationId}
              locationId={parseInt(locationId)}
              reservations={groupedData[locationId]}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export type CardProps = {
  locationId?: number;
  volunteerId?: number;
  reservations: Reservation[];
};

const Card = (props: CardProps) => {
  // console.log(props.reservations);
  const dispatch: AppDispatch = useDispatch();
  const locationsData = useSelector(
    (state: RootState) => state.locations.locations
  );
  const volunteersData = useSelector(
    (state: RootState) => state.volunteers.volunteers
  );
  useEffect(() => {
    dispatch(getLocData());
    dispatch(getData());
  }, [dispatch]);

  const [reservLocation, setReservLocation] = useState<Location | null>(null);
  const [img, setImg] = useState<string | any>("");
  useEffect(() => {
    const reservloc = locationsData.find((loc) => loc.id === props.locationId);
    if (reservloc) {
      setReservLocation(reservloc);
    }
    const locImg = locationImgs.find(
      (img) => img.market === reservLocation?.market.toLocaleLowerCase()
    );
    console.log(locImg);
    setImg(locImg?.img);
  }, [locationsData, props.locationId]);

  const [reservVoluntersData, setReservVolunteers] = useState<Volunteer[]>([]);
  useEffect(() => {
    const volunteerIds = props.reservations.map((reserv) => reserv.volunteerId);
    const reservVolunteers = volunteersData.filter((volunteer) =>
      volunteerIds.includes(volunteer.id)
    );
    setReservVolunteers(reservVolunteers);
  }, [volunteersData, props.reservations]);
  // const [selectedIdForImage, setSelectedIdForImage] = useState<number | null>(
  //   null
  // );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const imageDialogClick = () => {
    // setSelectedIdForImage(id);
    setIsDialogOpen(true);
  };
  return (
    <CardContent>
      <section className="rounded-md border overflow-hidden">
        <img
          src={img}
          className="w-[100%] h-[30vh] object-cover"
          alt="location-img"
        />
      </section>

      <section className="flex flex-col gap-1 relative">
        <p className="text-sm">{reservLocation?.market}</p>
        <p className="text-sm max-w-[90%] h-6 overflow-hidden text-ellipsis whitespace-nowrap">
          {reservLocation?.desc}
        </p>
        <div className="w-auto h-[1px] bg-gray-300"></div>
        <div className="flex mt-3">
          {props.reservations.slice(0, 4).map((count, i) => (
            <div key={i}>
              {reservVoluntersData.map((volunteer, i) => (
                <div
                  key={volunteer.id}
                  className={`border border-gray-300 bg-white rounded-full w-9 h-9 z-${i}0 mr-[-15px]`}
                >
                  {/* <img src={volunteer.profileImage} alt="" /> */}
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${
                        volunteer && volunteer.name
                      }`}
                      alt="user-image"
                    />
                  </Avatar>
                </div>
              ))}
            </div>
          ))}
          <ChevronRight
            className="text-gray-500 absolute right-0 size-8"
            onClick={() => {
              imageDialogClick();
            }}
          />
        </div>
      </section>
      {isDialogOpen && (
        <VolunteerImageDialog
          // id={selectedIdForImage}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          isreserv={true}
          reserv={props.reservations.map((reserv) => reserv.volunteerId)}
          reservations={props.reservations}
        />
      )}
    </CardContent>
  );
};
