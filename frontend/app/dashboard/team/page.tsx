'use client'

import { useState, useEffect } from 'react'
import { UsersRound, Plus, UserPlus, Star, ChevronRight, Search, LogIn } from 'lucide-react'
import { TeamBreadCrumb } from './teambreadcrumb'
import TeamCard from '@/components/ui/team-card'

// Types
interface ExistingTeam {
  id: string
  name: string
  memberCount: number
  description: string
  isFavorite?: boolean
  isOpenGroup?: boolean
}

const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Ishioma Chibuogwu ',
    role: 'Team Lead PM',
    avatarUrl: '/img/sarah.jpg',
  },
  {
    id: '2',
    name: 'Esther Benson',
    role: 'Assistant Team lead PM',
    avatarUrl: '/img/pelumi.jpg',
  },
  {
    id: '3',
    name: 'Prince Egenti Obi ',
    role: 'Frontend Developer',
    avatarUrl: '/img/bankole.jpg',
  },
  {
    id: '4',
    name: 'Rilwanu Idris',
    role: 'Frontend Developer',
    avatarUrl: '/img/david.jpg',
  },
  {
    id: '5',
    name: 'Olaniru Hebron O.',
    role: 'Frontend Developer',
    avatarUrl: '/img/john.jpg',
  },
  {
    id: '6',
    name: 'Arowolo Tunmise David',
    role: 'Frontend Developer',
    avatarUrl: '/img/david.jpg',
  },
  {
    id: '7',
    name: 'Nathaniel Idyege ',
    role: 'Frontend Developer',
    avatarUrl: '/img/john.jpg',
  },
  {
    id: '8',
    name: 'Ismail Abdulrahman ',
    role: 'Frontend Developer',
    avatarUrl: '/img/david.jpg',
  },
  {
    id: '9',
    name: 'Shittu Qudus ',
    role: 'Frontend Developer',
    avatarUrl: '/img/john.jpg',
  },
  {
    id: '10',
    name: 'Stanley Ikemefuna',
    role: 'Backend Developer',
    avatarUrl: '/img/david.jpg',
  },
  {
    id: '11',
    name: 'Oyetunde Samuel',
    role: 'Backend Developer',
    avatarUrl: '/img/john.jpg',
  },
  {
    id: '12',
    name: 'Opadijo Idris',
    role: 'Backend Developer',
    avatarUrl: '/img/david.jpg',
  },

  {
    id: '13',
    name: 'Umehea Chukwuemeka Paul',
    role: 'Graphic Designer',
    avatarUrl: '/img/john.jpg',
  },

  {
    id: '14',
    name: 'Ebeh Emmanuel Chikwere',
    role: 'Social Media Manager',
    avatarUrl: '/img/david.jpg',
  },
  {
    id: '15',
    name: 'Akintoye Ayomiposi ',
    role: 'Social Media Manager',
    avatarUrl: '/img/tolu.jpg',
  },

  {
    id: '16',
    name: 'Stephen Etim ',
    role: 'UI/UX Designer',
    avatarUrl: '/img/david.jpg',
  },
  {
    id: '17',
    name: 'Mojisola Olokede  ',
    role: 'UI/UX Designer',
    avatarUrl: '/img/tolu.jpg',
  },
  {
    id: '18',
    name: 'Olajide Olamide  ',
    role: 'UI/UX Designer',
    avatarUrl: '/img/john.jpg',
  },
  {
    id: '19',
    name: 'Suleiman Samuel Ojochegbe',
    role: 'UI/UX Designer',
    avatarUrl: '/img/david.jpg',
  },
]


const generateAllTeams = (): ExistingTeam[] => {
  const teamNames = [
    'India', 'Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'Juliet',
    'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango',
    'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'
  ]

  return teamNames.map((name, index) => ({
    id: String(index + 1),
    name: `Team ${name}`,
    memberCount: name === 'India' ? 19 : 0,
    description: `${name} we the best`,
    isFavorite: name === 'India',
    isOpenGroup: name === 'India',
  }))
}

const EXISTING_TEAMS: ExistingTeam[] = generateAllTeams()

