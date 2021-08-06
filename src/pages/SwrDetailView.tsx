import { useParams } from 'react-router-dom';
import useSwrImage from 'lib/hooks/useSwrImage';
import ImageDetailModal from 'components/image/ImageDetailModal';

function SwrDetailView() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useSwrImage(id);

  return <ImageDetailModal isLoading={isLoading} isError={isError} data={data} />;
}

export default SwrDetailView;
