import React from 'react';

type UserProfileProps = {
  name: string;
  email: string;
  phone: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ name, email, phone }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
    </div>
  );
};

export default UserProfile;
