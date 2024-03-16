import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="">
     
      <section className="h-[90vh] w-full flex items-center justify-between gap-[--spacing] p-[--spacing]">
        <Image
          className="w-3/5 h-full object-cover bg-yellow-400"
          src={"/landingimg.png"}
          alt=""
          width={1000}
          height={1000}
        ></Image>
        <div className="w-2/5 h-full flex flex-col gap-[--spacing]">
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
