import { ProjectProps } from '../../types';

const getMostRecentDate = (project: ProjectProps) => {
    if (!project.endDate) return new Date(); 
    return new Date(project.endDate);
};

const modules = import.meta.glob('./**/index.ts', { eager: true });
const projects: ProjectProps[] = Object.entries(modules)
    .filter(([path]) => !path.includes('/template/'))
    .map(([, module]) => (module as { default: ProjectProps }).default)
    .filter(project => project !== undefined)
    .sort((a, b) => {
        const dateA = getMostRecentDate(a);
        const dateB = getMostRecentDate(b);
        return dateB.getTime() - dateA.getTime();
    });

export default projects;

