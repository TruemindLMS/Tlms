// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Helper to safely parse JSON responses
async function parseResponse(response: Response) {
    const text = await response.text()
    try {
        return text ? JSON.parse(text) : {}
    } catch {
        return { message: text || response.statusText }
    }
}

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

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'Login failed')
        }

        // Store token if returned
        if (data.token) {
            localStorage.setItem('authToken', data.token)
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken)
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
            }
        }

        return data
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

export async function registerUser(userData: RegisterRequest): Promise<ApiResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/resend-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send OTP')
        }

        return data
    } catch (error) {
        console.error('Send OTP error:', error)
        throw error
    }
}

export async function verifyOtp(email: string, otp: string): Promise<ApiResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'OTP verification failed')
        }

        // Store auth data if returned
        if (data.token) {
            localStorage.setItem('authToken', data.token)
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken)
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
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
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'Password reset request failed')
        }

        return data
    } catch (error) {
        console.error('Forgot password error:', error)
        throw error
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        })

        const data = await parseResponse(response)

        if (!response.ok) {
            throw new Error(data.message || 'Password reset failed')
        }

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
            await fetch(`${API_BASE_URL}/Auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
        }
    } catch (error) {
        console.error('Logout error:', error)
    } finally {
        logout()
    }
}

// Helper function to get auth token
export function getAuthToken(): string | null {
    let token = sessionStorage.getItem('authToken')
    if (!token) {
        token = localStorage.getItem('authToken')
    }
    return token
}

// Helper function to get refresh token
export function getRefreshToken(): string | null {
    let token = sessionStorage.getItem('refreshToken')
    if (!token) {
        token = localStorage.getItem('refreshToken')
    }
    return token
}

// Helper function to logout
export function logout(): void {
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

// Helper function to check if user is authenticated
export function isAuthenticated(): boolean {
    const token = getAuthToken()
    const isAuth = localStorage.getItem('isAuthenticated') === 'true'
    return !!token && isAuth
}

// Helper function to get user from storage
export function getUser(): any {
    const userStr = localStorage.getItem('user')
    if (userStr) {
        try {
            return JSON.parse(userStr)
        } catch {
            return null
        }
    }
    return null
}

// Helper function to set user data
export function setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user))
}

// Helper function to get user full name
export function getUserFullName(): string {
    const user = getUser()
    if (user) {
        return `${user.firstName || ''} ${user.lastName || ''}`.trim()
    }
    return localStorage.getItem('userFullName') || ''
}

// Helper function to get user email
export function getUserEmail(): string {
    const user = getUser()
    if (user) {
        return user.email || ''
    }
    return localStorage.getItem('userEmail') || ''
}

// Helper function to get user role
export function getUserRole(): string {
    const user = getUser()
    if (user) {
        return user.role || ''
    }
    return localStorage.getItem('userRole') || ''
}

// API client with proper headers typing
export async function apiClient(endpoint: string, options: RequestInit = {}) {
    const token = getAuthToken()

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    if (options.headers) {
        const customHeaders = options.headers as Record<string, string>
        Object.assign(headers, customHeaders)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    const data = await parseResponse(response)

    if (!response.ok) {
        throw new Error(data.message || 'API request failed')
    }

    return data
}

// Course API endpoints
export const courseApi = {
    getAll: () => apiClient('/Courses'),
    getById: (id: string) => apiClient(`/Courses/${id}`),
    create: (courseData: any) => apiClient('/Courses', { method: 'POST', body: JSON.stringify(courseData) }),
    update: (id: string, courseData: any) => apiClient(`/Courses/${id}`, { method: 'PUT', body: JSON.stringify(courseData) }),
    delete: (id: string) => apiClient(`/Courses/${id}`, { method: 'DELETE' }),
}

// Profile API endpoints
export const profileApi = {
    get: () => apiClient('/Profile'),
    update: (profileData: any) => apiClient('/Profile', { method: 'PUT', body: JSON.stringify(profileData) }),
}

// Complete Onboarding API endpoints
export const onboardingApi = {
    // Get current onboarding status
    getStatus: () => apiClient('/Onboarding/status'),

    // Submit bio during onboarding
    submitBio: (bioData: { bio: string }) => apiClient('/Onboarding/bio', {
        method: 'POST',
        body: JSON.stringify(bioData)
    }),

    // Upload profile picture
    uploadProfilePicture: async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        const token = getAuthToken()
        const headers: Record<string, string> = {}
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(`${API_BASE_URL}/Onboarding/profile-picture`, {
            method: 'POST',
            headers,
            body: formData,
        })

        return parseResponse(response)
    },

    // Submit role preference
    submitRole: (roleData: { role: string }) => apiClient('/Onboarding/role', {
        method: 'POST',
        body: JSON.stringify(roleData)
    }),

    // Submit goals
    submitGoals: (goalsData: { goals: string[] }) => apiClient('/Onboarding/goals', {
        method: 'POST',
        body: JSON.stringify(goalsData)
    }),

    // Complete onboarding
    completeOnboarding: () => apiClient('/Onboarding/complete', {
        method: 'POST'
    }),

    // Skip onboarding
    skipOnboarding: () => apiClient('/Onboarding/skip', {
        method: 'POST'
    }),
}

// Team API endpoints
export const teamApi = {
    getAll: () => apiClient('/Team'),
    getById: (id: string) => apiClient(`/Team/${id}`),
    create: (teamData: any) => apiClient('/Team', { method: 'POST', body: JSON.stringify(teamData) }),
    addMember: (teamId: string, memberData: any) => apiClient(`/Team/${teamId}/members`, { method: 'POST', body: JSON.stringify(memberData) }),
    getMembers: (teamId: string) => apiClient(`/Team/${teamId}/members`),
    getTasks: (teamId: string) => apiClient(`/Team/${teamId}/tasks`),
    createTask: (teamId: string, taskData: any) => apiClient(`/Team/${teamId}/tasks`, { method: 'POST', body: JSON.stringify(taskData) }),
}

// Test backend connection
export async function testBackendConnection(): Promise<boolean> {
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