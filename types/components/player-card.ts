export interface PlayerCardProps<T> {
	data: T;
	className?: string;
}

export interface PlayerDrawerProps<T> {
	data: T;
	smallCardClasses?: string;
	isNested?: boolean;
}
