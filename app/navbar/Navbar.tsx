import Link from "next/link";

function BasicExample() {
  return (
    <header className="h-[--navh] border-b flex items-center justify-between p-[--spacing] mx-3rem">

      <Link className="mx-3rem" href="/">
        BUDGET BUDDY      
      </Link>

      <div>
        <Link className="mx-3rem ml-6" href="/receipt-tool">
          RECEIPT TOOL      
        </Link>
        <Link className="mx-3rem ml-6" href="/about">
          ABOUT     
        </Link>
      </div>
      
    </header>
  );
}

export default BasicExample;
