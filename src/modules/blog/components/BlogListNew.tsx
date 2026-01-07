import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useDebounce } from 'usehooks-ts';

import EmptyState from '@/common/components/elements/EmptyState';
import Pagination from '@/common/components/elements/Pagination';
import SearchBar from '@/common/components/elements/SearchBar';
import BlogCardNewSkeleton from '@/common/components/skeleton/BlogCardNewSkeleton';
import { BlogItemProps } from '@/common/types/blog';
import { fetcher } from '@/services/fetcher';

import BlogCardNew from './BlogCardNew';
import BlogFeaturedSection from './BlogFeaturedSection';
import CategoryFilter from './CategoryFilter';
import SubjectFilter from './SubjectFilter';

const BlogListNew = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjectTags, setSubjectTags] = useState<string | null>(null);
  const router = useRouter();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Build API URL with filters
  const apiUrl = `/api/blog?page=${page}&per_page=15${debouncedSearchTerm ? `&search=${debouncedSearchTerm}` : ''}${selectedSubject && subjectTags ? `&tags=${subjectTags}` : selectedTag ? `&tag=${selectedTag}` : ''}`;

  const { data, error, mutate, isValidating } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  const {
    posts: blogData = [],
    total_pages: totalPages = 1,
    total_posts = 0,
    available_tags: availableTags = [],
  } = data?.data || {};

  const handleSubjectSelect = (subjectId: string | null, tags?: string) => {
    setSelectedSubject(subjectId);
    setSubjectTags(tags || null);
    // Clear tag selection when subject is selected
    if (subjectId) {
      setSelectedTag(null);
    }
    setPage(1);
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    // Clear subject selection when tag is selected
    if (tag) {
      setSelectedSubject(null);
      setSubjectTags(null);
    }
    setPage(1);
  };

  const handlePageChange = async (newPage: number) => {
    await mutate();
    const query: any = { page: newPage };
    if (debouncedSearchTerm) query.search = debouncedSearchTerm;
    if (selectedSubject && subjectTags) {
      query.subject = selectedSubject;
      query.tags = subjectTags;
    } else if (selectedTag) {
      query.tag = selectedTag;
    }

    router.push(
      {
        pathname: '/blog',
        query,
      },
      undefined,
      { shallow: true },
    );
    setPage(newPage);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event?.target?.value;
    setSearchTerm(searchValue);
    setPage(1);

    const query: any = { page: 1 };
    if (searchValue) query.search = searchValue;
    if (selectedSubject && subjectTags) {
      query.subject = selectedSubject;
      query.tags = subjectTags;
    } else if (selectedTag) {
      query.tag = selectedTag;
    }

    router.push(
      {
        pathname: '/blog',
        query,
      },
      undefined,
      { shallow: true },
    );
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPage(1);

    const query: any = { page: 1 };
    if (selectedSubject && subjectTags) {
      query.subject = selectedSubject;
      query.tags = subjectTags;
    } else if (selectedTag) {
      query.tag = selectedTag;
    }

    router.push(
      {
        pathname: '/blog',
        query,
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    const queryPage = Number(router.query.page);
    const queryTag = router.query.tag as string | undefined;
    const querySubject = router.query.subject as string | undefined;
    const queryTags = router.query.tags as string | undefined;
    const querySearch = router.query.search as string | undefined;

    if (!isNaN(queryPage) && queryPage !== page) {
      setPage(queryPage);
    }

    if (querySubject !== selectedSubject) {
      setSelectedSubject(querySubject || null);
    }

    if (queryTags !== subjectTags) {
      setSubjectTags(queryTags || null);
    }

    if (queryTag !== selectedTag) {
      setSelectedTag(queryTag || null);
    }

    if (querySearch !== searchTerm) {
      setSearchTerm(querySearch || '');
    }
  }, [
    router.query,
    page,
    selectedTag,
    selectedSubject,
    subjectTags,
    searchTerm,
  ]);

  const renderEmptyState = () =>
    !isValidating &&
    (!data?.status || blogData.length === 0) && (
      <EmptyState message={error ? 'Error loading posts' : 'No Post Found.'} />
    );

  return (
    <div className='space-y-10'>
      <BlogFeaturedSection />

      <div className='space-y-6'>
        {/* Subject Filter Section - Main Categories */}
        <SubjectFilter
          selectedSubject={selectedSubject}
          onSubjectSelect={handleSubjectSelect}
        />

        {/* Category Filter Section - Individual Tags */}
        <CategoryFilter
          availableTags={availableTags}
          selectedTag={selectedTag}
          onTagSelect={handleTagSelect}
        />

        {/* Search and Results Header */}
        <div className='mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row'>
          <div className='flex items-center gap-2 px-1  text-xl font-medium'>
            {searchTerm || selectedTag || selectedSubject ? (
              <div className='flex flex-wrap items-center gap-2'>
                {searchTerm && (
                  <div>
                    <span className='mr-2 text-neutral-600 dark:text-neutral-400'>
                      Search:
                    </span>
                    <span className='italic'>{searchTerm}</span>
                  </div>
                )}
                {selectedSubject && (
                  <div>
                    <span className='mr-2 text-neutral-600 dark:text-neutral-400'>
                      Subject:
                    </span>
                    <span className='font-semibold text-purple-600 dark:text-purple-400'>
                      {selectedSubject === 'internationalist' &&
                        'The Internationalist'}
                      {selectedSubject === 'personal-development' &&
                        'Personal & Professional Development'}
                      {selectedSubject === 'about-myself' && 'About Myself'}
                      {selectedSubject === 'ai-research' &&
                        'AI Research Project'}
                      {selectedSubject === 'moeys-edtech' && 'MoEYS EdTech'}
                    </span>
                  </div>
                )}
                {selectedTag && (
                  <div>
                    <span className='mr-2 text-neutral-600 dark:text-neutral-400'>
                      Category:
                    </span>
                    <span className='font-semibold text-blue-600 dark:text-blue-400'>
                      #{selectedTag}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <h4 className='text-neutral-800 dark:text-neutral-200'>
                Latest Articles
              </h4>
            )}
            <span className='rounded-full bg-neutral-300 px-2 py-1  text-xs text-neutral-900 dark:bg-neutral-700 dark:text-neutral-50'>
              {total_posts}
            </span>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            onClearSearch={handleClearSearch}
          />
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {!isValidating ? (
            <>
              {blogData.map((item: BlogItemProps, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BlogCardNew {...item} />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {new Array(3).fill(0).map((_, index) => (
                <BlogCardNewSkeleton key={index} />
              ))}
            </>
          )}
        </div>

        {!isValidating && data?.status && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        {renderEmptyState()}
      </div>
    </div>
  );
};

export default BlogListNew;
