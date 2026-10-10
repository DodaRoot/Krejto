import type { LikedPageCopy } from "./types";

const PAGE_COPY: LikedPageCopy = { title: "Liked" };

export default function Liked() {
  return (
    <div>
      <h1>{PAGE_COPY.title}</h1>
    </div>
  );
}
