import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    if (!value) return 0;

    const match = value.match(/\d+/); 
    return match ? parseInt(match[0], 10) : 0;
  }

}
