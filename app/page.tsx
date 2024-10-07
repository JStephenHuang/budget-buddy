import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="w-full flex items-center gap-[--spacing] p-[--spacing]">
        <Image
          className="w-1/2 h-full object-cover bg-yellow-400"
          src={"/li2.jpg"}
          alt=""
          width={1000}
          height={1000}
        ></Image>
        <div className="w-1/2 flex flex-col gap-[--spacing]">
          <div className="title">
            <h1>BUDGET SMART</h1>
            <h1>BUDGET EASY</h1>
            <h1>BUDGET BUDDY</h1>
          </div>

          <div className="flex flex-col gap-[--spacing]">
            <p>
              Effortlessly track your expenses and reach your financial goals
              with our app, which extracts and organizes data directly from your
              receipts. Stay on top of your budget with automated insights and
              personalized recommendations.
            </p>
            <div className="flex flex-col gap-4">
              <Link className="button text-center" href="/extracter">
                Start tracking your expenses
              </Link>
              <Link className="button text-center" href="/analytics">
                Analytics
              </Link>
            </div>
          </div>
          {/* <div className="h-full flex flex-col justify-between">
            <p>Your personal expenses in charts, diagrams, and numbers.</p>
            <Link className="button text-center" href="/analytics">
              Start viewing your analytics
            </Link>
          </div> */}
        </div>
      </section>
      <section className="flex flex-col gap-[--spacing] p-[--spacing]">
        <div className="text-center">
          Budget Buddy is a user-friendly application meticulously crafted for
          young adults seeking to cultivate responsible budgeting habits and
          enhance their financial literacy. We understand that managing finances
          can be daunting, especially for those just starting their journey into
          financial independence. That&apos;s why we&apos;ve developed Budget
          Buddy to be your trusted companion in navigating the intricacies of
          personal finance. innovative receipt tool empowers users to
          effortlessly capture images of their receipts, providing a seamless
          way to visualize their expenditures across various categories.
        </div>

        <div className="flex h-[80vh] gap-[--spacing]">
          <Image
            className="w-1/3 h-full object-contain border bg-black"
            src={"/rceipt_1.jpg"}
            alt=""
            width={1000}
            height={1000}
          ></Image>
          <Image
            className="w-1/3 h-full object-contain border bg-black"
            src={"/rceipt_2.webp"}
            alt=""
            width={1000}
            height={1000}
          ></Image>
          <Image
            className="w-1/3 h-full object-contain border bg-black"
            src={"/rceipt_3.jpg"}
            alt=""
            width={1000}
            height={1000}
          ></Image>
        </div>
      </section>
    </main>
  );
}
