import axios from 'axios';
import parseLinkHeader from 'parse-link-header';
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Repository } from '@components/Repository';
import { HEADERS } from '@/const';
import { RepoData, SearchedUser } from '@/types';


export const User = ({ login, repos_url }: SearchedUser) => {
  const [userExpanded, setUserExpanded] = useState(false);
  const repoQuery = useInfiniteQuery({
    queryKey: ["userRepos", repos_url, userExpanded],
    queryFn: ({ pageParam }) => {
      const targetUrl = pageParam ? pageParam : repos_url;
      return axios.get(targetUrl, {headers: HEADERS}).then(response => {
        return response;
      });
    },
    enabled: userExpanded,
    initialPageParam: '',
    getNextPageParam: (lastPage: any, pages) => {
      //properly type lastPage?
      const links = parseLinkHeader(lastPage.headers.link);
      return links?.next?.url;
    }
  });

  const handleExpansion = () => {
    setUserExpanded(true);
  }

  const handleExit = () => {
    setUserExpanded (false);
  }

  const renderRepoData = () => {
    if (repoQuery.isPending) {
      return 'loading...';
    }
    if (!repoQuery.isFetching && repoQuery.hasNextPage) {
      repoQuery.fetchNextPage();
    }

    if (repoQuery.isSuccess) {
      const reducedQueryData = repoQuery.data.pages.reduce((previousValue, currentValue) => {
        return [...previousValue, ...currentValue?.data];
      }, []);
      return reducedQueryData.map((item: RepoData) => <Repository key={item.id} {...item} />);
    }

    return 'something went wrong, check your internet connection';
  }


  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {login}
        </Accordion.Header>
        <Accordion.Body onEnter={handleExpansion} onExited={handleExit}>
          <>
            {repoQuery.isPending ? 'loading...' : repoQuery.isSuccess ? renderRepoData() : 'something went wrong, check your internet connection'}</>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}