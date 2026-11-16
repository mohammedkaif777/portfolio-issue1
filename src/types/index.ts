export type MultiverseTheme = 'marvel' | 'dc';

export interface ProjectMission {
  id: string;
  codeName: string;
  title: string;
  brief: string;
  status: 'In Development' | 'Deployed' | 'Active Mission' | 'Patented';
  techStack: string[];
  repoUrl: string;
  demoUrl?: string;
  impact: string;
  badge: string;
  patentNotice?: string;
}

export interface SkillItem {
  name: string;
  level: number;
  tier: 'Offensive (AI & Core)' | 'Defensive (Architecture)' | 'Tactical (Tools & Cloud)';
  desc: string;
}
