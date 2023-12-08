import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import mongoose from 'mongoose';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Converts a string to a mongoose.Types.ObjectId because mongodb doesn't accept strings as ids
 * @param id The id to convert
 * @returns The converted id or null if the id is invalid
 * @example
 * stringToObjectId('5f9d4f8d1d9d6a1b2c3d4e5f') // returns mongoose.Types.ObjectId('5f9d4f8d1d9d6a1b2c3d4e5f')
 */
export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
	if (mongoose.Types.ObjectId.isValid(id)) {
		return new mongoose.Types.ObjectId(id);
	} else {
		return null;
	}
}
