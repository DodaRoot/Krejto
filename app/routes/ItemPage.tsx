import type { Route } from "./+types/ItemPage.js";

export async function loader({ params }: Route.LoaderArgs) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return params.id;
}

export default function ItemPage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Item Page</h1>
      <p>This is item {loaderData}</p>
    </>
  );
}
