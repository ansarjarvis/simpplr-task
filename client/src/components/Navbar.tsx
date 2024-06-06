import { buttonVariants } from "./ui/button";
import { Link } from "react-router-dom";

let Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-blue/75 backdrop-blur-lg transition-all">
      <div>
        <div className="flex h-14 items-center justify-around border-b border-zinc-200">
          <Link to="/" className="flex z-40 font-semibold ">
            <span>Simpplr Movie AI</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                to="/add-movie"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Add movie
              </Link>
              <Link
                to="/search"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Search
              </Link>
              <Link
                to="/filter"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Filter
              </Link>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
