import { ButtonProps } from "@/types";
import { cn } from "@/utils/cn";

const Button = ({ className = "", children, text = "", variant = "default", link = "", ...props }: ButtonProps) => {
	const variantClasses = {
		default: "bg-[--button-bg] text-foreground ring-foreground/5",
		clean: "",
	};

	const buildButtonClasses =
		"inline-flex items-center gap-[0.3667em] px-4 py-2.5 rounded-[02.6667px] antialiased font-medium text-sm shadow-sm ring-1 ring-inset";

	const buttonProps = {
		className: cn(variant !== "clean" && buildButtonClasses, variantClasses[variant], className, "overflow-clip relative"),
		...props,
	};

	if (link) {
		return (
			<a
				href={link}
				{...buttonProps}>
				{children && <span className='font-light'>{children}</span>}
				{text}
			</a>
		);
	}

	return (
		<button
			type='button'
			{...buttonProps}>
			{children && <span className='font-light'>{children}</span>}
			{text}
		</button>
	);
};

export default Button;
