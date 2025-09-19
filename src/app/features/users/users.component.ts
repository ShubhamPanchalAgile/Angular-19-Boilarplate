import {
  AfterViewInit,
  Component,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  untracked,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/modules/material.module';
import { CustomTableComponent } from '../../shared/components/custom-table/custom-table.component';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { User } from '../../core/models/common.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, CustomTableComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  private dialog = inject(MatDialog);
  users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'admin',
      status: 'active',
      joinDate: new Date('2023-01-15'),
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      department: 'IT',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'manager',
      status: 'active',
      joinDate: new Date('2023-02-20'),
      lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000),
      department: 'Marketing',
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'user',
      status: 'inactive',
      joinDate: new Date('2023-03-10'),
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      department: 'Sales',
    },
    {
      id: '4',
      name: 'Lisa Wilson',
      email: 'lisa.wilson@company.com',
      role: 'user',
      status: 'pending',
      joinDate: new Date('2024-01-05'),
      lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000),
      department: 'HR',
    },
    {
      id: '5',
      name: 'Robert Brown',
      email: 'robert.brown@company.com',
      role: 'manager',
      status: 'active',
      joinDate: new Date('2022-11-30'),
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      department: 'Finance',
    },
    {
      id: '6',
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      role: 'user',
      status: 'active',
      joinDate: new Date('2024-02-14'),
      lastLogin: new Date(Date.now() - 8 * 60 * 60 * 1000),
      department: 'Design',
    },
    {
      id: '7',
      name: 'David Martinez',
      email: 'david.martinez@company.com',
      role: 'user',
      status: 'active',
      joinDate: new Date('2023-09-12'),
      lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000),
      department: 'Operations',
    },
    {
      id: '8',
      name: 'Jennifer Taylor',
      email: 'jennifer.taylor@company.com',
      role: 'admin',
      status: 'active',
      joinDate: new Date('2022-08-22'),
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      department: 'IT',
    },
  ];

  @ViewChild('table') table!: CustomTableComponent;
  private injector = inject(Injector);
  ngAfterViewInit() {
    const tableComp = this.table;

    tableComp.data.set(this.users);
    tableComp.columns.set([
      { key: 'name', label: 'name' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'department', label: 'department' },
      { key: 'joinDate', label: 'joinDate' },
      { key: 'lastLogin', label: 'lastLogin' },
    ]);
    tableComp.tableName.set('Users');

    runInInjectionContext(this.injector, () => {
      effect(() => {
        const action = this.table.actionTriggered();
        if (!action) return;

        untracked(() => {
          switch (action.type) {
            case 'edit':
              this.dialog.open(AddUserComponent, {
                data: { user: action.user },
                width: '620px',
              });
              break;
            case 'view':
              this.dialog.open(AddUserComponent, {
                data: { user: action.user, disable: true },
                width: '620px',
              });
              break;
          }
          this.table.actionTriggered.set(null);
        });
      });
    });
  }

  addUser() {
    this.dialog.open(AddUserComponent, {
      width: '620px',
      maxWidth: '80vw',
      height: 'auto',
      maxHeight: 'calc(100vh - 100px)',
      panelClass: 'custom-dialog-container',
    });
  }
}
