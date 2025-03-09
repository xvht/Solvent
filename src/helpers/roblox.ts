export function generateRandomBirthday(): string {
  const year = Math.floor(Math.random() * (2003 - 1980 + 1) + 1980);
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}T21:00:00.000Z`;
}
