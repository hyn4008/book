import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>캘린더</div>
      <div>시간</div>
      <div>예약자 정보 입력</div>
      <Link href="/show">예약 완료</Link>
    </>
  );
}
