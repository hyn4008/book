"use client";
import Topbar from "../../../components/topbar";
import Link from "next/link";
import { Check } from "../../../components/icons";

type Reservation = {
  id: number;
  datetime: Date;
  option: string[];
  request: string;
  change_count: number;
  cancel_datetime: Date | null;
  status: "예정" | "완료" | "취소";
};

export default function Page() {
  const reservations: Reservation[] = [
    {
      id: 1357,
      datetime: new Date("2025-02-28T16:00"),
      option: ["손젤"],
      request: "예쁘게 해주세용",
      change_count: 0,
      cancel_datetime: null,
      status: "예정",
    },
    {
      id: 8642,
      datetime: new Date("2025-02-01T09:13"),
      option: ["젤제거", "기본아트"],
      request: "",
      change_count: 1,
      cancel_datetime: null,
      status: "완료",
    },
    {
      id: 7417,
      datetime: new Date("2025-01-24T23:49"),
      option: ["케어"],
      request: "남자 손톱 정리 부탁드립니다.",
      change_count: 0,
      cancel_datetime: new Date("2025-01-31T12:00"),
      status: "취소",
    },
  ];

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

        {reservations.map((reservation, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-y-5 bg-white rounded-xl shadow-md px-5 py-5"
          >
            {reservation.status === "예정" ? (
              <div className="flex gap-x-1.5">
                <div className="flex items-center h-fit px-2 py-1 rounded-xl bg-cyan-500/90 font-sans text-sm font-base text-white">
                  {reservation.status}
                </div>
              </div>
            ) : reservation.status === "완료" ? (
              <div className="flex gap-x-1.5">
                <div className="flex items-center h-fit px-2 py-1 rounded-xl bg-white border border-1 border-cyan-600/90 font-sans text-sm font-medium text-cyan-600/90">
                  완료
                </div>
              </div>
            ) : (
              <div className="flex gap-x-1.5">
                <div className="flex items-center h-fit px-2 py-1 rounded-xl bg-cyan-500/50 font-sans text-sm font-base text-white">
                  취소
                </div>
              </div>
            )}

            <div className="flex flex-col gap-y-2 pl-0.5">
              <div className="flex items-center gap-x-1.5">
                <div className="w-1/3 font-sans text-gray-700">
                  &nbsp;예약 번호
                </div>
                <div className="w-full font-sans font-medium text-gray-900">
                  {reservation.id}
                </div>
              </div>
              <div className="flex w-full border border-cyan-600/20" />
              <div className="flex items-center gap-x-1.5">
                <div className="w-1/3 font-sans text-gray-700">
                  &nbsp;예약 일시
                </div>
                <div className="w-full font-sans font-medium text-gray-900">
                  {reservation.datetime.toLocaleString()}
                </div>
              </div>
              <div className="flex w-full border border-cyan-600/20" />
              <div className="flex items-center gap-x-1.5">
                <div className="w-1/3 font-sans text-gray-700">
                  &nbsp;시술 부위
                </div>
                <div className="flex w-full">
                  {reservation.option.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex mr-1 font-sans font-medium text-gray-900"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full border border-cyan-600/20" />
              {reservation.request && (
                <>
                  <div className="flex items-center gap-x-1.5">
                    <div className="w-1/3 font-sans text-gray-700">
                      &nbsp;요청 사항
                    </div>
                    <div className="w-full font-sans font-medium text-gray-900">
                      {reservation.request}
                    </div>
                  </div>
                  <div className="flex w-full border border-cyan-600/20" />
                </>
              )}
              <div className="flex items-center gap-x-1.5">
                <div className="w-1/3 font-sans text-gray-700">
                  &nbsp;변경 내역
                </div>
                <div
                  className={`w-full font-sans font-medium ${
                    reservation.change_count > 0
                      ? "text-red-500"
                      : "text-gray-900"
                  }`}
                >
                  {reservation.change_count} / 1
                </div>
              </div>
              {reservation.status === "취소" && (
                <>
                  <div className="flex w-full border border-cyan-600/20" />
                  <div className="flex items-center gap-x-1.5">
                    <div className="w-1/3 font-sans text-gray-700">
                      &nbsp;취소 일시
                    </div>
                    <div className="w-full font-sans font-medium text-gray-900">
                      {reservation.cancel_datetime?.toLocaleDateString()}
                    </div>
                  </div>
                </>
              )}
            </div>

            {reservation.status === "예정" ? (
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
            ) : reservation.status === "완료" ? (
              <Link
                href="/reserve"
                className="flex w-full items-center justify-center rounded-xl bg-white border border-1 border-cyan-600/90 font-sans font-medium text-cyan-600/90 mt-2 px-4 py-2"
              >
                다음달 예약하기
              </Link>
            ) : null}
          </div>
        ))}
      </main>
    </div>
  );
}
