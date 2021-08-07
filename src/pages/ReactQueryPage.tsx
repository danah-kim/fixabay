import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { PER_PAGE, STORAGE_KEY } from 'constant';
import routes, { reactQueryRoutes } from 'routes';
import { getImageType, getLastUrlParam } from 'lib/utils';
import useReactQueryImages from 'lib/hooks/useReactQueryImages';
import useLocalStorage from 'lib/hooks/useLocalStorage';
import { SearchImagesParams } from 'types/api';
import PageTemplate from 'components/base/PageTemplate';
import ImageList from 'components/image/ImageList';
import NotFound from 'components/error/NotFound';

function ReactQueryPage() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const imageType = getImageType(location.pathname.replace(reactQueryRoutes.reactQuery.path, ''));
  const [pageIndex, setPageIndex] = useState(0);
  const search = getLastUrlParam(location.search, 'q') || '';
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(STORAGE_KEY.recentSearches);
  const [params, setParams] = useState<Partial<SearchImagesParams>>({
    per_page: PER_PAGE,
    image_type: imageType,
    q: search || '',
  });
  const { isLoading, isFetchingNextPage, isError, data, fetchNextPage, hasNextPage } = useReactQueryImages({
    pageIndex,
    setPageIndex,
    params,
  });

  const images = data ? data.pages.flatMap(({ hits }) => hits) : [];

  const refetchData = useCallback(() => {
    setParams({ ...params, image_type: imageType, q: search });
    setPageIndex(0);
    queryClient.removeQueries('images', { exact: true });
  }, [imageType, params, queryClient, search]);

  useEffect(() => {
    search.length &&
      setRecentSearches(
        recentSearches?.length
          ? Array.from(new Set(recentSearches.concat(search).slice(recentSearches.length > 1 ? -5 : 0)))
          : [search]
      );
    (params.image_type !== imageType || params.q !== search) && refetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageType, search]);

  const fetchMoreData = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) return;

    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <PageTemplate
      isLoading={isLoading}
      isError={isError}
      menu={Object.values(reactQueryRoutes)
        .filter(({ isPage, isNave }) => isPage && isNave)
        .map(({ path, name }) => ({ path, name }))}
      title={routes.reactQuery.name}
      description={routes.reactQuery.name}
      path={routes.reactQuery.path}
    >
      {!isLoading && !isFetchingNextPage && !hasNextPage && !images.length ? (
        <NotFound isSearch />
      ) : (
        <ImageList images={images} hasMore={!!hasNextPage} fetchMoreData={fetchMoreData} />
      )}
    </PageTemplate>
  );
}

export default ReactQueryPage;
