export const REALM_LABELS = {
  health: 'Health',
  knowledge: 'Knowledge',
  social: 'Social',
  economy: 'Economy',
  culture: 'Culture&Art'
};

export const getRealmsLabel = (realm) => {
  return REALM_LABELS[realm?.toLowerCase()] || realm;
};

export const getRealmsColor = (realm) => {
  return `zone-${realm?.toLowerCase()}`;
};