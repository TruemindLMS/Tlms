// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Enable mock mode for testing when backend is unavailable
const USE_MOCK = true // Set to false when backend is ready

// Helper to safely parse JSON responses
async function parseResponse(response: Response) {
    const text = await response.text()
    try {
        return text ? JSON.parse(text) : {}
    } catch {
        return { message: text || response.statusText }
    }
}

// ==================== Auth DTOs ====================

export interface LoginResponse {
    token: string
    refreshToken: string
    user: {
        id: string
        email: string
        firstName: string
        lastName: string
        role: string
    }
    message?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    role: string
}

export interface ApiResponse {
    success?: boolean
    message?: string
    token?: string
    refreshToken?: string
    user?: any
}

// ==================== Course DTOs ====================

export interface CreateLessonRequestDto {
    title: string
    content: string
    duration?: number
}

export interface CreateModuleRequestDto {
    title: string
    orderIndex: number
    lessons: CreateLessonRequestDto[]
}

export interface CreateCourseRequestDto {
    title: string
    description: string
    modules: CreateModuleRequestDto[]
}

export interface UpdateLessonRequestDto {
    title?: string
    content?: string
    duration?: number
}

export interface UpdateModuleRequestDto {
    title?: string
    orderIndex?: number
    lessons?: CreateLessonRequestDto[]
}

export interface UpdateCourseRequestDto {
    title?: string
    description?: string
    modules?: CreateModuleRequestDto[]
}

export interface Lesson {
    id: string
    title: string
    content: string
    orderIndex: number
    duration?: number
    moduleId?: string
    isCompleted?: boolean
    createdAt?: string
    updatedAt?: string
}

export interface Module {
    id: string
    title: string
    orderIndex: number
    lessons: Lesson[]
    courseId?: string
    createdAt?: string
    updatedAt?: string
}

export interface Course {
    id: string
    title: string
    description: string
    modules: Module[]
    category?: string
    level?: string
    price?: number
    duration?: string
    imageUrl?: string
    enrolledCount?: number
    rating?: number
    instructor?: string
    createdAt?: string
    updatedAt?: string
}

// ==================== Persistent Mock Data ====================

// Helper to load users from localStorage
function loadMockUsers(): Map<string, any> {
    if (typeof window === 'undefined') return new Map()

    const savedUsers = localStorage.getItem('mockUsers')
    if (savedUsers) {
        const users = JSON.parse(savedUsers)
        return new Map(Object.entries(users))
    }

    // Initialize with default test user
    const defaultUsers = {
        'test@example.com': {
            id: '1',
            email: 'test@example.com',
            password: 'Test123!',
            firstName: 'Test',
            lastName: 'User',
            role: 'individual'
        }
    }
    localStorage.setItem('mockUsers', JSON.stringify(defaultUsers))
    return new Map(Object.entries(defaultUsers))
}

// Helper to save users to localStorage
function saveMockUsers(users: Map<string, any>) {
    if (typeof window === 'undefined') return
    const usersObj = Object.fromEntries(users)
    localStorage.setItem('mockUsers', JSON.stringify(usersObj))
}

// Load persistent mock users
const mockUsers = loadMockUsers()

// Mock reset tokens storage (session only, fine to not persist)
const mockResetTokens = new Map()

// Mock profile data
const mockProfile = {
    id: '1',
    firstName: 'Bankole',
    lastName: 'Shittu',
    email: 'bankole@talentflow.com',
    role: 'UI/UX Designer',
    jobTitle: 'UI/UX Intern',
    bio: 'Passionate UI/UX designer with 3 years of experience',
    enrolledCourses: [],
    completedCourses: [],
    overallProgress: 65,
    profilePicture: null
}

// Helper function to convert CreateModuleRequestDto to Module
function convertToModule(moduleData: CreateModuleRequestDto, courseId?: string): Module {
    return {
        id: `m${Date.now()}_${Math.random()}`,
        title: moduleData.title,
        orderIndex: moduleData.orderIndex,
        lessons: moduleData.lessons.map((l, idx) => ({
            id: `l${Date.now()}_${idx}_${Math.random()}`,
            title: l.title,
            content: l.content,
            orderIndex: idx,
            duration: l.duration,
            moduleId: courseId
        })),
        courseId: courseId
    }
}

