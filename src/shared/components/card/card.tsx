"use client"

// import { Button, IconButton } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from "react";


type CardProps = {
    toilet_name: string
}

const Card = (props: CardProps) => {
    const [state, setState] = useState<boolean>(false)

    return (
        <div className="bg-slate-500 w-[80%] h-60 rounded-3xl mb-8">
            <div className="mx-auto my-5 text-center bg-white rounded-full w-[60%] p-1.5 flex justify-between">
                <IconButton sx={{ padding: 0 }} onClick={() => setState(!state)}>
                    {
                        state?<StarIcon className="text-custom-yellow" />:<StarBorderIcon className="text-custom-dark-blue"/>
                    }
                </IconButton>
                <span className="font-bold align-middle">{props.toilet_name}</span>
                <IconButton sx={{ padding: 0 }}>
                    <VerifiedIcon className="text-custom-yellow"/>
                </IconButton>
                
            </div>
        </div>
    )
}

export default Card