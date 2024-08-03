import { createContext, PropsWithChildren, useContext, useState } from 'react';
import DialogProvider, {
	DialogContent,
	DialogTrigger,
	useDialog,
} from './context/DialogProvider';

const CounterContext = createContext({
	count: 0,
	setCount: (num: number) => {},
});

function App() {
	return (
		<div className="flex flex-col gap-4">
			<DialogProvider>
				<DialogTrigger />
				<DialogContent>
					<h2 className="text-lg font-bold">Hello world</h2>
					<DialogClose />
				</DialogContent>
			</DialogProvider>
		</div>
	);
}

const Counter = ({ children }: PropsWithChildren) => {
	const [count, setCount] = useState(0);

	return (
		<CounterContext.Provider value={{ count, setCount }}>
			{children}
		</CounterContext.Provider>
	);
};

const CounterDisplay = () => {
	const context = useContext(CounterContext);
	return <p>{JSON.stringify(context, null, 2)}</p>;
};

const Increment = () => {
	const { count, setCount } = useContext(CounterContext);
	return <button onClick={() => setCount(count + 1)}>Increment</button>;
};

const DialogClose = () => {
	const { setOpen } = useDialog();
	return (
		<button
			className="btn btn-info"
			onClick={() => setOpen(false)}>
			Close
		</button>
	);
};

export default App;
