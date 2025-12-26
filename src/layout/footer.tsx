import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Footer, FooterProps } from "@/components/footer";
import { mockFooter } from "@/mocks/mock-sidebar";

export function AppFooter() {
  const { user } = useAuth();

  const footerProps: FooterProps = useMemo(() => {
    if (!user) {
      return {
        links: [], // Return empty links if no user
      };
    }
    // In the future, footer links can also be configured
    return {
      links: mockFooter,
    };
  }, [user]);

  return <Footer {...footerProps} />;
}
