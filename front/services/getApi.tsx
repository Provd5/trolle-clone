import { BoardTypes } from "types/ContentDataStructure";

const hostname = process.env.NEXT_PUBLIC_SERVER_HOSTNAME_URL;

async function getData(
  url: `/${string}`,
  id: string | null,
  revalidateTime?: number
) {
  if (!hostname) return console.log("SERVER HOSTNAME not found");
  const urlString = id ? `${hostname}${url}/${id}` : `${hostname}${url}`;

  try {
    const res = await fetch(
      urlString,
      revalidateTime
        ? { next: { revalidate: revalidateTime } }
        : { cache: "default" }
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getBoardsArray(): Promise<BoardTypes[]> {
  return getData("/v1/boards", null);
}

export async function getBoard(id: string): Promise<BoardTypes> {
  return getData("/v1/boards", id);
}
