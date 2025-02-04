"use client";
import Link from "next/link";
import Topbar from "../../../components/topbar";
import { User, Time, Menu, Notice } from "../../../components/icons";
import { useState } from "react";

export default function Page() {
  const [menu, setMenu] = useState({
    option: [] as number[],
    request: "",
  });

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
      <main className="flex flex-col min-h-screen gap-y-4 pt-8 px-4 bg-gray-50">
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
            <div className="font-sans text-gray-700">캘린더</div>
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
                  className="h-4 w-4 checked:bg-rose-300/90"
                />
                젤 제거
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(2)}
                  className="size-4 checked:bg-rose-300/90"
                />
                원컬러
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(3)}
                  className="size-4 checked:bg-rose-300/90"
                />
                간단아트
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(4)}
                  className="size-4 checked:bg-rose-300/90"
                />
                풀아트
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleOptionChange(5)}
                  className="size-4 checked:bg-rose-300/90"
                />
                기본케어
              </label>
              <div className="flex flex-col gap-y-1">
                <div className="font-sans font-medium text-gray-700">
                  요청사항
                </div>
                <input
                  type="textarea"
                  onChange={handelRequestChange}
                  className="flex rounded-lg h-[100px] border border-gray-200 px-2 py-1"
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
        <div className="flex w-full">
          <Link
            href="/show"
            className="flex w-full items-center justify-center rounded-full bg-rose-300/90 font-sans font-medium text-white px-4 py-2"
          >
            예약 완료
          </Link>
        </div>
      </main>
    </div>
  );
}
