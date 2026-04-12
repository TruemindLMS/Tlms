'use client'

import { useState } from 'react'
import { UsersRound, Plus, UserPlus, Star, ChevronRight, MoreHorizontal, Search } from 'lucide-react'
import { TeamBreadCrumb } from './teambreadcrumb'
import TeamCard from '@/components/ui/team-card'

// Types
interface ExistingTeam {
  id: string
  name: string
  memberCount: number
  description: string
  isFavorite?: boolean
}

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

const EXISTING_TEAMS: ExistingTeam[] = [
  { id: '1', name: 'Team India', memberCount: 1, description: 'India\'s top team', isFavorite: true },
  { id: '2', name: 'Team India', memberCount: 2, description: 'India\'s top team', isFavorite: false },
  { id: '3', name: 'Team India', memberCount: 3, description: 'India\'s top team', isFavorite: false },
  { id: '4', name: 'Team India', memberCount: 4, description: 'India\'s top team', isFavorite: false },
]

export default function TeamPage() {
  const [teams, setTeams] = useState<ExistingTeam[]>(EXISTING_TEAMS)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamDescription, setNewTeamDescription] = useState('')
  const [selectedTeam, setSelectedTeam] = useState<ExistingTeam | null>(null)

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      const newTeam: ExistingTeam = {
        id: Date.now().toString(),
        name: newTeamName,
        memberCount: 0,
        description: newTeamDescription || 'New team',
        isFavorite: false,
      }
      setTeams([...teams, newTeam])
      setNewTeamName('')
      setNewTeamDescription('')
      setIsCreateModalOpen(false)
    }
  }

  const handleAddMember = (teamId: string) => {
    setTeams(teams.map(team =>
      team.id === teamId
        ? { ...team, memberCount: team.memberCount + 1 }
        : team
    ))
  }

  const toggleFavorite = (teamId: string) => {
    setTeams(teams.map(team =>
      team.id === teamId
        ? { ...team, isFavorite: !team.isFavorite }
        : team
    ))
  }

  // Team Detail View
  if (selectedTeam) {
    return (
      <section className="bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat pr-8 min-h-screen" style={{ backgroundImage: "url('/img/tback.png')" }}>
        {/* Back button */}
        <button
          onClick={() => setSelectedTeam(null)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Back to Teams</span>
        </button>

        {/* Team Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-1">
            {selectedTeam.name}
          </h1>
          <p className="text-gray-500 text-sm">{selectedTeam.description}</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <UsersRound size={18} className="text-primary-text" />
              <span className="text-gray-600 text-sm">{selectedTeam.memberCount} members</span>
            </div>
          </div>
        </div>

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
              isCurrentUser={member.isCurrentUser}
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
        <div className="flex justify-between items-start mt-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              TEAM
            </h1>
            <p className="text-gray-500 text-sm mt-1">team page coming soon demo live</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create team</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-text text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add a team</span>
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
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
              onClick={() => setSelectedTeam(team)}
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
                    <span>{team.memberCount} member{team.memberCount !== 1 ? 's' : ''}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddMember(team.id)
                    }}
                    className="text-primary-text hover:text-opacity-80 text-sm font-medium flex items-center gap-1"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
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

      {/* Current Team Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <UsersRound size={22} className="text-primary-text" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Team India
          </h2>
          <span className="text-gray-400 font-medium">({TEAM_MEMBERS.length} members)</span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">India's top team</h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-500 text-sm">UI/UX Design</p>
                <span className="bg-gray-400 h-1 w-1 rounded-full" />
                <p className="text-gray-500 text-sm">Mentor - Tunde</p>
              </div>
            </div>
            <button className="bg-primary-fade text-primary-text text-sm font-medium py-2 px-5 rounded-full">
              Active Team
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
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
        </div>
      </div>

      {/* Create Team Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-primary-700 bg-opacity-50 flex items-center justify-center z-50 p-4">
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

      {/* Add Team Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-primary-7s00 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add existing team</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Enter the team code or invitation link to join an existing team.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Code or Invite Link</label>
              <input
                type="text"
                placeholder="e.g., TEAM-CODE-123 or https://..."
                className="w-full px-3 py-2 border border-gray  -300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-text focus:border-transparent bg-white dark:bg-gray-900"
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
                onClick={() => setIsAddModalOpen(false)}
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