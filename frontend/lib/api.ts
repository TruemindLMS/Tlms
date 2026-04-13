export const API_BASE_URL = 'https://tims-backend-11dz.onrender.com/api'

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
    success?: boolean
    message?: string
    data?: {
        token: string
        expiresAtUtc?: string
        email?: string
        fullName?: string
        refreshToken?: string
        role?: string
        id?: string
    }
    // Legacy fallbacks
    token?: string
    refreshToken?: string
    user?: any
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
    videoUrl?: string
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
    videoUrl?: string
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
    videoUrl?: string
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
  id: string;
  title: string;
  description: string;
  modules: Module[];
  completed?: boolean;
  enrolled?: boolean;
  inProgress?: boolean;
  overallProgress?: number;
  category?: string;
  level?: string;
  price?: number;
  duration?: string;
  imageUrl?: string;
  enrolledCount?: number;
  rating?: number;
  instructor?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Assignment {
    id: string
    title: string
    description: string
    courseId?: string
    lessonId?: string
    courseTitle?: string
    dueDateUtc: string
    dueDate?: string // For backward compatibility
    status?: 'Pending' | 'Submitted' | 'Overdue' | 'Graded'
    submittedDateUtc?: string
    submittedDate?: string // For backward compatibility
    grade?: number
    feedback?: string
    attachments?: string[]
    createdAt?: string
    updatedAt?: string
}

export interface CreateAssignmentRequest {
    courseId: string
    lessonId?: string
    title: string
    description: string
    dueDateUtc: string
}

export interface SubmitAssignmentRequest {
    textResponse?: string
    file?: File
    linkUrl?: string
}

export interface AssignmentSummary {
    totalAssignments: number
    submittedAssignments: number
    pendingAssignments: number
    overdueAssignments: number
    upcomingDeadlines?: Array<{
        assignmentId: string
        title: string
        dueDateUtc: string
    }>
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

        const token = data.data?.token || data.token;
        if (token && typeof window !== 'undefined') {
            const refreshToken = data.data?.refreshToken || data.refreshToken;
            const emailAddr = data.data?.email || data.user?.email || email;
            const fullName = data.data?.fullName || data.user?.fullName || `${data.user?.firstName || ''} ${data.user?.lastName || ''}`.trim();
            const role = data.data?.role || data.user?.role || 'Student';
            const id = data.data?.id || data.user?.id || emailAddr;

            localStorage.setItem('authToken', token)
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken)

            const userObj = { id, email: emailAddr, fullName, role };
            localStorage.setItem('user', JSON.stringify(userObj))
            localStorage.setItem('userFullName', fullName)
            localStorage.setItem('userEmail', emailAddr)
            localStorage.setItem('userRole', role)

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
        if (typeof window !== 'undefined') {
            localStorage.setItem('pendingUserData', JSON.stringify({
                fullName: userData.fullName,
                email: userData.email,
                role: userData.role
            }))
        }

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

        const token = data.data?.token || data.token;
        if (token && typeof window !== 'undefined') {
            const refreshToken = data.data?.refreshToken || data.refreshToken;
            const userEmail = data.data?.email || data.user?.email || email;
            const fullName = data.data?.fullName || data.user?.fullName || `${data.user?.firstName || ''} ${data.user?.lastName || ''}`.trim();
            const role = data.data?.role || data.user?.role || 'Student';
            const id = data.data?.id || data.user?.id || userEmail;

            localStorage.setItem('authToken', token)
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken)

            const userObj = { id, email: userEmail, fullName, role };
            localStorage.setItem('user', JSON.stringify(userObj))
            localStorage.setItem('userFullName', fullName)
            localStorage.setItem('userEmail', userEmail)
            localStorage.setItem('userRole', role)

            localStorage.setItem('isAuthenticated', 'true')

            // Clear pending data after successful verification
            localStorage.removeItem('pendingUserData')

