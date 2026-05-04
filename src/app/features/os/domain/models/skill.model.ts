export type SkillCategory = 'Frontend' | 'Backend' | 'Databases' | 'DevOps & Cloud' | 'Architecture';

export interface ISkill {
  name: string;
  level: number;
  category: SkillCategory;
}
