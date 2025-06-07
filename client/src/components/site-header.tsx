import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DevSwitch } from "./dev-switch"
import { useDevModeStore } from "@/stores/dev-mode-store"

export function SiteHeader() {
  const { toggleDevMode, devMode } = useDevModeStore()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <DevSwitch
          checked={devMode}
          onCheckedChange={toggleDevMode}
          id="dev-mode-switch"
          aria-label="Toggle Dev Mode"
          className="ml-auto"
        />
      </div>
    </header>
  )
}
