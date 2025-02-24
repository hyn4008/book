import type { Metadata } from "next";
import { Jua, Nanum_Gothic, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Tomorrows",
	description: "네일샵 예약 사이트",
	icons: "https://tomorrows.com/favicon.ico", // 임시
	openGraph: {
		title: "Tomorrows",
		description: "네일샵 예약 사이트",
		type: "website",
		url: "https://tomorrows.com", // 임시
		images: {
			url: "https://tomorrows.com/og.png", // 임시
			width: 1200,
			height: 630,
			alt: "Tomorrows",
		},
	},
	category: "beauty",
	keywords: [
		"네일샵",
		"네일아트",
		"네일",
		"네일 예약",
		"네일샵 예약",
		"네일아트 예약",
	],
};

const jua = Jua({
	variable: "--font-jua",
	subsets: ["latin"],
	weight: "400",
});

const nanumGothic = Nanum_Gothic({
	variable: "--font-gothic",
	subsets: ["latin"],
	weight: "400",
});

const shortStack = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
	weight: "700",
});

const quicksand = Quicksand({
	variable: "--font-quicksand",
	subsets: ["latin"],
	weight: "400",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" className="bg-gray-50">
			<head></head>
			<body
				className={`relative m-auto w-full min-h-screen bg-white ${jua.variable} ${nanumGothic.variable} ${shortStack.variable} ${quicksand.variable}`}
			>
				{children}
				<Script id="clarity-script" strategy="afterInteractive">
					{`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
				</Script>
			</body>
		</html>
	);
}
