import { Link } from "react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

import FacebookIcon from "../../../assets/icons/FacebookIcon";
import InstagramIcon from "../../../assets/icons/InstagramIcon";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "Roadmap", to: "/roadmap" },
      { label: "Changelog", to: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Documentation", to: "/docs" },
      { label: "Guides", to: "/guides" },
      { label: "Support", to: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      {
        label: "Careers",
        to: "/careers",
        externalIndicator: true,
      },
      { label: "Partners", to: "/partners" },
    ],
  },
];

const socialLinks = [
  {
    href: "https://twitter.com",
    icon: FacebookIcon,
    label: "Facebook",
  },
  {
    href: "https://twitter.com",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    href: "mailto:hello@krejto.com",
    icon: Mail,
    label: "Email",
  },
];

export default function Footer() {
  const [t] = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background px-5 py-2">
      <div className="mx-auto max-w-5xl py-15">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              {t("Title")}
            </Link>

            <p
              className="
                mt-4 max-w-xs text-sm text-muted-foreground
                md:max-w-sm
              "
            >
              {t("Header Description")}
            </p>

            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  className="
                    rounded-lg border p-1
                    transition-colors hover:bg-muted
                  "
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <p className="mt-5 text-xs">
              © {year} Krejto. All rights reserved.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold">{section.title}</h3>

              <ul className="space-y-3 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`
                        hover:text-foreground
                        ${
                          link.externalIndicator
                            ? "inline-flex items-center gap-1"
                            : ""
                        }
                      `}
                    >
                      {link.label}

                      {link.externalIndicator && (
                        <ArrowUpRight className="h-3 w-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
