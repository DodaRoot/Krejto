import { Form, useNavigation } from "react-router";
import Navbar from "../components/feature/Navbar/Navbar";
import Banner from "../components/feature/Banner/Banner";

export default function Index() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Banner />
      <Navbar />
      <div className="w-full justify-center items-center flex">
        <div className="w-5xl flex justify-center items-center md:justify-between">
          <h1>Dashboard</h1>
          <Form method="get" action="/search">
            <input type="text" placeholder="Search" name="query" />
            <button type="submit">Search</button>
          </Form>
        </div>
      </div>
    </>
  );
}
