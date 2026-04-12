
import Dashh from "@/components/dash/dashh"

import { Metadata } from "next"


export const metadata: Metadata = {
    title: "team-india lms ",
    description: " innovation",
    icons: {
        icon: "/img/logo.png",
    },

}

export default function Dashboard() {
    return (
        <main>
            <Dashh />
        </main>
    )
}
