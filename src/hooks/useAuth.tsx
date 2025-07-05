
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { api, API_ENDPOINTS } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setAuth({
        user: JSON.parse(userData),
        token,
        isAuthenticated: true,
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.post(API_ENDPOINTS.auth.login, { email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuth({
        user,
        token,
        isAuthenticated: true,
      });
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Please check your credentials.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.post(API_ENDPOINTS.auth.register, data);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuth({
        user,
        token,
        isAuthenticated: true,
      });
      
      toast({
        title: "Welcome to SocialApp!",
        description: "Your account has been created successfully.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{
      ...auth,
      login,
      register,
      logout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
