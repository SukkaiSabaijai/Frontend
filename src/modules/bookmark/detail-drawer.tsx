import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import Img from "@/shared/components/detail-drawer/detail_picture";
import DetailCard from "@/shared/components/detail-drawer/detail_card";
import { MarkerDetailResp } from "./_types/bookmark.type";

type Props = {
  openDrawer: UseBooleanReturn;
  handleBackIconOnClick: () => void;
  markerDetail: MarkerDetailResp | null;
};

const DetailDrawer = ({
  openDrawer,
  handleBackIconOnClick,
  markerDetail,
}: Props) => {
  return (
    <Drawer
      open={openDrawer.value}
      anchor="bottom"
      sx={{
        "& .MuiDrawer-paper": {
          height: "60%",
          width: "100%",
          zIndex: "1500",
          position: "fixed",
          borderRadius: "20px 20px 0 0",
          backgroundColor: "#DFECFF",
          overflowY: "auto",
        },
      }}
    >
      {markerDetail && (
        <DetailCard
          description="ecc building 1 ถ. ฉลองกรุง แขวงลำปลาทิว เขตลาดกระบัง กรุงเทพมหานคร 10520"
          latitude={37.7749}
          longitude={-122.4194}
          markerDetail={markerDetail}
        ></DetailCard>
      )}
      <ButtonIcon
        onClick={handleBackIconOnClick}
        width={30}
        height={41}
        alt="rest-icon"
        src="/assets/icon/back.svg"
        className="bg-custom-light-yellow"
      ></ButtonIcon>
    </Drawer>
  );
};

export default DetailDrawer;