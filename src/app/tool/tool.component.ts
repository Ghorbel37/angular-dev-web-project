import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tool } from 'src/models/Tool';
import { ToolService } from 'src/services/tool.service';
import { ToolModalComponent } from '../tool-modal/tool-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements AfterViewInit{
  dataSource: MatTableDataSource<Tool>= new MatTableDataSource();
  displayedColumns: string[] = ['id','date','source','action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toolService: ToolService, private dialog: MatDialog) {
    this.toolService.getAllTools().subscribe(data => {
      this.dataSource.data = data;
    });
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddToolModal() {
    this.dialog.open(ToolModalComponent).afterClosed().subscribe(ToolRecupere => {
      if (ToolRecupere) {
        this.toolService.saveTool(ToolRecupere).subscribe(()=>{
          this.toolService.getAllTools().subscribe(data => {
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

  deleteTool(id: any) {
    this.toolService.deleteTool(id).subscribe(() => {
      this.toolService.getAllTools().subscribe(data => {
        this.dataSource.data = data;
      });
    });
  }

  openEditToolModal(idTool: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = idTool;
    let dialogRef = this.dialog.open(ToolModalComponent, dialogConfig).afterClosed().subscribe(ToolRecupere => {
      if (ToolRecupere) {
        this.toolService.updateTool(idTool, ToolRecupere).subscribe(()=>{
          this.toolService.getAllTools().subscribe(data => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }
}

