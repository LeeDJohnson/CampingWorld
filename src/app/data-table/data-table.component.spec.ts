import {MatTableDataSource} from '@angular/material/table';
import {Camper} from '../app.component';
import {DataTableComponent} from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;

  beforeEach(async () => {
    component = new DataTableComponent();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should create data source on initialization', () => {
      const mockCamperData = [{make: 'make'} as Camper];
      component.camper = mockCamperData

      component.ngOnInit();

      expect(component.dataSource).toBeTruthy();
    });
  });

  it('should use the value of search box to filter data', () => {
    const targetSpy = jest.spyOn(component, 'target').mockReturnValue({value: 'strIng'} as HTMLInputElement);
    component.dataSource = new MatTableDataSource();

    component.applyFiler({value: 'strIng'} as unknown as KeyboardEvent);

    expect(targetSpy).toHaveBeenCalled();
    expect(component.dataSource.filter).toEqual('string');
  });

  it('should display filter instructions', () => {
    component.fileName = 'filename.csv';

    const actual = component.displayFilerInstructions();

    expect(actual).toEqual('You have successfully uploaded: filename.csv. Type in the field to search the table for specific results.')
  });

});
