import { useAuth as useAuthContext } from '@/contexts/AuthContext';

// Wrapper for the context to maintain consistent import paths for the hook
export function useAuth() {
  return useAuthContext();
}