import { z } from "zod";

const latlngSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
  })
  .refine(
    (data) => {
      const { latitude, longitude } = data;

      const isLatitudeInRange = latitude >= 5.613 && latitude <= 20.4644;
      const isLongitudeInRange = longitude >= 97.3453 && longitude <= 105.6368;

      return isLatitudeInRange && isLongitudeInRange;
    },
    {
      message: "กรุณาเลือกตำแหน่งในประเทศไทย",
    }
  );

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

const maxSizeOfImage = 3 * 1024 * 1024;

export const formSchema = z.object({
  location_name: z.string().min(1, { message: "กรุณากรอกชื่อสถานที่" }),
  detail: z.string().min(1, { message: "กรุณากรอกรายละเอียดเพิ่มเติม" }),
  category: z.array(z.string()),
  location: latlngSchema,
  price: z.number().refine((value) => value >= 0, {
    message: "กรุณาเลือกค่าเข้าที่ถุกต้อง",
  }),
  image: z
    .array(z.instanceof(File))
    // .min(1, "กรุณาเลือกรูปภาพ")
    .max(5, "เลือกรูปภาพได้มากสุด 5 รูป")
    .refine(
      (files) => files.every((file) => allowedFileTypes.includes(file.type)),
      {
        message: "กรุณาเลือกรูปภาพที่มีนามสกุล jpg, jpeg, หรือ png",
      }
    )
    .refine((files) => files.every((file) => file.size <= maxSizeOfImage), {
      message: "กรุณาเลือกรูปภาพที่มีขนาดไม่เกิน 3MB",
    }),
});

export const defaultValue = {
  location_name: "",
  detail: "",
  category: [],
  location: { latitude: 0, longitude: 0 },
  price: 0,
  image: [],
};

export type FormValues = z.infer<typeof formSchema>;
