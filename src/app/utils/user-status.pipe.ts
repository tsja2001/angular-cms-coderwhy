import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class UserStatusPipe implements PipeTransform {
  transform(value: number): string {
    return value === 0 ? '否' : '是';
  }
}
