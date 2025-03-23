export function getParams(filter) {
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value?.length && value !== "ALL") params.append(key, value);
  });

  return params;
}

export function getBackground(type, theme) {
  if (theme === "PIRATE") {
    return "/images/pirate-theme.webp";
  }
  if (theme === "JUNGLE") {
    return "/images/jungle-theme.webp";
  }
  if (theme === "GLOW_IN_THE_DARK") {
    return "/images/glow-theme.webp";
  }
  if (theme === "CASTLE") {
    return "/images/castle-theme.webp";
  }
  if (type === "INDOOR") {
    return "/images/indoor-theme.webp";
  }
  return "/images/outdoor-theme.webp";
}

export const stateAbbreviations = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};
