import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { useState } from "react"
import { LoaderCircleIcon } from "lucide-react"

const ResetDbDialog = () => {
  const [loading, setLoading] = useState(false)

  const handleResetDB = async () => {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:3000/reset-database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json()

      if (data.error) {
        return toast.error(data.error)
      }

      toast.success("Base de datos reiniciada correctamente")
    } catch (error) {
      console.log(error)
      toast.error("Error al reiniciar la base de datos")
    }
    setLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          disabled={loading}
        >
          {loading && <LoaderCircleIcon className="animate-spin duration-200" />}
          {loading ? "Reiniciando..." : "Reiniciar Base de Datos"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. ¿Estás seguro de que deseas reiniciar la base de datos? Todos los datos volverán a su estado inicial y se perderán todos los datos actuales.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleResetDB}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ResetDbDialog