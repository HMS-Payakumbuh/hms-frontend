import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterCreatedAt'
})
export class FilterCreatedAtPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
    if (!items || !param) {
      return items;
    }
    return items.filter(item => item.created_at.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}