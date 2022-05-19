import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, setPostModal, updatePost } from '../features';
import Icons from './Icons';
import { imageShow, videoShow } from '../utils';
import { useToast } from '../hooks';
import { AiFillCamera } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';

const CreatePostModal = () => {
  const dispatch = useDispatch();

  const { showToast } = useToast();

  const { auth, postModal } = useSelector((state) => state);

  const [content, setContent] = useState('');

  const [images, setImages] = useState([]);

  const [stream, setStream] = useState(false);

  const videoRef = useRef();

  const refCanvas = useRef();

  const [tracks, setTracks] = useState('');

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist.');

      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image/video largest is 5mb.');
      }

      return newImages.push(file);
    });

    if (err) showToast(err, 'error');
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();

          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute('width', width);
    refCanvas.current.setAttribute('height', height);

    const ctx = refCanvas.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return showToast('Please add your photo.', 'error');

    if (postModal.onEdit) {
      dispatch(updatePost({ content, images, auth, postModal, showToast }));
    } else {
      dispatch(createPost({ content, images, auth, showToast }));
    }

    setContent('');
    setImages([]);
    if (tracks) tracks.stop();
    dispatch(setPostModal({ isModalOpen: false }));
    console.log(content, images);
  };

  useEffect(() => {
    if (postModal.onEdit) {
      setContent(postModal.editPost.content);
      setImages(postModal.editPost.images);
    }
  }, [postModal.isModalOpen]);

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(setPostModal(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center relative top-24">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
                >
                  Create Post
                  <button
                    type="span"
                    className="inline-flex justify-end rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() =>
                      dispatch(setPostModal({ isModalOpen: false }))
                    }
                  >
                    Close
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-[450px] bg-white my-8 mx-auto rounded-sm"
                  >
                    <div>
                      <textarea
                        className="w-full max-h-[150px] border-none outline-none resize-none"
                        name="content"
                        value={content}
                        placeholder={`${auth.user.userName}, what are you thinking?`}
                        onChange={(e) => setContent(e.target.value)}
                      />

                      <div className="flex flex-wrap">
                        <div className="flex-auto"></div>
                        <Icons setContent={setContent} content={content} />
                      </div>

                      <div
                        style={{
                          gridGap: '10px',
                          gridTemplateColumns:
                            'repeat(auto-fill, minmax(100px, 1fr))',
                        }}
                        className="max-h-[270px] w-full overflow-x-hidden overscroll-y-auto grid place-items-center py-4 px-auto"
                      >
                        {images.map((img, index) => (
                          <div
                            key={index}
                            id="file_img"
                            className="relative w-full h-full"
                          >
                            {img.camera ? (
                              imageShow(img.camera)
                            ) : img.url ? (
                              <>
                                {img.url.match(/video/i)
                                  ? videoShow(img.url)
                                  : imageShow(img.url)}
                              </>
                            ) : (
                              <>
                                {img.type.match(/video/i)
                                  ? videoShow(URL.createObjectURL(img))
                                  : imageShow(URL.createObjectURL(img))}
                              </>
                            )}
                            <span
                              className="absolute top-[-1px] right-[-2px] z-10  text-red-500 p-1 bg-white border-2 border-red-500 border-solid rounded-[50%] text-sm cursor-pointer font-bold"
                              onClick={() => deleteImages(index)}
                            >
                              &times;
                            </span>
                          </div>
                        ))}
                      </div>

                      {stream && (
                        <div className="relative">
                          <video
                            autoPlay
                            muted
                            ref={videoRef}
                            width="100%"
                            height="100%"
                          />

                          <span
                            className="absolute top-[-10px] right-[5px] text-3xl font-extrabold cursor-pointer text-red-500 "
                            onClick={handleStopStream}
                          >
                            &times;
                          </span>
                          <canvas ref={refCanvas} style={{ display: 'none' }} />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center my-4 mx-0">
                      {stream ? (
                        <AiFillCamera
                          className="cursor-pointer text-3xl"
                          onClick={handleCapture}
                        />
                      ) : (
                        <>
                          <AiFillCamera
                            className="cursor-pointer text-3xl"
                            onClick={handleStream}
                          />

                          <div className="overflow-hidden my-0 mx-4 relative">
                            <BsImages className="cursor-pointer text-3xl" />
                            <i className="fas fa-image cursor-pointer text-3xl" />
                            <input
                              type="file"
                              name="file"
                              id="file"
                              className="absolute top-0 left-0 opacity-0"
                              multiple
                              accept="image/*,video/*"
                              onChange={handleChangeImages}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Upload
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePostModal;
