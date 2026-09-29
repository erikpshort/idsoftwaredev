export const PROJECT_NEEDS = [
  'Custom software',
  'A workflow',
  'An app',
  'AI integration',
  'A website',
  'Not sure yet',
] as const;

export type ProjectNeed = (typeof PROJECT_NEEDS)[number];
