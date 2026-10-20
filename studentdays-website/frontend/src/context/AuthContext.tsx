import React, { createContext, useContext, useState } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  register: (data: any) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isStudent: boolean;
  isCoordinator: boolean;
  isAdmin: boolean;
  isMasterAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a purely static deployment, no mock or fake user accounts are invented.
  const [user, setUser] = useState<User | null>(null);
  const loading = false;

  const login = async (_email: string, _password: string) => {
    return {
      success: false,
      error: 'Portal authentication is disabled in this static frontend build. All trip inquiries and seat bookings are handled directly via WhatsApp (+91 96403 89230) or Email.'
    };
  };

  const register = async (_data: any) => {
    return {
      success: false,
      error: 'Account registration requires active server infrastructure which is decoupled in this static deployment. For trip participation, please join your college chapter via WhatsApp.'
    };
  };

  const logout = async () => {
    setUser(null);
  };

  const refreshUser = async () => {
    setUser(null);
  };

  const isStudent = user?.role === 'STUDENT';
  const isCoordinator = user?.role === 'COORDINATOR';
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'MASTER_ADMIN';
  const isMasterAdmin = user?.role === 'MASTER_ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isStudent,
        isCoordinator,
        isAdmin,
        isMasterAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
