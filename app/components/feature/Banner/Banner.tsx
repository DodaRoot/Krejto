import VerifiedIcon from "../../../assets/Icons/VerifiedIcon";

export default function Banner() {
  return (
    <div className="banner w-full bg-blue-500 flex items-center justify-center py-1 text-xs md:text-sm">
      <p className="text-white font-bold">
        Trade confidently with powerful anti-fraud security.
      </p>
      <VerifiedIcon className="size-5 ml-2" />
    </div>
  );
}
