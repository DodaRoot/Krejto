import VerifiedIcon from "../../../assets/Icons/VerifiedIcon";
import { useTranslation } from "react-i18next";

export default function Banner() {
  const [t] = useTranslation();
  return (
    <div className="banner w-full bg-blue-500 flex items-center justify-center py-1 text-xs md:text-sm">
      <p className="text-white font-bold">{t("Banner Text")}</p>
      <VerifiedIcon className="size-5 ml-2" />
    </div>
  );
}
