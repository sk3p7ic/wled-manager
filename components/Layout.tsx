import React, { ReactNode, useEffect, useState } from "react";
import { PageHeader } from "./PageHeader";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const headerRef = React.createRef<HTMLDivElement>();
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current)
      setNavHeight(headerRef.current.children[0].clientHeight);
  }, [headerRef]);

  return (
    <>
      <div ref={headerRef}>
        <PageHeader />
      </div>
      <main className="min-h-screen" style={{ paddingTop: navHeight + "px" }}>
        {children}
      </main>
    </>
  );
};
