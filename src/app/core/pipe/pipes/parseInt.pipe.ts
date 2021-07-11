import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'parseInt'})
export class ParseIntPipe implements PipeTransform  {

	transform(value: string) {

        return parseInt(value);
	}
}
