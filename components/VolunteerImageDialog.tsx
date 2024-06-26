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
type Props = {
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function VolunteerImageDialog({ id, isOpen, onClose }: Props) {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getDataById(id));
    }
  }, [dispatch, id]);

  const volunteer = useSelector((state: RootState) =>
    state.volunteers.volunteers.find((vol) => vol.id === id)
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        <DialogTitle>{volunteer && volunteer.name}&apos;s image</DialogTitle>
        </DialogHeader>
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${
              volunteer && volunteer.name
            }`}
            alt="user-image"
          />
        </Avatar>
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
