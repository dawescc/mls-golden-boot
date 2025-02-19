import { useEffect } from "react";

const useScrollLock = (isOpen: boolean) => {
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);
};

export default useScrollLock;
