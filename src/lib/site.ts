export const SITE_URL = 'https://www.idsoftwaredev.com';
export const SITE_NAME = 'Idaho Software Development';

export const HOME_TITLE = 'Custom Software in Idaho | Idaho Software Development';
export const HOME_DESCRIPTION =
  'Custom software, workflows, apps, and AI integration for Treasure Valley businesses that have outgrown their tools.';

/** Search phrases the shop should be found for. Used in titles, descriptions, and the blog queue. */
export const KEYWORDS = [
  'custom software development',
  'Idaho software company',
  'Treasure Valley software',
  'custom business software',
  'Boise software shop',
  'Idaho web development',
] as const;

export const AUTHOR = {
  name: 'Erik Short',
  slug: 'erik-short',
  jobTitle: 'Founder',
  path: '/authors/erik-short',
  image: '/erik-short.jpg',
} as const;

export const authorJsonLd = {
  '@type': 'Person',
  '@id': `${SITE_URL}${AUTHOR.path}#person`,
  name: AUTHOR.name,
  url: `${SITE_URL}${AUTHOR.path}`,
  image: `${SITE_URL}${AUTHOR.image}`,
  jobTitle: AUTHOR.jobTitle,
  worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  email: 'admin@idsoftwaredev.com',
  image: `${SITE_URL}/logo.png`,
  description: HOME_DESCRIPTION,
  areaServed: 'Treasure Valley, Idaho',
  founder: {
    '@type': 'Person',
    '@id': authorJsonLd['@id'],
    name: AUTHOR.name,
    url: authorJsonLd.url,
  },
  knowsAbout: [
    'Custom software',
    'Workflow software',
    'Mobile apps',
    'AI integration',
    'Business websites',
  ],
};
