import { Check, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useState } from "react";

type AuthFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  icon: typeof Mail;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

import postLogin from "~/apis/login";
import postRegister from "~/apis/register";

function AuthField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  icon: Icon,
  onChange,
}: AuthFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required
          className="h-11 pl-10"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default function Login() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");

  const registerMutation = postRegister();

  const loginMutation = postLogin();

  return (
    <main className="flex min-h-[calc(100svh-1rem)] w-full items-center justify-center px-4 py-5 sm:py-8">
      <section className="w-full max-w-md rounded-2xl border bg-background px-5 py-6 shadow-sm sm:px-8 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("Welcome to Krejto")}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {t("Auth intro")}
          </p>
        </div>

        <Tabs value={tab} className="gap-0">
          <TabsList className="grid h-11 w-full grid-cols-2 rounded-lg bg-muted p-1">
            <TabsTrigger
              value="login"
              onClick={() => setTab("login")}
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {t("Login")}
            </TabsTrigger>
            <TabsTrigger
              value="register"
              onClick={() => setTab("register")}
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {t("Register")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                loginMutation.mutate(
                  { email: loginEmail, password: loginPassword },
                  {
                    onSuccess: (token) => {
                      localStorage.setItem("token", token);
                      navigate("/");
                    },
                  },
                );
              }}
              className="space-y-4"
            >
              <AuthField
                id="email"
                label={t("Email")}
                type="email"
                autoComplete="email"
                placeholder={t("Email placeholder")}
                icon={Mail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="password" className="text-sm font-medium">
                    {t("Password")}
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-gray-500 transition-colors hover:text-black"
                  >
                    {t("Forgot password?")}
                  </button>
                </div>
                <div className="relative">
                  <LockKeyhole
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder={t("Enter your password")}
                    required
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-11 pl-10"
                  />
                </div>
              </div>

              <Button
                className="h-11 w-full"
                type="submit"
                disabled={loginMutation.isPending}
              >
                {t("Login")}
              </Button>
              {loginMutation.isError && (
                <p className="text-sm text-destructive" role="alert">
                  {loginMutation.error.message}
                </p>
              )}
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                registerMutation.mutate({
                  fullName: registerFullName,
                  email: registerEmail,
                  password: registerPassword,
                  phoneNumber: registerPhoneNumber,
                });
                setTab("login");
              }}
              className="space-y-4"
            >
              <AuthField
                id="fullName"
                label={t("Full name")}
                type="text"
                autoComplete="name"
                placeholder={t("Your full name")}
                onChange={(e) => setRegisterFullName(e.target.value)}
                icon={UserRound}
              />
              <AuthField
                id="email"
                label={t("Email")}
                type="email"
                autoComplete="email"
                placeholder={t("Email placeholder")}
                onChange={(e) => setRegisterEmail(e.target.value)}
                icon={Mail}
              />
              <AuthField
                id="password"
                label={t("Password")}
                type="password"
                autoComplete="new-password"
                placeholder={t("Create a password")}
                onChange={(e) => setRegisterPassword(e.target.value)}
                icon={LockKeyhole}
              />
              <AuthField
                id="phoneNumber"
                label={t("Phone number")}
                type="tel"
                autoComplete="tel"
                placeholder={t("Phone number placeholder")}
                onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                icon={Phone}
              />
              <Button type="submit" className="h-11 w-full">
                {t("Create account")}
              </Button>
              {registerMutation.isError && (
                <p className="text-sm text-destructive" role="alert">
                  {registerMutation.error.message}
                </p>
              )}
            </form>
          </TabsContent>
        </Tabs>
        {registerMutation.isSuccess && (
          <p className="text-sm text-green-500" role="alert">
            {t("Registration successful! Please log in")}
          </p>
        )}
      </section>
    </main>
  );
}
