"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const handleOnClike = () => {
    router.replace("/register");
  };
  return (
    <Button variant="contained" onClick={handleOnClike}>
      register
    </Button>
  );
};

export default HomePage;
