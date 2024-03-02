import DialogWrapper from "@/components/ui/DialogWrapper";
import Image from "next/image";

import { updateUserBgImage, updateUserProfileImage } from '@/app/api/actions';

import Uploader from "@/components/ui/Uploader";
import { Pencil } from "lucide-react";

type Props = {
    userId: number;
    profileImage: string | null
    backgroundImage: string | null
}

export default function UserAvatar({
    userId,
    profileImage,
    backgroundImage
}: Props) {

    profileImage = profileImage || "/avatar.jpg";
    backgroundImage = backgroundImage || "/placeholder.png";
    return (
        <div className="relative w-full">
            <div className="w-full h-[200px] rounded-tl rounded-tr relative">
                <Image
                    src={backgroundImage}
                    alt="bg of the author"
                    width={500}
                    height={500}
                    className="rounded-tl w-full h-full object-cover rounded-tr"
                />
                <DialogWrapper 
                    trieggerElement={
                        <span className={"flex items-center justify-center cursor-pointer absolute top-0 w-8 h-8 right-0 m-3 bg-white p-[1px] rounded-full"}>
                            <Pencil className="w-8 h-4" />
                        </span>
                    }
                    title="Upload background image" triggerCloseId="close-dialog-bg-image">
                    <Uploader
                        updateImage={updateUserBgImage}
                        triggerCloseId={"close-dialog-bg-image"}
                        userId={userId}
                        imageUrl={backgroundImage}
                    />
                </DialogWrapper>
            </div>
            <div className="absolute left-0 transform translate-x-[20%] -translate-y-[80%]">
                <Image
                    src={profileImage}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                    className="w-40 object-cover aspect-square rounded-full ring-4 ring-slate-200"
                />
                <DialogWrapper
                    trieggerElement={
                        <span className={"flex items-center justify-center cursor-pointer absolute w-8 h-8 right-0 m-3 p-[1px] rounded-full left-0 transform translate-x-[360%] bg-blue-100 -translate-y-[200%]"}>
                            <Pencil className="w-8 h-4" />
                        </span>
                    }
                    title="Upload profile image"
                    triggerCloseId="close-dialog-profile-image">
                    <Uploader
                        updateImage={updateUserProfileImage}
                        triggerCloseId={"close-dialog-profile-image"}
                        userId={userId}
                        imageUrl={profileImage}
                    />
                </DialogWrapper>
            </div>
        </div>
    );
}