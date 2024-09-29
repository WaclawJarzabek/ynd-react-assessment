import Card from 'react-bootstrap/Card';
import { RepoData } from '../../types';
import { ReactComponent as StarIcon } from '../../assets/star.svg';

import './Repository.scss';


export const Repository = ({name, description, stargazers_count}: RepoData) => {
	return <Card>
		<Card.Body>
			<Card.Title>
				<div className="flexTitle">
					<div>{name}</div>
					<div className="stargazersCount"><span className="stargazersText">{stargazers_count}</span> <StarIcon /></div>
				</div>
			</Card.Title>
			<Card.Text>
				{description}
			</Card.Text>
		</Card.Body>
	</Card>;
}