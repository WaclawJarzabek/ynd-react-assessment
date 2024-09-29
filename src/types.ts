export interface SearchedUser { 
  id: number,
  login: string,
  repos_url: string,
}
  
export interface UserSearchResult {
  items: SearchedUser[],
}

export interface RepoData {
  id: number;
  description: string,
  name: string,
  stargazers_count: number,
  url: string,
}
