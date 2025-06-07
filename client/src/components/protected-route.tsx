import useUserStore from "@/stores/user-store"
import { Navigate, Outlet } from "react-router"
import { toast } from "sonner"

const ProtectedRoute = () => {
  const { user } = useUserStore()

  if (!user) {
    toast.error("Debes iniciar sesión para acceder a esta página")
    return <Navigate to="/login" replace />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute