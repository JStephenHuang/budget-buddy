import Link from "next/link";

function Navbar() {
  return (
    <header className="h-[--navh] border-b flex items-center justify-between p-[--spacing]">
      <Link className="mx-3rem" href="/">
        BUDGET BUDDY
      </Link>

      <div className="flex items-center gap-[--spacing]">
        <Link className="" href="/extracter">
          EXTRACTER
        </Link>
        <Link className="" href="/about">
          ABOUT
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
