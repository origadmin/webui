import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { useTheme } from "@/components/Theme";

function OpenApiPage() {
  const { theme } = useTheme();

  // Determine the dark mode status as a boolean, which is the correct prop type
  // for many third-party components, including likely @scalar.
  const isDarkMode =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <ApiReferenceReact
      configuration={{
        spec: {
          url: "/docs/openapi/openapi.yaml",
        },
        // Pass the boolean `darkMode` prop to control the component's internal theme.
        darkMode: isDarkMode,
      }}
    />
  );
}

export default OpenApiPage;
