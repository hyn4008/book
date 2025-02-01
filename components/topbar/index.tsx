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
    <header className="sticky top-0 z-50 grid grid-cols-[1fr_2fr_1fr] bg-white px-4 py-3">
      <div className="mr-auto flex">{left}</div>
      <div className="flex w-full items-center justify-center text-center text-lg font-semibold text-gray-800">
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
      className="flex items-center justify-center"
    >
      <I.Back />
    </a>
  );
};

export default Topbar;
