import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { PER_PAGE } from 'constant';
import routes, { reactQueryRoutes } from 'routes';
import { getImageType } from 'lib/utils';
import useReactQueryImages from 'hooks/useReactQueryImages';
import { SearchImagesParams } from 'types/api';
import { SearchFormValues } from 'types/common';
import PageTemplate from 'components/base/PageTemplate';
import ImageList from 'components/image/ImageList';

function ReactQueryPage() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const imageType = getImageType(location.pathname.replace(reactQueryRoutes.reactQuery.path, ''));
  const [pageIndex, setPageIndex] = useState(0);
  const [params, setParams] = useState<Partial<SearchImagesParams>>({
    per_page: PER_PAGE,
    image_type: imageType,
  });
  const { isLoading, isFetchingNextPage, isError, data, fetchNextPage, hasNextPage, remove } = useReactQueryImages({
    pageIndex,
    setPageIndex,
    params,
  });

  const refetchData = useCallback(() => {
    remove();
    setPageIndex(0);
    setParams({ ...params, image_type: imageType });
  }, [imageType, params, remove]);

  useEffect(() => {
    params.image_type !== imageType && refetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageType]);

  const onSubmit: SubmitHandler<SearchFormValues> = useCallback(
    async ({ search }) => {
      setParams({ ...params, q: encodeURIComponent(search) });
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
      <ImageList
        images={data ? data.pages.flatMap(({ hits }) => hits) : []}
        hasMore={!!hasNextPage}
        fetchMoreData={fetchMoreData}
      />
    </PageTemplate>
  );
}

export default ReactQueryPage;
