"use client";
import Topbar from "../../../components/topbar";
import Link from "next/link";
import { Check } from "../../../components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import supabase from "@root/supabase.config";
import { notFound } from "next/navigation";

type Reservation = {
  id: number;
  name: string;
  date: Date;
  time: Date;
  option: string[];
  request: string;
  created_at: Date;
  change_at: Date;
  cancel_at: Date;
  password: string;
};

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [action, setAction] = useState<"change" | "cancel">("change");
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const ids = params.get("ids")?.split(",");
    // if (!ids || ids.map((id) => isNaN(parseInt(id, 10)))) {
    //   notFound();
    // }

    if (ids) {
      const getReservations = async () => {
        const { data, error } = await supabase
          .from("reservation")
          .select(
            "id, name, date, time, option, request, created_at, change_at, cancel_at, password"
          )
          .in("id", ids);
        if (error) {
          alert(
            "예약 내역을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요."
          );
          return;
        }
        // data.time을 +9시간으로 세팅
        const adjustedData = data.map((reservation) => {
          const adjustedTime = new Date(reservation.time);
          adjustedTime.setHours(adjustedTime.getHours() + 9);
          return { ...reservation, time: adjustedTime };
        });

        setReservations(adjustedData);
      };

      getReservations();
    }
  }, [params]);

  const getDatetime = (selectedDate: Date, selectedTime: Date) => {
    const date = new Date(selectedDate);
    const time = new Date(selectedTime);
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(0);

    return date;
  };

  const getRemainingDays = (date: Date) => {
    const today = new Date();
    const diff = date.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleCheck = async () => {
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password.length !== 4) {
      alert("비밀번호는 4자리로 입력해주세요.");
      return;
    }

    const { data, error } = await supabase
      .from("reservation")
      .select("password")
      .eq("id", selectedId)
      .single();
    if (error) {
      alert("비밀번호를 확인하는 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    } else if (data.password !== password) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    } else {
      if (action === "change") {
        router.push(`/reserve?id=${selectedId}`);
      } else {
        if (confirm("예약을 취소하시겠습니까?")) {
          const { error } = await supabase
            .from("reservation")
            .update({ cancel_at: new Date() })
            .eq("id", selectedId);

          if (error) {
            alert("예약 취소에 실패했습니다. 다시 시도해주세요.");
          } else {
            alert("예약이 취소되었습니다.");
            router.push("/");
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar title={"Étoile Nail"} elements={{ left: <Topbar.Back /> }} />
      <main className="flex flex-col gap-y-4 mt-10 pt-6 pb-16 px-5 bg-gray-50">
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
            {reservation.cancel_at ? (
              <div className="flex gap-x-1.5">
                <div className="flex items-center h-fit px-2 py-1 rounded-xl bg-cyan-500/50 font-sans text-sm font-base text-white">
                  취소
                </div>
              </div>
            ) : getDatetime(reservation.date, reservation.time) > new Date() ? (
              <div className="flex gap-x-1.5">
                <div className="flex items-center h-fit px-2 py-1 rounded-xl bg-cyan-500/90 font-sans text-sm font-base text-white">
                  예정
                </div>
              </div>
            ) : (
              <div className="flex gap-x-1.5">
                <div className="flex items-center h-fit px-2 py-1 rounded-xl bg-white border border-1 border-cyan-600/90 font-sans text-sm font-medium text-cyan-600/90">
                  완료
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
                  {getDatetime(
                    reservation.date,
                    reservation.time
                  ).toLocaleString()}
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
                    reservation.change_at ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  {reservation.change_at ? "1" : "0"} / 1
                </div>
              </div>
              {reservation.cancel_at && (
                <>
                  <div className="flex w-full border border-cyan-600/20" />
                  <div className="flex items-center gap-x-1.5">
                    <div className="w-1/3 font-sans text-gray-700">
                      &nbsp;취소 일시
                    </div>
                    <div className="w-full font-sans font-medium text-gray-900">
                      {new Date(reservation.cancel_at).toLocaleDateString()}
                    </div>
                  </div>
                </>
              )}
            </div>

            {reservation.cancel_at ? null : getDatetime(
                reservation.date,
                reservation.time
              ) > new Date() ? (
              <div className="flex gap-x-2 w-full">
                {getRemainingDays(
                  getDatetime(reservation.date, reservation.time)
                ) > 7 && (
                  <div
                    onClick={() => {
                      setSelectedId(reservation.id);
                      setAction("cancel");
                      setIsOpen(true);
                    }}
                    className="flex w-full items-center justify-center rounded-xl bg-white border border-1 border-cyan-600/90 font-sans font-medium text-cyan-600/90 mt-2 px-4 py-2"
                  >
                    취소하기
                  </div>
                )}
                {getRemainingDays(
                  getDatetime(reservation.date, reservation.time)
                ) > 3 &&
                  !reservation.change_at && (
                    <div
                      onClick={() => {
                        setSelectedId(reservation.id);
                        setAction("change");
                        setIsOpen(true);
                      }}
                      className="flex w-full items-center justify-center rounded-xl bg-cyan-500/90 font-sans font-medium text-white mt-2 px-4 py-2"
                    >
                      변경하기
                    </div>
                  )}
                {getRemainingDays(
                  getDatetime(reservation.date, reservation.time)
                ) <= 3 ||
                  (getRemainingDays(
                    getDatetime(reservation.date, reservation.time)
                  ) <= 7 &&
                    reservation.change_at && (
                      <div className="flex w-full items-center justify-center rounded-xl bg-cyan-500/60 font-sans font-medium text-white mt-2 px-4 py-2">
                        변경 불가
                      </div>
                    ))}
              </div>
            ) : (
              <Link
                href="/reserve"
                className="flex w-full items-center justify-center rounded-xl bg-white border border-1 border-cyan-600/90 font-sans font-medium text-cyan-600/90 mt-2 px-4 py-2"
              >
                재예약 하기
              </Link>
            )}
          </div>
        ))}

        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col gap-y-4 w-2/3 bg-white rounded-xl shadow-md px-5 py-5"
            >
              <div className="flex flex-col gap-y-1.5">
                <div className="font-sans font-bold text-gray-700">
                  비밀번호
                </div>
                <input
                  type="password"
                  placeholder="비밀번호 4자리를 입력해주세요"
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={4}
                  className="w-full h-8 rounded-lg bg-gray-50 px-2 py-1"
                />
              </div>
              <div
                onClick={handleCheck}
                className="flex w-full items-center justify-center rounded-xl bg-cyan-500/90 font-sans font-medium text-white mt-2 px-4 py-2"
              >
                확인
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
