import { KeyboardEvent, memo, MouseEvent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { useToggle, useWindowSize } from 'react-use';
import { CgClose } from 'react-icons/cg';
import isMobile from 'ismobilejs';
import { Image } from 'types/api';
import NotFound from 'components/error/NotFound';
import UserProfile from 'components/common/UserProfile';
import HashLoader from 'components/common/HashLoader';
import Info from './ImageDetailInfo';
import Menu from './ImageDetailMenu';

Modal.setAppElement('#portal');

const Icon = tw.button`absolute top-0 left-0 p-3 text-2xl text-white text-opacity-80 hover:text-opacity-100 transition duration-150 ease-in-out pointer-events-none`;

const Paper = styled.div`
  ${tw`bg-white rounded-3xl shadow-xl min-w-0 m-auto`};

  @media (max-width: 755px) {
    border-radius: 24px;
  }
`;
const MobileInfoBox = styled.div`
  ${tw`px-6 pt-2 pb-4 flex items-center justify-between flex-wrap`};
`;
const ImageBox = styled.div`
  padding: 32px 32px 16px;

  @media (max-width: 755px) {
    padding: 0;
  }
`;
const Img = styled.img`
  ${tw`w-full block rounded-2xl`};
  margin: 0 auto;

  @media (max-width: 755px) {
    border-radius: 24px 24px 0 0;
  }
  @media (max-width: 581px) {
    border-radius: 0;
  }
`;

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    cursor: 'zoom-out',
    zIndex: 20,
  },
  content: {
    cursor: 'default',
    margin: '48px 120px 0px',
  },
};

interface ImageDetailModalProps {
  isLoading: boolean;
  isError: boolean;
  data: Image | undefined;
}

function ImageDetailModal({ isLoading, isError, data }: ImageDetailModalProps) {
  const history = useHistory();
  const { width } = useWindowSize();
  const [loaded, toggle] = useToggle(false);
  const isMobileDevice = isMobile(window.navigator).phone || isMobile(window.navigator).tablet;
  const maxWidth = width > 1260 ? 'calc((100vh - 280px) * 1.5)' : '100%';
  const hiddenMobile = width > 580 || !isMobileDevice;

  const closeModal = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      e.stopPropagation();

      // referrer 확인해서 뒤로가기 구현해야하나 테스트이므로 심플하게 구현
      // document.referrer && document.referrer.indexOf('###') !== -1
      //   ? history.goBack()
      //   : history.replace(routes[location.pathname.includes(routes.swr.path) ? 'swr' : 'reactQuery'].path);
      history.goBack();
    },
    [history]
  );

  const onLoad = useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <Modal isOpen className="modal-content" onRequestClose={closeModal} style={customStyles} contentLabel="Image Modal">
      <Icon>
        <CgClose />
      </Icon>
      {isLoading ? (
        <HashLoader />
      ) : isError || !data ? (
        <Paper>
          <NotFound isError={isError} />
        </Paper>
      ) : (
        <Paper>
          {!hiddenMobile && loaded && (
            <MobileInfoBox>
              <UserProfile
                user={data.user}
                userImageURL={data.userImageURL}
                style={{ padding: '12px 16px 0 0', fontWeight: 700 }}
              />
              <Menu id={data.id} url={data.largeImageURL || data.webformatURL} style={{ padding: '12px 0 0' }} />
            </MobileInfoBox>
          )}
          <ImageBox>
            <Img src={data.webformatURL} alt={`${data.id}`} style={{ maxWidth }} onLoad={onLoad} />
          </ImageBox>
          <Info
            visibleMenu={hiddenMobile && loaded}
            maxWidth={maxWidth}
            id={data.id}
            user={data.user}
            userImageURL={data.userImageURL}
            likes={data.likes}
            views={data.views}
            downloads={data.downloads}
            url={data.largeImageURL || data.webformatURL}
          />
        </Paper>
      )}
    </Modal>
  );
}

export default memo(ImageDetailModal);
