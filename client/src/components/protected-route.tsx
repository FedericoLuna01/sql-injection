import { AuthContext } from "@/contexts/auth-context/auth-context"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { toast } from "sonner"

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    toast.error("Debes iniciar sesión para acceder a esta página")
    return <Navigate to="/login" replace />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute