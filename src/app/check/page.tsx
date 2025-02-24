"use client";
import supabase from "@root/supabase.config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "../../../components/icons";
import Topbar from "../../../components/topbar";

export default function Page() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");

	const router = useRouter();

	const handleCheck = async () => {
		if (name === "" || phone === "") {
			alert("정보를 모두 입력해주세요.");
			return;
		}

		const { data, error } = await supabase
			.from("reservation")
			.select("id")
			.eq("name", name)
			.eq("phone", phone);
		if (error) {
			alert("예약 내역을 찾을 수 없습니다. 정보를 다시 입력해주세요.");
		} else if (data.length === 0) {
			alert(
				"입력하신 정보와 일치하는 예약 내역이 없습니다. 다시 확인해주세요.",
			);
		} else {
			const ids = data.map((item) => item.id).join(",");
			router.push(`/show?ids=${ids}`);
		}
	};

	return (
		<>
			<Topbar title={"Étoile Nail"} elements={{ left: <Topbar.Back /> }} />
			<div className="flex flex-col h-screen justify-center px-4 pb-16 bg-black/5">
				<div className="flex flex-col gap-y-5 bg-white rounded-xl shadow-md px-5 py-5">
					<div className="flex gap-x-1.5">
						<User />
						<div className="font-sans font-medium text-gray-900">
							예약자 정보를 입력해주세요
						</div>
					</div>
					<div className="flex flex-col gap-y-4 pl-0.5">
						<div className="flex flex-col gap-y-2">
							<div className="flex items-center gap-x-1.5">
								<div className="w-1/5 font-sans font-semibold text-gray-700">
									성함
								</div>
								<input
									type="text"
									placeholder="이름을 입력해주세요"
									onChange={(e) => setName(e.target.value)}
									className="w-full h-8 rounded-lg bg-gray-50 px-2 py-1"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-y-2">
							<div className="font-sans text-gray-700">
								<div className="flex items-center gap-x-1.5">
									<div className="w-1/5 font-sans font-semibold text-gray-700">
										연락처
									</div>
									<input
										type="text"
										placeholder="'-'을 제외한 숫자만 입력해주세요"
										onChange={(e) => setPhone(e.target.value)}
										maxLength={11}
										className="w-full h-8 rounded-lg bg-gray-50 px-2 py-1"
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						onClick={handleCheck}
						className="flex w-full items-center justify-center rounded-full bg-cyan-500/90 font-sans font-medium text-white mt-2 px-4 py-2"
					>
						예약내역 조회
					</div>
				</div>
			</div>
		</>
	);
}
