import { allSolutionLinks, solutionNavGroups } from '../config/solutionNav';

export function getSolutionMeta(pathname = '') {
  const normalized = pathname.toLowerCase().replace(/\/$/, '');
  const item = allSolutionLinks.find((l) => l.path.toLowerCase() === normalized);
  if (!item) {
    return {
      label: 'Solution',
      desc: '',
      heroImage: '',
      groupTitle: 'Solutions',
      path: pathname,
    };
  }
  const group = solutionNavGroups.find((g) =>
    g.items.some((i) => i.path.toLowerCase() === item.path.toLowerCase())
  );
  return {
    ...item,
    groupTitle: group?.title || 'Solutions',
  };
}
