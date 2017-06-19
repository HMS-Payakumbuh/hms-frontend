import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'matchesStatus'
})
export class MatchesStatusPipe implements PipeTransform {
  transform(items: Array<any>, status: string): Array<any> {
  	if (!items || !status) {
  		return items;
  	}
    return items.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }
}