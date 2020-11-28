import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/people" exact component={Home}/>
				<Route path="/people/create" component={Create}/>
				<Route path="/people/edit/:id" component={Edit} />
			</Switch>
		</BrowserRouter>
	);
}
