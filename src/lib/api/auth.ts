import type { User, LoginFormData, RegisterData } from '../../types/auth';

interface AuthResponse {
  user: User;
  token: string;
}

// Mock users for development
const MOCK_USERS = [
  {
    id: '1',
    email: 'residential@example.com',
    password: 'password123',
    fullName: 'John Residential',
    role: 'residential',
    clientType: 'residential'
  },
  {
    id: '2',
    email: 'commercial@example.com',
    password: 'password123',
    fullName: 'Jane Commercial',
    role: 'commercial',
    clientType: 'commercial',
    companyName: 'ABC Corp',
    companySize: '50-100'
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: 'password123',
    fullName: 'Admin User',
    role: 'admin'
  }
];

export const authApi = {
  login: async (credentials: LoginFormData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user
    const user = MOCK_USERS.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password &&
      u.role === credentials.userType
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password, ...userWithoutPassword } = user;
    const response: AuthResponse = {
      user: userWithoutPassword,
      token: 'mock-jwt-token'
    };

    // Store auth data
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user_role', user.role);
    localStorage.setItem('user_data', JSON.stringify(userWithoutPassword));
    
    return response;
  },

  register: async (data: RegisterData) => {
    const { email, firstName, lastName, password } = data;
    // Simulated API call - in a real app, you would hash the password and send it to the server
    return new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        // Store hashed password or token in a real implementation
        localStorage.setItem('auth_token', `${email}_${password}`);
        resolve({
          user: {
            id: '1',
            email,
            firstName,
            lastName,
            role: 'user'
          },
        });
      }, 1000);
    });
  },

  logout: async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
  },

  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (!token || !userData) {
      throw new Error('No auth token');
    }
    
    return JSON.parse(userData);
  },
};