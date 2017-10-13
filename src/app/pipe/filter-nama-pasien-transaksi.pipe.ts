import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterNamaPasienTransaksi'
})

export class FilterNamaPasienTransaksiPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.transaksi.pasien.nama_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}