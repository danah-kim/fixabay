import { KeyboardEvent, MouseEvent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';
import { Image } from 'types/api';
import routes from 'routes';
import { copyTextToClipboard, formatNumberWithCommas } from 'lib/utils';
import DownloadButton from 'components/common/DownloadButton';
import NotFound from 'components/error/NotFound';
import UserProfile from 'components/common/UserProfile';
import useSwrImage from 'hooks/useSwrImage';

Modal.setAppElement('#root');

const Paper = tw.div`bg-white rounded-3xl shadow-xl min-w-0 m-auto`;
const ImageBox = styled.div`
  ${tw`p-8`}
`;
const InfoBox = styled.div`
  ${tw`flex items-center px-8 pb-8 flex items-center`}
`;
const Img = tw.img`w-full block rounded-2xl`;
const Statistics = tw.div`box-border flex justify-items-center flex-auto mx-auto pl-2 pr-4`;
const Statistic = styled.div`
  ${tw`flex flex-col box-border text-xs font-medium w-full text-gray-800 font-semibold`}

  p {
    font-weight: 500;
  }
`;
const Label = tw.p`text-gray-500`;
const Icon = styled.button`
  ${tw`mr-4 border-2 border-solid border-green-500 p-2 cursor-pointer transition duration-300 ease-in-out hover:bg-green-500 rounded-full text-green-500  hover:text-white`};

  svg {
    ${tw`text-lg`};
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

  const onClickCopy = useCallback(() => {
    data?.webformatURL && copyTextToClipboard(data.webformatURL);
    window.alert('copied!');
  }, [data?.webformatURL]);

  return (
    <Modal isOpen className="modal-content" onRequestClose={closeModal} style={customStyles} contentLabel="Image Modal">
      <Paper>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError || !data ? (
          <NotFound isError={isError} />
        ) : (
          <>
            <ImageBox>
              <Img
                src={data.webformatURL}
                alt={`${data.id}`}
                onLoad={(e) => {
                  console.log(e);
                }}
              />
            </ImageBox>
            <InfoBox>
              <UserProfile user={data.user} userImageURL={data.userImageURL} />
              <Statistics>
                <Statistic>
                  <Label>Likes</Label>
                  {formatNumberWithCommas(data.likes)}
                </Statistic>
                <Statistic>
                  <Label>Views</Label>
                  {formatNumberWithCommas(data.views)}
                </Statistic>
                <Statistic>
                  <Label>Downloads</Label>
                  {formatNumberWithCommas(data.downloads)}
                </Statistic>
              </Statistics>
              <Icon onClick={onClickCopy}>
                <HiOutlineClipboardCopy />
              </Icon>
              <DownloadButton name={`${data.id}`} url={data.largeImageURL} visibleText />
            </InfoBox>
          </>
        )}
      </Paper>
    </Modal>
  );
}

export default ImageDetailModal;
