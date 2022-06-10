export const getFormattedDate = (created) => {
  const date = new Date(created);
  return date
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .toString();
};