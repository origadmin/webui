import React, { ElementType } from "react";
import { Command } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/team-switcher";

type SidebarHeaderProps = {
  teams?: {
    name: string,
    logo: ElementType,
    plan: string,
  }[],
};

const DefaultTeam = {
  name: "OrigAdmin WebUI",
  logo: Command,
  plan: "RSBuild + React + ShadcnUI + ",
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
