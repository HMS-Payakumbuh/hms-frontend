import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterStokObat'
})

export class FilterStokObatPipe implements PipeTransform {
  transform(items: Array<any>, lokasi: string, param: string): Array<any> {
  	if ((!items || !lokasi) && (!items || !param)) {
  		return items;
  	}
    if ((!items || !lokasi)) {
      return items.filter(function(item){
              var paramInKode = item.barcode.toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.jenis_obat.merek_obat.toLowerCase().indexOf(param.toLowerCase()) > -1;            
              return (paramInKode || paramInMerek);
      });
    }
    if ((!items || !param)) {
      return items.filter(item => item.lokasi_data.nama.toLowerCase().indexOf(lokasi.toLowerCase()) > -1);
    }
    return items.filter(function(item){    
              var lokasiInLokasi = item.lokasi_data.nama.toLowerCase().indexOf(lokasi.toLowerCase()) > -1;
              var paramInKode = item.barcode.toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.jenis_obat.merek_obat.toLowerCase().indexOf(param.toLowerCase()) > -1;            
              return lokasiInLokasi && (paramInKode || paramInMerek);
  	})
  }
}