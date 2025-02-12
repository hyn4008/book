"use client";
import Topbar from "../../../components/topbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-tailwindcss-select";

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [option, setOption] = useState([]);
  const [request, setRequest] = useState("");
  const [disabledDates, setDisabledDates] = useState([]);

  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  const times = [
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
    { value: "13:00", label: "13:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
    { value: "19:00", label: "19:00" },
  ];

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
                  placeholder="이름을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-8 rounded-lg bg-gray-50 px-2 py-1"
                />
              </div>
              <div className="flex items-center gap-x-1.5">
                <div className="w-1/6 font-sans font-medium text-gray-700">
                  연락처
                </div>
                <div className="text-gray-500">|</div>
                <input
                  type="text"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-8 rounded-lg bg-gray-50 px-2 py-1"
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
                  value={email}
                  placeholder="example@email.com"
                  className="w-full h-8 rounded-lg bg-gray-50 px-2 py-1"
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
                placeholder="Select Date"
                value={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                disabledDates={disabledDates}
                primaryColor={"cyan"}
                inputClassName={
                  "w-full rounded-lg bg-gray-50 text-gray-900 px-4 py-2"
                }
                toggleClassName={
                  "absolute right-0 top-1.5 h-[28px] px-3 rounded-r-lg border-l border-gray-300 text-gray-400"
                }
              />
              <Select
                placeholder="Select Time"
                value={time}
                onChange={(e) => setTime(e)}
                options={times}
                isSearchable={false}
                primaryColor={"cyan"}
                classNames={{
                  menuButton: () =>
                    "flex shrink-0 w-full rounded-lg bg-gray-50 text-gray-400 px-1.5 py-0.5",
                }}
              />
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
                  checked={option.includes(1)}
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
            <div className="flex flex-col bg-white border border-cyan-600/40 rounded-lg shadow-md px-4 py-4">
              <div className="font-sans text-sm font-semibold text-gray-700">
                예약 취소는 7일 전, 변경은 3일 전까지 가능합니다.
              </div>
              <div className="flex w-full h-0.5 bg-gray-100 my-2" />
              <div className="font-sans text-sm font-semibold text-gray-700">
                변경은 1회만 가능하므로 신중하게 선택해주세요.
              </div>
              <div className="flex w-full h-0.5 bg-gray-100 my-2" />
              <div className="font-sans text-sm font-semibold text-gray-700">
                시술 시간은 예상 소요 시간보다 길어질 수 있습니다.
              </div>
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
