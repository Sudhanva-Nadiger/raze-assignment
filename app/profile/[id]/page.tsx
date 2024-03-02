import { getUserById } from "@/lib/db";
import UserAvatar from "./UserAvatar";
import UserDetails from "@/app/profile/[id]/UserDetails";
import About from "./About";
import { Experience } from "./Experience";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";

export default async function ProfilePage({
    params
}: {
    params: {
        id: string;
    }
}) {
    const user = await getUserById(parseInt(params.id));
    return (
        <div className="flex flex-col m-10 rounded gap-5 w-[70%]">
            <Suspense fallback={<Loader />}>
                <div className="bg-blue-100 rounded border p-2">
                    <UserAvatar
                        userId={user.id}
                        backgroundImage={user.backgroundImage}
                        profileImage={user.profileImage}
                    />
                    <UserDetails user={user} />
                </div>
            </Suspense>

            <Suspense fallback={<Loader />}>
                <About userId={user.id} />
            </Suspense>

            <Suspense fallback={<Loader />}>
                <Experience userId={user.id} />
            </Suspense>

            <Suspense fallback={<Loader />}>
                <Education userId={user.id} />
            </Suspense>
            
            <Suspense fallback={<Loader />}>
                <Skills userId={user.id} />
            </Suspense>

        </div>
    );
}