// Mock courses data
const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Advanced Figma Design and Prototype',
        description: 'Master Figma design tools and create stunning prototypes.',
        category: 'Design',
        level: 'Beginner',
        duration: '8 hours',
        imageUrl: '/img/figma-course.jpg',
        enrolledCount: 1245,
        rating: 4.8,
        instructor: 'Prof. Steven Eason',
        modules: [
            {
                id: 'm1',
                title: 'Introduction to Figma',
                orderIndex: 1,
                lessons: [
                    { id: 'l1', title: 'Getting Started with Figma', content: 'Learn the basics', orderIndex: 1, duration: 15 },
                    { id: 'l2', title: 'Tools Overview', content: 'Overview of tools', orderIndex: 2, duration: 20 }
                ]
            }
        ]
    },
    {
        id: '2',
        title: 'Build Classic HTML and CSS Codes',
        description: 'Learn to build responsive websites.',
        category: 'Development',
        level: 'Intermediate',
        duration: '12 hours',
        imageUrl: '/img/html-course.jpg',
        enrolledCount: 892,
        rating: 4.9,
        instructor: 'Prof. Sarah Johnson',
        modules: []
    },
    {
        id: '3',
        title: 'Intro To Digital Marketing',
        description: 'Learn digital marketing strategies.',
        category: 'Marketing',
        level: 'Beginner',
        duration: '10 hours',
        imageUrl: '/img/marketing-course.jpg',
        enrolledCount: 2156,
        rating: 4.7,
        instructor: 'Prof. Michael Chen',
        modules: []
    }
]

// ==================== Auth API ====================

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    if (USE_MOCK) {
        console.log('🔐 Mock login for:', email)
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Reload users from localStorage to ensure we have latest
        const users = loadMockUsers()
        const user = users.get(email)

        if (!user || user.password !== password) {
            throw new Error('Invalid email or password')
        }

        const mockResponse: LoginResponse = {
            token: 'mock-jwt-token-12345',
            refreshToken: 'mock-refresh-token-67890',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            message: 'Login successful'
        }

        localStorage.setItem('authToken', mockResponse.token)
        localStorage.setItem('refreshToken', mockResponse.refreshToken)
        localStorage.setItem('user', JSON.stringify(mockResponse.user))
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userFullName', `${user.firstName} ${user.lastName}`)
        localStorage.setItem('userEmail', user.email)
        localStorage.setItem('userRole', user.role)

        return mockResponse
    }

    try {
        const response = await fetch(`${API_BASE_URL}/Auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await parseResponse(response)
        if (!response.ok) throw new Error(data.message || 'Login failed')
        if (data.token) {
            localStorage.setItem('authToken', data.token)
            if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('userFullName', `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim())
                localStorage.setItem('userEmail', data.user.email)
                localStorage.setItem('userRole', data.user.role)
            }
            localStorage.setItem('isAuthenticated', 'true')
        }
        return data
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

export async function registerUser(userData: RegisterRequest): Promise<ApiResponse> {
    if (USE_MOCK) {
        console.log('📝 Mock registration for:', userData.email)
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Load current users
        const users = loadMockUsers()

        if (users.has(userData.email)) {
            throw new Error('User with this email already exists')
        }

        const newUser = {
            id: String(users.size + 1),
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role
        }

        users.set(userData.email, newUser)

        // Save back to localStorage
        const usersObj = Object.fromEntries(users)
        localStorage.setItem('mockUsers', JSON.stringify(usersObj))

        localStorage.setItem('pendingUserData', JSON.stringify({
            fullName: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: userData.role
        }))

        console.log('✅ User registered and saved to localStorage:', newUser.email)

        return { success: true, message: 'Registration successful. Please verify your email.' }
    }
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })
        const data = await parseResponse(response)
        if (!response.ok) {
            let errorMessage = data.message || 'Registration failed'
            if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                errorMessage = data.errors[0]
            }
            throw new Error(errorMessage)
        }
        return data
    } catch (error) {
        console.error('Registration error:', error)
        throw error
    }
}

export async function sendOtp(email: string): Promise<ApiResponse> {
    if (USE_MOCK) {
        console.log('📧 Mock OTP sent to:', email)
        await new Promise(resolve => setTimeout(resolve, 500))
        localStorage.setItem('mockOtp', '123456')
        localStorage.setItem('otpEmail', email)
        return { success: true, message: 'OTP sent successfully. Use code: 123456' }
    }
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
        const data = await parseResponse(response)
        if (!response.ok) throw new Error(data.message || 'Failed to send OTP')
        return data
    } catch (error) {
        console.error('Send OTP error:', error)
        throw error
    }
}

