import type { NotFoundPageCopy } from "./types";

const PAGE_COPY: NotFoundPageCopy = { status: 404, message: "Not Found" };

export function loader() {
  throw new Response(PAGE_COPY.message, { status: PAGE_COPY.status });
}

export default function NotFound() {
  return (
    <h1>
      {PAGE_COPY.status} - {PAGE_COPY.message}
    </h1>
  );
}
