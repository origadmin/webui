"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import {MainNav} from "@/components/main-nav"
import {NavProjects} from "@/components/nav-projects"
import {UserNav} from "@/components/user-nav"
import {TeamSwitcher} from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "/login",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "/login",
                },
                {
                    title: "Starred",
                    url: "/login",
                },
                {
                    title: "Settings",
                    url: "/login",
                },
            ],
        },
        {
            title: "Models",
            url: "/login",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "/login",
                },
                {
                    title: "Explorer",
                    url: "/login",
                },
                {
                    title: "Quantum",
                    url: "/login",
                },
            ],
        },
        {
            title: "Documentation",
            url: "/login",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "/login",
                },
                {
                    title: "Get Started",
                    url: "/login",
                },
                {
                    title: "Tutorials",
                    url: "/login",
                },
                {
                    title: "Changelog",
                    url: "/login",
                },
            ],
        },
        {
            title: "Settings",
            url: "/login",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "/login",
                },
                {
                    title: "Team",
                    url: "/login",
                },
                {
                    title: "Billing",
                    url: "/login",
                },
                {
                    title: "Limits",
                    url: "/login",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "/login",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "/login",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "/login",
            icon: Map,
        },
    ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams}/>
            </SidebarHeader>
            <SidebarContent>
                <MainNav items={data.navMain}/>
                <NavProjects projects={data.projects}/>
            </SidebarContent>
            <SidebarFooter>
                <UserNav/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
