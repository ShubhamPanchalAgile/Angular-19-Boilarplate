import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '@core/modules/material.module';
import { signal, computed, effect } from '@angular/core';
import { NotificationService } from '@core/services/notification.service';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'status' | 'avatar';
}

export type TableAction = { type: string; user: any };

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private notificationService = inject(NotificationService);

  // Signals
  columns = signal<TableColumn[]>([]);
  data = signal<any[]>([]);
  tableName = signal<string>('Table');
  actionTriggered = signal<TableAction | null>(null);

  dataSource = new MatTableDataSource<any>();
  selectedUsers = signal<Set<any>>(new Set<any>());
  selectedUser = signal<any | null>(null);

  displayedColumns = computed(() => {
    let cols: string[] = [];
    cols.push(...this.columns().map((c) => c.key));
    if (this.actions()) cols.push('actions');
    return cols;
  });

  selectable = signal<boolean>(true);
  actions = signal<boolean>(true);
  private dataEffect = effect(() => {
    this.dataSource.data = this.data();
  });

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchText = filter.toLowerCase();
      return Object.keys(data).some((key) =>
        String(data[key as keyof any])
          .toLowerCase()
          .includes(searchText),
      );
    };
  }

  // Selection logic using signals
  isAllSelected(): boolean {
    const numSelected = this.selectedUsers().size;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows && numRows > 0;
  }

  isIndeterminate(): boolean {
    const numSelected = this.selectedUsers().size;
    const numRows = this.dataSource.filteredData.length;
    return numSelected > 0 && numSelected < numRows;
  }

  isSelected(user: any): boolean {
    return this.selectedUsers().has(user);
  }

  masterToggle() {
    const selectedSet = new Set(this.selectedUsers());
    if (this.isAllSelected()) {
      selectedSet.clear();
    } else {
      this.dataSource.filteredData.forEach((u) => selectedSet.add(u));
    }
    this.selectedUsers.set(selectedSet);
  }

  toggleRow(user: any) {
    const selectedSet = new Set(this.selectedUsers());
    if (selectedSet.has(user)) selectedSet.delete(user);
    else selectedSet.add(user);
    this.selectedUsers.set(selectedSet);
  }

  selectRow(user: any) {
    this.toggleRow(user);
  }

  setSelectedUser(user: any) {
    this.selectedUser.set(user);
  }

  // Actions
  editUser() {
    const user = this.selectedUser();
    if (user) {
      this.actionTriggered.set({ type: 'edit', user });
    }
  }

  viewUser() {
    const user = this.selectedUser();
    if (user) {
      this.actionTriggered.set({ type: 'view', user });
    }
  }

  resetPassword() {
    const user = this.selectedUser();
    if (user) {
      this.actionTriggered.set({ type: 'reset', user });
    }
  }

  deleteUser() {
    const user = this.selectedUser();
    if (user) {
      this.notificationService.success(`${user.name} deleted`);
      this.actionTriggered.set({ type: 'delete', user });
    }
  }

  bulkAction(action: string) {
    const selected = Array.from(this.selectedUsers());
    if (selected.length === 0) {
      this.notificationService.success('No users selected');
      return;
    }
    this.notificationService.success(
      `${action} applied to ${selected.length} user(s)`,
    );

    selected.forEach((user) =>
      this.actionTriggered.set({ type: action, user }),
    );
    this.selectedUsers.set(new Set());
  }
  getStatusIcon(status: string): string {
    switch (status) {
      case 'active':
        return 'check_circle';
      case 'inactive':
        return 'cancel';
      case 'pending':
        return 'schedule';
      default:
        return 'help';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  }
}
