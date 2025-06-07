import { Link } from "react-router"
import Logo from "./ui/logo"
import { useDevModeStore } from "@/stores/dev-mode-store"
import { DevSwitch } from "./dev-switch"

const Header = () => {
  const { toggleDevMode, devMode } = useDevModeStore()
  return (
    <header className="px-4 lg:px-6 h-16 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 flex items-center justify-center fixed top-0 left-0 right-0 z-50">
      <div className="container flex items-center">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <a href="#features" className="text-sm font-medium hover:text-red-600 transition-colors">
            Características
          </a>
          <a href="#labs" className="text-sm font-medium hover:text-red-600 transition-colors">
            Laboratorios
          </a>
          <Link
            to="/login" className="text-sm font-medium hover:text-red-600 transition-colors">
            Login
          </Link>
          <Link to="/admin" className="text-sm font-medium hover:text-red-600 transition-colors">
            Admin
          </Link>
          <DevSwitch
            checked={devMode}
            onCheckedChange={toggleDevMode}
            id="dev-mode-switch"
            aria-label="Toggle Dev Mode"
          />
        </nav>
      </div>
    </header>
  )
}

export default Header