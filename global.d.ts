interface Array<T> extends Xrray.innerExtention<T> {
	/**
	 * True if empty
	 */
	readonly empty: boolean;
	/**
	 * Last element
	 */
	last: T;
	/**
	 * First element
	 */
	first: T;
	/**
	 * length without empty slots
	 */
	readonly realLength: number;
	/**
	 * Clears the array of all elements
	 */
	clear(): this;
	/**
	 * Clears the array of all elements
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Clear(): this;
	/**
	 * Adds values to the array
	 */
	add(...value: T[]): this;
	/**
	 * Adds values to the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Add(...value: T[]): this;
	/**
	 * Sets the array to the given one without chnaging the refernece
	 */
	set(array: T[] | T[]): this;
	/**
	 * Sets the array to the given one without chnaging the refernece
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Set(array: T[] | T[]): this;
	/**
	 * Iterates over all own properties
	 * awaits any promises
	 * when !== undefined gets returned => the the loop stopts and the returned val gets returned
	 */
	ea<R>(loop: (e?: T, i?: number, array?: this) => R, thisArg?: any): R;
	/**
	 * Iterates over all own properties
	 * awaits any promises
	 * when !== undefined gets returned => the the loop stopts and the returned val gets returned
	 */
	each<R>(loop: (e?: T, i?: number, array?: this) => R, thisArg?: any): R;
	/**
	 * Reverts the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Reverse(): this;
	/**
	 * Gets all indexes that match the given values
	 */
	index(...values: T[]): number[];
	/**
	 * Cleans the array of all nulls and undefineds
	 */
	clean(): this;
	/**
	 * clones
	 */
	clone(): T[];
	/**
	 * Cleans the array of all nulls and undefineds
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Clean(): this;
	/**
	 * Removes given indexes
	 */
	removeI(...index: number[]): this;
	/**
	 * Removes given indexes
	 */
	rmI(...index: number[]): this;
	/**
	 * Removes given indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RemoveI(...index: number[]): this;
	/**
	 * Removes given indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RmI(...index: number[]): this;
	/**
	 * Removes given values
	 */
	removeV(...value: T[]): this;
	/**
	 * Removes given values
	 */
	rmV(...value: T[]): this;
	/**
	 * Removes given values
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RemoveV(...value: T[]): this;
	/**
	 * Removes given values
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RmV(...value: T[]): this;
	/**
	 * The inital array stays unchanged; a new one gets inited;
	 */
	remove(...valueOrIndex: T[] | number[]): this;
	/**
	 * The inital array stays unchanged; a new one gets inited;
	 */
	rm(...valueOrIndex: T[] | number[]): this;
	/**
	 * Removes given values / indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Remove(...valueOrIndex: T[] | number[]): this;
	/**
	 * Removes given values / indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Rm(...valueOrIndex: T[] | number[]): this;
	/**
	 * Sets the array to given indexes
	 */
	get(...index: number[]): this;
	/**
	 * Sets the array to given indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Get(...index: number[]): this;
	/**
	 * Adds given values to the end of the array
	 */
	dda(...value: T[]): this;
	/**
	 * Adds given values to the end of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Dda(...value: T[]): this;
	/**
	 * Removes given number of elements from the end of the array
	 */
	rem(amount: number): this;
	/**
	 * Removes given number of elements from the end of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Rem(amount: number): this;
	/**
	 * The inital array stays unchanged; a new one gets inited;
	 */
	mer(amount: number): this;
	/**
	 * Removes given number of elements from the begin of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Mer(amount: number): this;
	/**
	 * Swaps the two given indexes; the two parameters must have equal length
	 */
	swapI(i1: number, i2: number): this;
	/**
	 * Swaps the two given indexes; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	SwapI(i1: number | number[], i2: number | number[]): this;
	/**
	 * Swaps the two given values; the two parameters must have equal length
	 */
	swapV(v1: T | T[], v2: T | T[]): this;
	/**
	 * Swaps the two given values; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	SwapV(v1: T | T[], v2: T | T[]): this;
	/**
	 * Swaps the two given indexes or values; the two parameters must have equal length
	 */
	swap(vi1: number | number[] | T | T[], vi2: number | number[] | T | T[]): this;
	/**
	 * Swaps the two given indexes or values; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Swap(vi1: number | number[] | T | T[], vi2: number | number[] | T | T[]): this;
	/**
	 * Like default flat
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Flat(ammount?: number): this
	 /**
 	 * Add elements a to array but only if they are not already present
 	 */
 	gather(...a: T[]): this;
 	/**
 	 * Add elements a to array but only if they are not already present
 	 * The inital array stays unchanged; a new one gets inited;
 	 */
 	Gather(...a: T[]): T[];
	/**
	 * Gets the element prior of that given as index
	 * If the prior index would be -1 the last one is returned
	 */
	prior(index: number, by?: number): T;
	/**
	 * Gets the element next of that given as index
	 * If the next index would be length the first one is returned
	 */
	 next(index: number, by?: number): T;
	 /**
 	 * Inject item at index
 	 */
   inject(item: T, index: number): this
   /**
	 * True if all given vals are included within this
	 */
  contains(...vals: T[]): boolean
  /**
	 * True if non of the given vals are included within this
	 */
	excludes(...vals: T[]): boolean

	/**
	 * Finds the closest element of an numeric array to given to
	 */
	closest: T extends number ? (to: number) => number : typeof undefined
	/**
	 * Finds the closest element of an numeric array to given to
	 */
	nearest: T extends number ? (to: number) => number : typeof undefined
	

}

declare namespace Xrray {
	export interface innerExtention<T>{
		/*
		 * Steps into step of all entries
		 */
		inner<Key extends keyof T, Val = T[Key]>(step: Key): Val[]
		/*
		 * Steps into step of all entries
		 */
		Inner<Key extends keyof T, Val = T[Key]>(step: Key): Val[]
	}
}



interface IndexOutOfBoundsException extends Exception {
	index: number;
	array: any[];
}

interface InvalidInputException extends Exception {

}

interface InvalidConstructorException extends Exception {

}

interface InvalidValueException extends Exception {
	value: any;
	array: any[];
}

interface Exception extends Error {
	message: string;
}
