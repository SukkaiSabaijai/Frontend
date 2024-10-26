import { z } from "zod";

const latlngSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
  })
  .refine(
    (data) => {
      const { latitude, longitude } = data;

      return latitude !== 0 && longitude !== 0;
    },
    {
      message: "กรุณาเลือกตำแหน่ง",
    }
  );

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

const maxSizeOfImage = 3 * 1024 * 1024;

export const formSchema = z.object({
  location_name: z.string().min(1, { message: "กรุณากรอกชื่อสถานที่" }),
  detail: z.string().min(1, { message: "กรุณากรอกรายละเอียดเพิ่มเติม" }),
  category: z.array(z.string()).min(1, { message: "กรุณาเลือกหมวดหมู่" }),
  location: latlngSchema,
  price: z.number(),
  image: z
    .array(z.instanceof(File))
    .min(1, "กรุณาเลือกรูปภาพ")
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
    location_name:'',
    detail:'',
    category:[],
    location:{ latitude: 0, longitude: 0 },
    price:0,
    image:[]
}

export type FormValues = z.infer<typeof formSchema>;