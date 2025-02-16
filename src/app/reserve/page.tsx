"use client";
import Topbar from "../../../components/topbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-tailwindcss-select";
import supabase from "@root/supabase.config";

// type Reservation = {
//   name: string;
//   phone: string;
//   password: string;
//   date: Date;
//   time: Date;
//   option: string[];
//   request: string;
// };

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [time, setTime] = useState({ value: "10:00", label: "10:00" });
  const [option, setOption] = useState<string[]>([]);
  const [request, setRequest] = useState("");
  const [disabledDates, setDisabledDates] = useState<
    { startDate: Date; endDate: Date }[]
  >([]);

  const params = useSearchParams();
  const id = params.get("id");

  // 예약 변경 시, id로 예약 정보 불러오기
  // TODO : 예약 등록일 때는 null, 수정일 때는 기본값 설정
  useEffect(() => {
    const getReservation = async () => {
      if (id) {
        const { data, error } = await supabase
          .from("reservation")
          .select("name, phone, password, date, time, option, request")
          .eq("id", id)
          .single();

        if (error) {
          alert("예약 정보를 불러오는 중 오류가 발생했습니다.");
        } else {
          // data.time에서 시간과 분 정보만 HH:mm 형식의 string으로 추출
          const time = new Date(data.time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          setName(data.name);
          setPhone(data.phone);
          setPassword(data.password);
          setDate({
            startDate: new Date(data.date),
            endDate: new Date(data.date),
          });
          setTime({ value: time, label: time });
          setOption(data.option);
          setRequest(data.request);
        }
      }
    };

    getReservation();
  }, [id]);

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

  // startDate부터 endDate까지의 모든 화요일을 반환
  const getAllTuesdays = ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) => {
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

  // 화요일은 예약 불가능하도록 설정
  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );
    setDisabledDates(getAllTuesdays({ startDate, endDate }));
  }, []);

  // Date 객체에서 시간 정보를 제외하고 날짜만 반환
  const getDate = ({ date }: { date: { startDate: Date; endDate: Date } }) => {
    return new Date(
      date.startDate.getFullYear(),
      date.startDate.getMonth(),
      date.startDate.getDate()
    );
  };

  // "HH:mm" 형식의 시간을 Date 객체로 변환
  const getTime = ({ time }: { time: { value: string; label: string } }) => {
    const [hour, minute] = time.value.split(":");
    return new Date(`1999/12/31/${hour}:${minute}:0`); // 1999년 12월 31일 HH:mm:00
  };

  // 시술 선택
  const handleOptionChange = (value: string) => {
    setOption((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleReservation = async () => {
    if (!name || !phone || !password) {
      alert("예약자 정보를 모두 입력해주세요");
      return;
    }
    if (!date) {
      alert("날짜를 선택해주세요");
      return;
    }
    if (!time) {
      alert("시간을 선택해주세요");
      return;
    }
    if (!option.length) {
      alert("시술을 선택해주세요");
      return;
    }

    // id가 있으면 예약 변경, 없으면 예약 등록
    if (id) {
      const { error } = await supabase
        .from("reservation")
        .update({
          name: name,
          phone: phone,
          password: password,
          date: getDate({ date }),
          time: getTime({ time }),
          option: option,
          request: request,
          change_at: new Date(),
        })
        .eq("id", id);

      if (error) {
        alert("예약 변경에 실패했습니다. 다시 시도해주세요.");
      } else {
        alert("예약이 변경되었습니다.");
        router.push("/");
      }
    } else {
      const { error } = await supabase.from("reservation").insert({
        name: name,
        phone: phone,
        password: password,
        date: getDate({ date }),
        time: getTime({ time }),
        option: option,
        request: request,
      });

      if (error) {
        alert("예약에 실패했습니다. 다시 시도해주세요.");
      } else {
        alert("예약이 완료되었습니다.");
        router.push("/");
      }
    }
  };

  console.log(date, time);

  return (
    <div className="flex flex-col h-screen">
      <Topbar title={"Étoile Nail"} elements={{ left: <Topbar.Back /> }} />
      <main className="flex flex-col gap-y-8 pt-8 px-4 bg-gray-50 pb-20">
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
                  placeholder="'-'를 제외한 숫자만 입력해주세요"
                  value={phone}
                  maxLength={11}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-8 rounded-lg bg-gray-50 px-2 py-1"
                />
              </div>
              <div className="flex gap-x-1.5">
                <div className="w-1/6 pt-1 font-sans font-medium text-gray-700">
                  비밀번호
                </div>
                <div className="pt-1 text-gray-500">|</div>
                <div className="flex flex-col w-full gap-y-1">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    maxLength={4}
                    placeholder="숫자 4자리를 입력해주세요"
                    className="w-full h-8 rounded-lg bg-gray-50 px-2 py-1"
                  />
                  <div className="ml-1 font-sans text-xs text-gray-500">
                    예약 내역을 조회하고 변경하기 위한 비밀번호입니다
                  </div>
                </div>
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
                onChange={(e) => setDate(e)}
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
                  checked={option.includes("젤제거")}
                  onChange={() => handleOptionChange("젤제거")}
                  className="h-4 w-4 checked:bg-cyan-500"
                />
                젤 제거
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={option.includes("원컬러")}
                  onChange={() => handleOptionChange("원컬러")}
                  className="size-4 checked:bg-cyan-500"
                />
                원컬러
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={option.includes("간단아트")}
                  onChange={() => handleOptionChange("간단아트")}
                  className="size-4 checked:bg-cyan-500"
                />
                간단아트
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={option.includes("풀아트")}
                  onChange={() => handleOptionChange("풀아트")}
                  className="size-4 checked:bg-cyan-500"
                />
                풀아트
              </label>
              <label className="flex items-center gap-x-1.5 font-sans font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={option.includes("케어")}
                  onChange={() => handleOptionChange("케어")}
                  className="size-4 checked:bg-cyan-500"
                />
                케어
              </label>
              <div className="flex flex-col gap-y-1">
                <div className="font-sans font-medium text-gray-700">
                  요청사항
                </div>
                <textarea
                  value={request}
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
