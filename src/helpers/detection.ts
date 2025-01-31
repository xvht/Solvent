interface Thresholds {
  friends: { low: number; moderate: number };
  followers: { low: number; moderate: number };
  following: { low: number; moderate: number };
  groups: { low: number; moderate: number };
}

interface Weights {
  friends: number;
  followers: number;
  following: number;
  groups: number;
  verification: number;
  ropro: number;
}

interface Metrics {
  friendsCount: number;
  followersCount: number;
  followingCount: number;
  groupsCount: number;
  hasRoProDiscord: boolean;
  isEmailVerified: boolean;
}

interface Scores {
  friends: number;
  followers: number;
  following: number;
  groups: number;
  verification: number;
  ropro: number;
}

export const THRESHOLDS: Thresholds = {
  friends: { low: 5, moderate: 15 },
  followers: { low: 3, moderate: 10 },
  following: { low: 3, moderate: 10 },
  groups: { low: 3, moderate: 10 },
};

export const WEIGHTS: Weights = {
  friends: 0.25,
  followers: 0.2,
  following: 0.15,
  groups: 0.15,
  verification: 0.15,
  ropro: 0.1,
};

export function calculateMetricScore(
  value: number,
  threshold: { low: number; moderate: number }
): number {
  return Math.min(1, Math.max(0, 1 - value / threshold.moderate));
}

export function calculateVerificationScore(isVerified: boolean): number {
  return isVerified ? 0.2 : 1.0;
}

export function calculateRoProScore(hasDiscord: boolean): number {
  return hasDiscord ? 0.2 : 0.8; // Less punitive for not having RoPro
}

export function calculateScores(metrics: Metrics): Scores {
  return {
    friends: calculateMetricScore(metrics.friendsCount, THRESHOLDS.friends),
    followers: calculateMetricScore(
      metrics.followersCount,
      THRESHOLDS.followers
    ),
    following: calculateMetricScore(
      metrics.followingCount,
      THRESHOLDS.following
    ),
    groups: calculateMetricScore(metrics.groupsCount, THRESHOLDS.groups),
    verification: calculateVerificationScore(metrics.isEmailVerified),
    ropro: calculateRoProScore(metrics.hasRoProDiscord),
  };
}

export function calculateFinalScore(scores: Scores): number {
  return parseFloat(
    (
      scores.friends * WEIGHTS.friends +
      scores.followers * WEIGHTS.followers +
      scores.following * WEIGHTS.following +
      scores.groups * WEIGHTS.groups +
      scores.verification * WEIGHTS.verification +
      scores.ropro * WEIGHTS.ropro
    ).toFixed(3)
  );
}

export async function isUserVerified(userId: number): Promise<boolean> {
  const hatId = 102611803;

  try {
    const isOwned = await fetch(
      `https://inventory.roblox.com/v1/users/${userId}/items/asset/${hatId}/is-owned`
    );

    if (!isOwned.ok) {
      return false;
    }

    return await isOwned.json();
  } catch (error) {
    console.error(`Error checking if user is verified: ${error}`);
    return false;
  }
}

export function getConfidenceLevel(scores: Scores, metrics: Metrics): string {
  const significantFactors = [];
  const positiveFactors = [];
  const negativeFactors = [];

  // Socials
  if (scores.friends > 0.8) negativeFactors.push("very low friend count");
  else if (scores.friends < 0.3) positiveFactors.push("healthy friend count");

  if (scores.followers > 0.8) negativeFactors.push("very few followers");
  else if (scores.followers < 0.3)
    positiveFactors.push("significant follower base");

  if (scores.following > 0.8) negativeFactors.push("follows very few users");
  else if (scores.following < 0.3)
    positiveFactors.push("follows a normal amount of users");

  if (scores.groups > 0.8) negativeFactors.push("minimal group participation");
  else if (scores.groups < 0.3)
    positiveFactors.push("active in multiple groups");

  // Verification
  if (metrics.isEmailVerified) {
    positiveFactors.push("verified email");
  } else {
    negativeFactors.push("unverified email");
  }

  // RoPro
  if (metrics.hasRoProDiscord) {
    positiveFactors.push("has RoPro Discord integration");
  }

  // Build significant factors
  if (scores.friends > 0.7 || scores.followers > 0.7) {
    significantFactors.push("social activity");
  }
  if (scores.groups > 0.7) {
    significantFactors.push("group participation");
  }
  if (scores.verification > 0.7) {
    significantFactors.push("verification status");
  }

  // Build confidence string
  let confidenceString = "Based on ";
  if (significantFactors.length > 0) {
    confidenceString += significantFactors.join(", ");
  } else {
    confidenceString += "all available metrics";
  }

  confidenceString += ", this ";

  if (positiveFactors.length > negativeFactors.length) {
    confidenceString += "is likely not an alt account. ";
    if (positiveFactors.length > 0) {
      confidenceString += `The account has ${positiveFactors
        .slice(0, -1)
        .join(", ")}${
        positiveFactors.length > 1 ? ", and " : ""
      }${positiveFactors.slice(-1)}.`;
    }
  } else if (negativeFactors.length > 0) {
    confidenceString += "may be an alt account. ";
    confidenceString += `The account has ${negativeFactors
      .slice(0, -1)
      .join(", ")}${
      negativeFactors.length > 1 ? ", and " : ""
    }${negativeFactors.slice(-1)}.`;
  } else {
    confidenceString += "shows mixed indicators for being an alt account.";
  }

  return confidenceString;
}
