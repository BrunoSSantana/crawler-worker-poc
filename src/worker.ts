process.on("message", async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.text();

    const title = data.match(/<title>(.*?)<\/title>/)?.[1] || "No title";

    process.send?.({ url, title });
  } catch (err) {
    process.send?.({ url, error: err.message });
  }
});
