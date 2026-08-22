import { createContext, useContext, useState } from "react";

type Theme = "genz" | "classic";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "genz",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("sd_theme") as Theme) || "genz";
  });
  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("sd_theme", t);
  };
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
