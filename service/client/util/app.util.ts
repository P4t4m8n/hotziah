export const formatDateFromObjectId = (input?: string | Date): string => {
  if (!input) {
    return "No activity yet";
  }
  let date: Date;

  if (typeof input === "string") {
    date = new Date(parseInt(input.substring(0, 8), 16) * 1000);
  } else {
    date = input;
  }

  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (date >= today) {
    return `Today, ${hours}:${minutes}`;
  } else if (date >= yesterday) {
    return `Yesterday, ${hours}:${minutes}`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substring(2);
    return `${day}/${month}/${year}`;
  }
};
