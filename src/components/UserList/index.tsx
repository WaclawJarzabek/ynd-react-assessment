import { SearchedUser } from '@/types';
import { User } from '@components/User';

import './UserList.scss';


export interface UserListProps {
  children: SearchedUser[];
  searchedName?: string;
}

export const UserList = ({ children, searchedName }: UserListProps) => {
  return (
    <div cy-data="user-list">
      {searchedName ? <div cy-data="user-search-result" className="searchedName">Showing results for "{searchedName}"</div> : null}
      {children.map((item: SearchedUser) => {
        return <User key={item.id} {...item}></User>;
      })}
    </div>
  );
}