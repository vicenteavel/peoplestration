import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Create from './pages/Create';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/people" exact component={Home}/>
				<Route path="/people/create" component={Create}/>
			</Switch>
		</BrowserRouter>
	);
}
