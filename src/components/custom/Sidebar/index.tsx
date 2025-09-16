import { BriefcaseBusiness, LogOut, Table } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { useAuthStore } from "@/stores"

const items = [
    {
        title: "RVM Transactions",
        url: "/",
        icon: Table,
    },
    {
        title: "API Management",
        url: "/api-management",
        icon: BriefcaseBusiness,
    },
]

export default function AppSidebar() {
    const { pathname } = useLocation()
    const { logout } = useAuthStore()
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className={`${pathname === item.url ? "bg-gray-300" : ""} rounded`}>
                                    <SidebarMenuButton asChild className="hover:bg-transparent active:bg-transparent ">
                                        <Link to={item.url} >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem  >
                    <SidebarMenuButton asChild >
                        <div onClick={() => logout()}>
                            <LogOut />
                            <span>Logout</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    )
}