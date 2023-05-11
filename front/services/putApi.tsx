async function putData(url: `/${string}`, id: string, data: any) {
  // if (!hostname || !port)
  //   return console.log("SERVER HOSTNAME or SERVER PORT not found");

  const res = await fetch(
    // `http://${hostname}:${port}${url}/${id}`,
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

export async function updateColumn(id: string, data: any) {
  return putData("/v1/columns", id, data);
}
