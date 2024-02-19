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

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Make sure the container fills the viewport height
  },
  main: {
    flex: '1', // Allows the main content to grow and push the footer down
  }
};

// This component will render on load.
export default function Root() {
  return (
    <div style={styles.layout}>
      <header className="mb-8">
        <Nav />
      </header>

      {/* Nested routes will render right here. */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* This <footer> will render below every route. */}
      <footer className="flex justify-center items-center py-4 px-8 bg-gray-800 text-white">
        &copy; A web application where users can join virtual book clubs based on genre and participate in discussions.
      </footer>
    </div>
  );
}
