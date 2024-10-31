"use client"

import { useBoolean } from "@/shared/hooks/use-boolean";
import DetailDrawer from "../home/detail-drawer/detail-drawer";
import { MarkerHistory } from "./_types/marker-history.type";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from "react";

type CardProps = {
  marker: MarkerHistory;
  deleteFunc: (id: number) => void;
}

const HistoryCard = (props: CardProps) => {
    const openDetailDrawer = useBoolean(false);
    const handleBackIconOnClick = () => {
      openDetailDrawer.onFalse();
    }
    const [isDeleted, setDeleted] = useState<boolean>(false)

  return (
    <>
      <div className="bg-slate-500 w-[80%] h-60 rounded-3xl mb-8 bg-cover"
            style={{backgroundImage: `url(https://api.toiletnearme.org/image/${props.marker.marker_pics[0].path})`}}>
          
            <div className="mx-auto my-5 text-center bg-white rounded-full w-[60%] p-1.5 flex justify-between">
                <IconButton sx={{ padding: 0 }} onClick={() => {props.deleteFunc(props.marker.id)}}>
                    {
                        isDeleted?<></>:
                        <DeleteForeverIcon className="text-[#d32f2f]"
                        />
                    }
                </IconButton>
                <span className="font-bold text-2xl align-middle">{props.marker.location_name}</span>
                <VerifiedIcon className='text-custom-yellow m-1'/>
            </div>
      </div>
    </>
  );
}

export default HistoryCard;