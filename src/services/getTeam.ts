export const getTeam = async () => {
  const res = await fetch("https://car-repairing-website.vercel.app/api/team", {
    next: {
      revalidate: 30,
    },
  });
  return res.json();
};
