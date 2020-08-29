export default async (req, res) => {
  let resp = await fetch(process.env.NEXT_PUBLIC_API + "cycles/get/");
  let data = await res.json();
};