export default function TeamPage() {
  const [teams, setTeams] = useState<ExistingTeam[]>(EXISTING_TEAMS)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamDescription, setNewTeamDescription] = useState('')
  const [selectedTeam, setSelectedTeam] = useState<ExistingTeam | null>(null)
  const [requestingTeam, setRequestingTeam] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      const newTeam: ExistingTeam = {
        id: Date.now().toString(),
        name: newTeamName,
        memberCount: 1,
        description: newTeamDescription || 'New team',
        isFavorite: false,
        isOpenGroup: false,
      }
      setTeams([...teams, newTeam])
      setNewTeamName('')
      setNewTeamDescription('')
      setIsCreateModalOpen(false)
    }
  }

  const toggleFavorite = (teamId: string) => {
    setTeams(teams.map(team =>
      team.id === teamId
        ? { ...team, isFavorite: !team.isFavorite }
        : team
    ))
  }

  const handleRequestToJoin = (teamName: string) => {
    setRequestingTeam(teamName)
    setTimeout(() => {
      alert(`Request to join ${teamName} sent!`)
      setRequestingTeam(null)
    }, 500)
  }


  if (selectedTeam && selectedTeam.isOpenGroup) {
    return (
      <section className="bg-cover ml-5 lg:ml-1 md:ml-5 bg-center bg-no-repeat pr-8 min-h-screen" style={{ backgroundImage: "url('/img/tback.png')" }}>
        {/* Back button */}
        <button
          onClick={() => setSelectedTeam(null)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Back to teams</span>
        </button>

        {/* Team Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-1 uppercase">
            {selectedTeam.name}
          </h1>
          <p className="text-gray-500 text-sm">{selectedTeam.description}</p>
        </div>

        {/* Add team members button */}
        <button className="mb-6 flex items-center gap-2 text-primary-text hover:text-opacity-80 transition-colors">
          <UserPlus size={18} />
          <span className="font-medium">Add team members</span>
        </button>

        {/* Team Members */}
        <div className="flex items-center gap-2 mb-6">
          <UsersRound size={22} className="text-primary-text" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Team Members
          </h2>
          <span className="text-gray-400 font-medium">({TEAM_MEMBERS.length})</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard
              key={member.id}
              name={member.name}
              role={member.role}
              avatarUrl={member.avatarUrl}

            />
          ))}
        </div>
      </section>
    )
  }

  // Main Teams List View
  return (
    <section className="bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat pr-8 min-h-screen" style={{ backgroundImage: "url('/img/tback.png')" }}>

      {/* Header */}
      <div className="mb-8">
        <TeamBreadCrumb />
        <div className="flex justify-between items-start mt-4 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              TEAM
            </h1>
            <p className="text-gray-500 text-sm mt-1">team page coming soon demo live</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-primary-text text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Plus size={18} />
              <span>Create a team</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <UserPlus size={18} />
              <span>Join a team ▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-text focus:border-transparent bg-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
      </div>

      {/* Existing Teams Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <UsersRound size={22} className="text-primary-text" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Existing teams
          </h2>
          <span className="text-gray-400 font-medium">({filteredTeams.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-text to-primary-500 rounded-xl flex items-center justify-center shadow-lg">
                    <UsersRound className="w-6 h-6 text-white" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(team.id)
                    }}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    <Star className={`w-5 h-5 ${team.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{team.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{team.description}</p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <UsersRound className="w-4 h-4" />
                    <span>{mounted ? `${team.memberCount} member${team.memberCount !== 1 ? 's' : ''}` : `${team.memberCount} members`}</span>
                  </div>

                  {/* Conditional Button: Open Group for Team India, Request to Join for others */}
                  {team.isOpenGroup ? (
                    <button
                      onClick={() => setSelectedTeam(team)}
                      className="text-primary-text hover:text-opacity-80 text-sm font-medium flex items-center gap-1"
                    >
                      <UsersRound className="w-3 h-3" />
                      <span>Open Group</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRequestToJoin(team.name)}
                      disabled={requestingTeam === team.name}
                      className="text-gray-500 hover:text-primary-text text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      <LogIn className="w-3 h-3" />
                      <span>{requestingTeam === team.name ? 'Requesting...' : 'Request to join'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <UsersRound className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No teams found</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 text-primary-text hover:text-opacity-80 font-medium"
            >
              Create your first team
            </button>
          </div>
        )}
      </div>

      {/* Create Team Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create a new team</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Name</label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g., Engineering Team"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-text focus:border-transparent bg-white dark:bg-gray-900"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (optional)</label>
                <textarea
                  value={newTeamDescription}
                  onChange={(e) => setNewTeamDescription(e.target.value)}
                  placeholder="What's this team about?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-text focus:border-transparent bg-white dark:bg-gray-900 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTeam}
                className="px-4 py-2 bg-primary-text text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Team Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Join a team</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Enter the team code or invitation link to join an existing team.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Code or Invite Link</label>
              <input
                type="text"
                placeholder="e.g., TEAM-CODE-123 or https://..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-text focus:border-transparent bg-white dark:bg-gray-900"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Join request sent!')
                  setIsAddModalOpen(false)
                }}
                className="px-4 py-2 bg-primary-text text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Join Team
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}