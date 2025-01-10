import React from 'react';

type UserActivity = {
  id: number;
  title: string;
  body: string;
};

type UserActivitiesProps = {
  activities: UserActivity[];
};

const UserActivities: React.FC<UserActivitiesProps> = ({ activities }) => {
  return (
    <div>
      <h1>User Activities</h1>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <h3>{activity.title}</h3>
            <p>{activity.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivities;
