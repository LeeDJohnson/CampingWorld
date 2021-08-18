import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Camper} from '../app.component';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss', '../app.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() camper: Camper[] | undefined;
  @Input() fileName: string | undefined;
  dataSource!: MatTableDataSource<Camper>;
  displayedColumns: string[] = ['make', 'brand', 'sleepNumber', 'price'];
  sortedData: Camper[] | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    if (this.camper) {
      this.dataSource = new MatTableDataSource(this.camper);
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      // @ts-ignore
      this.dataSource.sort = this.sort;
    }
  }

  applyFiler(event: KeyboardEvent): void {
    const filterValue: string = this.target(event)?.value;
    if (this.dataSource)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  target(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }

  displayFilerInstructions(): string {
    return `You have successfully uploaded: ${this.fileName}. Type in the field to search the table for specific results.`
  }
}
