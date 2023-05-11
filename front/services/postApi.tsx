const hostname = process.env.SERVER_HOSTNAME;
const port = process.env.SERVER_PORT;

async function postData(url: `/${string}`, data: any) {
  // if (!hostname || !port)
  //   return console.log("SERVER HOSTNAME or SERVER PORT not found");

  const res = await fetch(
    // `http://${hostname}:${port}${url}`,
    `http://localhost:4000${url}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}
export async function postNewColumn(data: any) {
  return postData("/v1/columns", data);
}

export async function postNewCard(data: any) {
  return postData("/v1/cards", data);
}
