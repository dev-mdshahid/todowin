import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  return (
    <div className="flex h-screen w-screen items-center p-10">
      <Tabs defaultValue="login" className="mx-auto w-full max-w-[400px] ">
        <TabsList className="w-full child:w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Login */}
        <TabsContent value="login">
          <Login />
        </TabsContent>

        {/* Register */}
        <TabsContent value="register">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
