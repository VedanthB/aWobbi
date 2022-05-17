import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { checkImage } from '../../utils';
import { useToast } from '../../hooks';
import Input from '../Input';

const initState = {
  fullName: '',
  mobile: '',
  address: '',
  website: '',
  story: '',
  gender: '',
};

const EditProfileModal = ({ onEdit, setOnEdit }) => {
  const [userData, setUserData] = useState(initState);

  const { fullName, mobile, address, website, story, gender } = userData;

  const [avatar, setAvatar] = useState('');

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const { showToast } = useToast();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err) showToast(err, 'error');

    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  return (
    <>
      <Transition appear show={onEdit} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => setOnEdit(false)}
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

          <div className="fixed inset-0 overflow-y-auto min-h-screen">
            <div className="flex items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full min-h-[80vh] overflow-y-scroll max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
                  >
                    Edit Profile
                    <button
                      type="span"
                      className="inline-flex justify-end rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setOnEdit(false)}
                    >
                      Close
                    </button>
                  </Dialog.Title>

                  <form onSubmit={handleSubmit}>
                    <div className="w-40 h-40 rounded-[50%] overflow-hidden relative my-4 mx-auto cursor-pointer border border-solid border-white group">
                      <img
                        src={
                          avatar
                            ? URL.createObjectURL(avatar)
                            : auth.user.avatar
                        }
                        alt="avatar"
                        className="w-full h-full block object-cover"
                      />
                      <span className="absolute left-0 w-full text-center text-purple-500 bg-slate-100 bottom-[-100%] h-[50%] group-hover:bottom-[-15%]">
                        <p className="text-purple-500">Change Image</p>
                        <input
                          type="file"
                          name="file"
                          id="file_up"
                          accept="image/*"
                          className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                          onChange={changeAvatar}
                        />
                      </span>
                    </div>

                    <div className="mb-4">
                      <Input
                        label="Full Name"
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleInput}
                        value={fullName}
                        errorMessage={
                          fullName.length > 25 &&
                          'Cant be more that 25 characters.'
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <Input
                        label="Mobile"
                        id="mobile"
                        name="mobile"
                        placeholder="Mobile"
                        onChange={handleInput}
                        value={mobile}
                      />
                    </div>

                    <div className="mb-4">
                      <Input
                        label="Address"
                        id="address"
                        name="address"
                        placeholder="Address"
                        onChange={handleInput}
                        value={address}
                      />
                    </div>

                    <div className="mb-4">
                      <Input
                        label="Website"
                        id="website"
                        name="website"
                        placeholder="Website"
                        onChange={handleInput}
                        value={website}
                      />
                    </div>

                    <div className="mb-4">
                      <Input
                        label="Story"
                        id="story"
                        name="story"
                        placeholder="Story"
                        onChange={handleInput}
                        value={story}
                        textArea={true}
                        errorMessage={
                          story.length > 200 &&
                          'Cant be more that 200 characters.'
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Select an option
                      </label>
                      <select
                        name="gender"
                        value={gender}
                        onChange={handleInput}
                        id="gender"
                        className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-purple-400 focus:outline focus:outline-offset-2 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex justify-start rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Update Info
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditProfileModal;
