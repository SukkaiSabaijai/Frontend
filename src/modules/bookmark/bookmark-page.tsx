"use client";

import Header from "@/shared/components/header/header";
import Card from "@/shared/components/card/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBookmark } from "./_services/bookmark.service";
import { BookmarkResp, MarkerType } from "./_types/bookmark.type";
import ButtonIcon from "../../shared/components/button/button-icon";

const BookmarkPage = () => {
  const [bookMarks, setBookMarks] = useState<BookmarkResp[]>();
  const router = useRouter();

  const fetchBookMark = async () => {
    const getAll = await getBookmark();
    setBookMarks(getAll);
  };

  useEffect(() => {
    fetchBookMark();
  }, []);

  useEffect(() => {
    console.log(bookMarks);
  }, [bookMarks]);

  return (
    <>
      <div className="h-lvh">
        <Header title="Bookmark" />
        <div className="flex justify-center items-center mt-10 flex-col">
          {bookMarks &&
            bookMarks.map((bookMark, index) => (
              <Card key={index} id={bookMark.id} marker={bookMark.marker} />
            ))}
        </div>
        <div className="absolute bottom-16 left-0 mb-4 ml-4">
          <ButtonIcon
            onClick={() => router.push("/")}
            width={30}
            height={41}
            alt="back-icon"
            src="/assets/icon/back.svg"
            className="bg-custom-light-yellow"
          />
        </div>
      </div>
    </>
  );
};

export default BookmarkPage;
