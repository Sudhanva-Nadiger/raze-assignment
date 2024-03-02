import { fetchUserExperiences } from "@/app/api/actions";
import DialogWrapper from "@/components/ui/DialogWrapper";
import { Inbox, Pencil, PlusIcon } from "lucide-react";
import EditExperienceForm from "./EditExperienceForm";
import AddExperienceForm from "./AddExperienceForm";
import React from "react";

export async function Experience({
    userId
}: {
    userId: number
}) {
    const experience = await fetchUserExperiences(userId);

    const experienceSeggregated: Record<string, Array<Omit<typeof experience[0], "company">>> = {};

    experience.forEach((exp) => {
        const { company, ...rest } = exp;
        experienceSeggregated[company] = [...(experienceSeggregated[company] || []), rest];
    });

    return (
        <div className="bg-blue-100 rounded border p-4 relative space-y-3">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl inline-block">Experiences</h1>
                <DialogWrapper
                    trieggerElement={
                        <span className={"flex items-center justify-center cursor-pointer absolute top-0 w-8 h-8 right-0 m-3 bg-white p-[1px] rounded-full"}>
                            <PlusIcon className="w-8 h-4" />
                        </span>
                    }
                    title="Add Experience"
                    description="You can add your previous job experiences. It will help you to get a better job."
                    triggerCloseId="add-experience-close"
                >
                    <AddExperienceForm close="add-experience-close" userId={userId} />
                </DialogWrapper>
            </div>
            {
                Object.entries(experienceSeggregated).map(([company, positions]) => {
                    if(positions.length === 0) return null;
                    return (
                        <div key={company}>
                            <h1 className="font-semibold text-gray-700 text-lg">{company}</h1>
                            <ol className="relative border-l border-gray-500">
                                {positions.map((pos, index) => (
                                    <React.Fragment key={pos.id}>
                                        <li
                                            className={`${index === positions.length - 1 ? "mb-0" : "mb-4"
                                                } ml-4 relative`}
                                        >
                                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-[1.4rem] border border-white"></div>
                                            <h2 className="font-medium">{pos.title}</h2>
                                            <div className="flex gap-1 items-center">
                                                <span className="text-base">{pos.startDate}</span>
                                                <div className="w-[2px] h-[2px] rounded-full bg-black bg-opacity-40" />
                                                <span>{pos.endDate}</span>
                                            </div>
                                            <p>{pos.description}</p>
                                            <DialogWrapper
                                                trieggerElement={
                                                    <span className={"flex items-center justify-center cursor-pointer absolute top-0 w-8 h-8 -right-4 m-3 bg-white p-[1px] rounded-full"}>
                                                        <Pencil className="w-8 h-4" />
                                                    </span>
                                                }
                                                triggerCloseId={pos.id + "close-edit-position"}
                                                title={"Edit Experience"}
                                            >
                                                <EditExperienceForm close={pos.id + "close-edit-position"} id={pos.id} position={pos} />
                                            </DialogWrapper>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ol>
                        </div>
                    )
                }
                )}

            {experience.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full text-gray-400">
                    <p>Update your experience!!</p>
                    <Inbox />
                </div>
            )}
        </div>
    );
}