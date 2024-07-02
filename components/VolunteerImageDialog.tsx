import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getDataById } from "@/redux/slice/volunteers/volunteers";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Reservation } from "@/redux/slice/reservation/reservation";
type Props = {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
  isreserv?: boolean;
  reserv?: number[];
  reservations?: Reservation[];
};

export default function VolunteerImageDialog({
  id,
  isOpen,
  onClose,
  isreserv,
  reserv,
  reservations,
}: Props) {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getDataById(id));
    }
  }, [dispatch, id]);

  const volunteer = useSelector((state: RootState) =>
    state.volunteers.volunteers.find((vol) => vol.id === id)
  );

  const volunteerReserv = useSelector((state: RootState) =>
    state.volunteers.volunteers.filter((vol) => reserv?.includes(vol.id))
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${isreserv && "h-[80vh] overflow-y-auto"}`}>
      
        <DialogHeader>
          {!isreserv && (
            <DialogTitle>
              {volunteer && volunteer.username}&apos;s image
            </DialogTitle>
          )}
        </DialogHeader>

        {!isreserv && (
          <Avatar className="">
            <AvatarImage
              src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${
                volunteer && volunteer.name
              }`}
              alt="user-image"
            />
          </Avatar>
        )}
        {isreserv &&
          reserv &&
          reserv.map((resv, i) => (
            <div key={i} className="flex justify-between">
              <Avatar className="w-12">
                <AvatarImage
                  src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${
                    volunteerReserv[0] && volunteerReserv[0].name
                  }`}
                  alt="user-image"
                />
              </Avatar>
              <p>
                {reservations && reservations[i].startTime} -{" "}
                {reservations && reservations[i].endTime}
              </p>
            </div>
          ))}

        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
