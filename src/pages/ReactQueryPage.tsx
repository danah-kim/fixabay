import { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { API_URL, PER_PAGE } from 'constant';
import routes from 'routes';
import { Images, SearchImagesParams } from 'types/api';
import { SearchFormValues } from 'types/common';
import ReactHelmet from 'components/ReactHelmet';
import ImageList from 'components/ImageList';
import SearchBar from 'components/SearchBar';

function ReactQueryPage() {
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState(0);
  const [params, setParams] = useState<Partial<SearchImagesParams>>({
    per_page: PER_PAGE,
  });

  const { isLoading, isFetchingNextPage, isError, data, fetchNextPage, hasNextPage } = useInfiniteQuery<Images>(
    'images',
    async ({ pageParam = 0 }) => {
      setPageIndex(pageParam + 1);
      const res = await axios.get(`${API_URL}&page=${pageParam + 1}`, { params });

      return res.data;
    },
    {
      getNextPageParam: (lastPage) => (lastPage.total === lastPage.hits.length ? false : pageIndex),
    }
  );

  const onSubmit: SubmitHandler<SearchFormValues> = useCallback(
    async ({ keyword }) => {
      setParams({ ...params, q: encodeURIComponent(keyword) });
      setPageIndex(0);
      await queryClient.removeQueries('images', { exact: true });
    },

    [params, queryClient]
  );

  const fetchMoreData = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) return;

    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <ReactHelmet
        title={routes.reactQuery.name}
        description={routes.reactQuery.name}
        canonical={routes.reactQuery.path}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <span>Error</span>
      ) : (
        <div>
          <SearchBar onSubmit={onSubmit} />
          <ImageList
            images={data ? data.pages.flatMap(({ hits }) => hits) : []}
            hasMore={!!hasNextPage}
            fetchMoreData={fetchMoreData}
          />
        </div>
      )}
    </>
  );
}

export default ReactQueryPage;
