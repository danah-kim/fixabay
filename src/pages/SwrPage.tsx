import { useMemo, useState } from 'react';
import { useSWRInfinite } from 'swr';
import { Images, SearchImagesParams } from 'api';
import routes from 'routes';
import { PER_PAGE } from 'constant';
import { fetcher, getKey } from 'utils';
import ReactHelmet from 'components/ReactHelmet';
import ImageList from 'components/ImageList';

function SwrPage() {
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState<Partial<SearchImagesParams>>({
    per_page: PER_PAGE,
  });
  const { data, error, size, setSize } = useSWRInfinite<Images>((index) => getKey(index, params), fetcher);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const total = useMemo(() => (data?.length ? data[0].totalHits : 0), [data?.length && data[0].totalHits]);

  const image = data ? data.flatMap(({ hits }) => hits) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && !!data && typeof data[size - 1] === 'undefined');

  return (
    <div>
      <ReactHelmet title={routes.swr.name} description={routes.swr.name} canonical={routes.swr.path} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setParams({ ...params, q: keyword });
          await setSize(0);
        }}
      >
        <input
          type="search"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          disabled={error}
        />
        <button type="submit" disabled={error}>
          검색
        </button>
        {isLoadingInitialData ? (
          <p>loading...</p>
        ) : (
          !error && (
            <ImageList image={image} total={total} isLoadingMore={isLoadingMore} size={size} setSize={setSize} />
          )
        )}
        {error && <p>failed to load</p>}
      </form>
    </div>
  );
}

export default SwrPage;
