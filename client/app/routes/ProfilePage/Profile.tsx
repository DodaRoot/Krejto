import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

import profile from "../../assets/images/Profile.svg";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { getMockServices } from "../../mock/index";
import type {
  ProfileFormProps,
  ProfileHeaderProps,
  ServiceCardProps,
} from "./types";

const PROFILE_DATA = {
  name: "Arben Krasniqi",
  email: "arben.krasniqi@example.com",
  number: "+383 44 123 456",
  activeDate: "Janar 2024",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ProfileFormErrors = {
  name?: string;
  number?: string;
  email?: string;
  password?: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatPhoneNumberInput(value: string) {
  if (!value) {
    return "";
  }

  return new AsYouType().input(value);
}

function validateProfileForm(
  values: {
    name: string;
    number: string;
    email: string;
    password: string;
  },
  t: (key: string) => string,
): ProfileFormErrors {
  const errors: ProfileFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const number = values.number.trim();

  if (!name || name.length < 2) {
    errors.name = t("Full name must be at least 2 characters long.");
  }

  if (!number) {
    errors.number = t("Phone number is required.");
  } else if (!parsePhoneNumberFromString(number)?.isValid()) {
    errors.number = t("Enter a valid phone number.");
  }

  if (!email) {
    errors.email = t("Email is required.");
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = t("Enter a valid email address.");
  }

  if (values.password) {
    if (values.password.length < 8) {
      errors.password = t("Password must be at least 8 characters long.");
    } else if (!/[A-Za-z]/.test(values.password)) {
      errors.password = t("Password must include at least one letter.");
    } else if (!/\d/.test(values.password)) {
      errors.password = t("Password must include at least one number.");
    }
  }

  return errors;
}

function ProfileHeader({ name, activeDate }: ProfileHeaderProps) {
  const [t] = useTranslation();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-background shadow">
      <div className="relative">
        <label htmlFor="profile-image-upload" className="cursor-pointer">
          <Avatar className="h-28 w-28 bg-gray-100 hover:opacity-50">
            <AvatarImage src={profile} className="p-3" />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      <p className="mb-3 text-center text-xs text-muted-foreground">
        {t("Active since", { date: activeDate })}
      </p>
    </div>
  );
}

function ProfileForm({ nameData, numberData, emailData }: ProfileFormProps) {
  const [t] = useTranslation();
  const [formData, setFormData] = useState({
    name: nameData,
    number: numberData,
    email: emailData,
    password: "",
  });
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const hasChanges =
    formData.name !== nameData ||
    formData.number !== numberData ||
    formData.email !== emailData ||
    formData.password !== "";

  const isFormValid =
    Object.keys(validateProfileForm(formData, t)).length === 0 && hasChanges;

  const updateField = (field: keyof typeof formData, value: string) => {
    const nextFormData = { ...formData, [field]: value };
    const currentError = validateProfileForm(nextFormData, t)[field];

    setFormData(nextFormData);
    setErrors((previous) => ({ ...previous, [field]: currentError }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateProfileForm(formData, t);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }
  };

  return (
    <form
      className="rounded-lg bg-background p-6 shadow"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-md font-medium md:text-lg">{t("Profile")}</h3>
        {hasChanges ? (
          <Button type="submit" size="sm" disabled={!isFormValid}>
            {t("Save changes")}
          </Button>
        ) : null}
      </div>

      <FieldSet>
        <FieldGroup className="gap-3 md:gap-7">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel className="text-xs md:text-sm" htmlFor="name">
                {t("Full name")}
              </FieldLabel>
              <Input
                id="name"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="text-xs md:text-sm"
                placeholder={t("Your full name")}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              ) : null}
            </Field>

            <Field>
              <FieldLabel className="text-xs md:text-sm" htmlFor="number">
                {t("Number")}
              </FieldLabel>
              <Input
                className="text-xs md:text-sm"
                id="number"
                name="number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={formData.number}
                onChange={(event) => {
                  const nextValue = event.target.value;

                  updateField(
                    "number",
                    nextValue ? formatPhoneNumberInput(nextValue) : "",
                  );
                }}
                placeholder="+1 415 555 2671"
                aria-invalid={Boolean(errors.number)}
              />
              {errors.number ? (
                <p className="mt-1 text-xs text-red-500">{errors.number}</p>
              ) : null}
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel className="text-xs md:text-sm" htmlFor="email">
                {t("Email")}
              </FieldLabel>
              <Input
                className="text-xs md:text-sm"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder={t("Email")}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              ) : null}
            </Field>

            <Field>
              <FieldLabel className="text-xs md:text-sm" htmlFor="password">
                {t("Password")}
              </FieldLabel>
              <Input
                className="text-xs md:text-sm"
                id="password"
                type="password"
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                value={formData.password}
                placeholder={t("Password placeholder")}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password ? (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              ) : null}
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

function AddServiceCard() {
  const [t] = useTranslation();

  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background p-8 transition-colors hover:border-muted-foreground/60"
    >
      <div className="text-3xl">+</div>
      <div className="text-sm font-medium">{t("Add new service")}</div>
      <div className="text-xs text-muted-foreground">
        {t("Click to offer a new service")}
      </div>
    </button>
  );
}

function ServiceCard({ service }: ServiceCardProps) {
  const [t] = useTranslation();

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-background p-4 shadow">
      <div>
        <h4 className="text-sm font-semibold">{service.title}</h4>
        <p className="text-xs text-muted-foreground">{service.category}</p>
      </div>

      <p className="text-sm text-muted-foreground">{service.description}</p>
      <div className="text-sm font-medium text-foreground">{service.price}</div>

      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" size="sm">
          {t("Edit")}
        </Button>
        <Button type="button" variant="ghost" size="sm">
          {t("Delete")}
        </Button>
      </div>
    </div>
  );
}

function ServicesSection() {
  const [t] = useTranslation();

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-medium">{t("My Services")}</h3>

      <div className="mb-6 grid grid-cols-1 gap-4">
        <AddServiceCard />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {getMockServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default function Profile() {
  const { name, email, number, activeDate } = PROFILE_DATA;

  return (
    <div className="w-full space-y-6 p-2">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
        <main className="space-y-6 md:col-span-1">
          <ProfileHeader name={name} activeDate={activeDate} />
        </main>

        <main className="space-y-6 md:col-span-2">
          <ProfileForm nameData={name} numberData={number} emailData={email} />
        </main>
      </div>

      <ServicesSection />
    </div>
  );
}
