

export const handler = async(event:Event) => {
  const url = "google.com"
  const res = await fetch(url);
  console.info("status", res.status);
  return res.status;
};