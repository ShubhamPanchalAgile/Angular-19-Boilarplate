import { AfterViewInit, Component, effect, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@core/modules/material.module';
import { CustomTableComponent } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, CustomTableComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit {
  users: any[] = [
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

  tableEffect = effect(() => {
    if (!this.table) return; // guard until table exists

    const action = this.table.actionTriggered();
    if (action) {
      this.table.actionTriggered.set(null);
    }
  });

  ngAfterViewInit() {
    const tableComp = this.table;

    tableComp.data.set(this.users);
    tableComp.columns.set([
      // { key: 'select', label: 'select' },
      // { key: 'avatar', label: 'avatar' },
      { key: 'name', label: 'name' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'department', label: 'department' },
      { key: 'joinDate', label: 'joinDate' },
      { key: 'lastLogin', label: 'lastLogin' },
      // { key: 'actions', label: 'actions' },
    ]);
    tableComp.tableName.set('Products');
  }
}
