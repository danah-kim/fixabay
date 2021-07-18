import { useParams } from 'react-router-dom';
import useSwrImage from 'hooks/useSwrImage';
import DetailModal from 'components/DetailModal';

function SwrDetailView() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useSwrImage(id);

  return <DetailModal isLoading={isLoading} isError={isError} data={data} />;
}

export default SwrDetailView;
