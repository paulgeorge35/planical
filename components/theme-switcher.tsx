import { useTheme } from "next-themes"
import { useMounted } from "@/hooks/use-mounted"

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  const mounted = useMounted()

  return mounted ? (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  ) : (
    <p>theme</p>
  )
}

export default ThemeSwitch
