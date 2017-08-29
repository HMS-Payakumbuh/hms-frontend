import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterObatTindakan'
})

export class FilterObatTindakanPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){
              var paramInKode = item.stok_obat.barcode.toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.jenis_obat.merek_obat.toLowerCase().indexOf(param.toLowerCase()) > -1;             
              return paramInKode || paramInMerek;
  	})
  }
}