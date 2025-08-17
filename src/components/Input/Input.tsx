import type { PropsWithChildren, InputHTMLAttributes } from "react";

export const Input = ({ children, onChange, value }: PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>) => {
    return (
        <label>
            {children}
            <input onChange={onChange} value={value} />
        </label>
    );
}