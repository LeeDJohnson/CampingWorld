import {of} from 'rxjs';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  const ngxCsvParserSpy: any = {
    parse: jest.fn(),
  }

  beforeEach(async () => {
    component = new AppComponent(ngxCsvParserSpy);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('onFileSelected', () => {
    it('should update file name of updated file', () => {
      const files = [{name: 'name.csv'}]
      const mockEvent = {target: {files}} as unknown as Event;
      ngxCsvParserSpy.parse.mockReturnValue(of());

      component.onFileSelected(mockEvent);

      expect(component.fileName).toEqual('name.csv')
    });

    it('should parse csv file', () => {
      const files = [{name: 'name.csv'}]
      const mockEvent = {target: {files}} as unknown as Event;
      ngxCsvParserSpy.parse.mockReturnValue(of());

      component.onFileSelected(mockEvent);

      expect(ngxCsvParserSpy.parse).toHaveBeenCalledWith({name: 'name.csv'}, {header: false, delimiter: ','});
    });
  });

  describe('convertToCamperObject', () => {
    it('should convert Object', () => {
      const mockReturnData = [
        ['a', 'b', 'c', 'd'],
        ['Coleman', 'Coleman', '3', '25000'],
        ['Coleman', 'Acadia', '5', 'n/a'],
      ];
      const expected = [
        {
          make: 'Coleman',
          brand: 'Coleman',
          sleepNumber: '3',
          price: '25000'
        },
        {
          make: 'Coleman',
          brand: 'Acadia',
          sleepNumber: '5',
          price: ''
        }
      ]
      expect(component.convertToCamperObject(mockReturnData)).toEqual(expected);
    });

    it('should throw error when incorrect input', () => {
      expect(component.convertToCamperObject).toThrowError();
    });
  });
});
