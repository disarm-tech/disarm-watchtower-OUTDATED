import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replaceSpace' })
export class ReplaceSpacePipe implements PipeTransform {

	public transform(value: string, symbol: string) {
		return value.replace(symbol, ' ');
	}
}
