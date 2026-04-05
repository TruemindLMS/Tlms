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

// ==================== Course DTOs (Matching Backend Exactly) ====================

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

// Update DTOs (for PUT requests)
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

// ==================== Response Interfaces ====================

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

// ==================== Mock Data ====================

// Mock user database for testing
const mockUsers = new Map()

// Initialize with a test user
mockUsers.set('test@example.com', {
    id: '1',
    email: 'test@example.com',
    password: 'Test123!',
    firstName: 'Test',
    lastName: 'User',
    role: 'individual'
})

// Mock reset tokens storage
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

// Mock courses data matching backend schema
const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Advanced Figma Design and Prototype',
        description: 'Master Figma design tools and create stunning prototypes. Learn advanced techniques for UI/UX design.',
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
                    { id: 'l1', title: 'Getting Started with Figma', content: 'Learn the basics of Figma interface', orderIndex: 1, duration: 15 },
                    { id: 'l2', title: 'Tools Overview', content: 'Overview of all Figma tools', orderIndex: 2, duration: 20 },
                    { id: 'l3', title: 'Creating Your First Design', content: 'Hands-on design creation', orderIndex: 3, duration: 45 }
                ]
            },
            {
                id: 'm2',
                title: 'Advanced Prototyping',
                orderIndex: 2,
                lessons: [
                    { id: 'l4', title: 'Interactive Components', content: 'Creating interactive elements', orderIndex: 1, duration: 30 },
                    { id: 'l5', title: 'Micro-interactions', content: 'Adding micro-interactions', orderIndex: 2, duration: 25 }
                ]
            }
        ]
    },
    {
        id: '2',
        title: 'Build Classic HTML and CSS Codes',
        description: 'Learn to build responsive websites with modern HTML5 and CSS3 techniques.',
        category: 'Development',
        level: 'Intermediate',
        duration: '12 hours',
        imageUrl: '/img/html-course.jpg',
        enrolledCount: 892,
        rating: 4.9,
        instructor: 'Prof. Sarah Johnson',
        modules: [
            {
                id: 'm3',
                title: 'HTML Fundamentals',
                orderIndex: 1,
                lessons: [
                    { id: 'l6', title: 'HTML Structure', content: 'Understanding HTML document structure', orderIndex: 1, duration: 10 },
                    { id: 'l7', title: 'Semantic HTML', content: 'Using semantic elements', orderIndex: 2, duration: 25 }
                ]
            },
            {
                id: 'm4',
                title: 'CSS Styling',
                orderIndex: 2,
                lessons: [
                    { id: 'l8', title: 'CSS Selectors', content: 'Understanding CSS selectors', orderIndex: 1, duration: 15 },
                    { id: 'l9', title: 'Flexbox and Grid', content: 'Modern layout techniques', orderIndex: 2, duration: 40 }
                ]
            }
        ]
    },
    {
        id: '3',
        title: 'Intro To Digital Marketing',
        description: 'Learn digital marketing strategies, SEO, social media, and analytics.',
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

        const user = mockUsers.get(email)
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
        if (mockUsers.has(userData.email)) {
            throw new Error('User with this email already exists')
        }
        const newUser = {
            id: String(mockUsers.size + 1),
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role
        }
        mockUsers.set(userData.email, newUser)
        localStorage.setItem('pendingUserData', JSON.stringify({
            fullName: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: userData.role
        }))
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
            const user = mockUsers.get(email)
            const mockResponse = {
                success: true,
                token: 'mock-jwt-token-12345',
                refreshToken: 'mock-refresh-token-67890',
                user: user || {
                    id: '1',
                    email: email,
                    firstName: email.split('@')[0],
                    lastName: 'User',
                    role: 'individual'
                },
                message: 'OTP verified successfully'
            }
            localStorage.setItem('authToken', mockResponse.token)
            localStorage.setItem('refreshToken', mockResponse.refreshToken)
            localStorage.setItem('user', JSON.stringify(mockResponse.user))
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('userFullName', `${mockResponse.user.firstName} ${mockResponse.user.lastName}`.trim())
            localStorage.setItem('userEmail', mockResponse.user.email)
            localStorage.setItem('userRole', mockResponse.user.role)
            localStorage.removeItem('mockOtp')
            localStorage.removeItem('otpEmail')
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

        // Check if user exists
        const user = mockUsers.get(email)
        if (!user) {
            // Don't reveal that user doesn't exist for security
            return { success: true, message: 'If an account exists with this email, you will receive a reset link.' }
        }

        // Generate a mock token
        const mockToken = `reset_token_${Date.now()}_${Math.random().toString(36).substring(7)}`
        mockResetTokens.set(mockToken, { email, expires: Date.now() + 3600000 }) // 1 hour expiry

        console.log(`🔑 Mock reset token for ${email}: ${mockToken}`)

        return {
            success: true,
            message: 'Password reset link sent to your email',
            token: mockToken // Only in mock mode for testing
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

        // Validate token
        const resetData = mockResetTokens.get(token)
        if (!resetData) {
            throw new Error('Invalid or expired reset token')
        }

        if (resetData.expires < Date.now()) {
            mockResetTokens.delete(token)
            throw new Error('Reset token has expired. Please request a new one.')
        }

        // Find user and update password
        const user = mockUsers.get(resetData.email)
        if (user) {
            user.password = newPassword
            mockUsers.set(resetData.email, user)
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
    // GET /api/Courses - Get all courses
    getAll: async (): Promise<Course[]> => {
        if (USE_MOCK) {
            console.log('📚 Mock: Getting all courses')
            await new Promise(resolve => setTimeout(resolve, 500))
            return mockCourses
        }
        return apiClient('/Courses')
    },

    // GET /api/Courses/{courseId} - Get course by ID
    getById: async (courseId: string): Promise<Course> => {
        if (USE_MOCK) {
            console.log('📚 Mock: Getting course by ID:', courseId)
            await new Promise(resolve => setTimeout(resolve, 500))
            const course = mockCourses.find(c => c.id === courseId)
            if (!course) throw new Error('Course not found')
            return course
        }
        return apiClient(`/Courses/${courseId}`)
    },

    // POST /api/Courses - Create new course
    create: async (courseData: CreateCourseRequestDto): Promise<Course> => {
        if (USE_MOCK) {
            console.log('📝 Mock: Creating course:', courseData)
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

    // PUT /api/Courses/{courseId} - Update entire course
    update: async (courseId: string, courseData: UpdateCourseRequestDto): Promise<Course> => {
        if (USE_MOCK) {
            console.log('✏️ Mock: Updating course:', courseId, courseData)
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

    // DELETE /api/Courses/{courseId} - Delete course
    delete: async (courseId: string): Promise<void> => {
        if (USE_MOCK) {
            console.log('🗑️ Mock: Deleting course:', courseId)
            await new Promise(resolve => setTimeout(resolve, 500))
            const courseIndex = mockCourses.findIndex(c => c.id === courseId)
            if (courseIndex === -1) throw new Error('Course not found')
            mockCourses.splice(courseIndex, 1)
            return
        }
        return apiClient(`/Courses/${courseId}`, { method: 'DELETE' })
    },

    // POST /api/Courses/{courseId}/modules - Add module to course
    addModule: async (courseId: string, moduleData: CreateModuleRequestDto): Promise<Module> => {
        if (USE_MOCK) {
            console.log('📦 Mock: Adding module to course:', courseId, moduleData)
            await new Promise(resolve => setTimeout(resolve, 500))
            const course = mockCourses.find(c => c.id === courseId)
            if (!course) throw new Error('Course not found')

            const newModule = convertToModule(moduleData, courseId)
            course.modules.push(newModule)
            return newModule
        }
        return apiClient(`/Courses/${courseId}/modules`, { method: 'POST', body: JSON.stringify(moduleData) })
    },

    // PUT /api/Courses/modules/{moduleId} - Update module
    updateModule: async (moduleId: string, moduleData: UpdateModuleRequestDto): Promise<Module> => {
        if (USE_MOCK) {
            console.log('✏️ Mock: Updating module:', moduleId, moduleData)
            await new Promise(resolve => setTimeout(resolve, 500))
            for (const course of mockCourses) {
                const moduleIndex = course.modules.findIndex(m => m.id === moduleId)
                if (moduleIndex !== -1) {
                    const existingModule = course.modules[moduleIndex]
                    if (moduleData.title !== undefined) existingModule.title = moduleData.title
                    if (moduleData.orderIndex !== undefined) existingModule.orderIndex = moduleData.orderIndex
                    if (moduleData.lessons) {
                        existingModule.lessons = moduleData.lessons.map((l, idx) => ({
                            id: existingModule.lessons[idx]?.id || `l${Date.now()}_${idx}`,
                            title: l.title,
                            content: l.content,
                            orderIndex: idx,
                            duration: l.duration,
                            moduleId: moduleId
                        }))
                    }
                    course.modules[moduleIndex] = existingModule
                    return existingModule
                }
            }
            throw new Error('Module not found')
        }
        return apiClient(`/Courses/modules/${moduleId}`, { method: 'PUT', body: JSON.stringify(moduleData) })
    },

    // DELETE /api/Courses/modules/{moduleId} - Delete module
    deleteModule: async (moduleId: string): Promise<void> => {
        if (USE_MOCK) {
            console.log('🗑️ Mock: Deleting module:', moduleId)
            await new Promise(resolve => setTimeout(resolve, 500))
            for (const course of mockCourses) {
                const moduleIndex = course.modules.findIndex(m => m.id === moduleId)
                if (moduleIndex !== -1) {
                    course.modules.splice(moduleIndex, 1)
                    return
                }
            }
            throw new Error('Module not found')
        }
        return apiClient(`/Courses/modules/${moduleId}`, { method: 'DELETE' })
    },

    // POST /api/Courses/{courseId}/modules/{moduleId}/lessons - Add lesson to module
    addLesson: async (courseId: string, moduleId: string, lessonData: CreateLessonRequestDto): Promise<Lesson> => {
        if (USE_MOCK) {
            console.log('📖 Mock: Adding lesson to module:', moduleId, lessonData)
            await new Promise(resolve => setTimeout(resolve, 500))
            const course = mockCourses.find(c => c.id === courseId)
            if (!course) throw new Error('Course not found')
            const module = course.modules.find(m => m.id === moduleId)
            if (!module) throw new Error('Module not found')
            const newLesson: Lesson = {
                id: `l${Date.now()}`,
                title: lessonData.title,
                content: lessonData.content,
                orderIndex: module.lessons.length,
                duration: lessonData.duration,
                moduleId: moduleId
            }
            module.lessons.push(newLesson)
            return newLesson
        }
        return apiClient(`/Courses/${courseId}/modules/${moduleId}/lessons`, { method: 'POST', body: JSON.stringify(lessonData) })
    },

    // PUT /api/Courses/lessons/{lessonId} - Update lesson
    updateLesson: async (lessonId: string, lessonData: UpdateLessonRequestDto): Promise<Lesson> => {
        if (USE_MOCK) {
            console.log('✏️ Mock: Updating lesson:', lessonId, lessonData)
            await new Promise(resolve => setTimeout(resolve, 500))
            for (const course of mockCourses) {
                for (const module of course.modules) {
                    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId)
                    if (lessonIndex !== -1) {
                        const updatedLesson = { ...module.lessons[lessonIndex] }
                        if (lessonData.title !== undefined) updatedLesson.title = lessonData.title
                        if (lessonData.content !== undefined) updatedLesson.content = lessonData.content
                        if (lessonData.duration !== undefined) updatedLesson.duration = lessonData.duration
                        module.lessons[lessonIndex] = updatedLesson
                        return updatedLesson
                    }
                }
            }
            throw new Error('Lesson not found')
        }
        return apiClient(`/Courses/lessons/${lessonId}`, { method: 'PUT', body: JSON.stringify(lessonData) })
    },

    // DELETE /api/Courses/lessons/{lessonId} - Delete lesson
    deleteLesson: async (lessonId: string): Promise<void> => {
        if (USE_MOCK) {
            console.log('🗑️ Mock: Deleting lesson:', lessonId)
            await new Promise(resolve => setTimeout(resolve, 500))
            for (const course of mockCourses) {
                for (const module of course.modules) {
                    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId)
                    if (lessonIndex !== -1) {
                        module.lessons.splice(lessonIndex, 1)
                        return
                    }
                }
            }
            throw new Error('Lesson not found')
        }
        return apiClient(`/Courses/lessons/${lessonId}`, { method: 'DELETE' })
    },

    // Custom endpoint for enrollment
    enroll: async (courseId: string): Promise<{ success: boolean }> => {
        if (USE_MOCK) {
            console.log('✅ Mock: Enrolling in course:', courseId)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true }
        }
        return apiClient(`/Courses/${courseId}/enroll`, { method: 'POST' })
    },

    // Custom endpoint to get user's enrolled courses
    getEnrolledCourses: async (): Promise<Course[]> => {
        if (USE_MOCK) {
            console.log('📚 Mock: Getting enrolled courses')
            await new Promise(resolve => setTimeout(resolve, 500))
            return mockCourses.slice(0, 2)
        }
        return apiClient('/Users/enrolled-courses')
    },

    // Custom endpoint for lesson progress
    updateLessonProgress: async (lessonId: string, completed: boolean): Promise<void> => {
        if (USE_MOCK) {
            console.log('📊 Mock: Updating lesson progress:', lessonId, completed)
            await new Promise(resolve => setTimeout(resolve, 300))
            return
        }
        return apiClient(`/Courses/lessons/${lessonId}/progress`, { method: 'PUT', body: JSON.stringify({ completed }) })
    },

    // Custom endpoint to get course progress
    getCourseProgress: async (courseId: string): Promise<{ progress: number; completedLessons: string[] }> => {
        if (USE_MOCK) {
            console.log('📊 Mock: Getting course progress:', courseId)
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
            console.log('📋 Mock: Getting onboarding status')
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, status: 'pending', steps: { bio: false, profilePicture: false, role: false, goals: false } }
        }
        return apiClient('/Onboarding/status')
    },
    submitBio: async (bioData: { bio: string }) => {
        if (USE_MOCK) {
            console.log('📝 Mock: Submitting bio:', bioData)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Bio submitted successfully' }
        }
        return apiClient('/Onboarding/bio', { method: 'POST', body: JSON.stringify(bioData) })
    },
    uploadProfilePicture: async (file: File) => {
        if (USE_MOCK) {
            console.log('🖼️ Mock: Uploading profile picture:', file.name)
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
            console.log('💼 Mock: Submitting role:', roleData)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Role submitted successfully' }
        }
        return apiClient('/Onboarding/role', { method: 'POST', body: JSON.stringify(roleData) })
    },
    submitGoals: async (goalsData: { goals: string[] }) => {
        if (USE_MOCK) {
            console.log('🎯 Mock: Submitting goals:', goalsData)
            await new Promise(resolve => setTimeout(resolve, 500))
            return { success: true, message: 'Goals submitted successfully' }
        }
        return apiClient('/Onboarding/goals', { method: 'POST', body: JSON.stringify(goalsData) })
    },
    completeOnboarding: async () => {
        if (USE_MOCK) {
            console.log('✅ Mock: Completing onboarding')
            await new Promise(resolve => setTimeout(resolve, 500))
            localStorage.setItem('onboardingCompleted', 'true')
            return { success: true, message: 'Onboarding completed successfully', redirectUrl: '/dashboard' }
        }
        return apiClient('/Onboarding/complete', { method: 'POST' })
    },
    skipOnboarding: async () => {
        if (USE_MOCK) {
            console.log('⏭️ Mock: Skipping onboarding')
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