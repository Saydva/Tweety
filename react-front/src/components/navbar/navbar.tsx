import { useNavbarStore } from "../../store/navbar.store";
import { AlignJustify } from "react-feather";
// icon from react-feather

const Navbar = () => {
  const NavbarStore = useNavbarStore((state) => state);

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div
          className={` dropdown ${NavbarStore.isClosed ? "dropdown-open" : ""}`}
        >
          <div
            role="button"
            onClick={() => NavbarStore.toggle()}
            className="btn m-1"
          >
            <AlignJustify />
          </div>

          <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a onClick={() => NavbarStore.toggle()}>Home Page</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end">
        <div className="ps-4">
          <a className="text-lg font-bold">daisyUI</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
