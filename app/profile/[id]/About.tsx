import { fetchUserAbout } from "@/app/api/actions";
import DialogWrapper from "@/components/ui/DialogWrapper";
import { Button } from "@/components/ui/button";
import { Inbox, Pencil } from "lucide-react";
import EditAboutForm from "./EditAboutForm";
import Detail from "./Detail";

export default async function About({
    userId
}: {
    userId: number;
}) {
    const data = await fetchUserAbout(userId);

    return (
        <div className="bg-blue-100 rounded border p-4 relative space-y-3">
            <h1 className="font-bold text-xl inline-block">About</h1>
            {!data?.description ?  <div className="flex flex-col items-center justify-center w-full text-gray-400">
                <p>Update your about!!</p>
                <Inbox />
            </div> : <Detail description={data.description} />}
            <DialogWrapper
                trieggerElement={
                    <span className={"flex items-center justify-center cursor-pointer absolute top-0 w-8 h-8 right-0 m-3 bg-white p-[1px] rounded-full"}>
                            <Pencil className="w-8 h-4" />
                    </span>
                }
                description="You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences."
                triggerCloseId="edit-about-close"
                title="Edit About"
            >
                <EditAboutForm description={data?.description || ""} userId={userId} />
            </DialogWrapper>
        </div>
    )
}