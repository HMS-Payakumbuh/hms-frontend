import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterDaftarObat'
})

export class FilterDaftarObatPipe implements PipeTransform {
  transform(items: Array<any>, lokasi: string, param: string): Array<any> {
  	if ((!items || !lokasi) && (!items || !param)) {
  		return items;
  	}
    if ((!items || !lokasi)) {
      return items.filter(function(item){
              var paramInKode = item.kode_obat.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.merek.toLowerCase().indexOf(param.toLowerCase()) > -1;            
              return (paramInKode || paramInMerek);
      });
    }
    if ((!items || !param)) {
      return items.filter(item => item.lokasi.toLowerCase().indexOf(lokasi.toLowerCase()) > -1);
    }
    return items.filter(function(item){    
              var lokasiInAlasan = item.alasan.toLowerCase().indexOf(lokasi.toLowerCase()) > -1;
              var paramInKode = item.kode_obat.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.merek.toLowerCase().indexOf(param.toLowerCase()) > -1;            
              return lokasiInAlasan && (paramInKode || paramInMerek);
  	})
  }
}