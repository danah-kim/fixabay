import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToggle } from 'react-use';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import routes from 'routes';
import { Image as ImageT } from 'types/api';
import Info from './ImageCardInfo';

const Container = styled.div`
  ${tw`pb-4 px-2 h-full box-border flex flex-col`};
`;
const Box = tw.div`relative h-full w-full cursor[zoom-in]`;
const ImageBox = styled.div`
  ${tw`rounded-2xl bg-gray-100 h-full box-border`};
`;
const Img = tw.img`w-full rounded-2xl`;
const UserBox = styled.div`
  ${tw`p-2 pb-4 box-border`};
`;
const UserInfo = tw.div`flex items-center -mx-1`;
const UserAvater = styled.div({
  ...tw`w-6 h-auto mx-1`,
  flex: '0 0 auto',
});
const UserName = tw.div`mx-1 flex-auto text-sm text-gray-800`;

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
  const location = useLocation();
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
      <User user={user} user_id={user_id} userImageURL={userImageURL} />
    </Container>
  );
}

const Image = memo(function Image({ id, webformatURL }: Pick<ImageT, 'id' | 'webformatURL'>) {
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

const User = memo(function User({ user, user_id, userImageURL }: Pick<ImageT, 'user' | 'user_id' | 'userImageURL'>) {
  return (
    <UserBox>
      <UserInfo>
        <UserAvater>
          <Img src={userImageURL} alt={`${user_id}`} />
        </UserAvater>
        <UserName>{user}</UserName>
      </UserInfo>
    </UserBox>
  );
});

export default memo(ImageCard);
