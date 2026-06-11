import { Link, useNavigation } from "react-router";
import type { Route } from "./+types/SearchPage.js";

export async function loader({ request }: Route.LoaderArgs) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const query = new URL(request.url).searchParams.get("query");
  if (!query || query.trim() === "") {
    throw new Response("Query parameter is required", { status: 400 });
  }
  return query;
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Search Results</h1>
      <p>{loaderData}</p>
      <Link to="/">Back to Home</Link>
      <Link to={"/itemPage/" + "<ITEM_ID>"}>Item</Link>
    </div>
  );
}
