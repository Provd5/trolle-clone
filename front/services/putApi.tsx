const hostname = process.env.SERVER_HOSTNAME_URL;

async function putData(url: `/${string}`, id: string, data: any) {
  // if (!hostname)
  //   return console.log("SERVER HOSTNAME_URL not found");

  const res = await fetch(
    // `${hostname}${url}/${id}`,
    `http://localhost:4000${url}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}

export async function updateBoard(id: string, data: any) {
  return putData("/v1/boards", id, data);
}

export async function updateColumn(id: string, data: any) {
  return putData("/v1/columns", id, data);
}

export async function updateCard(id: string, data: any) {
  return putData("/v1/cards", id, data);
}
