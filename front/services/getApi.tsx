import { BoardTypes } from "types/ContentDataStructure";

async function fetcher(
  dataUrl: `/${string}`,
  id?: string,
  revalidateTime?: number
) {
  if (!process.env.SERVER_HOSTNAME || !process.env.SERVER_PORT)
    return console.log("SERVER HOSTNAME or SERVER PORT not found");

  const res = await fetch(
    `http://${process.env.SERVER_HOSTNAME}:${
      process.env.SERVER_PORT
    }${dataUrl}${id ? `/${id}` : ""}`,
    revalidateTime
      ? { next: { revalidate: revalidateTime } }
      : { cache: "default" }
  );
  return res.json();
}

export async function getBoard(id: string): Promise<BoardTypes> {
  return fetcher("/v1/boards", id);
}
