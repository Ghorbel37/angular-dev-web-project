import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Publication } from 'src/models/Publication';
import { PublicationService } from 'src/services/publication.service';
import { PublicationModalComponent } from '../publication-modal/publication-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements AfterViewInit{
  dataSource: MatTableDataSource<Publication>= new MatTableDataSource();
  displayedColumns: string[] = ['id','titre','type','dateApparition','lien','sourcePdf','action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private publicationService: PublicationService, private dialog: MatDialog) {
    this.publicationService.getAllPublications().subscribe(data => {
      this.dataSource.data = data;
    });
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddPublicationModal() {
    this.dialog.open(PublicationModalComponent).afterClosed().subscribe(PubRecupere => {
      if (PubRecupere) {
        this.publicationService.savePublication(PubRecupere).subscribe(()=>{
          this.publicationService.getAllPublications().subscribe(data => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePublication(id: any) {
    this.publicationService.deletePublication(id).subscribe(() => {
      this.publicationService.getAllPublications().subscribe(data => {
        this.dataSource.data = data;
      });
    });
  }

  openEditPublicationModal(idPub: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = idPub;
    let dialogRef = this.dialog.open(PublicationModalComponent, dialogConfig).afterClosed().subscribe(PubRecupere => {
      if (PubRecupere) {
        this.publicationService.updatePublication(idPub, PubRecupere).subscribe(()=>{
          this.publicationService.getAllPublications().subscribe(data => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }
}

