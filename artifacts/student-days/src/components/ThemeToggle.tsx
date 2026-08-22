import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  variant?: "dark" | "light";
}

export function ThemeToggle({ variant = "dark" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const isDark = variant === "dark";

  return (
    <div className={`flex items-center rounded-full p-[3px] text-xs font-semibold ${isDark ? "bg-white/[0.08] border border-white/[0.12]" : "bg-black/[0.06] border border-black/[0.08]"}`}>
      <button
        onClick={() => setTheme("genz")}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
          theme === "genz"
            ? "bg-primary text-white shadow-sm"
            : isDark ? "text-white/40 hover:text-white/70" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        ⚡ GEN Z
      </button>
      <button
        onClick={() => setTheme("classic")}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
          theme === "classic"
            ? isDark ? "bg-white text-gray-900 shadow-sm" : "bg-white text-gray-900 shadow-sm border border-black/[0.06]"
            : isDark ? "text-white/40 hover:text-white/70" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        ☀️ CLASSIC
      </button>
    </div>
  );
}
