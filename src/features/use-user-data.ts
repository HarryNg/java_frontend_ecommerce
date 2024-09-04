import { useState, useEffect, useContext } from 'react';
import { userContext } from '@/provider/user-provider';

export function useUserData() {
  const { user } = useContext(userContext) || {};
  const [formData, setFormData] = useState({
    user_id: user?.id || '',
    email: user?.email || '',
    password: user?.password || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address || '',
    phoneNumber: user?.phoneNumber || '',
    birthDate: user?.birthDate || '23-03-1993',
    avatar: user?.avatar || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        user_id: user.id || '',
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        birthDate: user.birthDate || '23-03-1993',
        avatar: user.avatar,
      });
    }
  }, [user]);

  return [formData, setFormData] as const;
}
