"use client"

import { User } from "@/lib/db";
import { Linkedin, Mail, Phone, WholeWordIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import DialogWrapper from "../../../components/ui/DialogWrapper";
import { Button } from "../../../components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import EditContactForm from "./EditContactForm";

function ContactInfoTile({
    title,
    value,
    icon,
    isLink = false
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    isLink?: boolean;
}) {
    return (
        <div className="flex gap-2">
            {icon}
            <div className="flex flex-col gap-1 w-full break-words">
                <span className="font-semibold">{title}</span>
                {isLink ? (
                    <Link href={value}>
                        <p className="text-blue-500 inline-block w-full text-wrap break-all">{value}</p>
                    </Link>
                ) : (
                    <p className="text-blue-500 w-full inline-block text-wrap break-all">{value}</p>
                )}
            </div>
        </div>
    )
}


export default function ContactInformation({
    user
}: {
    user: User;
}) {
    const ref = useRef<HTMLButtonElement>(null)
    const handleClick = () => {
        document.getElementById("contact-info-dialog-close")?.click();
        ref.current?.click();
    }
    return (
        <div className="flex items-center gap-1">
            <span className="text-gray-400">{user.city}, {user.location}</span>
            <span className="w-[2px] aspect-square rounded-full bg-black inline-block bg-opacity-40" />
            <DialogWrapper
                title={user.firstName + " " + user.lastName}
                description="Contact info"
                trieggerElement={
                    <Button
                        className="font-semibold px-0 text-blue-500 bg-blue-100"
                        variant={"secondary"}
                    >
                        Contact info
                    </Button>
                }
                triggerCloseId="contact-info-dialog-close"
            >
                <div className="flex flex-col space-y-5">
                    <ContactInfoTile
                        title="Your profile"
                        value={"/profile/" + user.id}
                        icon={<Linkedin />}
                        isLink
                    />
                    {
                        user.email && (
                            <ContactInfoTile
                                title="Email"
                                value={user.email}
                                icon={<Mail />}
                            />
                        )
                    }
                    {
                        user.phone && (
                            <ContactInfoTile
                                title="Phone"
                                value={user.phone}
                                icon={<Phone />}
                            />
                        )
                    }
                    {
                        user.website && (
                            <ContactInfoTile
                                title="Website"
                                value={user.website}
                                icon={<WholeWordIcon />}
                                isLink
                            />
                        )
                    }

                    <Button onClick={handleClick}>
                        Edit contact information
                    </Button>
                </div>
            </DialogWrapper>

            <Dialog>
                <DialogTrigger ref={ref}></DialogTrigger>
                <DialogContent className="w-full" triggerCloseId="edit-contact-form-close">
                    <DialogHeader>
                        <DialogTitle>Edit contact information</DialogTitle>
                        <DialogDescription>
                            {user.firstName + " " + user.lastName}
                        </DialogDescription>
                    </DialogHeader>
                    <EditContactForm user={user} />
                </DialogContent>
            </Dialog>

        </div>
    )
}