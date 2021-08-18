import {Component} from '@angular/core';
import {NgxCsvParser} from 'ngx-csv-parser';

export interface Camper {
  make: string;
  brand: string;
  sleepNumber: string;
  price: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  fileName?: string;
  data?: Camper[];

  constructor(private readonly ngxCsvParser: NgxCsvParser) {
  }

  onFileSelected($event: any) {
    const file = $event?.target?.files?.[0];
    this.fileName = file?.name;
    this.ngxCsvParser.parse(file, {header: false, delimiter: ','})
      .pipe().subscribe(result => {
      this.data = this.convertToCamperObject(result);
    })
  }

  clearData(): void {
    window.location.reload();

  }

  convertToCamperObject(input: any): Camper[] {
    if (typeof input === 'object') {
      let object: Camper[] = []
      for (let i = 1; i < input.length; i++) {
        const nA = input[i][3] === 'n/a';
        object.push({
          make: input[i][0],
          brand: input[i][1],
          sleepNumber: input[i][2],
          price: nA ? '' : input[i][3],
        })
      }
      return object;
    } else {
      throw new Error(input);
    }
  }
}

