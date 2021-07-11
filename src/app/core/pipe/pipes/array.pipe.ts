import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'array'})
export class ArrayPipe implements PipeTransform  {

	transform(count: number) {

        count = Number(count);

        const arrayIndex: number[] = [];

        for (let i = 0; i < count; i++) {
            arrayIndex.push(i);
        }

        return arrayIndex;
    }
}
