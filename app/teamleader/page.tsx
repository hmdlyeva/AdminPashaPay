"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaFire } from "react-icons/fa";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  delTeamLeader,
  getTeamLeader,
} from "@/redux/slice/teamleader/teamleaders";
import type { Teamleader } from "@/redux/slice/teamleader/teamleaders";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { DrawerNewData } from "@/components/DrawerNewData";
import { useWindowWidth } from "@react-hook/window-size";
import {
  Volunteer,
  getData,
  putData,
} from "@/redux/slice/volunteers/volunteers";
type Props = {};

export default function Teamleader({}: Props) {
  const teamLeadersData = useSelector(
    (state: RootState) => state.teamleaders.teamleaders
  );
  const volunteersData = useSelector(
    (state: RootState) => state.volunteers.volunteers
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamLeader());
    dispatch(getData());
  }, [dispatch]);

  const [updatedTeamData, setTeamleadersData] = useState<Teamleader[]>([]);
  const [updatedVolunteersData, setUpdatedVolunteersData] = useState<
    Volunteer[]
  >([]);

  useEffect(() => {
    if (Array.isArray(teamLeadersData)) {
      setTeamleadersData(teamLeadersData);
    } else {
      setTeamleadersData([]);
    }
  }, [teamLeadersData]);

  useEffect(() => {
    if (Array.isArray(volunteersData)) {
      setUpdatedVolunteersData(volunteersData);
    } else {
      setUpdatedVolunteersData([]);
    }
  }, [volunteersData]);

  const handleDelete = (id: number) => {
    dispatch(delTeamLeader(id)).then(() => {
      const updatedData = teamLeadersData.filter((row) => row.id !== id);
      setTeamleadersData(updatedData);
    });

    toast({
      variant: "destructive",
      title: "The Team Leader deleting!",
      description: "Say goodbye to this data.",
      action: <ToastAction altText="Deleting">Deleting</ToastAction>,
    });
  };
  // console.log(updatedTeamData);
  const pageName = "teamleader";
  const [titlePageName, setTitlePageName] = useState("");
  useEffect(() => {
    if (pageName) {
      const formattedTitle = pageName[0].toUpperCase() + pageName.slice(1);
      setTitlePageName(formattedTitle);
    }
  }, [pageName]);
  const onlyWidth = useWindowWidth();

  const [teamLeaderIdim, setTeamLeaderIdim] = useState(0);

  return (
    <div className="">
      <div className="flex justify-between">
        <DrawerNewData pageName={pageName} title={titlePageName} />
        <BurnBarrel
          setTeamleadersData={setTeamleadersData}
          updatedTeamData={updatedTeamData}
          teamLeaderIdim={teamLeaderIdim}
          handleDelete={handleDelete}
        />
      </div>
      <section className="gap-5 flex flex-wrap w-full transitin-all gap-x-8">
        {updatedTeamData &&
          Array.isArray(updatedTeamData) &&
          updatedTeamData.map((teamleader) => (
            <TeamleaderColumn
              key={teamleader.id}
              teamleader={teamleader}
              updatedTeamData={updatedTeamData}
              updatedVolunteersData={updatedVolunteersData}
              setUpdatedVolunteersData={setUpdatedVolunteersData}
              setTeamLeaderIdim={setTeamLeaderIdim}
            />
          ))}
      </section>
    </div>
  );
}
type TeamleaderColumnProps = {
  teamleader: Teamleader;
  updatedTeamData: Teamleader[];
  updatedVolunteersData: Volunteer[];
  setUpdatedVolunteersData: React.Dispatch<React.SetStateAction<Volunteer[]>>;
  setTeamLeaderIdim: any;
};
const TeamleaderColumn = ({
  teamleader,
  updatedTeamData,
  updatedVolunteersData,
  setUpdatedVolunteersData,
  setTeamLeaderIdim,
}: TeamleaderColumnProps) => {
  const [cards, setCards] = useState<Volunteer[]>([]);

  useEffect(() => {
    const teamUsersData = updatedVolunteersData.filter(
      (volunteer) => volunteer.teamLeaderId === teamleader.id
    );
    setCards(teamUsersData);
  }, [updatedVolunteersData, teamleader.id]);

  return (
    <Column
      teamLeaderName={teamleader.name}
      id={teamleader.id}
      headingColor="#00C49F"
      cards={cards}
      setCards={setCards}
      updatedVolunteersData={updatedVolunteersData}
      updatedTeamData={updatedTeamData}
      setUpdatedVolunteersData={setUpdatedVolunteersData}
      setTeamLeaderIdim={setTeamLeaderIdim}
    />
  );
};
type ColumnTypes = {
  teamLeaderName: string;
  headingColor: string;
  cards: Volunteer[];
  updatedVolunteersData: Volunteer[];
  id: number;
  updatedTeamData: Teamleader[];
  setCards: (cards: Volunteer[]) => void;
  setTeamLeaderIdim: any;
  setUpdatedVolunteersData: React.Dispatch<React.SetStateAction<Volunteer[]>>;
};
const Column = ({
  teamLeaderName,
  headingColor,
  cards,
  id,
  updatedVolunteersData,
  setUpdatedVolunteersData,
  setCards,
  setTeamLeaderIdim,
}: ColumnTypes) => {
  const [active, setActive] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const [TeamCards, setTeamCards] = useState<Volunteer[]>([]);

  const handleDragStart = (e: any, card: Volunteer) => {
    e.dataTransfer.setData("cardId", card.id.toString());
    e.dataTransfer.setData("sourceColumnId", card.teamLeaderId.toString());
  };
  const handleDragEnd = async (e: any) => {
    const cardId = parseInt(e.dataTransfer.getData("cardId"));
    const sourceColumnId = parseInt(e.dataTransfer.getData("sourceColumnId"));
    const targetColumnId = id;

    if (sourceColumnId === targetColumnId) return;
    setActive(false);

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    var before: any;
    if (element) {
      before = element.dataset.before || "-1";
    } else {
      console.error("No nearest element found");
    }

    if (before !== cardId.toString()) {
      console.log("Cardi hansi yere atdim:", TeamCards);

      let cardToTransfer = updatedVolunteersData.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      const formattedCard = {
        ...cardToTransfer,
        teamLeaderId: targetColumnId,
      };

      try {
        await dispatch(putData({ id: cardId, newp: formattedCard }));

        console.log(targetColumnId);

        cardToTransfer = { ...cardToTransfer, teamLeaderId: targetColumnId };
        // teamCards dan yox, goturduyum card hansi teama aiddise o array
        let updatedVolunteers: Volunteer[] | any = updatedVolunteersData
          ? updatedVolunteersData.map((volunteer) =>
              volunteer.id === cardId ? cardToTransfer : volunteer
            )
          : [];

        setUpdatedVolunteersData(updatedVolunteers);

        let sourceColumnCards = updatedVolunteers.filter(
          (c: any) => c.teamLeaderId === sourceColumnId
        );
        if (sourceColumnId === targetColumnId) {
          setCards(sourceColumnCards);
        }

        let targetColumnCards = updatedVolunteers.filter(
          (c: any) => c.teamLeaderId === targetColumnId
        );
        setCards(targetColumnCards);

        const moveToBack = before === "-1";
        if (moveToBack) {
          targetColumnCards.push(cardToTransfer);
        } else {
          const insertAtIndex = targetColumnCards.findIndex(
            (el: any) => el.id === parseInt(before)
          );
          if (insertAtIndex === -1) return;
          targetColumnCards.splice(insertAtIndex, 0, cardToTransfer);
        }

        setCards(targetColumnCards);
        if (e.target.className.includes("burn-barrel")) {
          dispatch(delTeamLeader(targetColumnId));
        }
      } catch (error) {
        console.error("Failed to update volunteer:", error);
        toast({
          variant: "destructive",
          title: "Failed to update volunteer",
          description:
            "There was an error updating the volunteer's team leader.",
        });
      }
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${id}"]`));
  };
  const highlightIndicator = (e: any) => {
    const indicators = getIndicators();
    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };
  const clearHighlights = (els: any) => {
    const indicators = els || getIndicators();
    indicators.forEach((i: any) => {
      i.style.opacity = "0";
    });
  };
  const getNearestIndicator = (e: any, indicators: any) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };
  useEffect(() => {
    const filteredCards = cards.filter((c: any) => c.teamLeaderId === id);
    setTeamCards(filteredCards);
  }, [cards]);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3
          className={`text-[${headingColor}] font-semibold cursor-grab active:cursor-grabbing active:text-[#FF8042]"`}
          draggable="true"
          onDragStart={() => {
            setTeamLeaderIdim(id);
          }}
        >
          {teamLeaderName}
        </h3>
        <span className="rounded text-sm text-neutral-400">
          {TeamCards.length}
        </span>
      </div>

      <div className={`w-full h-1 bg-[${headingColor}]`}></div>
      <br />
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "flex w-full flex-col gap-1 rounded-xl border-4 border-dashed p-3"
        )}
      >
        {TeamCards.map((c: any) => (
          <React.Fragment key={`${id}-${c.id}`}>
            {/* <DropIndicator idsi={c.id} beforeId={id} /> */}
            <Card
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              teamLeaderName={teamLeaderName}
            />
          </React.Fragment>
        ))}
        <DropIndicator beforeId={null} idsi={id} />
      </div>
    </div>
  );
};
type CardTypes = {
  name: string;
  id: string;
  handleDragStart: (e: any, card: any) => void;
  teamLeaderId: number;
  teamLeaderName: string;
};
const Card = ({ name, id, teamLeaderId, handleDragStart }: CardTypes) => {
  return (
    <>
      <DropIndicator beforeId={id} id={teamLeaderId} />
      <motion.div
        layout
        layoutId={id.toString()}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { name, id, teamLeaderId })}
        className="cursor-grab rounded border border-neutral-400  p-3 active:cursor-grabbing active:bg-[#FF8042]"
        style={{
          boxShadow: "2px 2px 1px rgba(20, 35, 75, 0.5)",
        }}
      >
        <p className="text-sm text-neutral-700">{name}</p>
      </motion.div>
    </>
  );
};
const DropIndicator = ({ idsi, beforeId }: any) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={idsi}
      className="my-0.5 h-0.5 w-full bg-[#FF8042] opacity-0"
    />
  );
};

const BurnBarrel = ({
  setTeamleadersData,
  updatedTeamData,
  teamLeaderIdim,
  handleDelete,
}: any) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDragEnd = (e: any) => {
    updatedTeamData = updatedTeamData.filter(
      (teamleader: any) => teamleader.id !== teamLeaderIdim
    );
    setTeamleadersData(updatedTeamData);
    handleDelete(teamLeaderIdim);
    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`grid p-8 shrink-0 place-content-center rounded border text-2xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};