export async function verifyOtp(email: string, otp: string): Promise<ApiResponse> {
    if (USE_MOCK) {
        console.log('🔐 Verifying OTP for:', email)
        await new Promise(resolve => setTimeout(resolve, 500))
        if (otp === '123456' || (otp.length === 6 && /^\d+$/.test(otp))) {
            // Load users to get the registered user
            const users = loadMockUsers()
            let user = users.get(email)

            if (!user) {
                // Try to get from pending registration
                const pendingData = localStorage.getItem('pendingUserData')
                if (pendingData) {
                    const parsed = JSON.parse(pendingData)
                    user = {
                        id: String(users.size + 1),
                        email: email,
                        firstName: parsed.fullName?.split(' ')[0] || email.split('@')[0],
                        lastName: parsed.fullName?.split(' ').slice(1).join(' ') || '',
                        role: parsed.role || 'individual',
                        password: 'temp' // Will be updated during registration
                    }
                } else {
                    user = {
                        id: '1',
                        email: email,
                        firstName: email.split('@')[0],
                        lastName: 'User',
                        role: 'individual'
                    }
                }
            }

            const mockResponse = {
                success: true,
                token: 'mock-jwt-token-12345',
                refreshToken: 'mock-refresh-token-67890',
                user: user,
                message: 'OTP verified successfully'
            }

            localStorage.setItem('authToken', mockResponse.token)
            localStorage.setItem('refreshToken', mockResponse.refreshToken)
            localStorage.setItem('user', JSON.stringify(mockResponse.user))
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('userFullName', `${user.firstName} ${user.lastName}`.trim())
            localStorage.setItem('userEmail', user.email)
            localStorage.setItem('userRole', user.role)
            localStorage.removeItem('mockOtp')
            localStorage.removeItem('otpEmail')
            localStorage.removeItem('pendingUserData')

            return mockResponse
        } else {
            throw new Error('Invalid OTP. Please enter a valid 6-digit code.')
        }
    }
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        })
        const data = await parseResponse(response)
        if (!response.ok) throw new Error(data.message || 'OTP verification failed')
        if (data.token) {
            localStorage.setItem('authToken', data.token)
            if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('userFullName', `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim())
                localStorage.setItem('userEmail', data.user.email)
                localStorage.setItem('userRole', data.user.role)
            }
            localStorage.setItem('isAuthenticated', 'true')
        }
        return data
    } catch (error) {
        console.error('OTP verification error:', error)
        throw error
    }
}

export async function forgotPassword(email: string): Promise<ApiResponse> {
    if (USE_MOCK) {
        console.log('🔑 Mock password reset for:', email)
        await new Promise(resolve => setTimeout(resolve, 500))

        const users = loadMockUsers()
        const user = users.get(email)
        if (!user) {
            return { success: true, message: 'If an account exists with this email, you will receive a reset link.' }
        }

        const mockToken = `reset_token_${Date.now()}_${Math.random().toString(36).substring(7)}`
        mockResetTokens.set(mockToken, { email, expires: Date.now() + 3600000 })
        console.log(`🔑 Mock reset token for ${email}: ${mockToken}`)

        return {
            success: true,
            message: 'Password reset link sent to your email',
            token: mockToken
        }
    }
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
        const data = await parseResponse(response)
        if (!response.ok) throw new Error(data.message || 'Password reset request failed')
        return data
    } catch (error) {
        console.error('Forgot password error:', error)
        throw error
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    if (USE_MOCK) {
        console.log('🔑 Mock password reset with token:', token)
        await new Promise(resolve => setTimeout(resolve, 500))

        const resetData = mockResetTokens.get(token)
        if (!resetData) {
            throw new Error('Invalid or expired reset token')
        }

        if (resetData.expires < Date.now()) {
            mockResetTokens.delete(token)
            throw new Error('Reset token has expired. Please request a new one.')
        }

        const users = loadMockUsers()
        const user = users.get(resetData.email)
        if (user) {
            user.password = newPassword
            users.set(resetData.email, user)
            saveMockUsers(users)
            mockResetTokens.delete(token)
            console.log(`✅ Password reset successfully for ${resetData.email}`)
        }

        return { success: true, message: 'Password reset successfully' }
    }
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword, confirmPassword: newPassword }),
        })
        const data = await parseResponse(response)
        if (!response.ok) throw new Error(data.message || 'Password reset failed')
        return data
    } catch (error) {
        console.error('Reset password error:', error)
        throw error
    }
}

export async function logoutUser(): Promise<void> {
    try {
        const token = getAuthToken()
        if (token && !USE_MOCK) {
            await fetch(`${API_BASE_URL}/Auth/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            })
        }
    } catch (error) {
        console.error('Logout error:', error)
    } finally {
        logout()
    }
}

