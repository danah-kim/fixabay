import { useCallback, useMemo, useState } from 'react';
import { useSWRInfinite } from 'swr';
import { SubmitHandler } from 'react-hook-form';
import { fetcher, getKey } from 'swrUtils';
import routes from 'routes';
import { PER_PAGE } from 'constant';
import { Images, SearchImagesParams } from 'types/api';
import { SearchFormValues } from 'types/common';
import ReactHelmet from 'components/ReactHelmet';
import ImageList from 'components/ImageList';
import SearchBar from 'components/SearchBar';

function SwrPage() {
  const [params, setParams] = useState<Partial<SearchImagesParams>>({
    per_page: PER_PAGE,
  });
  const { data, error, size, setSize } = useSWRInfinite<Images>((index) => getKey(index, params), fetcher);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const total = useMemo(() => (data?.length ? data[0].totalHits : 0), [data?.length && data[0].totalHits]);

  const image = data ? data.flatMap(({ hits }) => hits) : [];
  const isLoadingInitialData = !data && !error;
  const hasMore = total !== image.length;

  const onSubmit: SubmitHandler<SearchFormValues> = useCallback(
    async ({ keyword }) => {
      setParams({ ...params, q: encodeURIComponent(keyword) });
      await setSize(0);
    },
    [params, setSize]
  );

  const fetchMoreData = useCallback(async () => {
    await setSize(size + 1);
  }, [setSize, size]);

  return (
    <>
      <ReactHelmet title={routes.swr.name} description={routes.swr.name} canonical={routes.swr.path} />
      {isLoadingInitialData ? (
        <p>loading...</p>
      ) : error ? (
        <p>failed to load {error}</p>
      ) : (
        <div>
          <SearchBar onSubmit={onSubmit} />
          <ImageList image={image} hasMore={hasMore} fetchMoreData={fetchMoreData} />
        </div>
      )}
    </>
  );
}

export default SwrPage;
