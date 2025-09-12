import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowRight,
  EyeIcon,
  EyeOffIcon,
  Key,
  LoaderCircle,
  Mail,
} from "lucide-react";

import useToast from "@/hooks/useToast";
import { useUser } from "@/context/UserContext";
import { loginUser, googleAuth } from "@/apis/auth";

import GoogleIcon from "@/assets/images/google-icon-logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address"),
  password: z.string().nonempty("Password is required"),
});

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useUser();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const toast = useToast();
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit = async (formData) => {
    try {
      const { data } = await loginUser(formData);
      const { user, token } = data;

      if (token) {
        toast.success("Login successfully");
        login(user, token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response.data) {
        form.setError("email", {
          type: "server",
          message: error.response.data.message,
        });
      } else {
        console.error("User login error:", error);
      }
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
        <p className="text-muted-foreground text-sm">
          Continue your journey toward your goals.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* Google login button */}
          <GoogleLogin toast={toast} login={login} navigate={navigate} />

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-2">
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-4 peer-disabled:opacity-50">
                    <Mail size={20} aria-hidden="true" />
                  </div>
                  <FormControl>
                    <Input
                      type="email"
                      variant="lg"
                      placeholder="john@example.com"
                      className="peer ps-12"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="gap-2">
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-4 peer-disabled:opacity-50">
                    <Key size={20} aria-hidden="true" />
                  </div>
                  <FormControl>
                    <Input
                      variant="lg"
                      placeholder="************"
                      className="peer ps-12"
                      type={isVisible ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-12 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOffIcon size={20} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={20} aria-hidden="true" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin size-5" />
                Logging in...
              </>
            ) : (
              <>
                Login <ArrowRight className="size-5" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-muted-foreground text-sm text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary underline">
          Register
        </Link>
      </div>
    </>
  );
};

const GoogleLogin = ({ toast, login, navigate }) => {
  const [isConnectingToGoogle, setIsConnectingToGoogle] = useState(false);

  const responseGoogle = async (res) => {
    setIsConnectingToGoogle(true);

    try {
      const { data } = await googleAuth(res.code);
      const { user, token } = data;

      if (token) {
        toast.success("Login successfully");
        login(user, token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error while requesting google code:", error);
    } finally {
      setIsConnectingToGoogle(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <Button
      size="lg"
      variant="outline"
      type="button"
      className="w-full gap-2"
      onClick={googleLogin}
      disabled={isConnectingToGoogle}
    >
      {isConnectingToGoogle ? (
        <>
          <LoaderCircle className="animate-spin size-5" />
          Connecting to Google...
        </>
      ) : (
        <>
          <img src={GoogleIcon} alt="google" className="size-5" />
          Login with Google
        </>
      )}
    </Button>
  );
};

export default Login;
