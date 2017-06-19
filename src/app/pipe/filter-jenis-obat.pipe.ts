import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterJenisObat'
})

export class FilterJenisObatPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){
              var paramInId = item.id.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.merek.toLowerCase().indexOf(param.toLowerCase()) > -1;              
              var paramInGenerik = item.nama_generik.toLowerCase().indexOf(param.toLowerCase()) > -1;
              return paramInId || paramInMerek || paramInGenerik;
  	})
  }
}