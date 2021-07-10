import { Image, Images } from 'types/api';

function ImageList({
  image,
  total,
  isLoadingMore,
  size,
  setSize,
}: {
  image: Image[];
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
          onClick={async () => {
            await setSize(size + 1);
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
