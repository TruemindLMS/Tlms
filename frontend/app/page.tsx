
import Courses from "@/components/onboarding/course"
import Hero from "@/components/onboarding/hero"
import { Metadata } from "next"
import InnovationHub from "@/components/onboarding/test"
import Every from "@/components/onboarding/every"
import Fea from "@/components/onboarding/fe"
import Heroo from "@/components/onboarding/heroo"
import Feat from "@/components/onboarding/feat"
import ViralLinkFAQ from '@/app/faq/page'
import Footer from "@/components/onboarding/footer"
import Start from "@/components/onboarding/start"
import ChatButton from "@/components/support/ChatButton"

export const metadata: Metadata = {
  title: "team-india lms ",
  description: " innovation",
  icons: {
    icon: "/img/logo.png",
  },

}

export default function Home() {
  return (
    <main>
      <Hero />
      <Start />
      <Courses />
      <Feat />
      <ViralLinkFAQ />
      <Every />
      <Footer />

      {/* CHAT SUPPORT */}
      <ChatButton />
    </main>
  )
}
