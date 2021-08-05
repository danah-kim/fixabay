import { KeyboardEvent, MouseEvent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { Image } from 'types/api';
import DownloadButton from 'components/common/DownloadButton';
import NotFound from 'components/error/NotFound';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,.6)',
    cursor: 'pointer',
    zIndex: 20,
  },
  content: {
    cursor: 'default',
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
      history.goBack();
    },
    [history]
  );

  return (
    <Modal
      isOpen
      bodyOpenClassName="modal-open"
      className="modal-content"
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 4,
          boxShadow: '0 8px 16px rgb(0, 0, 0, 0.15)',
          minWidth: 0,
          margin: 'auto',
          padding: 20,
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <NotFound isError />
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <div style={{ marginRight: 15 }}>
                <p>{data!.user}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flex: '1 1 auto',
                  marginRight: 15,
                }}
              >
                <p>likes: {data!.likes},</p>
                <p>views: {data!.views},</p>
                <p>downloads: {data!.downloads}</p>
              </div>
              <DownloadButton name={`${data!.id}`} url={data!.largeImageURL} />
            </div>
            <img
              src={data!.webformatURL}
              alt={`${data!.id}`}
              style={{
                width: '100%',
                display: 'block',
                borderRadius: '1rem',
              }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ImageDetailModal;
