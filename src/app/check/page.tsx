"use client";
import Topbar from "../../../components/topbar";
import { useState } from "react";
import Link from "next/link";
import { User } from "../../../components/icons";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Topbar title={"Étoile Nail"} />
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
                  placeholder="  이름을 입력해주세요"
                  className="w-full h-8 rounded-lg bg-gray-50"
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
                    placeholder="  010-0000-0000"
                    className="w-full h-8 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="font-sans text-gray-700">
                <div className="flex items-center gap-x-1.5">
                  <div className="w-1/5 font-sans font-semibold text-gray-700">
                    이메일
                  </div>
                  <input
                    type="text"
                    placeholder="  example@email.com"
                    className="w-full h-8 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/show"
            className="flex w-full items-center justify-center rounded-full bg-cyan-500/90 font-sans font-medium text-white mt-2 px-4 py-2"
          >
            예약내역 조회
          </Link>
        </div>
      </div>
    </>
  );
}
