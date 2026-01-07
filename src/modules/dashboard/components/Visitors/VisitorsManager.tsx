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
  device_type: string | null;
  browser: string | null;
  browser_version: string | null;
  os: string | null;
  os_version: string | null;
  created_at: string;
}

interface VisitorsResponse {
  data: Visitor[];
  stats: {
    total: number;
    unique_countries: number;
    top_countries: Array<{ country: string; count: number }>;
    device_types: Array<{ type: string; count: number }>;
    top_browsers: Array<{ browser: string; count: number }>;
    top_os: Array<{ os: string; count: number }>;
  };
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json().then((data) => data));

const VisitorsManager = () => {
  const [limit] = useState(50);
  const { data, mutate } = useSWR<VisitorsResponse>(
    `/api/admin/visitors?limit=${limit}`,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
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
              {data.stats.total.toLocaleString()}
            </div>
            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
              Total Visits
            </div>
          </div>
          <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
              {data.stats.unique_countries}
            </div>
            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
              Countries
            </div>
          </div>
          <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
              {data.stats.top_countries.length > 0
                ? data.stats.top_countries[0].country
                : 'N/A'}
            </div>
            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
              Top Country
            </div>
          </div>
        </div>
      )}

      {/* Device Stats */}
      {data?.stats && (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {/* Device Types */}
          {data.stats.device_types && data.stats.device_types.length > 0 && (
            <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
              <h3 className='mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
                Device Types
              </h3>
              <div className='space-y-2'>
                {data.stats.device_types.map((device, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-between text-sm'
                  >
                    <span className='capitalize text-neutral-700 dark:text-neutral-300'>
                      {device.type}
                    </span>
                    <span className='font-medium text-neutral-600 dark:text-neutral-400'>
                      {device.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Browsers */}
          {data.stats.top_browsers && data.stats.top_browsers.length > 0 && (
            <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
              <h3 className='mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
                Top Browsers
              </h3>
              <div className='space-y-2'>
                {data.stats.top_browsers.map((browser, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-between text-sm'
                  >
                    <span className='text-neutral-700 dark:text-neutral-300'>
                      {browser.browser}
                    </span>
                    <span className='font-medium text-neutral-600 dark:text-neutral-400'>
                      {browser.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top OS */}
          {data.stats.top_os && data.stats.top_os.length > 0 && (
            <div className='rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900'>
              <h3 className='mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
                Top Operating Systems
              </h3>
              <div className='space-y-2'>
                {data.stats.top_os.map((os, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-between text-sm'
                  >
                    <span className='text-neutral-700 dark:text-neutral-300'>
                      {os.os}
                    </span>
                    <span className='font-medium text-neutral-600 dark:text-neutral-400'>
                      {os.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top Countries */}
      {data?.stats.top_countries && data.stats.top_countries.length > 0 && (
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
                Device
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400'>
                Browser / OS
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400'>
                Time
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-neutral-200 dark:divide-neutral-700'>
            {!data ? (
              <tr>
                <td colSpan={5} className='px-4 py-8 text-center'>
                  <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-blue-500' />
                  <p className='mt-4 text-sm text-neutral-600 dark:text-neutral-400'>
                    Loading visitors...
                  </p>
                </td>
              </tr>
            ) : data.data.length === 0 ? (
              <tr>
                <td colSpan={5} className='px-4 py-8 text-center'>
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
                  <td className='px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300'>
                    {visitor.device_type ? (
                      <span className='inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium capitalize text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'>
                        {visitor.device_type}
                      </span>
                    ) : (
                      <span className='text-neutral-500 dark:text-neutral-400'>
                        Unknown
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-3 text-xs text-neutral-600 dark:text-neutral-400'>
                    <div className='space-y-1'>
                      {visitor.browser && (
                        <div>
                          <span className='font-medium'>{visitor.browser}</span>
                          {visitor.browser_version && (
                            <span className='text-neutral-500'>
                              {' '}
                              {visitor.browser_version}
                            </span>
                          )}
                        </div>
                      )}
                      {visitor.os && (
                        <div className='text-neutral-500'>
                          {visitor.os}
                          {visitor.os_version && ` ${visitor.os_version}`}
                        </div>
                      )}
                    </div>
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
