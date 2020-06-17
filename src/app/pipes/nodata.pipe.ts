import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodata'
})
export class NodataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let newStr: string = "";

    if(value == '' || value == undefined || value === null)
    {
        
        newStr = (args !== '' && args !== undefined) ? args : "-";
    }
    else{
        newStr = value;
    }
    return newStr;
  }

}
