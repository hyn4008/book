"use client";
// import Banner from "../../public/banner.jpeg";
import Image from "next/image";
import Link from "next/link";
import { Parking, Pet, Reserve, Wifi } from "../../components/icons";
import Topbar from "../../components/topbar";
import Thumbnail from "../../public/thumbnail.jpeg";
import Jan1 from "./_static/2025_01_1.jpeg";
import Jan2 from "./_static/2025_01_2.jpeg";
import Jan3 from "./_static/2025_01_3.jpeg";
import Jan4 from "./_static/2025_01_4.jpeg";

export default function Home() {
	return (
		<div className="flex flex-col h-screen max-w-[600px]">
			<Topbar title={"Étoile Nail"} elements={{ right: <Topbar.Check /> }} />
			<main className="flex flex-col pt-14">
				<section className="relative flex flex-col">
					<Image
						src={Thumbnail}
						alt="네일샵 썸네일"
						width={600}
						height={500}
						className="flex w-full aspect-square"
					/>
					<div className="absolute inset-0 size-full bg-black/10" />
					<div className="absolute inset-0 size-full flex flex-col gap-y-2 items-center justify-center py-10">
						<div className="font-sans text-white/80 text-lg font-semibold">
							당신의 손끝에 아름다움을 선사하세요
						</div>
						<Link
							href="/reserve"
							className="flex items-center bg-white/50 rounded-full shadow-md font-sans text-black/50 font-medium px-3 py-1.5"
						>
							예약하기
						</Link>
					</div>
				</section>
				<section className="flex flex-col px-4 py-4 gap-y-2 bg-gray-100/50">
					<div className="flex flex-col">
						<div className="font-sans text-gray-900 font-medium">
							이달의 아트
						</div>
						<div className="font-sans text-gray-400 text-xs -mt-0.5">
							다양한 아트를 할인된 가격에 만나보세요
						</div>
					</div>
					<div className="flex gap-x-2 overflow-x-auto overflow-hidden">
						<Image
							src={Jan1}
							alt="이달의 아트"
							width={150}
							height={150}
							className="rounded-md"
						/>
						<Image
							src={Jan2}
							alt="이달의 아트"
							width={150}
							height={150}
							className="rounded-md"
						/>
						<Image
							src={Jan3}
							alt="이달의 아트"
							width={150}
							height={150}
							className="rounded-md"
						/>
						<Image
							src={Jan4}
							alt="이달의 아트"
							width={150}
							height={150}
							className="rounded-md"
						/>
					</div>
				</section>
				<section>
					<div className="flex flex-col bg-gray-200 px-4 py-4 gap-y-2">
						<div className="font-sans text-gray-900 font-medium">매장 정보</div>
						<div className="flex flex-col gap-y-2 font-sans text-gray-800 text-sm">
							<div>영업시간 &nbsp;|&nbsp; 10:00 ~ 20:00 (매주 화요일 휴무)</div>
							<div>
								주소 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp; 서울시
								마포구 백범로 33
							</div>
							<div>전화번호 &nbsp;|&nbsp; 0507-2143-7896</div>
							<div className="flex justify-between w-full pt-1.5">
								<div className="flex flex-col items-center gap-y-1 px-2">
									<div className="flex items-center px-3 py-3 bg-white rounded-xl">
										<Reserve />
									</div>
									<div className="font-sans text-gray-800 text-xs">예약</div>
								</div>
								<div className="flex flex-col items-center gap-y-1 px-2">
									<div className="flex items-center px-3 py-3 bg-white rounded-xl">
										<Parking />
									</div>
									<div className="font-sans text-gray-800 text-xs">
										주차가능
									</div>
								</div>
								<div className="flex flex-col items-center gap-y-1 px-2">
									<div className="flex items-center px-3 py-3 bg-white rounded-xl">
										<Wifi />
									</div>
									<div className="font-sans text-gray-800 text-xs">
										무선인터넷
									</div>
								</div>
								<div className="flex flex-col items-center gap-y-1 px-2">
									<div className="flex items-center px-3 py-3 bg-white rounded-xl">
										<Pet />
									</div>
									<div className="font-sans text-gray-800 text-xs">
										반려동물 동반
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
