import { Moon, Sun } from "react-feather";
import { useUIStore } from "../../../stores/ui/uiStore";

const ThemeButton = () => {
  const { changeTheme, theme } = useUIStore();

  const toggleTheme = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeButton;
