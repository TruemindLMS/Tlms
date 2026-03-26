
import Courses from "@/components/onboarding/course"
import Start from "@/components/onboarding/start"
import Footer from "@/components/onboarding/footer"
import Hero from "@/components/onboarding/hero"
import Signin from "@/components/signin/signin"
import Fea from "@/components/onboarding/fe"
import { Metadata } from "next"
import InnovationHub from "@/components/onboarding/test"

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
      <Fea />
      <InnovationHub />
      <Footer />


    </main>
  )
}