            console.log('✅ OTP verified successfully for:', userEmail)
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

export async function resetPassword(email: string, token: string, newPassword: string): Promise<ApiResponse> {
    try {
        logApiCall('POST', '/Auth/reset-password', { email, token: '***' })

        const response = await fetch(`${API_BASE_URL}/Auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token, newPassword, confirmPassword: newPassword }),
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
    if (typeof window === 'undefined') return ''

    const user = getUser();
    if (user) {
        const name = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim();
        if (name) return name;
    }
    return localStorage.getItem('userFullName') || '';
}

export function getUserEmail(): string {
    if (typeof window === 'undefined') return ''

    const user = getUser()
    if (user) return user.email || ''
    return localStorage.getItem('userEmail') || ''
}

export function getUserRole(): string {
    if (typeof window === 'undefined') return ''

    const user = getUser()
    if (user) return user.role || ''
    return localStorage.getItem('userRole') || ''
}

// ==================== API Client ====================

export interface ApiClientOptions extends RequestInit {
    silent?: boolean;
}

export async function apiClient(endpoint: string, options: ApiClientOptions = {}) {
    const token = getAuthToken()
    const isFormData = options.body instanceof FormData;
    const headers: Record<string, string> = isFormData ? {} : { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    if (options.headers) {
        const customHeaders = options.headers as Record<string, string>
        Object.assign(headers, customHeaders)
    }

    logApiCall(options.method || 'GET', endpoint)

    let response: Response;
    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers })
    } catch (error: any) {
        console.error(`API Network Error on ${endpoint}:`, error.message || 'Failed to fetch');
        throw new Error(error.message || 'Network error: Failed to connect to server');
    }

    const data = await parseResponse(response)

    if (!response.ok) {
        if (response.status === 401) {
            console.warn('API returned 401 Unauthorized. User session might be expired. Redirecting to sign in...')
            logout()
            if (typeof window !== 'undefined') {
                window.location.href = '/signin'
            }
        }
        if (!options.silent) {
            console.error(`API Client Error (${response.status}):`, data)
        }
        throw new Error(data.message || 'API request failed')
    }

    return data
}

export function mapBackendKeys(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(mapBackendKeys);
    } else if (obj !== null && typeof obj === 'object') {
        const newObj: any = { ...obj };
        if (newObj.courseId && !newObj.id) { newObj.id = newObj.courseId; }
        if (newObj.moduleId && !newObj.id) { newObj.id = newObj.moduleId; }
        if (newObj.lessonId && !newObj.id) { newObj.id = newObj.lessonId; }

        for (const key in newObj) {
            if (Array.isArray(newObj[key])) {
                newObj[key] = newObj[key].map(mapBackendKeys);
            } else if (newObj[key] !== null && typeof newObj[key] === 'object') {
                newObj[key] = mapBackendKeys(newObj[key]);
            }
        }
        return newObj;
    }
    return obj;
}

// Helper to provide fallback images for courses
function applyFallbackCourseImage<T extends Course | Course[]>(data: T): T {
    const genericImages = [
        "/img/frontend.jpg",
        "/img/grah.jpg",
        "/img/frontend.jpg",
        "/img/grah.jpg",
        "/img/asp.net.jpg",
        "/img/frontend.jpg",
    ];

    if (Array.isArray(data)) {
        return data.map(course => {
            if (!course.imageUrl) {
                const code = (course.id || course.title || "course").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                return { ...course, imageUrl: genericImages[code % genericImages.length] };
            }
            return course;
        }) as T;
    } else if (data && typeof data === 'object') {
        const course = data as Course;
        if (!course.imageUrl) {
            const code = (course.id || course.title || "course").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return { ...course, imageUrl: genericImages[code % genericImages.length] } as T;
        }
    }
    return data;
}

// ==================== Course API Endpoints ====================

export const courseApi = {
    getAll: async (): Promise<Course[]> => {
        const res = await apiClient('/Courses')
        const data = res?.data || res || []
        return applyFallbackCourseImage(mapBackendKeys(data))
    },

    getById: async (courseId: string): Promise<Course> => {
        const res = await apiClient(`/Courses/${courseId}`)
        const data = res?.data || res
        return applyFallbackCourseImage(mapBackendKeys(data))
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
        return await apiClient(`/Courses/${courseId}/enroll`, { method: 'POST' })
    },

    getEnrolledCourses: async (): Promise<Course[]> => {
        return apiClient('/Users/enrolled-courses', { silent: true })
    },

    updateLessonProgress: async (lessonId: string, completed: boolean): Promise<void> => {
        return apiClient(`/Progress/lessons/${lessonId}/complete`, { method: 'POST', body: JSON.stringify({ completed }) })
    },

    getCourseProgress: async (courseId: string): Promise<{ progress: number; completedLessons: string[] }> => {
        return apiClient(`/Progress/courses/${courseId}`, { silent: true })
    }
}

// ==================== Profile API ====================

export const profileApi = {
    get: async () => {
        try {
            return await apiClient("/Profile");
        } catch (error: any) {
            console.error("Profile API error:", error?.message || error);
            throw error;
        }
    },
    update: async (profileData: FormData | object) => {
        const isFormData = profileData instanceof FormData;

        return apiClient("/Profile", {
            method: "PUT",
            headers: isFormData ? undefined : { "Content-Type": "application/json" },
            body: isFormData ? profileData : JSON.stringify(profileData),
        });
    },
};

// ==================== Certificate API ====================

export interface CertificateResponse {
    success?: boolean
    message?: string
    certificateId?: string
    certificateUrl?: string
}

export const certificateApi = {
    /**
     * Generate a certificate for a completed course
     * Triggers a backend process to email the certificate
     * @param courseId - The ID of the completed course
     */
    generate: async (courseId: string): Promise<CertificateResponse> => {
        try {
            logApiCall('POST', `/Certificates/generate?courseId=${courseId}`)

            const response = await fetch(`${API_BASE_URL}/Certificates/generate?courseId=${courseId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(getAuthToken() ? { 'Authorization': `Bearer ${getAuthToken()}` } : {})
                },
            })

            const data = await parseResponse(response)

            if (!response.ok) {
                console.error('Certificate generation failed:', data)
                throw new Error(data.message || 'Failed to generate certificate')
            }

            console.log('✅ Certificate generation triggered for course:', courseId)
            return data
        } catch (error) {
            console.error('Certificate generation error:', error)
            throw error
        }
    }
}

