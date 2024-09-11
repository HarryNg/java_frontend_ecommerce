import { useState, useEffect, useContext } from 'react';
import { userContext } from '@/provider/user-provider';
import { FormData } from '@/types';


export function useUserData() {
  const { user } = useContext(userContext) || {};

  const [formData, setFormData] = useState<FormData>({
    user_id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    birthDate: '23-03-1993',
    avatar: '',
  });

  useEffect(() => {
    if (typeof user !== 'string' && user) {
      setFormData({
        user_id: user.id || '',
        email: user.email ,
        password: user.password ,
        firstName: user.firstName ,
        lastName: user.lastName ,
        address: user.address ,
        phoneNumber: user.phoneNumber ,
        birthDate: user.birthDate || '23-03-1993',
        avatar: user.avatar || '',
      });
    } else {
      setFormData({
        user_id: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        birthDate: '23-03-1993',
        avatar: '',
      });
    }
  }, [user]);

  return [formData, setFormData] as const;
}
