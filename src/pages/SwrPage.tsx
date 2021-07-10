import { useMemo, useState } from 'react';
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
  const isLoadingMore = isLoadingInitialData || (size > 0 && !!data && typeof data[size - 1] === 'undefined');

  const onSubmit: SubmitHandler<SearchFormValues> = async ({ keyword }) => {
    setParams({ ...params, q: encodeURIComponent(keyword) });
    await setSize(0);
  };

  return (
    <div>
      <ReactHelmet title={routes.swr.name} description={routes.swr.name} canonical={routes.swr.path} />
      <SearchBar onSubmit={onSubmit} />
      {isLoadingInitialData ? (
        <p>loading...</p>
      ) : (
        !error && <ImageList image={image} total={total} isLoadingMore={isLoadingMore} size={size} setSize={setSize} />
      )}
      {error && <p>failed to load</p>}
    </div>
  );
}

export default SwrPage;
