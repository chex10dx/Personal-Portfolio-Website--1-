export const career = [
  { id: 'dotnet', start: '2023-12', end: null },
  { id: 'freelance', start: '2021-06', end: '2022-12' },
  { id: 'aspnet', start: '2020-04', end: '2021-06' },
  { id: 'junior', start: '2019-05', end: '2020-04' },
] as const;

export const portfolioLinks = {
  email: 'tareqyasser.dev@gmail.com',
  whatsapp: 'https://wa.me/963930675426',
  facebook: 'https://www.facebook.com/tareq.yasser.1',
  linkedIn: 'https://www.linkedin.com/in/eng-tariq-yasser',
  github: 'https://github.com/chex10dx',
  location: 'https://www.google.com/maps/search/?api=1&query=Damascus%2C%20Syria',
  resume: { en: 'tariq-yasser-resume.pdf', ar: 'tariq-yasser-resume-ar.pdf' },
};

export function formatCareerMonth(month: string, locale: 'en' | 'ar') {
  const date = new Date(`${month}-01T00:00:00Z`);
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SY' : 'en', {
    month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}
