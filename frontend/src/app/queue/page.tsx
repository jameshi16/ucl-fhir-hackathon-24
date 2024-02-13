import CardQueue from "../components/card-queue";
import AddButton from "../components/add-button";

const QueuePage = () => {
  return (
    <div>
      <h1 className="text-2xl text-center my-4">Current Queue</h1>
      <CardQueue />
      <AddButton />
    </div>
  );
}

export default QueuePage;
