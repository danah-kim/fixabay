import { useParams } from 'react-router-dom';
import useReactQueryImage from 'lib/hooks/useReactQueryImage';
import ImageDetailModal from 'components/image/ImageDetailModal';

function ReactQueryDetailView() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useReactQueryImage(id);

  return <ImageDetailModal isLoading={isLoading} isError={isError} data={data} />;
}

export default ReactQueryDetailView;
