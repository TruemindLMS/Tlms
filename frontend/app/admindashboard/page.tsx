// app/admindashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  BookOpen,
  BarChart3,
  Bell,
  UserCircle,
  Menu,
  LogOut,
  Settings,
  Loader2,
  AlertCircle,
  CheckCircle,
  Award,
  GraduationCap,
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  UserPlus,
  X,
  Calendar,
  Clock,
  UserCheck,
  XCircle,
  Shield,
  ChevronRight,
  ArrowLeft,
  Trash2,
  Edit
} from 'lucide-react'
import { teamApi, getAuthToken, apiClient } from '@/lib/api'

// Types
interface Team {
  id: string
  name: string
  description: string
  memberCount?: number
  createdAt?: string
}

interface TeamMember {
  id: string
  userId: string
  name: string
  email: string
  teamRole: string
  status: string
  phone?: string
  location?: string
  joinDate: string
}

// Function to decode JWT token
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'teams'>('teams')

  const [searchQuery, setSearchQuery] = useState('')
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false)
  const [newTeamData, setNewTeamData] = useState({ name: '', description: '' })
  const [newMemberData, setNewMemberData] = useState({
    userId: '',
    name: '',
    email: '',
    teamRole: 'Member',
    phone: '',
    location: '',
  })

  // Check admin access on mount
  useEffect(() => {
    const checkAdminAccess = () => {
      const token = getAuthToken()

      if (!token) {
        console.warn('No auth token found, redirecting to login')
        router.push('/signin')
        return
      }

      const decodedToken = decodeJWT(token)
      let userRole = 'Student'

      if (decodedToken) {
        userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
          decodedToken['role'] ||
          decodedToken['Role'] ||
          'Student'
      }

      const isAdmin = userRole?.toLowerCase() === 'admin' || userRole?.toLowerCase() === 'administrator'

      console.log('🔍 Admin Access Check:', { userRole, isAdmin })

      if (!isAdmin) {
        setIsAuthorized(false)
        return
      }

      setIsAuthorized(true)
      fetchTeams()
    }

    checkAdminAccess()
  }, [router])

  const fetchTeams = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('📡 Fetching teams...')
      const response = await teamApi.getAll()
      console.log('✅ Teams response:', response)

      // Handle different response structures
      let teamsData = null

      if (response?.data && Array.isArray(response.data)) {
        teamsData = response.data
      } else if (response?.$values && Array.isArray(response.$values)) {
        teamsData = response.$values
      } else if (response?.teams && Array.isArray(response.teams)) {
        teamsData = response.teams
      } else if (Array.isArray(response)) {
        teamsData = response
      }

      if (teamsData && teamsData.length > 0) {
        setTeams(teamsData)
      } else {
        // If no teams from API, show empty state
        setTeams([])
      }
    } catch (err: any) {
      console.error('Failed to fetch teams:', err)
      setTeams([])
    } finally {
      setLoading(false)
    }
  }

  const fetchTeamMembers = async (teamId: string) => {
    setLoading(true)
    try {
      console.log(`📡 Fetching members for team ${teamId}...`)
      const response = await teamApi.getMembers(teamId)
      console.log('✅ Members response:', response)

      let membersData = response
      if (response?.data) membersData = response.data
      if (response?.$values) membersData = response.$values
      if (response?.members) membersData = response.members

      const membersArray = Array.isArray(membersData) ? membersData : []
      setTeamMembers(membersArray)
    } catch (err: any) {
      console.error('Failed to fetch team members:', err)
      setTeamMembers([])
    } finally {
      setLoading(false)
    }
  }

  const handleTeamClick = async (team: Team) => {
    if (!team?.id) {
      console.error('Team has no id:', team)
      return
    }
    setSelectedTeam(team)
    await fetchTeamMembers(team.id)
  }

  const handleBackToTeams = () => {
    setSelectedTeam(null)
    setTeamMembers([])
  }

  const handleCreateTeam = async () => {
    if (!newTeamData.name.trim()) {
      setError('Team name is required')
      return
    }

    setLoading(true)
    setError(null)
    try {
      console.log('📡 Creating team:', newTeamData)
      const newTeam = await teamApi.create({
        name: newTeamData.name,
        description: newTeamData.description
      })
      console.log('✅ Team created:', newTeam)

      let newTeamData_obj = newTeam
      if (newTeam?.data) newTeamData_obj = newTeam.data

      setTeams(prevTeams => [...prevTeams, {
        id: newTeamData_obj?.id || Date.now().toString(),
        name: newTeamData.name,
        description: newTeamData.description,
        memberCount: 0,
        createdAt: new Date().toISOString()
      }])
      setIsCreateTeamModalOpen(false)
      setNewTeamData({ name: '', description: '' })
      setSuccessMessage('Team created successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      console.error('Failed to create team:', err)
      setError(err?.message || 'Failed to create team')
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async () => {
    if (!newMemberData.userId) {
      setError('User ID is required')
      return
    }

    if (!selectedTeam?.id) {
      setError('No team selected')
      return
    }

    setLoading(true)
    setError(null)
    try {
      console.log('📡 Adding member to team:', {
        teamId: selectedTeam.id,
        userId: newMemberData.userId,
        teamRole: newMemberData.teamRole
      })

      const newMember = await teamApi.addMember(selectedTeam.id, {
        userId: newMemberData.userId,
        teamRole: newMemberData.teamRole
      })
      console.log('✅ Member added:', newMember)

      let newMemberData_obj = newMember
      if (newMember?.data) newMemberData_obj = newMember.data

      const newMemberWithDetails: TeamMember = {
        id: newMemberData_obj?.id || Date.now().toString(),
        userId: newMemberData.userId,
        name: newMemberData.name || `User ${newMemberData.userId}`,
        email: newMemberData.email || `${newMemberData.userId}@example.com`,
        teamRole: newMemberData.teamRole,
        status: 'Active',
        phone: newMemberData.phone,
        location: newMemberData.location,
        joinDate: new Date().toISOString()
      }

      setTeamMembers(prev => [...prev, newMemberWithDetails])
      setIsAddMemberModalOpen(false)
      setNewMemberData({ userId: '', name: '', email: '', teamRole: 'Member', phone: '', location: '' })
      setSuccessMessage('Member added successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      console.error('Failed to add member:', err)
      setError(err?.message || 'Failed to add team member')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return

    setLoading(true)
    try {
      // Note: You may need to implement a delete endpoint
      // For now, just remove from local state
      setTeamMembers(prev => prev.filter(m => m.id !== memberId))
      setSuccessMessage('Member removed successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      setError(err?.message || 'Failed to remove member')
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  // Access denied
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You do not have permission to access this page. This area is restricted to administrators only.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Go to User Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Team Detail View (Add Members)
  if (selectedTeam) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {sidebarOpen ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg text-gray-900">Admin Panel</span>
                </div>
              ) : (
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              )}
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 p-4">
              <button
                onClick={handleBackToTeams}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
                {sidebarOpen && <span>Back to Teams</span>}
              </button>
            </nav>
          </div>
        </aside>

        <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedTeam.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{selectedTeam.description || 'No description'}</p>
              </div>
              <button
                onClick={() => setIsAddMemberModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>
          </header>

          <div className="p-6">
            {successMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span>{successMessage}</span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
                <button onClick={() => setError(null)} className="ml-auto">×</button>
              </div>
            )}

            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.status === 'Active').length}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers
                .filter(member =>
                  (member.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                  (member.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
                )
                .map((member) => (
                  <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {member.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{member.name || 'Unknown'}</h3>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Role</span>
                        <span className="font-medium">{member.teamRole}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Status</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${member.status === 'Active' ? 'bg-green-100 text-green-700' :
                          member.status === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {member.status}
                        </span>
                      </div>
                      {member.phone && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Phone</span>
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.location && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Location</span>
                          <span>{member.location}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Joined</span>
                        <span>{new Date(member.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {teamMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No members in this team yet</p>
                <button
                  onClick={() => setIsAddMemberModalOpen(true)}
                  className="mt-4 text-primary hover:text-primary/80 font-medium"
                >
                  Add your first member
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Add Member Modal */}
        {isAddMemberModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Add Team Member to {selectedTeam.name}</h2>
                <button onClick={() => setIsAddMemberModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID *</label>
                  <input
                    type="text"
                    value={newMemberData.userId}
                    onChange={(e) => setNewMemberData({ ...newMemberData, userId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter user ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newMemberData.name}
                    onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newMemberData.email}
                    onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={newMemberData.phone}
                    onChange={(e) => setNewMemberData({ ...newMemberData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
                  <input
                    type="text"
                    value={newMemberData.location}
                    onChange={(e) => setNewMemberData({ ...newMemberData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Role</label>
                  <select
                    value={newMemberData.teamRole}
                    onChange={(e) => setNewMemberData({ ...newMemberData, teamRole: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Member">Member</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Contributor">Contributor</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsAddMemberModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={handleAddMember} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Add Member</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Main Teams List View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-gray-900">Admin Panel</span>
              </div>
            ) : (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 text-white" />
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 rounded-lg">
              <Menu className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('teams')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === 'teams' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Users className="w-5 h-5" />
              {sidebarOpen && <span>Teams</span>}
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span>Settings</span>}
            </button>
            <button
              onClick={() => {
                localStorage.clear()
                router.push('/signin')
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto">×</button>
            </div>
          )}

          {/* Teams Section */}
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsCreateTeamModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                <span>Create Team</span>
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => handleTeamClick(team)}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{team.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{team.description || 'No description'}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{team.memberCount || 0} members</span>
                      </div>
                      {team.createdAt && (
                        <div className="text-sm text-gray-500">
                          {new Date(team.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {teams.length === 0 && !loading && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No teams found</p>
                <button
                  onClick={() => setIsCreateTeamModalOpen(true)}
                  className="mt-4 text-primary hover:text-primary/80 font-medium"
                >
                  Create your first team
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Team Modal */}
      {isCreateTeamModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create New Team</h2>
              <button onClick={() => setIsCreateTeamModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Name *</label>
                <input
                  type="text"
                  value={newTeamData.name}
                  onChange={(e) => setNewTeamData({ ...newTeamData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter team name"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTeamData.description}
                  onChange={(e) => setNewTeamData({ ...newTeamData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                  placeholder="Enter team description"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsCreateTeamModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleCreateTeam} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Create Team</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}