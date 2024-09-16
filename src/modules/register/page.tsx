"use client";

import Button from "@/shared/components/button/button";
import React from "react";

const RegisterPage = () => {
  return (
    <>
    {/* เพิ่มสีที่ใช้ใน figma ไว้ให้ เวลาเรียกใช้ก็เรียกปกติเลย จะขึ้นต้นด้วย custom แล้วตามด้วยชื่อสี ถ้าจะเพิ่มสีที่ไม่มีอยู่ใน default ของ tailwind ก็ไปเพิ่มใน tailwind.config.js นะ */}
      <h1 className="text-3xl font-bold underline bg-custom-blue">
        this is register
      </h1>
      <Button>
        <h1>Register</h1>
      </Button>
    </>
  );
};

export default RegisterPage;
