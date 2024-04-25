import { forwardRef, useImperativeHandle, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

export type ModalHandle = {
	open: () => void;
};

export type ModalProps = {
	buttonCaption: string;
	children: ReactNode;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
	{ children, buttonCaption },
	ref
) {
	const dialog = useRef<HTMLDialogElement>(null);

	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current?.showModal();
			},
		};
	});

	return createPortal(
		<dialog
			ref={dialog}
			className='backdrop:bg-stone-900/60 p-4 rounded-md shadow-md'>
			{children}
			<form method='dialog' className='mt-4 text-right'>
				<Button>Okay</Button>
			</form>
		</dialog>,
		document.getElementById('root')
	);
});

export default Modal;
