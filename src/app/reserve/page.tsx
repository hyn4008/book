"use client";
import Link from "next/link";
import Topbar from "../../../components/topbar";
import { User, Time, Menu, Notice } from "../../../components/icons";
import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function Page() {
  const [date, setDate] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState([]);
  const [menu, setMenu] = useState({
    option: [] as number[],
    request: "",
  });

  const getAllTuesdays = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === 2) {
        dates.push({
          startDate: new Date(currentDate),
          endDate: new Date(currentDate),
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
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
    setMenu((prev) => ({
      ...prev,
      option: prev.option.includes(value)
        ? prev.option.filter((item) => item !== value)
        : [...prev.option, value],
    }));
  };

  const handelRequestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenu((prev) => ({
      ...prev,
      request: e.target.value,
    }));
  };

  console.log(menu);

  return (
    <div className="flex flex-col h-screen">
      <Topbar title={"Étoile Nail"} />
      <main className="flex flex-col gap-y-8 pt-8 px-4 bg-gray-50">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-1.5">
              <User />
              <div className="font-sans font-medium text-gray-900">
                예약자 정보를 입력해주세요
              </div>
            </div>
            <div className="flex flex-col gap-y-4 pl-0.5">
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-1.5">
                  <div className="w-1/5 font-sans font-semibold text-gray-700">
                    성함
                  </div>
                  <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    className="w-full bg-gray-50"
                  />
                </div>
                <div className="border border-gray-200" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="font-sans text-gray-700">
                  <div className="flex gap-x-1.5">
                    <div className="w-1/5 font-sans font-semibold text-gray-700">
                      연락처
                    </div>
                    <input
                      type="text"
                      placeholder="010-0000-0000"
                      className="w-full bg-gray-50"
                    />
                  </div>
                </div>
                <div className="border border-gray-200" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="font-sans text-gray-700">
                  <div className="flex gap-x-1.5">
                    <div className="w-1/5 font-sans font-semibold text-gray-700">
                      이메일
                    </div>
                    <input
                      type="text"
                      placeholder="example@email.com"
                      className="w-full bg-gray-50"
                    />
                  </div>
                </div>
                <div className="border border-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-1.5">
              <Time />
              <div className="font-sans font-medium text-gray-900">
                날짜와 시간을 선택해주세요
              </div>
            </div>
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
            <div className="font-sans text-gray-700">시간</div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-1.5">
              <Menu />
              <div className="font-sans font-medium text-gray-900">
                원하시는 시술을 선택해주세요
              </div>
            </div>
            <div className="flex flex-col gap-y-4 pl-0.5">
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
                  onChange={handelRequestChange}
                  className="flex rounded-lg border border-gray-200 px-2 py-1"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-1.5">
              <Notice />
              <div className="font-sans font-medium text-gray-900">
                예약전 확인해주세요
              </div>
            </div>
            <div className="font-sans text-gray-700">공지사항1</div>
            <div className="font-sans text-gray-700">공지사항2</div>
          </div>
        </div>
        <div className="flex w-full mb-8">
          <Link
            href="/show"
            className="flex w-full items-center justify-center rounded-full bg-cyan-500/90 font-sans font-medium text-white px-4 py-2"
          >
            예약 완료
          </Link>
        </div>
      </main>
    </div>
  );
}
