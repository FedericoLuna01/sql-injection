import { AuthContext } from "@/contexts/auth-context/auth-context"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { toast } from "sonner"

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext)

  if (!token) {
    toast.error("Debes iniciar sesión para acceder a esta página")
    return <Navigate to="/login" replace />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute