import React, { useState, useContext } from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import wyncode from '../assets/images/Wyncode_icon.png';
import swal from 'sweetalert';

const Profile = ({ history: { push } }) => {
  const { currentUser, setCurrentUser, setLoading } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const handleImageSelect = async (e) => {
    // max file size 1mb
    if (e.target.files[0].size > 1000000)
      throw new Error('file size exceeds limit');
    const formData = new FormData();
    formData.append('upload_preset', 'todoapp');
    formData.append('file', e.target.files[0]);
    try {
      const response = await axios.post(
        process.env.REACT_APP_CLOUDINARY, //
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      swal('Error', 'Oops, something went wrong.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await axios.patch('/api/users/me', {
        avatar: image
      });
      setCurrentUser(updatedUser.data);
      swal('Sweet!', 'Your image has been updated!', 'success');
    } catch (error) {
      swal('Error', 'Oops, something went wrong.');
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const willDelete = await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this account!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      });
      if (willDelete) {
        try {
          await axios({
            method: 'DELETE',
            url: '/api/users/me',
            withCredentials: true
          });
          swal('Poof! Your account has been deleted!', {
            icon: 'success'
          });
          setLoading(false);
          sessionStorage.removeItem('user');
          setCurrentUser(null);
          push('/login');
        } catch (error) {
          swal(`Oops!`, 'Something went wrong.');
        }
      } else {
        swal('Your account is safe!');
      }
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1 className="mt-4">Your Profile</h1>
      <div className="mt-4">
        <Image
          src={
            image ? image : currentUser?.avatar ? currentUser.avatar : wyncode
          }
          alt="profile-picture"
          width={250}
          height={250}
          roundedCircle
        />
      </div>
      <div className="mt-4">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="d-flex flex-column"
        >
          <input type="file" onChange={handleImageSelect} accept="image/*" />
          <Button type="submit" size="sm" className="mt-4">
            Save Image
          </Button>
        </form>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-4">
        <div className="d-flex ">
          <label htmlFor="name" className="pr-4 font-weight-bold">
            Name:
          </label>
          <p>{currentUser?.name}</p>
        </div>
        <div className="d-flex">
          <label htmlFor="email" className="pr-4 font-weight-bold">
            Email:
          </label>
          <p>{currentUser?.email}</p>
        </div>
        <Button variant="danger" onClick={handleDelete}>
          Delete Account
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
