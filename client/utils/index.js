export function getParams(filter) {
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value?.length && value !== "ALL") params.append(key, value);
  });

  return params;
}

export function getBackground(type, theme, size) {
  const variant =
    size === "original" ? "public" : size === "metadata" ? "w=1200" : "w=450";
  if (theme === "PIRATE") {
    return `https://imagedelivery.net/PzbMYGqgAmeY1Z0qD3tlqQ/ee137469-4573-4245-35b6-0a36c9eeba00/${variant}`;
  }
  if (theme === "JUNGLE") {
    return `https://imagedelivery.net/PzbMYGqgAmeY1Z0qD3tlqQ/f9d2c039-e0bc-4f63-d1fd-1b63d7b35700/${variant}`;
  }
  if (theme === "GLOW_IN_THE_DARK") {
    return `https://imagedelivery.net/PzbMYGqgAmeY1Z0qD3tlqQ/b3dbd6d6-4dcf-415d-fe59-de8c6fd22a00/${variant}`;
  }
  if (theme === "CASTLE") {
    return `https://imagedelivery.net/PzbMYGqgAmeY1Z0qD3tlqQ/18607cac-f1cb-401d-c7bb-065ecf788700/${variant}`;
  }
  if (type === "INDOOR") {
    return `https://imagedelivery.net/PzbMYGqgAmeY1Z0qD3tlqQ/977f2c39-3fe6-4f16-da50-9f9ac8acbe00/${variant}`;
  }
  return `https://imagedelivery.net/PzbMYGqgAmeY1Z0qD3tlqQ/5f08ba34-94ef-421d-8fbb-dc81fde35d00/${variant}`;
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

export const IMAGE_URLS = {
  OG: "https://imagedelivery.net/PzbMYGqgAmeY1Z0qD3tlqQ/5a285be1-b206-4e24-21a5-3c5b4ee9bf00/w=1200",
};

export function getCitySlug(cityName) {
  return cityName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}
