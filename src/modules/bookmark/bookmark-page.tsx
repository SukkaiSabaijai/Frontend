"use client";

import Header from "@/shared/components/header/header";
import Card from "@/shared/components/card/card";
import { useEffect, useState } from "react";
import { getBookmark } from "./_services/bookmark.service";
import { BookmarkResp, MarkerType } from "./_types/bookmark.type";

const BookmarkPage = () => {
  const [bookMarks, setBookMarks] = useState<BookmarkResp[]>()

const fetchBookMark = async () => {
  const getAll = await getBookmark();
  setBookMarks(getAll)
}

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
          {bookMarks&&bookMarks.map(
              (bookMark, index) => (
                  <Card id={bookMark.id} marker={bookMark.marker} />
              )
            )
          }
        </div>
      </div>
    </>
  );
};

export default BookmarkPage;
