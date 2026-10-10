import { useQuery } from "@tanstack/react-query";

import { getProfileData } from "../../apis/profileData";

export function useProfileDataQuery() {
  return useQuery({
    queryKey: ["profileData"],
    queryFn: getProfileData,
  });
}
