import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <header className="h-[--navh] border-b flex items-center p-[3rem]">
        <Link className="" href="/">
          BUDGET BUDDY
        </Link>
      </header>
      <section className="h-[90vh] w-full flex items-center justify-between gap-[3rem] p-[3rem]">
        <Image
          className="w-3/5 h-full object-cover bg-yellow-400"
          src={"/landingimg.png"}
          alt=""
          width={1000}
          height={1000}
        ></Image>
        <div className="w-2/5 h-full flex flex-col gap-[2rem]">
          <div className="title">
            <h1>BUDGET SMART</h1>
            <h1>BUDGET EASY</h1>
            <h1>BUDGET BUDDY</h1>
          </div>

          <div className="h-full flex flex-col justify-between">
            <p>
              Personal tool to handle finances with ease. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Harum debitis sapiente sed
              quidem.
            </p>
            <Link className="button text-center" href="/receipt-tool">
              Start tracking your expenses
            </Link>
          </div>
          <div className="h-full flex flex-col justify-between">
            <p>Your personal expenses in charts, diagrams, and numbers.</p>
            <Link className="button text-center" href="/analytics">
              Start viewing your analytics
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
