
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

export const metadata: Metadata = {
  title: "team-india ",
  description: " innovation",

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

    </main>
  )
}
