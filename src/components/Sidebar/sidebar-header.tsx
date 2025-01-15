import { TeamSwitcher } from '@/components/team-switcher';
import { SidebarHeader } from '@/components/ui/sidebar';
import { Command } from 'lucide-react';
import React, { ElementType } from 'react';

type SidebarHeaderProps = {
  teams?: {
    name: string;
    logo: ElementType;
    plan: string;
  }[];
};

const DefaultTeam = {
  name: 'OrigAdmin WebUI',
  logo: Command,
  plan: 'RSBuild + React + ShadcnUI + ',
};

function SidebarHeaderItem(props?: SidebarHeaderProps) {
  const { teams = [DefaultTeam] } = props || {};
  return (
    <SidebarHeader>
      <TeamSwitcher teams={teams} />
    </SidebarHeader>
  );
}

export type { SidebarHeaderProps };
export { SidebarHeaderItem };
