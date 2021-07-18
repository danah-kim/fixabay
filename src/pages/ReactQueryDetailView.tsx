import { useParams } from 'react-router-dom';
import useReactQueryImage from 'hooks/useReactQueryImage';
import DetailModal from 'components/DetailModal';

function ReactQueryDetailView() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useReactQueryImage(id);

  return <DetailModal isLoading={isLoading} isError={isError} data={data} />;
}

export default ReactQueryDetailView;
