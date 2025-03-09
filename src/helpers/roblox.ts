export function generateRandomBirthday(): string {
  const year = Math.floor(Math.random() * (2003 - 1980 + 1) + 1980);
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}T21:00:00.000Z`;
}

export async function fetchCrsfToken(): Promise<string | null> {
  const response = await fetch("https://www.roblox.com/Login", {
    credentials: "include",
  });
  const text = await response.text();

  const csrfRegex =
    /<meta(?=.*?name=["']csrf-token["'])(?=.*?data-token=["']([^"']+)["'])[^>]*>/i;
  const match = text.match(csrfRegex);

  if (match && match[1]) {
    const decodedToken = match[1].replace(
      /&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi,
      (match) => {
        if (match === "&#x2B;") return "+";
        if (match.startsWith("&#x"))
          return String.fromCharCode(
            parseInt(match.substring(3, match.length - 1), 16)
          );
        if (match.startsWith("&#"))
          return String.fromCharCode(
            parseInt(match.substring(2, match.length - 1))
          );
        switch (match) {
          case "&amp;":
            return "&";
          case "&lt;":
            return "<";
          case "&gt;":
            return ">";
          case "&quot;":
            return '"';
          case "&apos;":
            return "'";
          default:
            return match;
        }
      }
    );

    return decodedToken;
  }

  // alternative method
  const tokenRegex = /data-token=["']([^"']+)["']/i;
  const tokenMatch = text.match(tokenRegex);

  if (tokenMatch && tokenMatch[1]) {
    const decodedToken = tokenMatch[1].replace(
      /&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi,
      (match) => {
        if (match === "&#x2B;") return "+";
        if (match.startsWith("&#x"))
          return String.fromCharCode(
            parseInt(match.substring(3, match.length - 1), 16)
          );
        if (match.startsWith("&#"))
          return String.fromCharCode(
            parseInt(match.substring(2, match.length - 1))
          );
        switch (match) {
          case "&amp;":
            return "&";
          case "&lt;":
            return "<";
          case "&gt;":
            return ">";
          case "&quot;":
            return '"';
          case "&apos;":
            return "'";
          default:
            return match;
        }
      }
    );

    return decodedToken;
  }

  console.warn("CSRF token not found.");
  return null;
}
