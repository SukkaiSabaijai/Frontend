import Header from "@/shared/components/header/header";
import Card from "@/shared/components/card/card"

const mock: string[] = ["Toilet1", "Toilet2", "Toilet3", "Toilet4", "Toilet5"];

const HistoryPage = () => {
  return (
    <>
      <div className="bg-custom-light-blue">
        <Header title="History" />
        <div className="flex justify-center items-center mt-10 flex-col">
          {
            mock.map( (toilet_name) => {return (
                  <Card short_name={toilet_name} />
                )
              }
            )
          }
        </div>
      </div>
    </>
  );
};

export default HistoryPage;