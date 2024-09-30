import { SearchedUser } from '@/types';
import { User } from '@components/User';

import './UserList.scss';


export interface UserListProps {
  children: SearchedUser[];
  searchedName?: string;
}

export const UserList = ({ children, searchedName }: UserListProps) => {
  return (
    <div>
      {searchedName ? <div className="searchedName">Showing results for "{searchedName}"</div> : null}
      {children.map((item: SearchedUser) => {
        return <User key={item.id} {...item}></User>;
      })}
    </div>
  );
}