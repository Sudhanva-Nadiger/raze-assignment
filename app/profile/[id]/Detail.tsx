"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Detail({
    description
}: {
    description: string
}) {
    const[showFull, setShowFull] = useState(false);

    const initialData = description.slice(0, 200);

    return (
        <div className="text-sm text-gray-500">
            {!showFull ? <p>
                {initialData}
                <Button variant={"link"} onClick={() => setShowFull(true)}>See more...</Button>
            </p> : <p>
                {description}
            </p>}
        </div>
    )
}