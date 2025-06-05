import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeClosed } from "lucide-react";
import { useState, useContext } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { AuthContext } from "@/contexts/auth-context/auth-context"
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().min(2, { message: "El email es obligatorio" }).max(100),
  password: z.string().min(2, { message: "La contraseña es obligatoria" }).max(50),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "john@example.com",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        if (data.error) {
          toast.error(data.error || "Error al iniciar sesión");
          return;
        }

        toast.success(data.success || "Login exitoso");

        login(data.token);
        navigate("/admin")
      })
      .catch((error) => {
        toast.error("Error al iniciar sesión");
        console.error("Error al iniciar sesión:", error);
      });
  }

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className={cn("flex flex-col gap-6 min-w-md", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Inicia sesión en tu cuenta</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico a continuación para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute top-1/2 bottom-1/2 right-0 flex items-center mr-2 hover:cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeClosed /> : <Eye />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Iniciar sesión
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Regístrate
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}