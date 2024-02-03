import { NotFoundIcon } from "./NotFoundIcon";

export default function PageNotFound() {
  return (
    <section className="flex flex-col w-full p-40 justify-center items-center h-screen">
      <NotFoundIcon />
      <h1 className="text-4xl font-bold text-center mt-8">
        Something went wrong.
      </h1>
      <p className="text-center mt-4">Sorry about that.</p>
    </section>
  );
}
