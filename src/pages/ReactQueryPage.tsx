import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import searchState from 'recoil/search';
import { PER_PAGE } from 'constant';
import routes, { reactQueryRoutes } from 'routes';
import { getImageType } from 'lib/utils';
import useReactQueryImages from 'hooks/useReactQueryImages';
import { SearchImagesParams } from 'types/api';
import { SearchFormValues } from 'types/common';
import PageTemplate from 'components/base/PageTemplate';
import ImageList from 'components/image/ImageList';
import NotFound from 'components/error/NotFound';

function ReactQueryPage() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const imageType = getImageType(location.pathname.replace(reactQueryRoutes.reactQuery.path, ''));
  const [pageIndex, setPageIndex] = useState(0);
  const [params, setParams] = useState<Partial<SearchImagesParams>>({
    per_page: PER_PAGE,
    image_type: imageType,
  });
  const { isLoading, isFetchingNextPage, isError, data, fetchNextPage, hasNextPage } = useReactQueryImages({
    pageIndex,
    setPageIndex,
    params,
  });
  const setSearchState = useSetRecoilState(searchState);
  const images = data ? data.pages.flatMap(({ hits }) => hits) : [];

  const refetchData = useCallback(() => {
    setPageIndex(0);
    setParams({ ...params, image_type: imageType });
    queryClient.removeQueries('images', { exact: true });
  }, [imageType, params, queryClient]);

  useEffect(() => {
    params.image_type !== imageType && refetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageType]);

  const onSubmit: SubmitHandler<SearchFormValues> = useCallback(
    ({ search }) => {
      setSearchState(search);
      setParams({ ...params, q: encodeURIComponent(search) });
      setPageIndex(0);
      queryClient.removeQueries('images', { exact: true });
    },
    [params, queryClient, setSearchState]
  );

  const fetchMoreData = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) return;

    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <PageTemplate
      isLoading={isLoading}
      isError={isError}
      onSubmitSearch={onSubmit}
      menu={Object.values(reactQueryRoutes)
        .filter(({ isPage, isNave }) => isPage && isNave)
        .map(({ path, name }) => ({ path, name }))}
      title={routes.reactQuery.name}
      description={routes.reactQuery.name}
      path={routes.reactQuery.path}
    >
      {!isLoading && !isFetchingNextPage && !hasNextPage && !images.length ? (
        <NotFound />
      ) : (
        <ImageList images={images} hasMore={!!hasNextPage} fetchMoreData={fetchMoreData} />
      )}
    </PageTemplate>
  );
}

export default ReactQueryPage;
