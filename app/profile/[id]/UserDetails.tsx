import { User } from "@/lib/db";
import { Send } from "lucide-react";
import { Button } from "../../../components/ui/button";
import ContactInformation from "./ContactDetail";


export default function UserDetails({
    user
}: {
    user: User;
}) {
    return (
        <div className="my-8 px-4 max-w[80%]">
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <h1 className="font-bold text-xl inline-block">{user.firstName + " " + user.lastName}</h1>
                    <span className="w-[2px] aspect-square rounded-full bg-black inline-block bg-opacity-40" />
                    <span className="text-gray-500">{user.pronoun}</span>
                </div>
                <p className="text-wrap text-gray-500">{user.headline}</p>
            </div>
            <ContactInformation user={user} />
            <div className="font-light text-sm text-blue-500 mb-1">
                <span>500+ connections</span>
            </div>
            <div className="flex space-x-2 items-center my-2">
                <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center">
                    <span className="text-sm">SN</span>
                </div>
                <p className="text-gray-400">201 Mutual connections...</p>
            </div>
            <div className="flex space-x-2">
                <Button variant={"outline"} className="flex gap-1 rounded-3xl bg-blue-500">
                    <Send className="h-4 aspect-square" />
                    <span>Message</span>
                </Button>
                <Button variant={"outline"} className="flex gap-1 rounded-3xl bg-blue-500">
                    <span>More</span>
                </Button>
            </div>
        </div>
    )
}