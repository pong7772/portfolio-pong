import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

const AUTH_KEY = 'dashboard_authenticated';
const ATTEMPTS_KEY = 'dashboard_attempts';
const MAX_ATTEMPTS = 5;

export const useDashboardAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on mount (client-side only)
    if (typeof window !== 'undefined') {
      const authStatus = sessionStorage.getItem(AUTH_KEY);
      const savedAttempts = parseInt(
        sessionStorage.getItem(ATTEMPTS_KEY) || '0',
        10,
      );

      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
      setAttempts(savedAttempts);
    }
    setIsLoading(false);
  }, []);

  const authenticate = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/dashboard/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, attempts }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Password is correct
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(AUTH_KEY, 'true');
          sessionStorage.removeItem(ATTEMPTS_KEY);
        }
        setIsAuthenticated(true);
        setAttempts(0);
        toast.success('Authentication successful!');
        return true;
      } else {
        // Password is incorrect
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(ATTEMPTS_KEY, newAttempts.toString());
        }

        if (data.maxAttemptsReached) {
          toast.error(
            'Maximum attempts reached. Please refresh the page and try again.',
          );
          // Clear attempts after a delay to allow retry
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem(ATTEMPTS_KEY);
            }
            setAttempts(0);
          }, 30000); // 30 seconds
        } else {
          toast.error(
            `Incorrect password. ${data.remainingAttempts} attempt(s) remaining.`,
          );
        }
        return false;
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(ATTEMPTS_KEY);
    }
    setIsAuthenticated(false);
    setAttempts(0);
    router.push('/');
  };

  return {
    isAuthenticated,
    isLoading,
    attempts,
    remainingAttempts: MAX_ATTEMPTS - attempts,
    authenticate,
    logout,
  };
};
