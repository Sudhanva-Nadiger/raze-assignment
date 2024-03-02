"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function DialogWrapper({
    triggerCloseId,
    children,
    trieggerElement,
    title,
    description,
    
}: {
    triggerCloseId: string
    children?: React.ReactNode
    trieggerElement: React.ReactNode,
    title?: string,
    description?: string
    ref?: React.RefObject<HTMLElement>
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trieggerElement}
            </DialogTrigger>
            <DialogContent triggerCloseId={triggerCloseId} className="w-[90%] overflow-y-scroll max-h-[95dvh] rounded sm:max-[420px]">
                {title && (
                    <DialogHeader className="text-start">
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                )}
                {description && (
                    <DialogDescription className="font-normal text-lg">
                        {description}
                    </DialogDescription>
                )}
                {children}
            </DialogContent>
        </Dialog>
    )
}