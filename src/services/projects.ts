import axios from 'axios';

import { ProjectItemProps } from '@/common/types/projects';

export const getProjects = async (): Promise<ProjectItemProps[]> => {
  const res = await axios.get('/api/projects');
  return res.data?.data ?? [];
};

export const createProject = async (
  payload: Partial<ProjectItemProps> & { slug: string },
) => {
  const res = await axios.post('/api/projects', payload);
  return res.data?.data;
};

export const updateProject = async (
  id: number,
  updates: Partial<ProjectItemProps>,
) => {
  const res = await axios.put('/api/projects', { id, ...updates });
  return res.data?.data;
};

export const deleteProject = async (id: number) => {
  const res = await axios.delete('/api/projects', { params: { id } });
  return res.data;
};
