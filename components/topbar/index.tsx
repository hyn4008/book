"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import * as I from "../icons";

function Topbar({
	title,
	elements: { left, right } = {},
}: {
	title?: string;
	elements?: { left?: ReactElement; right?: ReactElement };
}) {
	return (
		<header className="fixed top-0 z-50 flex items-center bg-white border px-4 py-3 w-full max-w-[600px]">
			<div className="flex w-full justify-start">{left}</div>
			<div className="flex w-full justify-center text-lg font-semibold text-gray-800">
				{title}
			</div>
			<div className="flex w-full justify-end">{right}</div>
		</header>
	);
}

Topbar.Back = function Back() {
	const router = useRouter();

	return (
		<div
			onClick={() => router.back()}
			className="flex items-center justify-start"
		>
			<I.Back />
		</div>
	);
};

Topbar.Check = function Check() {
	return (
		<Link href="/check">
			<I.Calendar />
		</Link>
	);
};

export default Topbar;
