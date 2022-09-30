import Link from "next/link";
import { ReactNode } from "react";

export const PageHeader = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex flex-row items-baseline gap-8 px-32 py-2 bg-neutral-900">
      <h1 className="text-3xl font-bold text-emerald-600">WLED Manager</h1>
      <div className="flex flex-row gap-4">
        <HeaderLink href="/">Home</HeaderLink>
        <HeaderLink href="/">Add Device</HeaderLink>
        <HeaderLink href="/">Device Locations</HeaderLink>
      </div>
    </nav>
  );
};

type HeaderLinkProps = {
  children: ReactNode;
  href: string;
};

const HeaderLink = ({ children, href }: HeaderLinkProps) => {
  return (
    <Link href={href}>
      <a className="text-xl hover:underline hover:text-violet-600 transition-colors">
        {children}
      </a>
    </Link>
  );
};
