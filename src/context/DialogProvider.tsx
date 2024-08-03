import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

const DialogContext = createContext({
	open: false,
	setOpen: (value: boolean) => {},
});

export default function DialogProvider({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	return (
		<DialogContext.Provider value={{ open, setOpen }}>
			{children}
		</DialogContext.Provider>
	);
}

const DialogContent = ({ children }: PropsWithChildren) => {
	const { open } = useDialog();

	if (!open) {
		return;
	}
	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className=" card w-96 bg-base-200 shadow-xl animate-in fade-in-50">
				<div className="card-body">{children}</div>
			</div>
		</div>,
		document.body
	);
};

const DialogTrigger = () => {
	const { open, setOpen } = useDialog();
	return (
		<button
			className=" btn btn-info"
			onClick={() => setOpen(true)}>
			Open
		</button>
	);
};
const useDialog = () => useContext(DialogContext);

export { DialogContent, DialogTrigger, useDialog };
