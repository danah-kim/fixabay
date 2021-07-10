import { Images } from 'api';

function ImageList({
  image,
  total,
  isLoadingMore,
  size,
  setSize,
}: {
  image: Images['hits'];
  total: number;
  isLoadingMore: boolean;
  size: number;

  setSize: (size: number | ((size: number) => number)) => Promise<Images[] | undefined>;
}) {
  return image.length ? (
    <>
      <div style={{ display: 'grid' }}>
        {image.map(({ id, previewURL }) => (
          <img key={id} src={previewURL} alt={`${id}`} />
        ))}
      </div>
      {total > image.length && (
        <button
          disabled={isLoadingMore}
          onClick={() => {
            setSize(size + 1);
          }}
        >
          Load More
        </button>
      )}
    </>
  ) : (
    <p>no data</p>
  );
}

export default ImageList;
