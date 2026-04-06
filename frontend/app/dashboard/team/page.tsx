'use client'
import { UsersRound } from 'lucide-react'
import { TeamBreadCrumb } from './teambreadcrumb'
import TeamCard from '@/components/ui/team-card'

const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Bankole Shittu',
    role: 'UI/UX Designer',
    avatarUrl: '/img/bankole.jpg',
    isCurrentUser: true,
  },
  {
    id: '2',
    name: 'John Stephen',
    role: 'Frontend Developer',
    avatarUrl: '/img/john.jpg',
  },
  {
    id: '3',
    name: 'Sarah Awolowo',
    role: 'Backend Developer',
    avatarUrl: '/img/sarah.jpg',
  },
  {
    id: '4',
    name: 'David Nwachukwu',
    role: 'Product Manager',
    avatarUrl: '/img/david.jpg',
  },
  {
    id: '5',
    name: 'Tolu Ayodele',
    role: 'Social Media Marketer',
    avatarUrl: '/img/tolu.jpg',
  },
  {
    id: '6',
    name: 'Pelumi Fashola',
    role: 'UI/UX Designer',
    avatarUrl: '/img/pelumi.jpg',
  },
]

export default function TeamPage() {
  return (
    <section className="bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat pr-8" style={{ backgroundImage: "url('/img/tback.png')" }}>

      {/* Header */}
      <div className="mb-10 flex justify-between items-start">
        <div>
          <TeamBreadCrumb />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-1">
            Team India
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-sm">UI/UX Design</p>
            <span className="bg-gray-400 h-1 w-1 rounded-full" />
            <p className="text-gray-500 text-sm">Mentor - Tunde</p>
          </div>
        </div>

        <button className="bg-primary-fade text-primary-text text-sm font-medium py-2 px-5 rounded-full mt-1">
          Active Team
        </button>
      </div>

      {/* Team Members heading */}
      <div className="flex items-center gap-2 mb-6">
        <UsersRound size={22} className="text-primary-text" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Team Members
        </h2>
        <span className="text-gray-400 font-medium">({TEAM_MEMBERS.length})</span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {TEAM_MEMBERS.map((member) => (
          <TeamCard
            key={member.id}
            name={member.name}
            role={member.role}
            avatarUrl={member.avatarUrl}
            isCurrentUser={member.isCurrentUser}
          />
        ))}
      </div>
    </section>
  )
}