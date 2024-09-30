import axios from 'axios';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { UserList } from '@components/UserList';
import { API_ADDRESS, HEADERS } from '@/const';
import { UserSearchResult } from '@/types';

import './NameForm.scss';


export const NameForm = () => {
  const cachedName = useRef('');
  const userSearchResult = useMutation({
    mutationKey: ['userName'],
    mutationFn: () => {
      const submittedName = values.name;
      return axios.get<UserSearchResult>(`${API_ADDRESS}/search/users`, {
        params: {
          per_page: 5,
          q: `${encodeURIComponent(`${submittedName}`)} in:login`,
        },
        headers: HEADERS
      }).then((promise) => {
        cachedName.current = submittedName;
        return promise;
      });
    }
  });

  const handleSearch = () => {
    userSearchResult.mutate();
  }

  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {name: ''},
    validationSchema: Yup.object().shape({name: Yup.string().required('Name is required')}), 
    onSubmit: handleSearch,
  });


  return (
    <>
    <div className="formContainer">
    <form onSubmit={handleSubmit}>
      <input className="usernameInput marginBotton" id="name" name="name" placeholder="Enter username" type="text" onChange={handleChange} value={values.name} />
      <Button className="submitButton" type="submit">Search</Button> 
    </form>
    </div>
    <div className="listContainer">
      {userSearchResult.isSuccess ? <UserList searchedName={cachedName.current}>{userSearchResult.data.data.items}</UserList> : null}
    </div>
    </>
  );
}
