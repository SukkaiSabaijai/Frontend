import Header from "@/shared/components/header/header";
import Card from "@/shared/components/card/card"

const mock: string[] = ["Toilet1", "Toilet2", "Toilet3", "Toilet4", "Toilet5"];

const BookmarkPage = () => {
  return (
    <>
      <div className="bg-custom-light-blue">
        <Header title="Bookmark" />
        <div className="flex justify-center items-center mt-10 flex-col">
          {
            mock.map( (toilet_name) => {return (
                  <Card toilet_name={toilet_name} />
                )
              }
            )
          }
        </div>
      </div>
    </>
  );
};

export default BookmarkPage;