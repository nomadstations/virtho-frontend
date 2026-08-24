/**
 * Utility for mapping common country names to TopoJSON geography IDs/names.
 * Natural Earth TopoJSON uses specific naming conventions (e.g., "United States of America").
 */

export const countryVariations = {
  "United States": "United States of America",
  "USA": "United States of America",
  "US": "United States of America",
  "UK": "United Kingdom",
  "Great Britain": "United Kingdom",
  "Democratic Republic of the Congo": "Dem. Rep. Congo",
  "Central African Republic": "Central African Rep.",
  "Dominican Republic": "Dominican Rep.",
  "Equatorial Guinea": "Eq. Guinea",
  "Solomon Islands": "Solomon Is.",
  "Bosnia and Herzegovina": "Bosnia and Herz.",
  "South Sudan": "S. Sudan",
  "Republic of Serbia": "Serbia",
  "UAE": "United Arab Emirates"
};

/**
 * Normalizes a country name and maps it to the standard TopoJSON geography name.
 * 
 * @param {string} name - The country name to map
 * @returns {string|null} - The mapped TopoJSON name
 */
export const getCountryIdByName = (name) => {
  if (!name) return null;
  const normalized = name.trim();
  return countryVariations[normalized] || normalized;
};

/**
 * Extracts the country name from an activity bubble text string.
 * Example: "In France: A new Project was just Created" -> "France"
 * 
 * @param {string} text - The full bubble text
 * @returns {string|null} - The standardized country name
 */
export const extractCountryFromBubbleText = (text) => {
  if (!text) return null;
  // Matches "In [Country]: [Message]" pattern
  const match = text.match(/In\s(.*?):/);
  if (match && match[1]) {
    return getCountryIdByName(match[1]);
  }
  return null;
};