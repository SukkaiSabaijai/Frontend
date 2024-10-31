"use client";

import Header from "@/shared/components/header/header";
import { useEffect, useState } from "react";
import { MarkerHistory } from "./_types/marker-history.type"
import { deleteMarker, getMarkerHistory } from "./_services/marker-history.service";
import HistoryCard from "./history-card"

const MarkerHistoryPage = () => {
  const [markerHistories, setmarkerHistories] = useState<MarkerHistory[]>()
  
  const fetchMarkerHistories = async () => {
    const data = await getMarkerHistory();
    setmarkerHistories(data);
  }
  const deleteMarkerHistories = async (id: number) => {
    const data = await deleteMarker(id);
    console.log(data);
    fetchMarkerHistories();
  }
  
  useEffect(() => {fetchMarkerHistories();}, []);

  return(
    <>
      <div className="bg-custom-light-blue h-lvh">
        <Header title="Marker History" />
        <div className="flex justify-center items-center mt-10 flex-col">
          {
            markerHistories&&markerHistories.map(
              (markerHistories, index) => (
                <HistoryCard marker={markerHistories} deleteFunc={deleteMarkerHistories}/>
              )
            )
          }
        </div>
      </div>
    </>
  );
}

export default MarkerHistoryPage