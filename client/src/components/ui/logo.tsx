import { Shield } from "lucide-react"
import { Link } from "react-router"

const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center">
      <Shield className="h-8 w-8 text-red-600" />
      <span className="ml-2 text-xl font-bold text-gray-900">SQLSecLab</span>
    </Link>
  )
}

export default Logo