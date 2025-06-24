export const getStarsArray = (rating, max = 5) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = max - full - (half ? 1 : 0);

  return [
    ...Array(full).fill("full"),
    ...(half ? ["half"] : []),
    ...Array(empty).fill("empty"),
  ];
};
