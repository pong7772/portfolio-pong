import { useState } from 'react';
import { BiLock } from 'react-icons/bi';
import { toast } from 'sonner';

import Button from './Button';
import Card from './Card';
import { useDashboardAuth } from '@/common/hooks/useDashboardAuth';

interface DashboardAuthProps {
  onSuccess: () => void;
}

const DashboardAuth = ({ onSuccess }: DashboardAuthProps) => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authenticate, attempts, remainingAttempts } = useDashboardAuth();
  const maxAttemptsReached = attempts >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (maxAttemptsReached) {
      toast.error(
        'Maximum attempts reached. Please refresh the page and try again.',
      );
      return;
    }

    if (!password.trim()) {
      toast.error('Please enter a password');
      return;
    }

    setIsSubmitting(true);
    const success = await authenticate(password);
    setIsSubmitting(false);

    if (success) {
      onSuccess();
    } else {
      setPassword('');
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
      <Card className='w-full max-w-md border-2 border-neutral-200 dark:border-neutral-700'>
        <div className='p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900'>
                <BiLock
                  className='text-blue-600 dark:text-blue-400'
                  size={20}
                />
              </div>
              <h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
                Dashboard Access
              </h2>
            </div>
          </div>

          <p className='mb-4 text-sm text-neutral-600 dark:text-neutral-400'>
            Please enter the password to access the dashboard.
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='password'
                className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={maxAttemptsReached || isSubmitting}
                className='w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                placeholder='Enter password'
                autoFocus
              />
            </div>

            {attempts > 0 && !maxAttemptsReached && (
              <div className='rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'>
                <p>
                  {remainingAttempts} attempt(s) remaining before access is
                  temporarily blocked.
                </p>
              </div>
            )}

            {maxAttemptsReached && (
              <div className='rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200'>
                <p>
                  Maximum attempts reached. Please refresh the page and try
                  again.
                </p>
              </div>
            )}

            <Button
              type='submit'
              disabled={maxAttemptsReached || isSubmitting || !password.trim()}
              className='w-full'
            >
              {isSubmitting ? 'Verifying...' : 'Access Dashboard'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default DashboardAuth;
