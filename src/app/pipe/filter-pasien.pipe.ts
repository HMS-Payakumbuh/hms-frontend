import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterPasien'
})

export class FilterPasienPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){
              var paramInId = item.id.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInNama = item.nama.toLowerCase().indexOf(param.toLowerCase()) > -1;              
              return paramInId || paramInNama;
  	})
  }
}