import { getAllUsers } from "@/app/api/actions";
import Image from "next/image";
import Link from "next/link";

export default async function AllUsers() {
    const users = await getAllUsers();
    return (
        <div className="w-full flex flex-col items-center m-4">
            <h1 className="text-center font-bold">All users</h1>
            <div className="flex flex-col gap-3 m-2">
                {
                    users.map(user => (
                        <Link href={`/profile/${user.id}`} key={user.id}>
                            <div className="flex gap-4 w-[300px] bg-blue-300 rounded-sm border border-blue-500 p-2">
                                <Image
                                    src={user.profileImage || "/avatar.jpg"}
                                    alt={user.firstName + " " + user.lastName}
                                    width={50}
                                    height={50}
                                    className="rounded-full w-[50px] h-[50px]"
                                />
                                <div className="flex flex-col">
                                    <h2 className="font-medium">{user.firstName + " " + user.lastName}</h2>
                                    <p>{user.headline}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}