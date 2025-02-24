import type { ReactElement } from "react";

export type ScaffoldProps = Partial<{
	topBar: ReactElement;
	content: ReactElement;
}>;

export function Scaffold({ topBar, content }: ScaffoldProps) {
	return (
		<div id="scaffold" className="flex flex-col min-h-screen w-full">
			<div className="fixed top-0 z-[100]">{topBar}</div>
			{content}
		</div>
	);
}
