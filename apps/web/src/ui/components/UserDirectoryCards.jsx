import React from 'react';
import UserCard from './UserCard';

const UserDirectoryCards = ({ users, groups, onVerify, onDeactivate, onReactivate, onViewProfile }) => {
  if (users.length === 0) {
    return (
      <div className="md:hidden py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
        No users found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          groups={groups}
          onVerify={onVerify}
          onDeactivate={onDeactivate}
          onReactivate={onReactivate}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  );
};

export default UserDirectoryCards;