// ==================== Assignment API ====================

export const assignmentApi = {
    /**
     * Get all assignments for the current user
     * Uses /Assignments/user endpoint
     */
    getAll: async (): Promise<Assignment[]> => {
        const token = getAuthToken();

        if (!token) {
            console.warn('No auth token found, cannot fetch assignments');
            return [];
        }

        try {
            logApiCall('GET', '/Assignments/user');

            const response = await fetch(`${API_BASE_URL}/Assignments/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await parseResponse(response);

            if (!response.ok) {
                console.error('Failed to fetch assignments:', {
                    status: response.status,
                    statusText: response.statusText,
                    data
                });

                if (response.status === 404) {
                    console.warn('Assignments/user endpoint not found (404).');
                    return [];
                }

                throw new Error(data.message || data.title || `Failed to fetch assignments (${response.status})`);
            }

            const assignments = data.data || data;

            if (!Array.isArray(assignments)) {
                console.warn('Assignments response is not an array:', assignments);
                return [];
            }

            console.log(`✅ Fetched ${assignments.length} assignments`);
            return assignments;

        } catch (error: any) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.error('Network error fetching assignments:', error);
                return [];
            }

            console.error('Get assignments error:', error);
            throw error;
        }
    },

    /**
     * Get assignments summary (stats)
     * Uses /Assignments/summary endpoint
     */
    getSummary: async (): Promise<AssignmentSummary> => {
        const token = getAuthToken();

        if (!token) {
            console.warn('No auth token found, cannot fetch assignment summary');
            return {
                totalAssignments: 0,
                submittedAssignments: 0,
                pendingAssignments: 0,
                overdueAssignments: 0
            };
        }

        try {
            logApiCall('GET', '/Assignments/summary');

            const response = await fetch(`${API_BASE_URL}/Assignments/summary`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await parseResponse(response);

            if (!response.ok) {
                console.error('Failed to fetch assignment summary:', {
                    status: response.status,
                    statusText: response.statusText,
                    data
                });

                if (response.status === 404) {
                    console.warn('Assignments/summary endpoint not found (404).');
                    return {
                        totalAssignments: 0,
                        submittedAssignments: 0,
                        pendingAssignments: 0,
                        overdueAssignments: 0
                    };
                }

                throw new Error(data.message || data.title || 'Failed to fetch assignment summary');
            }

            console.log('✅ Fetched assignment summary');
            return data.data || data;

        } catch (error: any) {
            console.error('Get assignment summary error:', error);
            return {
                totalAssignments: 0,
                submittedAssignments: 0,
                pendingAssignments: 0,
                overdueAssignments: 0
            };
        }
    },

    /**
     * Create a new assignment (Mentors only)
     * @param assignmentData - The assignment data to create
     */
    create: async (assignmentData: CreateAssignmentRequest): Promise<Assignment> => {
        const token = getAuthToken();

        if (!token) {
            throw new Error('Authentication required to create assignments');
        }

        try {
            logApiCall('POST', '/Assignments', assignmentData);

            const response = await fetch(`${API_BASE_URL}/Assignments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(assignmentData)
            });

            const data = await parseResponse(response);

            if (!response.ok) {
                console.error('Failed to create assignment:', {
                    status: response.status,
                    statusText: response.statusText,
                    data
                });
                throw new Error(data.message || data.title || 'Failed to create assignment');
            }

            console.log('✅ Assignment created successfully');
            return data.data || data;

        } catch (error) {
            console.error('Create assignment error:', error);
            throw error;
        }
    },

    /**
     * Submit an assignment (Interns only)
     * @param assignmentId - The ID of the assignment to submit
     * @param submissionData - The submission data
     */
    submit: async (assignmentId: string, submissionData: SubmitAssignmentRequest): Promise<any> => {
        const token = getAuthToken();

        if (!token) {
            throw new Error('Authentication required to submit assignments');
        }

        try {
            logApiCall('POST', `/Assignments/${assignmentId}/submit`, submissionData);

            const formData = new FormData();

            if (submissionData.textResponse) {
                formData.append('TextResponse', submissionData.textResponse);
            }

            if (submissionData.file) {
                formData.append('File', submissionData.file);
            }

            if (submissionData.linkUrl) {
                formData.append('LinkUrl', submissionData.linkUrl);
            }

            const response = await fetch(`${API_BASE_URL}/Assignments/${assignmentId}/submit`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Don't set Content-Type for FormData
                },
                body: formData
            });

            const data = await parseResponse(response);

            if (!response.ok) {
                console.error('Failed to submit assignment:', {
                    status: response.status,
                    statusText: response.statusText,
                    data
                });
                throw new Error(data.message || data.title || 'Failed to submit assignment');
            }

            console.log('✅ Assignment submitted successfully');
            return data;

        } catch (error) {
            console.error('Submit assignment error:', error);
            throw error;
        }
    },

    /**
     * Get a specific assignment by ID
     * @param assignmentId - The ID of the assignment
     */
    getById: async (assignmentId: string): Promise<Assignment> => {
        const token = getAuthToken();

        if (!token) {
            throw new Error('Authentication required to fetch assignment');
        }

        try {
            logApiCall('GET', `/Assignments/${assignmentId}`);

            const response = await fetch(`${API_BASE_URL}/Assignments/${assignmentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await parseResponse(response);

            if (!response.ok) {
                console.error('Failed to fetch assignment:', {
                    status: response.status,
                    statusText: response.statusText,
                    data
                });
                throw new Error(data.message || data.title || 'Failed to fetch assignment');
            }

            return data.data || data;

        } catch (error) {
            console.error('Get assignment error:', error);
            throw error;
        }
    }
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
    submitRole: async (roleData: { role: number | string }) => {
        return apiClient('/Onboarding/role', { method: 'POST', body: JSON.stringify(roleData) })
    },
    submitGoals: async (goalsData: { goals: number[] | string[] }) => {
        return apiClient('/Onboarding/goals', { method: 'POST', body: JSON.stringify(goalsData) })
    },
    completeOnboarding: async () => {
        const response = await apiClient('/Onboarding/complete', { method: 'POST' })
        if (typeof window !== 'undefined') {
            localStorage.setItem('onboardingCompleted', 'true')
        }
        return response
    },
    skipOnboarding: async () => {
        const response = await apiClient('/Onboarding/skip', { method: 'POST' })
        if (typeof window !== 'undefined') {
            localStorage.setItem('onboardingCompleted', 'skipped')
        }
        return response
    },
}

// ==================== Cloudinary API ====================

export const cloudinaryApi = {
    uploadCourseVideo: async (file: File, title: string, description: string) => {
        const formData = new FormData()
        formData.append('File', file)
        formData.append('Title', title)
        formData.append('Description', description)

        const token = getAuthToken()
        const headers: Record<string, string> = {}
        if (token) headers['Authorization'] = `Bearer ${token}`

        const response = await fetch(`${API_BASE_URL}/Cloudinary/upload-course-video`, {
            method: 'POST',
            headers,
            body: formData
        })
        return parseResponse(response)
    },
    uploadProfileImage: async (file: File) => {
        const formData = new FormData()
        formData.append('File', file)

        const token = getAuthToken()
        const headers: Record<string, string> = {}
        if (token) headers['Authorization'] = `Bearer ${token}`

        const response = await fetch(`${API_BASE_URL}/Cloudinary/upload-profile-image`, {
            method: 'POST',
            headers,
            body: formData
        })
        return parseResponse(response)
    }
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