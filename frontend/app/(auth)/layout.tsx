import type { Metadata } from 'next'
import Topnav from "@/components/onboarding/topnav"

export const metadata: Metadata = {
    title: 'team-india',
    description: 'team-india',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" >
            <body>
                <Topnav />
                {children}
            </body>
        </html>
    )
}
