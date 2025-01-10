import React, { useEffect, useState } from 'react';
import UserActivities from './UserActivities.tsx';
import UserProfile from './UserProfile.tsx';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Activity = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<{ [key: number]: Activity[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsersAndActivities = async () => {
      try {
        // Fetch all users
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData: User[] = await usersResponse.json();
        setUsers(usersData);

        // Fetch activities for each user
        const activityPromises = usersData.map(async (user) => {
          const activitiesResponse = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
          );
          const activitiesData: Activity[] = await activitiesResponse.json();
          return { userId: user.id, activities: activitiesData };
        });

        const activitiesArray = await Promise.all(activityPromises);
        const activitiesMap: { [key: number]: Activity[] } = {};
        activitiesArray.forEach(({ userId, activities }) => {
          activitiesMap[userId] = activities;
        });

        setActivities(activitiesMap);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndActivities();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <UserProfile name={user.name} email={user.email} phone={user.phone} />
          {activities[user.id] && <UserActivities activities={activities[user.id]} />}
        </div>
      ))}
    </div>
  );
};

export default App;


