import { useEffect, useMemo, useState } from 'react';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import { ProjectItemProps } from '@/common/types/projects';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '@/services/projects';

const emptyForm: Partial<ProjectItemProps> & { slug?: string } = {
  title: '',
  slug: '',
  description: '',
  image: '',
  link_demo: '',
  link_github: '',
  stacks: '',
  is_show: true,
  is_featured: false,
  content: '',
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState<ProjectItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectItemProps | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (e) {
      toast.error('Failed to fetch projects');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.image || !form.description) {
      toast.error('Please fill in required fields');
      return;
    }
    try {
      if (editing) {
        await updateProject((editing as any).id, form as any);
        toast.success('Project updated');
      } else {
        await createProject(form as any);
        toast.success('Project created');
      }
      setFormOpen(false);
      resetForm();
      fetchData();
    } catch (e) {
      toast.error('Save failed');
      console.error(e);
    }
  };

  const onEdit = (p: ProjectItemProps) => {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description,
      image: p.image,
      link_demo: p.link_demo,
      link_github: p.link_github,
      stacks: p.stacks,
      is_show: p.is_show,
      is_featured: p.is_featured,
      content: p.content,
    });
    setFormOpen(true);
  };

  const onDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      fetchData();
    } catch (e) {
      toast.error('Delete failed');
      console.error(e);
    }
  };

  const header = useMemo(
    () => (
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Manage Projects</h2>
        <button
          onClick={() => {
            resetForm();
            setFormOpen((v) => !v);
          }}
          className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
        >
          <BiPlus size={20} />
          <span>{formOpen ? 'Close' : 'Add Project'}</span>
        </button>
      </div>
    ),
    [formOpen],
  );

  return (
    <div className='space-y-6'>
      {header}

      {formOpen && (
        <Card className='p-6'>
          <form
            onSubmit={onSubmit}
            className='grid grid-cols-1 gap-4 md:grid-cols-2'
          >
            <div className='md:col-span-1'>
              <label className='mb-2 block text-sm font-medium'>Title *</label>
              <input
                value={form.title as string}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder='Project title'
                required
                className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
              />
            </div>
            <div className='md:col-span-1'>
              <label className='mb-2 block text-sm font-medium'>Slug *</label>
              <input
                value={form.slug as string}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder='my-project'
                required
                className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='mb-2 block text-sm font-medium'>
                Description *
              </label>
              <textarea
                value={form.description as string}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                required
                className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='mb-2 block text-sm font-medium'>
                Image URL *
              </label>
              <input
                value={form.image as string}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder='https://...'
                required
                className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>Demo URL</label>
              <input
                value={form.link_demo as string}
                onChange={(e) =>
                  setForm({ ...form, link_demo: e.target.value })
                }
                placeholder='https://...'
                className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                Github URL
              </label>
              <input
                value={form.link_github as string}
                onChange={(e) =>
                  setForm({ ...form, link_github: e.target.value })
                }
                placeholder='https://...'
                className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='mb-2 block text-sm font-medium'>
                Stacks (comma separated)
              </label>
              <input
                value={form.stacks as string}
                onChange={(e) => setForm({ ...form, stacks: e.target.value })}
                placeholder='Next.js, TypeScript, Prisma'
                className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>Show</label>
              <input
                type='checkbox'
                checked={!!form.is_show}
                onChange={(e) =>
                  setForm({ ...form, is_show: e.target.checked })
                }
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>Featured</label>
              <input
                type='checkbox'
                checked={!!form.is_featured}
                onChange={(e) =>
                  setForm({ ...form, is_featured: e.target.checked })
                }
              />
            </div>
            <div className='md:col-span-2'>
              <label className='mb-2 block text-sm font-medium'>
                Content (optional)
              </label>
              <textarea
                value={form.content as string}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={6}
                className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
              />
            </div>
            <div className='flex gap-3 md:col-span-2'>
              <button
                type='submit'
                className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                {editing ? 'Update Project' : 'Create Project'}
              </button>
              <button
                type='button'
                className='rounded-lg border px-4 py-2 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800'
                onClick={() => {
                  setFormOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {isLoading ? (
        <div className='flex justify-center py-8'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-500' />
        </div>
      ) : projects.length === 0 ? (
        <Card className='p-8 text-center'>
          <p className='text-neutral-600 dark:text-neutral-400'>
            No projects yet.
          </p>
        </Card>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((p) => (
            <Card key={p.slug} className='p-4'>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='font-semibold'>{p.title}</h3>
                  <p className='text-xs text-neutral-500'>/{p.slug}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    className='rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    title='Edit'
                    onClick={() => onEdit(p)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className='rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                    title='Delete'
                    onClick={() => onDelete((p as any).id)}
                  >
                    <BiTrash />
                  </button>
                </div>
              </div>
              <p className='mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400'>
                {p.description}
              </p>
              <div className='mt-3 text-xs text-neutral-500'>
                <span>{p.is_featured ? 'Featured • ' : ''}</span>
                <span>{p.is_show ? 'Visible' : 'Hidden'}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
