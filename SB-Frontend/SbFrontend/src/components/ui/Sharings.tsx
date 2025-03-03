import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"; // Correct import for useParams
import axios from "axios";
import {Nav} from "./Nav";
import MainContainer from "./MainComp";
import Card from "./Card";

export default function Sharings() {
  const { sharelink } = useParams();

  async function seeSharings() {
    const response = await axios.get(`http://localhost:3000/api/v1/${sharelink}`);
    return response.data; 
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["Sharings", sharelink], 
    queryFn: seeSharings,
    enabled: !!sharelink, 
  });

  if (isLoading) return <p>Loading please wait...</p>;
  if (error) return <p>Error fetching data.</p>;

  return (
    <div className="flex h-screen">
      {/* <Nav /> */}
      <MainContainer>
        <div className="grid grid-cols-3 gap-5 p-10 ml-90">
          {data?.content?.length > 0 ? (
            data.content.map((e: any) => (
              <Card key={e.link} link={e.link} type={e.type} title={e.title} tags={e.tags} />
            ))
          ) : (
            <p>No content found.</p>
          )}
        </div>
      </MainContainer>
    </div>
  );
}
