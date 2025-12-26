import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Footer, FooterProps } from "@/components/footer"; // Assuming this is the pure UI component
import { mockFooter } from "@/mocks/mock-sidebar"; // Still using mock for now

export function AppFooter() {
  const { user } = useAuth();

  const footerProps: FooterProps = useMemo(() => {
    if (!user) {
      return {};
    }
    // In the future, footer links can also be configured
    return {
      links: mockFooter,
    };
  }, [user]);

  return <Footer {...footerProps} />;
}
