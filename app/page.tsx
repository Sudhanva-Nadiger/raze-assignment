import AllUsers from "@/components/AllUsers";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Navigation, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-blue-100 w-screen h-screen flex flex-col items-center">
      <h1 className="text-[100px] font-extrabold">Raze assignment</h1>
      <div className="flex gap-2">
        <Link href={"/profile/create"}>
          <Button>
            <Plus />
            Create new Profile
          </Button>
        </Link>
        <Link href={"/profile/3"}>
          <Button>
            <Navigation />
            Check Sample UI of a User
          </Button>
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <AllUsers />
      </Suspense>
    </div>
  );
}
