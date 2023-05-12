import { BoardTypes } from "types/ContentDataStructure";

const hostname = process.env.SERVER_HOSTNAME;
const port = process.env.SERVER_PORT;

async function getData(url: `/${string}`, id: string, revalidateTime?: number) {
  if (!hostname || !port)
    return console.log("SERVER HOSTNAME or SERVER PORT not found");

  const res = await fetch(
    `http://${hostname}:${port}${url}/${id}`,
    revalidateTime
      ? { next: { revalidate: revalidateTime } }
      : { cache: "default" }
  );
  return res.json();
}

export async function getBoard(id: string): Promise<BoardTypes> {
  return getData("/v1/boards", id, 1);
}
