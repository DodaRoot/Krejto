import { LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AsYouType } from "libphonenumber-js";
import { useState } from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import type {
  AuthFieldProps,
  LoginData,
  LoginErrors,
  RegisterData,
  RegisterErrors,
} from "./types";
import { validateLoginForm, validateRegisterForm } from "./validation";

import postLogin from "~/apis/login";
import postRegister from "~/apis/register";

function AuthField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  icon: Icon,
  value,
  error,
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
          value={value}
          aria-invalid={Boolean(error)}
          className="h-11 pl-10"
          onChange={onChange}
        />
      </div>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

export default function Login() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [registerData, setRegisterData] = useState<RegisterData>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({});

  const registerMutation = postRegister();
  const loginMutation = postLogin();

  const updateLoginField = (field: keyof LoginData, value: string) => {
    setLoginData((previous) => ({ ...previous, [field]: value }));
    if (value.trim()) {
      setLoginErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const updateRegisterField = (field: keyof RegisterData, value: string) => {
    const nextState = { ...registerData, [field]: value };
    const nextErrors = validateRegisterForm(nextState, t);

    setRegisterData(nextState);
    setRegisterErrors((previous) => ({
      ...previous,
      [field]: nextErrors[field],
    }));
  };

  const handleLoginSubmit = (event: any) => {
    event.preventDefault();
    const nextErrors = validateLoginForm(loginData, t);
    setLoginErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    loginMutation.mutate(
      { email: loginData.email, password: loginData.password },
      {
        onSuccess: (token) => {
          localStorage.setItem("token", token);
          navigate("/");
        },
      },
    );
  };

  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();

    const nextErrors = validateRegisterForm(registerData, t);
    setRegisterErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    registerMutation.mutate(registerData, {
      onSuccess: () => setTab("login"),
    });
  };

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
            <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
              <AuthField
                id="email"
                label={t("Email")}
                type="email"
                autoComplete="email"
                placeholder={t("Email placeholder")}
                value={loginData.email}
                error={loginErrors.email}
                icon={Mail}
                onChange={(event) =>
                  updateLoginField("email", event.target.value)
                }
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
                    value={loginData.password}
                    aria-invalid={Boolean(loginErrors.password)}
                    required
                    onChange={(event) =>
                      updateLoginField("password", event.target.value)
                    }
                    className="h-11 pl-10"
                  />
                </div>
                {loginErrors.password ? (
                  <p className="text-xs text-red-500">{loginErrors.password}</p>
                ) : null}
              </div>

              <Button
                className="h-11 w-full"
                type="submit"
                disabled={loginMutation.isPending}
              >
                {t("Login")}
              </Button>
              {loginMutation.error && (
                <p className="text-sm text-destructive" role="alert">
                  {t("Login Error")}
                </p>
              )}
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-5">
            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-4"
              noValidate
            >
              <AuthField
                id="fullName"
                label={t("Full name")}
                type="text"
                autoComplete="name"
                placeholder={t("Your full name")}
                value={registerData.fullName}
                error={registerErrors.fullName}
                onChange={(event) =>
                  updateRegisterField("fullName", event.target.value)
                }
                icon={UserRound}
              />
              <AuthField
                id="email"
                label={t("Email")}
                type="email"
                autoComplete="email"
                placeholder={t("Email placeholder")}
                value={registerData.email}
                error={registerErrors.email}
                onChange={(event) =>
                  updateRegisterField("email", event.target.value)
                }
                icon={Mail}
              />
              <AuthField
                id="password"
                label={t("Password")}
                type="password"
                autoComplete="new-password"
                placeholder={t("Create a password")}
                value={registerData.password}
                error={registerErrors.password}
                onChange={(event) =>
                  updateRegisterField("password", event.target.value)
                }
                icon={LockKeyhole}
              />
              <AuthField
                id="phoneNumber"
                label={t("Phone number")}
                type="tel"
                autoComplete="tel"
                placeholder={t("Phone number placeholder")}
                value={registerData.phoneNumber}
                error={registerErrors.phoneNumber}
                onChange={(event) => {
                  const value = event.target.value;
                  updateRegisterField(
                    "phoneNumber",
                    value ? new AsYouType().input(value) : "",
                  );
                }}
                icon={Phone}
              />
              <Button
                type="submit"
                className="h-11 w-full"
                disabled={registerMutation.isPending}
              >
                {t("Create account")}
              </Button>
              {registerMutation.isError && (
                <p className="text-sm text-destructive" role="alert">
                  {t("Register Error")}
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
