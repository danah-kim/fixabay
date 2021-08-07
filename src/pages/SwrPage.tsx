import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import routes, { swrRoutes } from 'routes';
import { PER_PAGE, STORAGE_KEY } from 'constant';
import { getImageType, getLastUrlParam } from 'lib/utils';
import useSwrImages from 'lib/hooks/useSwrImages';
import { SearchImagesParams } from 'types/api';
import PageTemplate from 'components/base/PageTemplate';
import ImageList from 'components/image/ImageList';
import NotFound from 'components/error/NotFound';
import useLocalStorage from 'lib/hooks/useLocalStorage';

function SwrPage() {
  const location = useLocation();
  const imageType = getImageType(location.pathname.replace(swrRoutes.swr.path, ''));
  const search = getLastUrlParam(location.search, 'q') || '';
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(STORAGE_KEY.recentSearches);
  const [params, setParams] = useState<Partial<SearchImagesParams>>({
    per_page: PER_PAGE,
    image_type: imageType,
    q: search || '',
  });
  const { data, isLoading, isError, size, setSize, refresh } = useSwrImages(params);
  const images = data ? data.flatMap(({ hits }) => hits) : [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const total = useMemo(() => (data?.length ? data[0].totalHits : 0), [data?.length && data[0].totalHits]);
  const hasMore = total !== images.length;

  const refetchData = useCallback(async () => {
    setParams({ ...params, image_type: imageType, q: search });
    await setSize(0);
    await refresh();
  }, [imageType, params, refresh, search, setSize]);

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
    await setSize(size + 1);
  }, [setSize, size]);

  return (
    <PageTemplate
      isLoading={isLoading}
      isError={isError}
      menu={Object.values(swrRoutes)
        .filter(({ isPage, isNave }) => isPage && isNave)
        .map(({ path, name }) => ({ path, name }))}
      title={routes.swr.name}
      description={routes.swr.name}
      path={routes.swr.path}
    >
      {!isLoading && !hasMore && !images.length ? (
        <NotFound isSearch />
      ) : (
        <ImageList images={images} hasMore={hasMore} fetchMoreData={fetchMoreData} />
      )}
    </PageTemplate>
  );
}

export default SwrPage;
