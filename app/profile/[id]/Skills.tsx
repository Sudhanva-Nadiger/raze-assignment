import { fetchUserSkiils } from "@/app/api/actions";
import DialogWrapper from "@/components/ui/DialogWrapper";
import { Inbox, Pencil, PlusIcon } from "lucide-react";
import React from "react";
import AddEducationForm from "./AddEducationForm";
import EditEducationForm from "./EditEducationForm";
import AddSkillForm from "./AddSkillForm";
import EditSkillForm from "./EditSkillForm";

export async function Skills({
    userId
}: {
    userId: number
}) {
    const skills = await fetchUserSkiils(userId);

    return (
        <div className="bg-blue-100 rounded border p-4 relative space-y-3">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl inline-block">Skills</h1>
                <DialogWrapper
                    trieggerElement={
                        <span className={"flex items-center justify-center cursor-pointer absolute top-0 w-8 h-8 right-0 m-3 bg-white p-[1px] rounded-full"}>
                            <PlusIcon className="w-8 h-4" />
                        </span>
                    }
                    title="Add Skill"
                    description="Add your skills to your profile"
                    triggerCloseId="add-skill-close"
                >
                    <AddSkillForm close="add-skill-close" userId={userId} />
                </DialogWrapper>
            </div>

            {
                skills.map((skill) => {
                    return (
                        <div key={skill.id} className="relative w-full min-h-8 flex flex-col gap-2">
                            <h2>{skill.skill}</h2>
                            <p>{skill.description}</p>
                            <DialogWrapper
                                trieggerElement={
                                    <span className={"flex items-center justify-center cursor-pointer absolute -top-4 w-8 h-8 -right-4 m-3 bg-white p-[1px] rounded-full"}>
                                        <Pencil className="w-8 h-4" />
                                    </span>
                                }
                                triggerCloseId={skill.id + "close-edit-skill"}
                                title={"Edit Experience"}
                            >
                                <EditSkillForm close={skill.id + "close-edit-skill"} id={skill.id} skill={skill} />
                            </DialogWrapper>
                            <hr className="mt-2 bg-white h-[1px]" />
                        </div>
                    )
                })
            }

            {skills.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full text-gray-400">
                    <p>Update your skills</p>
                    <Inbox />
                </div>
            )}
        </div>
    );
}