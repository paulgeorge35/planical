import { useTheme } from "next-themes"
import { useMounted } from "@/hooks/use-mounted"

//TODO: write a component in the settings page to change the theme
//INFO: this component exists for debugging purposes

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