// ==================== Helper Functions ====================

export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    let token = sessionStorage.getItem('authToken')
    if (!token) token = localStorage.getItem('authToken')
    return token
}

export function getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    let token = sessionStorage.getItem('refreshToken')
    if (!token) token = localStorage.getItem('refreshToken')
    return token
}

export function logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('pendingUserData')
    localStorage.removeItem('userFullName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    localStorage.removeItem('onboardingCompleted')
    localStorage.removeItem('mockOtp')
    localStorage.removeItem('otpEmail')
    // Note: We don't clear mockUsers here to preserve registered users
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('isAuthenticated')
}

export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    const token = getAuthToken()
    const isAuth = localStorage.getItem('isAuthenticated') === 'true'
    return !!token && isAuth
}

export function getUser(): any {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    if (userStr) {
        try { return JSON.parse(userStr) } catch { return null }
    }
    return null
}

export function setUser(user: any): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('user', JSON.stringify(user))
}

export function getUserFullName(): string {
    const user = getUser()
    if (user) return `${user.firstName || ''} ${user.lastName || ''}`.trim()
    return localStorage.getItem('userFullName') || ''
}

export function getUserEmail(): string {
    const user = getUser()
    if (user) return user.email || ''
    return localStorage.getItem('userEmail') || ''
}

export function getUserRole(): string {
    const user = getUser()
    if (user) return user.role || ''
    return localStorage.getItem('userRole') || ''
}

// ==================== API Client ====================

export async function apiClient(endpoint: string, options: RequestInit = {}) {
    const token = getAuthToken()
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    if (options.headers) {
        const customHeaders = options.headers as Record<string, string>
        Object.assign(headers, customHeaders)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers })
    const data = await parseResponse(response)
    if (!response.ok) throw new Error(data.message || 'API request failed')
    return data
}

// ==================== Course API Endpoints ====================

export const courseApi = {
    getAll: async (): Promise<Course[]> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            return mockCourses
        }
        return apiClient('/Courses')
    },

    getById: async (courseId: string): Promise<Course> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            const course = mockCourses.find(c => c.id === courseId)
            if (!course) throw new Error('Course not found')
            return course
        }
        return apiClient(`/Courses/${courseId}`)
    },

    create: async (courseData: CreateCourseRequestDto): Promise<Course> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const newCourse: Course = {
                id: String(mockCourses.length + 1),
                title: courseData.title,
                description: courseData.description,
                modules: courseData.modules.map((m, idx) => convertToModule(m, String(mockCourses.length + 1))),
                enrolledCount: 0,
                rating: 0,
                createdAt: new Date().toISOString()
            }
            mockCourses.push(newCourse)
            return newCourse
        }
        return apiClient('/Courses', { method: 'POST', body: JSON.stringify(courseData) })
    },

    update: async (courseId: string, courseData: UpdateCourseRequestDto): Promise<Course> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            const courseIndex = mockCourses.findIndex(c => c.id === courseId)
            if (courseIndex === -1) throw new Error('Course not found')
            const existingCourse = mockCourses[courseIndex]
            const updatedCourse = { ...existingCourse }
            if (courseData.title !== undefined) updatedCourse.title = courseData.title
            if (courseData.description !== undefined) updatedCourse.description = courseData.description
            if (courseData.modules !== undefined) {
                updatedCourse.modules = courseData.modules.map((m, idx) => convertToModule(m, courseId))
            }
            mockCourses[courseIndex] = updatedCourse
            return updatedCourse
        }
        return apiClient(`/Courses/${courseId}`, { method: 'PUT', body: JSON.stringify(courseData) })
    },

    delete: async (courseId: string): Promise<void> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            const courseIndex = mockCourses.findIndex(c => c.id === courseId)
            if (courseIndex === -1) throw new Error('Course not found')
            mockCourses.splice(courseIndex, 1)
            return
        }
        return apiClient(`/Courses/${courseId}`, { method: 'DELETE' })
    },

    enroll: async (courseId: string): Promise<{ success: boolean }> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true }
        }
        return apiClient(`/Courses/${courseId}/enroll`, { method: 'POST' })
    },

    getEnrolledCourses: async (): Promise<Course[]> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            return mockCourses.slice(0, 2)
        }
        return apiClient('/Users/enrolled-courses')
    },

    updateLessonProgress: async (lessonId: string, completed: boolean): Promise<void> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 300))
            return
        }
        return apiClient(`/Courses/lessons/${lessonId}/progress`, { method: 'PUT', body: JSON.stringify({ completed }) })
    },

    getCourseProgress: async (courseId: string): Promise<{ progress: number; completedLessons: string[] }> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 300))
            const course = mockCourses.find(c => c.id === courseId)
            if (course) {
                const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
                return { progress: 0, completedLessons: [] }
            }
            return { progress: 0, completedLessons: [] }
        }
        return apiClient(`/Courses/${courseId}/progress`)
    }
}

