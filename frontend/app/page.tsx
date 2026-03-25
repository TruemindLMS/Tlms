
import About from "@/components/signin/onboarding/aboutus"
import Courses from "@/components/signin/onboarding/course"
import Hero from "@/components/signin/onboarding/hero"
import Signin from "@/components/signin/signin"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "team-india ",
  description: " innovation",

}

export default function Home() {
  return (
    <main>
      <Hero />
      <Courses />
      <About />


    </main>
  )
}
