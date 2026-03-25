
import Dashboard from "@/app/dashboard/page"
import About from "@/components/onboarding/aboutus"
import Courses from "@/components/onboarding/course"
import Hero from "@/components/onboarding/hero"
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
