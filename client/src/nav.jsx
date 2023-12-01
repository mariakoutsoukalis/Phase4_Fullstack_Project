import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
      {/* Logo or Branding */}
      <div className="text-2xl font-semibold">PagePals</div>

      {/* Navigation Links */}
      <div className="flex gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg hover:underline ${isActive && 'font-semibold'}`
          }
        >
          Home
        </NavLink>

        <div className="flex gap-10">
          <NavLink
            to="/bookclub"
            className={({ isActive }) =>
              `text-lg hover:underline ${isActive && 'font-semibold'}`
            }
          >
            BookClubs
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-lg hover:underline ${isActive && 'font-semibold'}`
            }
          >
            About Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
