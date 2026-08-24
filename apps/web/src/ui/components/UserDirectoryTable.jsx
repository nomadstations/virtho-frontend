import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UserRow from './UserRow';

const UserDirectoryTable = ({ users, groups, onVerify, onDeactivate, onReactivate, onViewProfile }) => {
  return (
    <div className="rounded-md border border-gray-200 bg-white overflow-hidden hidden md:block">
      <Table>
        <TableHeader className="bg-gray-50/80">
          <TableRow>
            <TableHead className="w-[60px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Groups</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-32 text-center text-gray-500">
                No users found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <UserRow 
                key={user.id} 
                user={user} 
                groups={groups}
                onVerify={onVerify}
                onDeactivate={onDeactivate}
                onReactivate={onReactivate}
                onViewProfile={onViewProfile}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserDirectoryTable;