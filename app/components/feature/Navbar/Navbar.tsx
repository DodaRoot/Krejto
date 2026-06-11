import {
  MessageCircleCheck,
  UserRound,
  Heart,
  Bell,
  SquarePlus,
} from "lucide-react";

export function NavItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer group w-14 size-5">
      <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-200">
        <div className="group-hover:rotate-4 duration-200">{icon}</div>
      </div>
      <p className="text-xs opacity-50 group-hover:opacity-100 transition-opacity duration-200">
        {label}
      </p>
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="py-2 px-5 w-full h-15 justify-center items-center flex shadow-md">
      <div className="text-lg font-bold w-5xl flex justify-center items-center md:justify-between">
        <div className="text-3xl font-bold hidden md:block">Krejto.com</div>
        <div className="flex space-x-4">
          <NavItem icon={<SquarePlus />} label="Posto" />
          <NavItem icon={<Bell />} label="Njoftime" />
          <NavItem icon={<Heart />} label="Pelqimet" />
          <NavItem icon={<MessageCircleCheck />} label="Mesazhet" />
          <NavItem icon={<UserRound />} label="Profili" />
        </div>
      </div>
    </div>
  );
}
