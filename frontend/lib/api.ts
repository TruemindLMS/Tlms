
const API_BASE_URL = 'https://tims-backend-11dz.onrender.com/api'

// Helper to safely parse JSON responses
async function parseResponse(response: Response) {
    const text = await response.text()
    try {
        return text ? JSON.parse(text) : {}
    } catch {
        return { message: text || response.statusText }
    }
}



export interface ApiError {
    status: number
    message: string
    errors?: string[]
}

export class ApiClientError extends Error {
    status: number
    errors?: string[]

    constructor(status: number, message: string, errors?: string[]) {
        super(message)
        this.name = 'ApiClientError'
        this.status = status
        this.errors = errors
    }
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
    const data = await parseResponse(response)

    if (!response.ok) {
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            data
        })

        throw new ApiClientError(
            response.status,
            data.message || data.title || 'API request failed',
            data.errors
        )
    }

    return data as T
}

export const enableDebugLogging = process.env.NODE_ENV === 'development'

export function logApiCall(method: string, url: string, data?: any) {
    if (enableDebugLogging) {
        console.log(`🔍 API ${method}:`, url, data || '')
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

// ==================== Auth API ====================

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
        logApiCall('POST', '/Auth/login', { email })

        const response = await fetch(`${API_BASE_URL}/Auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await parseResponse(response)

        if (!response.ok) {
            console.error('Login failed:', data)
            throw new Error(data.message || 'Login failed')
        }

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
            console.log('✅ Login successful for:', email)
        }
        return data
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

export async function registerUser(userData: RegisterRequest): Promise<ApiResponse> {
    try {
        logApiCall('POST', '/Auth/register', { email: userData.email, role: userData.role })

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
            console.error('Registration failed:', errorMessage)
            throw new Error(errorMessage)
        }

        // Store pending user data for OTP verification
        localStorage.setItem('pendingUserData', JSON.stringify({
            fullName: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: userData.role
        }))

        console.log('✅ Registration successful for:', userData.email)
        return data
    } catch (error) {
        console.error('Registration error:', error)
        throw error
    }
}

export async function sendOtp(email: string): Promise<ApiResponse> {
    try {
        logApiCall('POST', '/Auth/send-otp', { email })

        const response = await fetch(`${API_BASE_URL}/Auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
        const data = await parseResponse(response)

        if (!response.ok) {
            console.error('Send OTP failed:', data)
            throw new Error(data.message || 'Failed to send OTP')
        }

        console.log('✅ OTP sent successfully to:', email)
        return data
    } catch (error) {
        console.error('Send OTP error:', error)
        throw error
    }
}

export async function verifyOtp(email: string, code: string): Promise<ApiResponse> {
    try {
        logApiCall('POST', '/Auth/verify-otp', { email, code })

        const response = await fetch(`${API_BASE_URL}/Auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code }),
        })
        const data = await parseResponse(response)

        if (!response.ok) {
            console.error('OTP verification failed:', data)
            throw new Error(data.message || 'OTP verification failed')
        }

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

            // Clear pending data after successful verification
            localStorage.removeItem('pendingUserData')

            console.log('✅ OTP verified successfully for:', email)
        }

        return data
    } catch (error) {
        console.error('OTP verification error:', error)
        throw error
    }
}

export async function forgotPassword(email: string): Promise<ApiResponse> {
    try {
        logApiCall('POST', '/Auth/forgot-password', { email })

        const response = await fetch(`${API_BASE_URL}/Auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
        const data = await parseResponse(response)

        if (!response.ok) {
            console.error('Forgot password failed:', data)
            throw new Error(data.message || 'Password reset request failed')
        }

        console.log('✅ Password reset email sent to:', email)
        return data
    } catch (error) {
        console.error('Forgot password error:', error)
        throw error
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    try {
        logApiCall('POST', '/Auth/reset-password', { token: '***' })

        const response = await fetch(`${API_BASE_URL}/Auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword, confirmPassword: newPassword }),
        })
        const data = await parseResponse(response)

        if (!response.ok) {
            console.error('Reset password failed:', data)
            throw new Error(data.message || 'Password reset failed')
        }

        console.log('✅ Password reset successful')
        return data
    } catch (error) {
        console.error('Reset password error:', error)
        throw error
    }
}

export async function logoutUser(): Promise<void> {
    try {
        const token = getAuthToken()
        if (token) {
            logApiCall('POST', '/Auth/logout')

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

    console.log('🔓 Logging out, clearing all auth data')

    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('pendingUserData')
    localStorage.removeItem('userFullName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    localStorage.removeItem('onboardingCompleted')
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

    logApiCall(options.method || 'GET', endpoint)

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers })
    const data = await parseResponse(response)

    if (!response.ok) {
        console.error(`API Client Error (${response.status}):`, data)
        throw new Error(data.message || 'API request failed')
    }

    return data
}

// ==================== Course API Endpoints ====================

export const courseApi = {
    getAll: async (): Promise<Course[]> => {
        return apiClient('/Courses')
    },

    getById: async (courseId: string): Promise<Course> => {
        return apiClient(`/Courses/${courseId}`)
    },

    create: async (courseData: CreateCourseRequestDto): Promise<Course> => {
        return apiClient('/Courses', { method: 'POST', body: JSON.stringify(courseData) })
    },

    update: async (courseId: string, courseData: UpdateCourseRequestDto): Promise<Course> => {
        return apiClient(`/Courses/${courseId}`, { method: 'PUT', body: JSON.stringify(courseData) })
    },

    delete: async (courseId: string): Promise<void> => {
        return apiClient(`/Courses/${courseId}`, { method: 'DELETE' })
    },

    enroll: async (courseId: string): Promise<{ success: boolean }> => {
        return apiClient(`/Courses/${courseId}/enroll`, { method: 'POST' })
    },

    getEnrolledCourses: async (): Promise<Course[]> => {
        return apiClient('/Users/enrolled-courses')
    },

    updateLessonProgress: async (lessonId: string, completed: boolean): Promise<void> => {
        return apiClient(`/Courses/lessons/${lessonId}/progress`, { method: 'PUT', body: JSON.stringify({ completed }) })
    },

    getCourseProgress: async (courseId: string): Promise<{ progress: number; completedLessons: string[] }> => {
        return apiClient(`/Courses/${courseId}/progress`)
    }
}

// ==================== Profile API ====================

export const profileApi = {
    get: async () => {
        try {
            return await apiClient('/Profile')
        } catch (error: any) {
            console.error('Profile API error:', error)
            throw error
        }
    },
    update: async (profileData: any) => {
        return apiClient('/Profile', { method: 'PUT', body: JSON.stringify(profileData) })
    },
}

// ==================== Onboarding API ====================

export const onboardingApi = {
    getStatus: async () => {
        return apiClient('/Onboarding/status')
    },
    submitBio: async (bioData: { bio: string }) => {
        return apiClient('/Onboarding/bio', { method: 'POST', body: JSON.stringify(bioData) })
    },
    uploadProfilePicture: async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        const token = getAuthToken()
        const headers: Record<string, string> = {}
        if (token) headers['Authorization'] = `Bearer ${token}`

        const response = await fetch(`${API_BASE_URL}/Onboarding/profile-picture`, {
            method: 'POST',
            headers,
            body: formData
        })
        return parseResponse(response)
    },
    submitRole: async (roleData: { role: string }) => {
        return apiClient('/Onboarding/role', { method: 'POST', body: JSON.stringify(roleData) })
    },
    submitGoals: async (goalsData: { goals: string[] }) => {
        return apiClient('/Onboarding/goals', { method: 'POST', body: JSON.stringify(goalsData) })
    },
    completeOnboarding: async () => {
        const response = await apiClient('/Onboarding/complete', { method: 'POST' })
        localStorage.setItem('onboardingCompleted', 'true')
        return response
    },
    skipOnboarding: async () => {
        const response = await apiClient('/Onboarding/skip', { method: 'POST' })
        localStorage.setItem('onboardingCompleted', 'skipped')
        return response
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
    try {
        console.log('🔍 Testing backend connection...')
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
        })
        const isConnected = response.ok
        console.log(isConnected ? '✅ Backend connected' : '❌ Backend connection failed')
        return isConnected
    } catch (error) {
        console.error('❌ Backend connection error:', error)
        return false
    }
}

// ==================== Debug Helper ====================

export function debugAuthState() {
    if (typeof window === 'undefined') return

    console.log('🔍 Auth State Debug:')
    console.log('  - isAuthenticated:', isAuthenticated())
    console.log('  - authToken:', getAuthToken() ? '✅ Present' : '❌ Missing')
    console.log('  - refreshToken:', getRefreshToken() ? '✅ Present' : '❌ Missing')
    console.log('  - user:', getUser())
    console.log('  - userFullName:', getUserFullName())
    console.log('  - userEmail:', getUserEmail())
    console.log('  - userRole:', getUserRole())
    console.log('  - pendingUserData:', localStorage.getItem('pendingUserData'))
}