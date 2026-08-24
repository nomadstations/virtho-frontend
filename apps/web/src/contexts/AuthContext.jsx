import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * ========================================
 * MOCK USER CONFIGURATION
 * ========================================
 */
const MOCK_USER = {
  id: 'user-1', 
  name: 'Alex Developer',
  email: 'alex@example.com',
  // UI avatar background color is controlled via CSS classes in components
  avatar: 'https://ui-avatars.com/api/?name=Alex+Developer&background=7DD3C0&color=fff',
  role: 'Administrator',
  memberSince: '2023-01-15',
  bio: 'Full-stack developer and community builder. Passionate about open source and sustainable tech.',
  location: '',
  website: '',
  socialLinks: {
    twitter: '',
    linkedin: '',
    github: '',
  },
};

const INITIAL_DATA = {
  blogs: [
    { id: '1', title: 'Getting Started with React', author: 'Alex Developer', date: '2024-03-01', category: 'Tech', image: '', excerpt: 'A quick guide to React.', content: '...' }
  ],
  projects: [], 
  events: [],
  products: [],
  portfolios: [],
  teams: [],
  activities: [
    { id: '1', text: 'System initialized', timestamp: new Date().toISOString() }
  ]
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('virtho_dashboard_data');
    return stored ? JSON.parse(stored) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('virtho_dashboard_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const user = localStorage.getItem('virtho_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    setCurrentUser(MOCK_USER);
    setIsAuthenticated(true);
    localStorage.setItem('virtho_user', JSON.stringify(MOCK_USER));
    toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
    return { success: true };
  };

  const register = (userData) => {
    const newUser = { ...MOCK_USER, ...userData, id: Date.now().toString() };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('virtho_user', JSON.stringify(newUser));
    toast({ title: 'Account created!', description: 'Welcome to the platform.' });
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('virtho_user');
    toast({ title: 'Logged out', description: 'You have been logged out safely.' });
  };

  const updateUserProfile = async (profileData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedUser = { ...currentUser, ...profileData };
          setCurrentUser(updatedUser);
          localStorage.setItem('virtho_user', JSON.stringify(updatedUser));
          logActivity(`Updated profile: ${profileData.name}`);
          resolve({ success: true });
        } catch (error) {
          reject(new Error('Failed to update profile'));
        }
      }, 1000);
    });
  };

  const uploadProfilePicture = async (imageData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedUser = { ...currentUser, avatar: imageData };
          setCurrentUser(updatedUser);
          localStorage.setItem('virtho_user', JSON.stringify(updatedUser));
          logActivity('Updated profile picture');
          resolve({ success: true, imageUrl: imageData });
        } catch (error) {
          reject(new Error('Failed to upload profile picture'));
        }
      }, 800);
    });
  };

  const archiveUserAccount = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          logActivity('Account archived');
          setCurrentUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('virtho_user');
          localStorage.removeItem('virtho_dashboard_data');
          resolve({ success: true });
        } catch (error) {
          reject(new Error('Failed to archive account'));
        }
      }, 1500);
    });
  };

  const logActivity = (text) => {
    setData(prev => ({
      ...prev,
      activities: [{ id: Date.now().toString(), text, timestamp: new Date().toISOString() }, ...prev.activities].slice(0, 10)
    }));
  };

  const projectMethods = {
    add: (item) => {
      const newProject = {
        id: Date.now().toString(),
        ...item,
        ownerId: currentUser?.id, 
        createdDate: item.createdDate || new Date().toISOString().split('T')[0],
      };
      
      setData(prev => ({
        ...prev,
        projects: [newProject, ...prev.projects]
      }));
      
      logActivity(`Created new project: ${item.name || item.title}`);
      
      return newProject;
    },
    update: (id, item) => {
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(i => i.id === id ? { ...i, ...item } : i)
      }));
      logActivity(`Updated project: ${item.name || item.title}`);
    },
    delete: (id) => {
      const item = data.projects.find(i => i.id === id);
      setData(prev => ({
        ...prev,
        projects: prev.projects.filter(i => i.id !== id)
      }));
      if (item) logActivity(`Deleted project: ${item.name || item.title}`);
    }
  };

  const createCrudMethods = (collectionKey, displayNameField) => ({
    add: (item) => {
      setData(prev => ({
        ...prev,
        [collectionKey]: [{ id: Date.now().toString(), ...item }, ...prev[collectionKey]]
      }));
      logActivity(`Created new ${collectionKey.slice(0, -1)}: ${item[displayNameField]}`);
    },
    update: (id, item) => {
      setData(prev => ({
        ...prev,
        [collectionKey]: prev[collectionKey].map(i => i.id === id ? { ...i, ...item } : i)
      }));
      logActivity(`Updated ${collectionKey.slice(0, -1)}: ${item[displayNameField]}`);
    },
    delete: (id) => {
      const item = data[collectionKey].find(i => i.id === id);
      setData(prev => ({
        ...prev,
        [collectionKey]: prev[collectionKey].filter(i => i.id !== id)
      }));
      if (item) logActivity(`Deleted ${collectionKey.slice(0, -1)}: ${item[displayNameField]}`);
    }
  });

  const blogMethods = createCrudMethods('blogs', 'title');
  const eventMethods = createCrudMethods('events', 'title');
  const productMethods = createCrudMethods('products', 'name');
  const portfolioMethods = createCrudMethods('portfolios', 'title');
  const teamMethods = createCrudMethods('teams', 'name');

  const getUserProjects = () => {
    if (!currentUser) return [];
    return data.projects.filter(project => project.ownerId === currentUser.id);
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserProfile,
    uploadProfilePicture,
    archiveUserAccount,
    dashboardData: data,
    getUserProjects, 
    
    addBlog: blogMethods.add, updateBlog: blogMethods.update, deleteBlog: blogMethods.delete,
    addProject: projectMethods.add, updateProject: projectMethods.update, deleteProject: projectMethods.delete,
    addEvent: eventMethods.add, updateEvent: eventMethods.update, deleteEvent: eventMethods.delete,
    addProduct: productMethods.add, updateProduct: productMethods.update, deleteProduct: productMethods.delete,
    addPortfolioItem: portfolioMethods.add, updatePortfolioItem: portfolioMethods.update, deletePortfolioItem: portfolioMethods.delete,
    addTeam: teamMethods.add, updateTeam: teamMethods.update, deleteTeam: teamMethods.delete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}