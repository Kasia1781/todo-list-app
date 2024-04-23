import { forwardRef, useImperativeHandle, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
	buttonCaption: string;
	children: ReactNode;
	open: () => void;
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
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
		<dialog ref={dialog}>
			{children}
			<form>
				<button>{buttonCaption}</button>
			</form>
		</dialog>,
		document.getElementById('modal-root')
	);
});

export default Modal;
