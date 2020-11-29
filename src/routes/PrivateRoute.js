import {Route, Redirect} from 'react-router-dom';

import {useAuth} from '../contexts/auth';

export default function PrivateRoute({component: Component, ...props}) {
   const { logged } = useAuth();

	return (
		<Route 
			{...props}
			render={ () => logged
				? <Component {...props} />
				: <Redirect to='/' />
			}
		/>
	);
}
