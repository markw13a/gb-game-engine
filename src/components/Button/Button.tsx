import type { PropsWithChildren } from "react";

type ButtonProps = {
	onClick: () => void;
};

export const Button = ({
	children,
	onClick,
}: PropsWithChildren<ButtonProps>) => (
	<button type="button" onClick={onClick}>
		{children}
	</button>
);
