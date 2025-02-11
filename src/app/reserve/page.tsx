"use client";
import Topbar from "../../../components/topbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [option, setOption] = useState([]);
  const [request, setRequest] = useState("");
  const [disabledDates, setDisabledDates] = useState([]);

  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  // id 있을 때, 예약 정보 불러와서 state에 저장

  const getAllTuesdays = (startDate, endDate) => {
    const tuesdays = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === 2) {
        tuesdays.push({
          startDate: new Date(currentDate),
          endDate: new Date(currentDate),
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return tuesdays;
  };

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );
    setDisabledDates(getAllTuesdays(startDate, endDate));
  }, []);

  const handleOptionChange = (value: number) => {
    setOption((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleReservation = () => {
    if (!name || !phone || !email) {
      alert("예약자 정보를 입력해주세요");
      return;
    }
    if (!date) {
      alert("날짜를 선택해주세요");
      return;
    }
    if (!option.length) {
      alert("시술을 선택해주세요");
      return;
    }
    console.log(name, phone, email, date, option, request);

    try {
      // POST

      // if Success, then
      alert("예약이 완료되었습니다.");
      router.push("/show");
    } catch (error) {
      alert("예약에 실패했습니다. 다시 시해세요.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar title={"Étoile Nail"} elements={{ left: <Topbar.Back /> }} />
      <main className="flex flex-col gap-y-8 pt-8 px-4 bg-gray-50">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-1.5">
              <div className="rounded-full h-5 w-5 bg-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">1</span>
              </div>
              <div className="font-sans font-semibold text-gray-900">
                예약자 정보를 입력해주세요
              </div>
            </div>
            <div className="flex flex-col gap-y-4 bg-white border border-cyan-600/40 rounded-lg shadow-md px-4 py-4">
              <div className="flex items-center gap-x-1.5">
                <div className="w-1/6 font-sans font-medium text-gray-700">
                  성함
                </div>
                <div className="text-gray-500">|</div>
                <input
                  type="text"
                  placeholder="  이름을 입력해주세요"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-8 rounded-lg bg-gray-50"
                />
              </div>
              <div className="flex items-center gap-x-1.5">
                <div className="w-1/6 font-sans font-medium text-gray-700">
                  연락처
                </div>
                <div className="text-gray-500">|</div>
                <input
                  type="text"
                  placeholder="  010-0000-0000"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-8 rounded-lg bg-gray-50"
                />
              </div>
              <div className="flex items-center gap-x-1.5">
                <div className="w-1/6 font-sans font-medium text-gray-700">
                  이메일
                </div>
                <div className="text-gray-500">|</div>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="  example@email.com"
                  className="w-full h-8 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-1.5">
              <div className="rounded-full h-5 w-5 bg-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">2</span>
              </div>
              <div className="font-sans font-semibold text-gray-900">
                날짜와 시간을 선택해주세요
              </div>
            </div>
            <div className="flex flex-col gap-y-4 bg-white border border-cyan-600/40 rounded-lg shadow-md px-4 py-4">
              <Datepicker
                useRange={false}
                asSingle={true}
                value={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                disabledDates={disabledDates}
                primaryColor={"cyan"}
                // toggleClassName={
                //   "absolute right-0 h-full px-3 rounded-r-lg text-cyan-500"
                // }
              />
              <div>Timepicker</div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-1.5">
              <div className="rounded-full h-5 w-5 bg-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">3</span>
              </div>
              <div className="font-sans font-semibold text-gray-900">
                원하시는 시술을 선택해주세요
              </div>
            </div>
            <div className="flex flex-col gap-y-4 bg-white border border-cyan-600/40 rounded-lg shadow-md px-4 py-4">
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(1)}
                  className="h-4 w-4 checked:bg-cyan-500"
                />
                젤 제거
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(2)}
                  className="size-4 checked:bg-cyan-500"
                />
                원컬러
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(3)}
                  className="size-4 checked:bg-cyan-500"
                />
                간단아트
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(4)}
                  className="size-4 checked:bg-cyan-500"
                />
                풀아트
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(5)}
                  className="size-4 checked:bg-cyan-500"
                />
                기본케어
              </label>
              <div className="flex flex-col gap-y-1">
                <div className="font-sans font-medium text-gray-700">
                  요청사항
                </div>
                <textarea
                  onChange={(e) => setRequest(e.target.value)}
                  className="flex rounded-lg border border-gray-200 px-2 py-1"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-1.5">
              <div className="rounded-full h-5 w-5 bg-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">4</span>
              </div>
              <div className="font-sans font-semibold text-gray-900">
                예약전 확인해주세요
              </div>
            </div>
            <div className="flex flex-col gap-y-4 bg-white border border-cyan-600/40 rounded-lg shadow-md px-4 py-4">
              <div className="font-sans text-gray-700">공지사항1</div>
              <div className="font-sans text-gray-700">공지사항2</div>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-8">
          <div
            onClick={handleReservation}
            className="flex w-full items-center justify-center rounded-full bg-cyan-500/90 font-sans font-medium text-white px-4 py-2"
          >
            예약 완료
          </div>
        </div>
      </main>
    </div>
  );
}
