import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1>Welcome to my todo app</h1>
      <Button>
        <Link href={"auth"}>Login</Link>
      </Button>
    </main>
  );
}
