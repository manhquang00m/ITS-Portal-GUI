export {};

interface RoutesChild {
	name: string;
	component: () => JSX.Element;
	path: string;
	children?: RoutesChild[]
}

declare global {
	/**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
	interface RoutesType {
		name: string;
		layout?: string;
		component?: () => JSX.Element;
		icon?: JSX.Element | string;
		path: string;
		secondary?: boolean;
		hidden?:boolean;
		children?: RoutesChild[]
	}

	interface BreadcrumbType {
		path: string;
		name: string;
		secondary?: boolean;
	}
}
