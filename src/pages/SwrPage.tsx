import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import routes, { swrRoutes } from 'routes';
import { PER_PAGE } from 'constant';
import { getImageType } from 'lib/utils';
import useSwrImages from 'hooks/useSwrImages';
import { SearchImagesParams } from 'types/api';
import { SearchFormValues } from 'types/common';
import PageTemplate from 'components/base/PageTemplate';
import ImageList from 'components/image/ImageList';

function SwrPage() {
  const location = useLocation();
  const imageType = getImageType(location.pathname.replace(swrRoutes.swr.path, ''));
  const [params, setParams] = useState<Partial<SearchImagesParams>>({
    per_page: PER_PAGE,
    image_type: imageType,
  });
  const { data, isLoading, isError, size, setSize, refresh } = useSwrImages(params);
  const image = data ? data.flatMap(({ hits }) => hits) : [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const total = useMemo(() => (data?.length ? data[0].totalHits : 0), [data?.length && data[0].totalHits]);
  const hasMore = total !== image.length;

  const refetchData = useCallback(async () => {
    await setSize(0);
    await refresh();
    setParams({ ...params, image_type: imageType });
  }, [imageType, params, refresh, setSize]);

  useEffect(() => {
    params.image_type !== imageType && refetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageType]);

  const onSubmit: SubmitHandler<SearchFormValues> = useCallback(
    async ({ search }) => {
      setParams({ ...params, q: encodeURIComponent(search) });
      await setSize(0);
    },
    [params, setSize]
  );

  const fetchMoreData = useCallback(async () => {
    await setSize(size + 1);
  }, [setSize, size]);

  return (
    <PageTemplate
      isLoading={isLoading}
      isError={isError}
      menu={Object.values(swrRoutes)
        .filter(({ isPage, isNave }) => isPage && isNave)
        .map(({ path, name }) => ({ path, name }))}
      onSubmitSearch={onSubmit}
      title={routes.swr.name}
      description={routes.swr.name}
      path={routes.swr.path}
    >
      <ImageList images={image} hasMore={hasMore} fetchMoreData={fetchMoreData} />
    </PageTemplate>
  );
}

export default SwrPage;
