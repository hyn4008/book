import Link from "next/link";
import { Scaffold } from "../../components/Scaffold";

export default function Home() {
  return (
    <>
      <div className="font-jua text-2xl">네일샵 예약사이트</div>
      <div className="font-nunito text-xl">Nail Reservation</div>
      <div className="font-quicksand">Nail Reservation</div>
      <div className="flex font-gothic text-sm">
        <Link href="/reserve">예약하기</Link>
        <Link href="/check">예약확인</Link>
      </div>
    </>
  );
}
