"use client";
import Topbar from "../../../components/topbar";
import Link from "next/link";
import { Check } from "../../../components/icons";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar title={"Étoile Nail"} elements={{ left: <Topbar.Back /> }} />
      <main className="flex flex-col gap-y-4 pt-8 pb-16 px-5 bg-gray-50">
        <div className="flex items-center gap-x-1.5">
          <Check />
          <div className="font-sans text-lg font-semibold text-gray-900">
            황유나님의 예약 내역
          </div>
        </div>
        {/* 예정된 예약 */}
        <div className="flex flex-col gap-y-5 bg-white rounded-xl shadow-md px-5 py-5">
          <div className="flex gap-x-1.5">
            <div className="flex itesm-center h-fit px-2 py-1 rounded-xl bg-cyan-500/90 font-sans text-sm font-base text-white">
              예정
            </div>
          </div>
          <div className="flex flex-col gap-y-2 pl-0.5">
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;예약 번호
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                1357
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;예약 일시
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                2025/02/28 16:00
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;시술 부위
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                손젤
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;요청 사항
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                예쁘게 해주세용
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;변경 내역
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                0 / 1
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 w-full">
            <Link
              href="/cancel"
              className="flex w-full items-center justify-center rounded-xl bg-white border border-1 border-cyan-600/90 font-sans font-medium text-cyan-600/90 mt-2 px-4 py-2"
            >
              취소하기
            </Link>
            <Link
              href="/reserve"
              className="flex w-full items-center justify-center rounded-xl bg-cyan-500/90 font-sans font-medium text-white mt-2 px-4 py-2"
            >
              변경하기
            </Link>
          </div>
        </div>

        {/* 지나간 예약 */}
        <div className="flex flex-col gap-y-5 bg-white rounded-xl shadow-md px-5 py-5">
          <div className="flex gap-x-1.5">
            <div className="flex itesm-center h-fit px-2 py-1 rounded-xl bg-white border border-1 border-cyan-600/90 font-sans text-sm font-medium text-cyan-600/90">
              완료
            </div>
          </div>
          <div className="flex flex-col gap-y-2 pl-0.5">
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;예약 번호
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                8642
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;예약 일시
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                2025/02/01 09:13
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;시술 부위
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                젤제거, 기본아트
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;변경 내역
              </div>
              <div className="w-full font-sans font-medium text-red-500">
                1 / 1
              </div>
            </div>
          </div>
          <Link
            href="/cancel"
            className="flex w-full items-center justify-center rounded-xl bg-white border border-1 border-cyan-600/90 font-sans font-medium text-cyan-600/90 mt-2 px-4 py-2"
          >
            리뷰 쓰기
          </Link>
        </div>

        {/* 취소된 예약 */}
        <div className="flex flex-col gap-y-5 bg-white rounded-xl shadow-md px-5 py-5">
          <div className="flex gap-x-1.5">
            <div className="flex itesm-center h-fit px-2 py-1 rounded-xl bg-cyan-500/50 font-sans text-sm font-base text-white">
              취소
            </div>
          </div>
          <div className="flex flex-col gap-y-2 pl-0.5">
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;예약 번호
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                7417
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;예약 일시
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                2025/01/24 23:49
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;시술 부위
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                기본 케어
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;요청 사항
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                남자 손톱 정리 부탁드립니다.
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;변경 내역
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                0 / 1
              </div>
            </div>
            <div className="flex w-full border border-cyan-600/20" />
            <div className="flex items-center gap-x-1.5">
              <div className="w-1/3 font-sans text-gray-700">
                &nbsp;취소 일시
              </div>
              <div className="w-full font-sans font-medium text-gray-900">
                2025/01/31 12:00
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
