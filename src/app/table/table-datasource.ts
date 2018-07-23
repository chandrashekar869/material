import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  name: string;
  id: number;
  description:string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = [
  {id: 1, name: 'Hydrogen',description:'From Neil Bohr but burns' },
  {id: 2, name: 'Helium',description:'Light but not Flammable'},
  {id: 3, name: 'Lithium',description:'Used in Batteries'},
  {id: 4, name: 'Beryllium',description:'Dont know what it does'},
  {id: 5, name: 'Boron',description:'Very Noble'},
  {id: 6, name: 'Carbon',description:'Source of Life'},
  {id: 7, name: 'Nitrogen',description:'Without it you could create fire by waving your hand'},
  {id: 8, name: 'Oxygen',description:'Breathe in with a O Breathe out with a CO'},
  {id: 9, name: 'Fluorine',description:'Add as chlorine to cripple'},
  {id: 10, name: 'Neon',description:'Bright shit'},
  {id: 11, name: 'Sodium',description:'Part of diet'},
  {id: 12, name: 'Magnesium',description:'Source of selfie flash'},
  {id: 13, name: 'Aluminum',description:'Lets you fly'},
  {id: 14, name: 'Silicon',description:'I would be jobless without it'},
  {id: 15, name: 'Phosphorus',description:'Poison'},
  {id: 16, name: 'Sulfur',description:'Devil'},
  {id: 17, name: 'Chlorine',description:'Clean water'},
  {id: 18, name: 'Argon',description:'Inert'},
  {id: 19, name: 'Potassium',description:'Bomb'},
  {id: 20, name: 'Calcium',description:'Bone'},
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
