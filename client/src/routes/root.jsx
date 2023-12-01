// import { Outlet } from "react-router";
// import Nav from "../nav";

// // This component will render on load.
// export default function Root() {
//   return (
//     // Note: `className` props throughout this app leverage Tailwind CSS, an optional dependency.
//     <div className="m-2.5">

//       <Nav />
//       {/* Nested routes will render right here. */}
//       <Outlet />
//       {/* This <footer> will render below every route. */}
//       <footer className="mt-4 text-xs">&copy; A web application where users can join virtual book clubs based on genre and participate in discussions that compare multiple books from that genre.</footer>
//     </div>
//   );
// }
import { Outlet } from "react-router";
import Nav from "../nav";

// This component will render on load.
export default function Root() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="mb-8">
        <Nav />
      </header>

      {/* Nested routes will render right here. */}
      <main>
        <Outlet />
      </main>

      {/* This <footer> will render below every route. */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        &copy; A web application where users can join virtual book clubs based on genre and participate in discussions that compare multiple books from that genre.
      </footer>
    </div>
  );
}
