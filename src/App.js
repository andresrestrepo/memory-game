import './App.css';

import { Container, Alert } from 'reactstrap';

import Board from './components/Board';
import { ToastProvider } from 'react-toast-notifications';


function App() {
	return (
		<ToastProvider>
			<Container>
				<div className="App">
					<Alert color="warning">
						MEMORY GAME
      			</Alert>

					<Board />
				</div>
			</Container>
		</ToastProvider>

	);
}

export default App;
