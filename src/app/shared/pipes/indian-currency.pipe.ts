import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rs',
  standalone: true
})
export class IndianCurrencyPipe implements PipeTransform {
  transform(value: number, precision: number = 1): string {
    if (isNaN(value)) return '';

    const absValue = Math.abs(value);
    let formattedValue: string;
    let suffix: string;

    if (absValue >= 10000000) { // Crore
      formattedValue = this.formatNumber(value / 10000000, precision);
      suffix = 'C';
    } else if (absValue >= 100000) { // Lakh
      formattedValue = this.formatNumber(value / 100000, precision);
      suffix = 'L';
    } else if (absValue >= 1000) { // Thousand
      formattedValue = this.formatNumber(value / 1000, precision);
      suffix = 'K';
    } else {
      return value.toString();
    }

    return `${formattedValue}${suffix}`;
  }

  private formatNumber(num: number, precision: number): string {
    const factor = Math.pow(10, precision);
    const rounded = precision > 0 ?
      Math.round(num * factor) / factor :
      Math.round(num);

    return rounded.toFixed(precision).replace(/\.?0+$/, '');
  }
}
