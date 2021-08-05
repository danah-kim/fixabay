import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToggle } from 'react-use';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import routes from 'routes';
import { Image as ImageT } from 'types/api';
import Info from './ImageCardInfo';
import UserProfile from 'components/common/UserProfile';

const Container = styled.div`
  ${tw`pb-4 px-2 h-full box-border flex flex-col`};
`;
const Box = tw.div`relative h-full w-full`;
const ImageBox = styled.div`
  ${tw`rounded-2xl bg-gray-100 h-full box-border`};
`;
const Img = tw.img`w-full rounded-2xl`;

function ImageCard({
  id,
  user_id,
  user,
  userImageURL,
  webformatURL,
  largeImageURL,
  likes,
  views,
  downloads,
}: Pick<
  ImageT,
  'id' | 'user_id' | 'user' | 'userImageURL' | 'webformatURL' | 'largeImageURL' | 'likes' | 'views' | 'downloads'
>) {
  const [isHover, toggle] = useToggle(false);

  const handleHover = useCallback(() => {
    toggle(!isHover);
  }, [isHover, toggle]);

  return (
    <Container>
      <Box onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <Image id={id} webformatURL={webformatURL} />
        <Info
          isHover={isHover}
          id={id}
          largeImageURL={largeImageURL}
          likes={likes}
          views={views}
          downloads={downloads}
        />
      </Box>
      <UserProfile user={user} userImageURL={userImageURL} />
    </Container>
  );
}

const Image = memo(function Image({ id, webformatURL }: Pick<ImageT, 'id' | 'webformatURL'>) {
  const location = useLocation();

  return (
    <ImageBox>
      <Link
        to={{
          pathname: routes[
            location.pathname.includes(routes.reactQuery.path) ? 'reactQueryImageView' : 'swrImageView'
          ].path.replace(':id', `${id}`),
          state: { background: location },
        }}
        style={{ cursor: 'zoom-in' }}
      >
        <Img src={webformatURL} alt={`${id}`} />
      </Link>
    </ImageBox>
  );
});

export default memo(ImageCard);