// ==================== Profile API ====================

export const profileApi = {
    get: async () => {
        if (USE_MOCK) {
            console.log('👤 Mock: Getting profile data')
            await new Promise(resolve => setTimeout(resolve, 500))
            const user = getUser()
            if (user) {
                return {
                    ...mockProfile,
                    firstName: user.firstName || mockProfile.firstName,
                    lastName: user.lastName || mockProfile.lastName,
                    email: user.email || mockProfile.email,
                    role: user.role || mockProfile.role
                }
            }
            return mockProfile
        }
        try {
            return await apiClient('/Profile')
        } catch (error: any) {
            console.error('Profile API error:', error)
            return mockProfile
        }
    },
    update: async (profileData: any) => {
        if (USE_MOCK) {
            console.log('✏️ Mock: Updating profile:', profileData)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Profile updated successfully', data: profileData }
        }
        return apiClient('/Profile', { method: 'PUT', body: JSON.stringify(profileData) })
    },
}

// ==================== Onboarding API ====================

export const onboardingApi = {
    getStatus: async () => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, status: 'pending', steps: { bio: false, profilePicture: false, role: false, goals: false } }
        }
        return apiClient('/Onboarding/status')
    },
    submitBio: async (bioData: { bio: string }) => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Bio submitted successfully' }
        }
        return apiClient('/Onboarding/bio', { method: 'POST', body: JSON.stringify(bioData) })
    },
    uploadProfilePicture: async (file: File) => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            return { success: true, message: 'Profile picture uploaded successfully', url: '/mock-profile-picture.jpg' }
        }
        const formData = new FormData()
        formData.append('file', file)
        const token = getAuthToken()
        const headers: Record<string, string> = {}
        if (token) headers['Authorization'] = `Bearer ${token}`
        const response = await fetch(`${API_BASE_URL}/Onboarding/profile-picture`, { method: 'POST', headers, body: formData })
        return parseResponse(response)
    },
    submitRole: async (roleData: { role: string }) => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Role submitted successfully' }
        }
        return apiClient('/Onboarding/role', { method: 'POST', body: JSON.stringify(roleData) })
    },
    submitGoals: async (goalsData: { goals: string[] }) => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Goals submitted successfully' }
        }
        return apiClient('/Onboarding/goals', { method: 'POST', body: JSON.stringify(goalsData) })
    },
    completeOnboarding: async () => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            localStorage.setItem('onboardingCompleted', 'true')
            return { success: true, message: 'Onboarding completed successfully', redirectUrl: '/dashboard' }
        }
        return apiClient('/Onboarding/complete', { method: 'POST' })
    },
    skipOnboarding: async () => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            localStorage.setItem('onboardingCompleted', 'skipped')
            return { success: true, message: 'Onboarding skipped successfully', redirectUrl: '/dashboard' }
        }
        return apiClient('/Onboarding/skip', { method: 'POST' })
    },
}

// ==================== Team API ====================

export const teamApi = {
    getAll: () => apiClient('/Team'),
    getById: (id: string) => apiClient(`/Team/${id}`),
    create: (teamData: any) => apiClient('/Team', { method: 'POST', body: JSON.stringify(teamData) }),
    addMember: (teamId: string, memberData: any) => apiClient(`/Team/${teamId}/members`, { method: 'POST', body: JSON.stringify(memberData) }),
    getMembers: (teamId: string) => apiClient(`/Team/${teamId}/members`),
    getTasks: (teamId: string) => apiClient(`/Team/${teamId}/tasks`),
    createTask: (teamId: string, taskData: any) => apiClient(`/Team/${teamId}/tasks`, { method: 'POST', body: JSON.stringify(taskData) }),
}

// ==================== Test Connection ====================

export async function testBackendConnection(): Promise<boolean> {
    if (USE_MOCK) return true
    try {
        const response = await fetch(`${API_BASE_URL.replace('/api', '')}/swagger/index.html`, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000)
        })
        return response.ok
    } catch {
        return false
    }
}