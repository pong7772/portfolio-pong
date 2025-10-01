import axios from 'axios';

import { GITHUB_ACCOUNTS } from '@/common/constant/github';

const GITHUB_USER_ENDPOINT = 'https://api.github.com/graphql';

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`;

export const fetchGithubData = async (
  username: string,
  token: string | undefined,
) => {
  // Fallback empty calendar shape compatible with the dashboard components
  const emptyCalendar = {
    contributionsCollection: {
      contributionCalendar: {
        colors: [],
        totalContributions: 0,
        months: [],
        weeks: [],
      },
    },
  };

  try {
    if (!token) {
      return { status: 200, data: emptyCalendar };
    }

    const response = await axios.post(
      GITHUB_USER_ENDPOINT,
      {
        query: GITHUB_USER_QUERY,
        variables: {
          username: username,
        },
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );

    const status: number = response.status;
    const responseJson = response.data;

    if (status >= 400) {
      return { status, data: emptyCalendar };
    }

    return { status, data: responseJson.data.user ?? emptyCalendar };
  } catch (error: unknown) {
    const status = (axios.isAxiosError(error) && error.response?.status) || 500;
    return { status, data: emptyCalendar };
  }
};

export const getGithubUser = async (type: string) => {
  const account = GITHUB_ACCOUNTS.find(
    (account) => account?.type === type && account?.is_active,
  );

  if (!account) {
    return {
      status: 400,
      data: {
        contributionsCollection: { contributionCalendar: { colors: [], totalContributions: 0, months: [], weeks: [] } },
      },
    };
  }

  const { username, token } = account;
  return await fetchGithubData(username, token);
};
