export function formatConversationTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const messageDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const differenceInDays = Math.floor(
    (today.getTime() - messageDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (differenceInDays === 0) {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  if (differenceInDays === 1) {
    return "Yesterday";
  }

  if (differenceInDays < 7) {
    return date.toLocaleDateString([], { weekday: "short" });
  }

  return date.toLocaleTimeString([], {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
}
