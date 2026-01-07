import { useState } from 'react';
import { FiGlobe as GlobeIcon } from 'react-icons/fi';
import useSWR from 'swr';

import Breakline from '@/common/components/elements/Breakline';
import SectionHeading from '@/common/components/elements/SectionHeading';

interface Visitor {
  id: number;
  path: string;
  ip: string | null;
  country: string | null;
  city: string | null;
  user_agent: string | null;
  created_at: string;
}

interface VisitorsResponse {
  data: Visitor[];
  stats: {
    total: number;
    unique_countries: number;
    top_countries: Array<{ country: string; count: number }>;
  };
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch visitors');
  }
  const data = await res.json();
  if (!data.status) {
    throw new Error(data.error || 'Failed to fetch visitors');
  }
  return data;
};

const VisitorsManager = () => {
  const [limit] = useState(50);
  const { data, error, mutate } = useSWR<VisitorsResponse>(
    `/api/admin/visitors?limit=${limit}`,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Don't retry on 4xx errors
        if (error.status === 404 || error.status === 403) return;
        // Retry up to 3 times
        if (retryCount >= 3) return;
        // Retry after 5 seconds
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );

  const getCountryFlag = (countryCode: string | null): string => {
    if (!countryCode || countryCode.length !== 2) return '🌍';
    try {
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch {
      return '🌍';
    }
  };

  return (
    <section className='space-y-6'>
      <SectionHeading
        title='Visitor Tracking'
        icon={<GlobeIcon className='mr-2' />}
      />

      {/* Stats */}
      {data?.stats && (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
              {(data.stats.total || 0).toLocaleString()}
            </div>
            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
              Total Visits
            </div>
          </div>
          <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
              {data.stats.unique_countries || 0}
            </div>
            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
              Countries
            </div>
          </div>
          <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
              {data.stats.top_countries && data.stats.top_countries.length > 0
                ? data.stats.top_countries[0].country
                : 'N/A'}
            </div>
            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
              Top Country
            </div>
          </div>
        </div>
      )}

      {/* Top Countries */}
      {data?.stats?.top_countries && data.stats.top_countries.length > 0 && (
        <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
          <h3 className='mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            Top Countries
          </h3>
          <div className='space-y-2'>
            {data.stats.top_countries.map((country, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between text-sm'
              >
                <span className='flex items-center gap-2'>
                  <span>{getCountryFlag(country.country)}</span>
                  <span className='text-neutral-700 dark:text-neutral-300'>
                    {country.country}
                  </span>
                </span>
                <span className='font-medium text-neutral-600 dark:text-neutral-400'>
                  {country.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visitors Table */}
      <div className='overflow-x-auto rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <table className='w-full'>
          <thead className='border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50'>
            <tr>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400'>
                Path
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400'>
                Location
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400'>
                Time
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-neutral-200 dark:divide-neutral-700'>
            {error ? (
              <tr>
                <td colSpan={3} className='px-4 py-8 text-center'>
                  <GlobeIcon className='mx-auto mb-4 text-4xl text-red-400' />
                  <p className='text-sm font-medium text-red-600 dark:text-red-400'>
                    Error loading visitors
                  </p>
                  <p className='mt-2 text-xs text-neutral-500 dark:text-neutral-400'>
                    {error.message || 'Please try again later'}
                  </p>
                </td>
              </tr>
            ) : !data ? (
              <tr>
                <td colSpan={3} className='px-4 py-8 text-center'>
                  <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-blue-500' />
                  <p className='mt-4 text-sm text-neutral-600 dark:text-neutral-400'>
                    Loading visitors...
                  </p>
                </td>
              </tr>
            ) : !data.data || data.data.length === 0 ? (
              <tr>
                <td colSpan={3} className='px-4 py-8 text-center'>
                  <GlobeIcon className='mx-auto mb-4 text-4xl text-neutral-400' />
                  <p className='text-neutral-600 dark:text-neutral-400'>
                    No visitors yet
                  </p>
                </td>
              </tr>
            ) : (
              data.data.map((visitor) => (
                <tr
                  key={visitor.id}
                  className='transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                >
                  <td className='px-4 py-3'>
                    <code className='rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'>
                      {visitor.path.length > 50
                        ? `${visitor.path.substring(0, 50)}...`
                        : visitor.path}
                    </code>
                  </td>
                  <td className='px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300'>
                    {visitor.country ? (
                      <span className='flex items-center gap-2'>
                        <span>{getCountryFlag(visitor.country)}</span>
                        <span>
                          {visitor.country}
                          {visitor.city ? `, ${visitor.city}` : ''}
                        </span>
                      </span>
                    ) : (
                      <span className='text-neutral-500 dark:text-neutral-400'>
                        Unknown
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-3 text-xs text-neutral-600 dark:text-neutral-400'>
                    {new Date(visitor.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VisitorsManager;
