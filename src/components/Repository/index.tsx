import Card from 'react-bootstrap/Card';
import { RepoData } from '@/types';
import { ReactComponent as StarIcon } from '@assets/star.svg';

import './Repository.scss';


export const Repository = ({name, description, stargazers_count}: RepoData) => {
	return <Card data-cy="repository">
		<Card.Body>
			<Card.Title>
				<div className="flexTitle">
					<div data-cy="repository-title">{name}</div>
					<div className="stargazersCount"><span className="stargazersText" data-cy="repository-stargazers-count">{stargazers_count}</span> <StarIcon /></div>
				</div>
			</Card.Title>
			<Card.Text data-cy="repository-description">
				{description}
			</Card.Text>
		</Card.Body>
	</Card>;
}