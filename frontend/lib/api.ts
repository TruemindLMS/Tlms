// lib/api.ts
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
    fullName: string
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
        const responseBody: any = await parseResponse(response)

        if (!response.ok) {
            console.error('Login failed:', responseBody)
            throw new Error(responseBody.message || 'Login failed')
        }

        const token = responseBody.data?.token || responseBody.token;

        if (token) {
            const userData = responseBody.data || responseBody.user || {};
            const userEmail = userData.email || email;
            const fullName = userData.fullName || '';
            const nameParts = fullName.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            const role = userData.role || 'user';

            localStorage.setItem('authToken', token)
            if (responseBody.refreshToken) localStorage.setItem('refreshToken', responseBody.refreshToken)

            const userObj = {
                id: userData.id || '',
                email: userEmail,
                firstName: firstName,
                lastName: lastName,
                role: role
            };

            localStorage.setItem('user', JSON.stringify(userObj))
            localStorage.setItem('userFullName', fullName || `${firstName} ${lastName}`.trim())
            localStorage.setItem('userEmail', userEmail)
            localStorage.setItem('userRole', role)
            localStorage.setItem('userFirstName', firstName)
            localStorage.setItem('userLastName', lastName)

            localStorage.setItem('isAuthenticated', 'true')
            console.log('✅ Login successful for:', email)

            return {
                token: token,
                refreshToken: responseBody.refreshToken || '',
                user: userObj,
                message: responseBody.message
            } as LoginResponse
        }

        return responseBody as LoginResponse
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

export async function registerUser(userData: RegisterRequest): Promise<ApiResponse> {
    try {
        logApiCall('POST', '/Auth/register', { email: userData.email, role: userData.role, fullName: userData.fullName })

        const response = await fetch(`${API_BASE_URL}/Auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.confirmPassword,
                fullName: userData.fullName,
                role: userData.role
            }),
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
            fullName: userData.fullName,
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
                localStorage.setItem('userFirstName', data.user.firstName || '')
                localStorage.setItem('userLastName', data.user.lastName || '')
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
    localStorage.removeItem('userFirstName')
    localStorage.removeItem('userLastName')
    localStorage.removeItem('onboardingCompleted')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('isAuthenticated')
}

export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    const token = getAuthToken()
    const isAuthLocal = localStorage.getItem('isAuthenticated') === 'true'
    const isAuthSession = sessionStorage.getItem('isAuthenticated') === 'true'
    const isAuth = isAuthLocal || isAuthSession
    return !!token && isAuth
}

export function getUser(): any {
    if (typeof window === 'undefined') return null
    let userStr = sessionStorage.getItem('user')
    if (!userStr) userStr = localStorage.getItem('user')
    if (userStr) {
        try { return JSON.parse(userStr) } catch { return null }
    }
    return null
}

export function setUser(user: any): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('user', JSON.stringify(user))
    if (user.firstName) localStorage.setItem('userFirstName', user.firstName)
    if (user.lastName) localStorage.setItem('userLastName', user.lastName)
    if (user.email) localStorage.setItem('userEmail', user.email)
    if (user.role) localStorage.setItem('userRole', user.role)
    if (user.firstName || user.lastName) {
        localStorage.setItem('userFullName', `${user.firstName || ''} ${user.lastName || ''}`.trim())
    }
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

export function getUserFirstName(): string {
    const user = getUser()
    if (user) return user.firstName || ''
    return localStorage.getItem('userFirstName') || ''
}

export function getUserLastName(): string {
    const user = getUser()
    if (user) return user.lastName || ''
    return localStorage.getItem('userLastName') || ''
}

export function setUserFirstName(firstName: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('userFirstName', firstName)
    const lastName = getUserLastName()
    localStorage.setItem('userFullName', `${firstName} ${lastName}`.trim())
}

export function setUserLastName(lastName: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('userLastName', lastName)
    const firstName = getUserFirstName()
    localStorage.setItem('userFullName', `${firstName} ${lastName}`.trim())
}

// ==================== API Client ====================

export async function apiClient(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = getAuthToken()
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    if (options.headers) {
        const customHeaders = options.headers as Record<string, string>
        Object.assign(headers, customHeaders)
    }

    const url = `${API_BASE_URL}${endpoint}`
    logApiCall(options.method || 'GET', url)

    try {
        const response = await fetch(url, { ...options, headers })
        const data = await parseResponse(response)

        if (!response.ok) {
            console.error(`API Client Error (${response.status}):`, data)
            throw new Error(data.message || `API request failed: ${response.status}`)
        }

        return data
    } catch (error: any) {
        console.error(`Network Error for ${url}:`, error.message)

        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Cannot connect to server. Please check if the backend is running.')
        }
        throw error
    }
}

// ==================== Course API Endpoints ====================

export const courseApi = {
    getAll: async (): Promise<Course[]> => {
        try {
            const response: any = await apiClient('/Courses')

            console.log('📚 Courses API raw response:', response)

            if (Array.isArray(response)) {
                console.log('✅ Response is an array with', response.length, 'courses')
                return response as Course[]
            }

            if (response && typeof response === 'object') {
                if (response.data && Array.isArray(response.data)) {
                    console.log('✅ Found response.data array with', response.data.length, 'courses')
                    return response.data as Course[]
                }
                if (response.courses && Array.isArray(response.courses)) {
                    console.log('✅ Found response.courses array with', response.courses.length, 'courses')
                    return response.courses as Course[]
                }
                if (response.items && Array.isArray(response.items)) {
                    console.log('✅ Found response.items array with', response.items.length, 'courses')
                    return response.items as Course[]
                }
                if (response.results && Array.isArray(response.results)) {
                    console.log('✅ Found response.results array with', response.results.length, 'courses')
                    return response.results as Course[]
                }
                if (response.id && response.title) {
                    console.log('✅ Single course object found, wrapping in array')
                    return [response] as Course[]
                }
            }

            console.warn('⚠️ Unexpected courses response format:', response)
            return []
        } catch (error) {
            console.error('❌ Error in courseApi.getAll:', error)
            throw error
        }
    },

    getById: async (courseId: string): Promise<Course> => {
        try {
            const response: any = await apiClient(`/Courses/${courseId}`)

            if (response && typeof response === 'object') {
                if (response.data && response.data.id) {
                    return response.data as Course
                }
                if (response.course && response.course.id) {
                    return response.course as Course
                }
                if (response.id) {
                    return response as Course
                }
            }

            return response as Course
        } catch (error) {
            console.error(`❌ Error fetching course ${courseId}:`, error)
            throw error
        }
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
        try {
            const response: any = await apiClient('/Users/enrolled-courses')

            if (Array.isArray(response)) {
                return response as Course[]
            }
            if (response && typeof response === 'object') {
                if (response.data && Array.isArray(response.data)) {
                    return response.data as Course[]
                }
                if (response.courses && Array.isArray(response.courses)) {
                    return response.courses as Course[]
                }
            }
            return []
        } catch (error) {
            console.error('❌ Error fetching enrolled courses:', error)
            return []
        }
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
        console.log('🔍 Testing backend connection to:', API_BASE_URL)
        const response = await fetch(API_BASE_URL.replace('/api', ''), {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000)
        })
        console.log('Backend response status:', response.status)
        return response.ok
    } catch (error) {
        console.error('Backend connection failed:', error)
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
    console.log('  - userFirstName:', getUserFirstName())
    console.log('  - userLastName:', getUserLastName())
    console.log('  - userEmail:', getUserEmail())
    console.log('  - userRole:', getUserRole())
    console.log('  - pendingUserData:', localStorage.getItem('pendingUserData'))
}