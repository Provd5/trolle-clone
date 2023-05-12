import { BoardTypes } from "types/ContentDataStructure";

const hostname = process.env.SERVER_HOSTNAME_URL;

async function getData(url: `/${string}`, id: string, revalidateTime?: number) {
  if (!hostname) return console.log("SERVER HOSTNAME not found");

  try {
    const res = await fetch(
      `${hostname}${url}/${id}`,
      revalidateTime
        ? { next: { revalidate: revalidateTime } }
        : { cache: "default" }
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getBoard(id: string): Promise<BoardTypes> {
  return getData("/v1/boards", id, 1);
}
