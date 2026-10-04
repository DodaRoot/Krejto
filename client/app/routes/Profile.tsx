import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { getMockServices, getUserData } from "../mock/index";

const USER_DATA = getUserData();

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarPreview: string;
  activeDate: string;
}

function ProfileHeader({
  name,
  email,
  avatarPreview,
  activeDate,
}: ProfileHeaderProps) {
  const [t] = useTranslation();

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <aside className="md:col-span-1 col-auto mb-5">
      <div className="shadow rounded-lg p-6 flex flex-col items-center gap-4 bg-background">
        <div className="relative">
          <p className="text-xs text-muted-foreground text-center mb-3">
            {t("Active since", { date: activeDate })}
          </p>
          <label>
            <Avatar className="h-28 w-28 cursor-pointer hover:opacity-50">
              <AvatarImage src={avatarPreview} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <input type="file" accept="image/*" className="hidden" />
            <div className="cursor-pointer absolute bottom-0 right-0 rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-foreground shadow-sm">
              {t("Change")}
            </div>
          </label>
        </div>
        <div className="text-center">
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {t("Profile description")}
        </p>
      </div>
    </aside>
  );
}

interface ProfileFormProps {
  name: string;
  number: string;
  email: string;
}

function ProfileForm({ name, number, email }: ProfileFormProps) {
  const [t] = useTranslation();

  return (
    <form
      className="bg-background shadow rounded-lg p-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{t("Profile")}</h3>
        <Button type="button">{t("Save changes")}</Button>
      </div>

      <FieldSet>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="name">{t("Full name")}</FieldLabel>
              <Input
                id="name"
                value={name}
                readOnly
                placeholder={t("Your full name")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="number">{t("Number")}</FieldLabel>
              <Input
                id="number"
                value={number}
                readOnly
                placeholder={t("Number")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="email">{t("Email")}</FieldLabel>
              <Input id="email" value={email} readOnly />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">{t("Password")}</FieldLabel>
              <Input
                id="password"
                type="password"
                value="**********"
                readOnly
                placeholder={t("Password placeholder")}
              />
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
      onClick={() => {}}
      className="bg-background border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-muted-foreground/60 transition-colors"
    >
      <div className="text-3xl">+</div>
      <div className="text-sm font-medium">{t("Add new service")}</div>
      <div className="text-xs text-muted-foreground">
        {t("Click to offer a new service")}
      </div>
    </button>
  );
}

interface ServiceCardProps {
  service: any;
}

function ServiceCard({ service }: ServiceCardProps) {
  const [t] = useTranslation();

  return (
    <div className="bg-background shadow rounded-lg p-4 flex flex-col gap-3">
      <div>
        <h4 className="font-semibold text-sm">{service.title}</h4>
        <p className="text-xs text-muted-foreground">{service.category}</p>
      </div>
      <p className="text-sm text-muted-foreground">{service.description}</p>
      <div className="text-sm font-medium text-foreground">{service.price}</div>
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" size="sm" onClick={() => {}}>
          {t("Edit")}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => {}}>
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

      <div className="grid grid-cols-1 gap-4 mb-6">
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
  return (
    <div className="space-y-6 p-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
        <ProfileHeader
          name={USER_DATA.name}
          email={USER_DATA.email}
          avatarPreview={USER_DATA.avatarPreview}
          activeDate={USER_DATA.activeDate}
        />

        <main className="col-span-2 space-y-6">
          <ProfileForm
            name={USER_DATA.name}
            number={USER_DATA.number}
            email={USER_DATA.email}
          />
        </main>
      </div>

      <ServicesSection />
    </div>
  );
}
