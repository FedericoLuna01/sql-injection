import { useDevModeStore } from "@/stores/dev-mode-store"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ResetDbDialog from "./reset-db-dialog";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useUserStore from "@/stores/user-store";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";

const FloatingDevMode = () => {
  const { devMode, setTab, tab, redirectToAdmin, setRedirectToAdmin, logs } = useDevModeStore();
  const { user, token } = useUserStore();

  return (
    <div
      className={cn("fixed bottom-4 right-4 z-50 duration-300", {
        "animate-in fade-in slide-in-from-bottom": devMode,
        "animate-out fade-out slide-out-to-bottom": !devMode,
      })}
    >
      <Card className="min-w-sm max-w-sm gap-1">
        <CardHeader>
          <CardTitle className="text-xl">
            Modo de desarrollo
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="settings">
              <div className="border border-border rounded-lg p-4 flex gap-2 justify-between items-center mb-2">
                <Label
                  htmlFor="no-admin-redirect"
                >
                  Redirigir a ruta protegida
                </Label>
                <Switch
                  id="no-admin-redirect"
                  checked={redirectToAdmin}
                  onCheckedChange={setRedirectToAdmin}
                />
              </div>
              <ResetDbDialog />
            </TabsContent>
            <TabsContent value="logs">
              <div>
                <span className="text-sm leading-none font-medium">Usuario</span>
                <ScrollArea className="h-20 border rounded-md">
                  <div className="p-4">
                    {
                      JSON.stringify(user, null, 2)
                    }
                  </div>
                </ScrollArea>
              </div>
              <div>
                <span className="text-sm leading-none font-medium">Token</span>
                <ScrollArea className="h-15 border rounded-md" >
                  <div className="p-4 whitespace-pre-wrap break-all leading-normal">
                    {JSON.stringify(token, null, 2)}
                  </div>
                </ScrollArea>
              </div>
              <div>
                <span className="text-sm leading-none font-medium">Queries</span>
                <ScrollArea className="h-24 border rounded-md" >
                  <div className="p-4 whitespace-pre-wrap break-all leading-normal">
                    {
                      logs.map((log, index) => (
                        <div key={index} className="mb-2 border-b pb-2 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-28">
                            {
                              format(log.timestamp, 'HH:mm:ss')
                            }
                          </span>
                          <div className="text-sm">{log.query}</div>
                        </div>
                      ))
                    }
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingDevMode;
