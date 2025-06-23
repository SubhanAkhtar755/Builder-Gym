import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Button,
  Input,
  Spin,
  message,
  Avatar,
  Upload,
  Select
} from 'antd';
import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ManOutlined,
  WomanOutlined,
  LockOutlined,
  UserAddOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import {
  doc,
  getDoc,
  updateDoc,
  db,
  storage,
  updatePassword,
  auth
} from '../../config/Firebase';
import { useAuth } from '../../context/UserContext';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { user } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    weight: '',
    gender: '',
    photoURL: '',
  });

  const fetchUser = async () => {
    try {
      const refDoc = doc(db, 'users', user.uid);
      const snap = await getDoc(refDoc);
      if (snap.exists()) {
        const data = snap.data();
        setUserData(data);
        setFormData(data);
      }
    } catch (error) {
      message.error('Error fetching user data');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    const imageRef = ref(storage, `profileImages/${user.uid}`);
    try {
      if (formData.photoURL) {
        const oldRef = ref(storage, formData.photoURL);
        await deleteObject(oldRef).catch(() => {});
      }
      const snapshot = await uploadBytes(imageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      message.error('Failed to upload image');
      throw error;
    }
  };

  const reauthenticate = async () => {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    return await reauthenticateWithCredential(user, credential);
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      let updatedData = { ...formData };

      if (imageFile) {
        const url = await uploadImage(imageFile);
        updatedData.photoURL = url;
      }

      const refDoc = doc(db, 'users', user.uid);
      await updateDoc(refDoc, updatedData);

      if (newPassword) {
        await reauthenticate();
        await updatePassword(user, newPassword);
        message.success('Password updated successfully');
      }

      setUserData(updatedData);
      message.success('Profile updated successfully');
      setOpen(false);
    } catch (error) {
      console.error(error);
      message.error('Update failed: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (user) fetchUser();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4">
      <div className="bg-[#1e293b] rounded-3xl shadow-2xl p-10 w-full max-w-3xl relative">
        <div className="absolute top-4 right-4">
          <Button shape="circle" icon={<EditOutlined />} onClick={() => setOpen(true)} type="primary" />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Avatar
            size={120}
            src={userData?.photoURL}
            icon={<UserOutlined />}
            className="ring-4 ring-cyan-400 shadow-lg"
          />

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold">{userData?.name || 'N/A'}</h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-base mt-6 w-full">
            <div className="flex items-center gap-2">
              <PhoneOutlined /> {userData?.phone || 'N/A'}
            </div>
            <div className="flex items-center gap-2">
              <CalendarOutlined /> {userData?.age || 'N/A'} yrs
            </div>
            <div className="flex items-center gap-2">
              <IdcardOutlined /> {userData?.weight || 'N/A'} kg
            </div>
            <div className="flex items-center gap-2">
              {userData?.gender === 'Male' ? <ManOutlined /> : <WomanOutlined />}
              {userData?.gender || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title="Edit Profile"
        placement="right"
        closable
        onClose={() => setOpen(false)}
        open={open}
        width="100%"
        className="bg-[#0f172a]"
        headerStyle={{ backgroundColor: '#1e293b', color: 'white' }}
        bodyStyle={{ backgroundColor: '#0f172a', paddingTop: '2rem' }}
      >
        <div className="max-w-2xl mx-auto text-white space-y-6">
          {/* Photo Upload Preview */}
          <div className="flex justify-center relative">
            <Avatar
              size={120}
              src={imageFile ? URL.createObjectURL(imageFile) : formData.photoURL}
              icon={<UserOutlined />}
              className="ring-4 ring-cyan-400 shadow-md"
              style={{ backgroundColor: '#1e293b' }}
            />
            <Upload
              beforeUpload={(file) => {
                setImageFile(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button
                shape="circle"
                icon={<UploadOutlined />}
                className="absolute bottom-1 right-[calc(50%-60px)] bg-[#1e293b] text-white shadow-md border-none hover:bg-cyan-600"
                size="small"
              />
            </Upload>
          </div>

          {/* Input Group 1 */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Full Name"
              prefix={<UserOutlined />}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1e293b] text-white w-full"
            />
            <Input
              placeholder="Phone"
              prefix={<PhoneOutlined />}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#1e293b] text-white w-full"
            />
          </div>

          {/* Input Group 2 */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Age"
              prefix={<CalendarOutlined />}
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="bg-[#1e293b] text-white w-full"
            />
            <Input
              placeholder="Weight (kg)"
              prefix={<IdcardOutlined />}
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="bg-[#1e293b] text-white w-full"
            />
          </div>

          {/* Gender */}
          <Select
            placeholder="Select Gender"
            value={formData.gender}
            onChange={(value) => setFormData({ ...formData, gender: value })}
            className="w-full text-white bg-[#1e293b] mb-5"
            dropdownStyle={{ backgroundColor: '#fff', color: 'white' }}
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
          />

          {/* Passwords */}
          <div className="flex flex-col md:flex-row gap-4 mt-5">
            <Input.Password
              placeholder="Current Password"
              prefix={<LockOutlined />}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-[#1e293b] text-white w-full"
            />
            <Input.Password
              placeholder="New Password (Optional)"
              prefix={<UserAddOutlined />}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-[#1e293b] text-white w-full"
            />
          </div>

          {/* Submit */}
          <Button
            type="primary"
            loading={updating}
            onClick={handleUpdate}
            className="w-full mt-6 font-semibold rounded-lg"
          >
            Update Profile
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Profile;
