import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Database, Code, Users, CheckCircle, AlertTriangle, Lock, Target } from "lucide-react"

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-red-50 via-white to-orange-50 min-h-[80vh] flex items-center ">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit border-red-200 text-red-700">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Entorno Seguro
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Aprende Inyección SQL en un <span className="text-red-600">Entorno Controlado</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Practica y domina las técnicas de inyección SQL de forma segura. Nuestro laboratorio virtual te
                    permite experimentar sin riesgos reales.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    <Target className="w-4 h-4 mr-2" />
                    Comenzar Práctica
                  </Button>
                  <Button variant="outline" size="lg">
                    Ver Documentación
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg blur opacity-75"></div>
                  <Card className="relative bg-white/90 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Database className="h-5 w-5 text-red-600" />
                        <CardTitle className="text-sm">Terminal SQL</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="font-mono text-xs bg-gray-100 p-2 rounded">
                        <div className="text-green-600">{"> SELECT * FROM users WHERE id = 1;"}</div>
                        <div className="text-gray-600">{"| id | username | email |"}</div>
                        <div className="text-gray-600">{"| 1  | admin    | admin@... |"}</div>
                      </div>
                      <div className="font-mono text-xs bg-red-50 p-2 rounded border border-red-200">
                        <div className="text-red-600">{"> SELECT * FROM users WHERE id = 1 OR 1=1;"}</div>
                        <div className="text-red-500 text-xs">⚠️ Inyección SQL detectada</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  ¿Por qué elegir nuestro laboratorio?
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un entorno completo y seguro para aprender sobre vulnerabilidades de inyección SQL con ejercicios
                  prácticos y retroalimentación en tiempo real.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-red-100 hover:border-red-200 transition-colors">
                <CardHeader>
                  <Shield className="h-10 w-10 text-red-600" />
                  <CardTitle>Entorno Aislado</CardTitle>
                  <CardDescription>
                    Practica sin riesgos en un ambiente completamente controlado y seguro
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-red-100 hover:border-red-200 transition-colors">
                <CardHeader>
                  <Database className="h-10 w-10 text-red-600" />
                  <CardTitle>Bases de Datos Reales</CardTitle>
                  <CardDescription>
                    Trabaja con bases de datos MySQL, PostgreSQL y SQLite configuradas específicamente para el
                    aprendizaje
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-red-100 hover:border-red-200 transition-colors">
                <CardHeader>
                  <Code className="h-10 w-10 text-red-600" />
                  <CardTitle>Ejercicios Progresivos</CardTitle>
                  <CardDescription>Desde conceptos básicos hasta técnicas avanzadas de inyección SQL</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Labs Section */}
        <section id="labs" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Laboratorios Disponibles</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explora diferentes escenarios y niveles de dificultad
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Inyección SQL Básica</CardTitle>
                    <Badge variant="secondary">Principiante</Badge>
                  </div>
                  <CardDescription>Aprende los fundamentos de la inyección SQL con ejercicios simples</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Bypass de autenticación
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Extracción de datos básica
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Identificación de vulnerabilidades
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Inyección SQL Avanzada</CardTitle>
                    <Badge variant="destructive">Avanzado</Badge>
                  </div>
                  <CardDescription>Técnicas avanzadas y evasión de filtros de seguridad</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Inyección ciega (Blind SQL)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Evasión de WAF
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Técnicas de time-based
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Aplicaciones Web Vulnerables</CardTitle>
                    <Badge>Intermedio</Badge>
                  </div>
                  <CardDescription>
                    Practica en aplicaciones web reales con vulnerabilidades controladas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      E-commerce vulnerable
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Sistema de login
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Panel de administración
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Prevención y Mitigación</CardTitle>
                    <Badge variant="outline">Defensivo</Badge>
                  </div>
                  <CardDescription>Aprende a proteger aplicaciones contra inyección SQL</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Prepared statements
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Validación de entrada
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Configuración segura
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6 mx-auto ">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">1000+</h3>
                  <p className="text-gray-600">Estudiantes activos</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">50+</h3>
                  <p className="text-gray-600">Ejercicios prácticos</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <Lock className="h-6 w-6 text-red-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">100%</h3>
                  <p className="text-gray-600">Entorno seguro</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  ¿Listo para comenzar?
                </h2>
                <p className="mx-auto max-w-[600px] text-red-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Únete a nuestra comunidad de profesionales en ciberseguridad y mejora tus habilidades en un entorno
                  completamente seguro.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                  Acceso Gratuito
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t container mx-auto">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} SQLSecLab. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
            Términos de Servicio
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
            Privacidad
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
            Contacto
          </a>
        </nav>
      </footer>
    </div>
  )
}
