import { createContext, useContext } from 'react';

const CounterContext = createContext(0);

function App() {
	return (
		<CounterContext.Provider value={1}>
			<Counter />
		</CounterContext.Provider>
	);
}

const Counter = () => {
	const context = useContext(CounterContext);
	return <p>{context}</p>;
};

export default App;
