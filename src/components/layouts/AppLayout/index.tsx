import AppSidebar from "@/components/custom/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full px-5 py-2 flex flex-col gap-5 overflow-auto">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}