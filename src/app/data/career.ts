export const career = [
  { id: 'dotnet', start: '2023-12', end: null },
  { id: 'freelance', start: '2021-06', end: '2022-12' },
  { id: 'aspnet', start: '2020-04', end: '2021-06' },
  { id: 'junior', start: '2019-05', end: '2020-04' },
] as const;

export const portfolioLinks = {
  email: 'tareqyasser.dev@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/tariq-yasser-78982731a',
  source: 'https://github.com/chex10dx/Personal-Portfolio-Website--1-',
  resume: { en: 'tariq-yasser-resume.pdf', ar: 'tariq-yasser-resume-ar.pdf' },
};

export function formatCareerMonth(month: string, locale: 'en' | 'ar') {
  const date = new Date(`${month}-01T00:00:00Z`);
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SY' : 'en', {
    month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}
