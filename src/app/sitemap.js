export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prepmaster.in';
  const now = new Date();

  const pages = [
    { path: '/', changeFrequency: 'daily', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/bitsat', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/bitsat/tests', changeFrequency: 'daily', priority: 0.9 },
    { path: '/kcet', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/kcet/analysis', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/kcet/tests', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/rooms', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/upload', changeFrequency: 'weekly', priority: 0.6 },
  ];

  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
