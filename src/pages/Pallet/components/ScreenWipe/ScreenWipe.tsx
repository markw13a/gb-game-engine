import styles from "./ScreenWipe.module.css";

type ScreenWipeProps = {
	isVisible: boolean;
};

export const ScreenWipe = ({ isVisible }: ScreenWipeProps) => (
	<div className={isVisible ? styles.visible : styles.invisible} />
);
