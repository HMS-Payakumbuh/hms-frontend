import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterObatPindah'
})

export class FilterObatPindahPipe implements PipeTransform {
  transform(items: Array<any>, asal: string, tujuan: string, param: string): Array<any> {
  	if ((!items || !asal) && (!items || !tujuan) && (!items || !param)) {
  		return items;
  	}

    if ((!items || !param) && (!items || !tujuan)) {
      return items.filter(function(item){
              var paramInAsal = item.lokasi_asal.nama.toLowerCase().indexOf(asal.toLowerCase()) > -1;    
              return paramInAsal;
      });
    }

    if ((!items || !param) && (!items || !asal)) {
      return items.filter(function(item){
             var paramInTujuan = item.lokasi_tujuan.nama.toLowerCase().indexOf(tujuan.toLowerCase()) > -1;     
             return paramInTujuan;
      });
    }

    if ((!items || !tujuan) && (!items || !asal)) {
      return items.filter(function(item){
              var paramInKode = item.obat_masuk.barcode.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.jenis_obat.merek_obat.toLowerCase().indexOf(param.toLowerCase()) > -1;            
              return (paramInKode || paramInMerek);
      });
    }

    if (!items || !param)  {
      return items.filter(function(item){
              var paramInAsal = item.lokasi_asal.nama.toLowerCase().indexOf(asal.toLowerCase()) > -1;
              var paramInTujuan = item.lokasi_tujuan.nama.toLowerCase().indexOf(tujuan.toLowerCase()) > -1;      
              return paramInAsal && paramInTujuan;
      });
    }

    if (!items || !tujuan)  {
      return items.filter(function(item){
              var paramInAsal = item.lokasi_asal.nama.toLowerCase().indexOf(asal.toLowerCase()) > -1; 
              var paramInKode = item.obat_masuk.barcode.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.jenis_obat.merek_obat.toLowerCase().indexOf(param.toLowerCase()) > -1;      
              return paramInAsal && (paramInKode || paramInMerek);
      });
    }

    if (!items || !asal)  {
      return items.filter(function(item){              
              var paramInTujuan = item.lokasi_tujuan.nama.toLowerCase().indexOf(tujuan.toLowerCase()) > -1;
              var paramInKode = item.obat_masuk.barcode.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.jenis_obat.merek_obat.toLowerCase().indexOf(param.toLowerCase()) > -1;    
              return paramInTujuan && (paramInKode || paramInMerek);
      });
    }

    return items.filter(function(item) {    
              var paramInAsal = item.lokasi_asal.nama.toLowerCase().indexOf(asal.toLowerCase()) > -1;              
              var paramInTujuan = item.lokasi_tujuan.nama.toLowerCase().indexOf(tujuan.toLowerCase()) > -1;
              var paramInKode = item.obat_masuk.barcode.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.jenis_obat.merek_obat.toLowerCase().indexOf(param.toLowerCase()) > -1;            
              return paramInAsal && paramInTujuan && (paramInKode || paramInMerek);
  	})

  }
}