"use client";
import type { ReactElement } from "react";
import { useRouter } from "next/navigation";
import * as I from "../icons";

function Topbar({
  title,
  elements: { left, right } = {},
}: {
  title?: string;
  elements?: { left?: ReactElement; right?: ReactElement };
}) {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-[1fr, 2fr, 1fr] bg-white p-4">
      <div className="mr-auto flex">{left}</div>
      <div className="flex w-full items-center justify-center text-center text-lg font-semibold">
        {title}
      </div>
      <div className="ml-auto flex">{right}</div>
    </header>
  );
}

Topbar.Back = function Back({ href }: { href?: string }) {
  const router = useRouter();

  return (
    <a
      onClick={() => (href ? router.push(href) : router.back())}
      className="w-fit flex items-center align-middle"
    >
      <I.Back />
    </a>
  );
};

export default Topbar;
