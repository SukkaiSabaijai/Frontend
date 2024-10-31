"use client"

// import { Button, IconButton } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from "react";
import { createBookmark, deleteBookmark, getMarkerDetail} from '@/modules/bookmark/_services/bookmark.service';
import { BookmarkDetailResp } from '@/modules/bookmark/_types/bookmark.type';
import { useBoolean } from '@/shared/hooks/use-boolean';
import DetailDrawer from '@/modules/home/detail-drawer/detail-drawer';
import { MarkerDetailResp, MarkerType } from '@/modules/home/_types/home.type';


type CardProps = {
    id: number;
    marker: BookmarkDetailResp;
}

const Card = (props: CardProps) => {
    const [state, setState] = useState<boolean>(true)

    const handleBookmark = () => {
      createBookmark(props.marker.id, props.marker.location_name);
      setState(!state);
    }

    const [markerDetail, setMarkerDetail] = useState<MarkerDetailResp | null>(null)
    const handleMarkerDetail = async () => {
      const data = await getMarkerDetail(props.marker.id);
      setMarkerDetail(data);
      openDetailDrawer.onTrue();
    }

    const openDetailDrawer = useBoolean(false);
    const handleBackIconOnClick = () => {
      openDetailDrawer.onFalse();
    }

    return (
      <>
        <DetailDrawer openDrawer={openDetailDrawer} handleBackIconOnClick={handleBackIconOnClick} markerDetail={markerDetail} mode={MarkerType.Toilet}/>
        <div className="bg-slate-500 w-[80%] h-60 rounded-3xl mb-8 bg-cover"
            
            style={{ backgroundImage: `url(http://localhost:5000/image/${props.marker.marker_pics[0].path})`}}>
            <div className="mx-auto my-5 text-center bg-white rounded-full w-[60%] p-1.5 flex justify-between">
                <IconButton sx={{ padding: 0 }} onClick={() => handleBookmark()}>
                    {
                        state?<StarIcon className="text-custom-yellow" 
                        />:
                        <StarBorderIcon className="text-custom-dark-blue"
                        />
                    }
                </IconButton>
                <span className="font-bold text-2xl align-middle">{props.marker.location_name}</span>
                <VerifiedIcon className='text-custom-yellow m-1'/>
            </div>
            <div className='h-3/5' onClick={handleMarkerDetail}></div>
        </div>
      </>
    )
}

export default Card