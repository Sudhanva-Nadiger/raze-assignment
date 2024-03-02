import { fetchUserEducations } from "@/app/api/actions";
import DialogWrapper from "@/components/ui/DialogWrapper";
import { Inbox, Pencil, PlusIcon } from "lucide-react";
import React from "react";
import AddEducationForm from "./AddEducationForm";
import EditEducationForm from "./EditEducationForm";

export async function Education({
    userId
}: {
    userId: number
}) {
    const education = await fetchUserEducations(userId);

    return (
        <div className="bg-blue-100 rounded border p-4 relative space-y-3">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl inline-block">Education</h1>
                <DialogWrapper
                    trieggerElement={
                        <span className={"flex items-center justify-center cursor-pointer absolute top-0 w-8 h-8 right-0 m-3 bg-white p-[1px] rounded-full"}>
                            <PlusIcon className="w-8 h-4" />
                        </span>
                    }
                    title="Add Experience"
                    description="You can add your previous job experiences. It will help you to get a better job."
                    triggerCloseId="add-education-close"
                >
                    <AddEducationForm close="add-education-close" userId={userId} />
                </DialogWrapper>
            </div>

            {
                education.map((edu) => {
                    return (
                        <div key={edu.id} className="relative">
                            <h1 className="font-medium">{edu.school}</h1>
                            <div className="flex items-center gap-1">
                                <span>{edu.degree}</span>
                                <div className="w-[2px] h-[2px] rounded-full bg-black bg-opacity-40" />
                                <span>{edu.fieldOfStudy}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span>{edu.startDate}</span>
                                <div className="w-[2px] h-[2px] rounded-full bg-black bg-opacity-40" />
                                <span>{edu.endDate}</span>
                            </div>
                            <p>{edu.description}</p>
                            <DialogWrapper
                                trieggerElement={
                                    <span className={"flex items-center justify-center cursor-pointer absolute top-0 w-8 h-8 -right-4 m-3 bg-white p-[1px] rounded-full"}>
                                        <Pencil className="w-8 h-4" />
                                    </span>
                                }
                                triggerCloseId={edu.id + "close-edit-education"}
                                title={"Edit Experience"}
                            >
                                <EditEducationForm close={edu.id + "close-edit-education"} id={edu.id} education={edu} />
                            </DialogWrapper>
                        </div>
                    )
                })
            }

            {education.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full text-gray-400">
                    <p>Update your Education!!</p>
                    <Inbox />
                </div>
            )}
        </div>
    );
}