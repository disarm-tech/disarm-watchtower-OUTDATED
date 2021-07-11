import { machineIdSync } from 'node-machine-id';
import { v4 as uuidV4 } from 'uuid';

export const getUserHardwareId = (): string => {
	let HardwareId;

	try {
    HardwareId = machineIdSync();
	} catch (e) {
    HardwareId = uuidV4();
	}

	return HardwareId;
};
