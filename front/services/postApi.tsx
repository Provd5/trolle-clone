const hostname = process.env.SERVER_HOSTNAME_URL;

async function postData(url: `/${string}`, data: any) {
  // if (!hostname)
  //   return console.log("SERVER HOSTNAME not found");

  try {
    const res = await fetch(
      // `${hostname}${url}`,
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
  } catch (error) {
    console.log(error);
  }
}

export async function postNewColumn(data: any) {
  return postData("/v1/columns", data);
}

export async function postNewCard(data: any) {
  return postData("/v1/cards", data);
}
