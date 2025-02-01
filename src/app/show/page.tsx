import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>예약내역을 확인하세요.</div>
      <Link href="/reserve">예약 변경하기</Link>
      <Link href="/cancel">예약 취소하기</Link>
    </>
  );
}
