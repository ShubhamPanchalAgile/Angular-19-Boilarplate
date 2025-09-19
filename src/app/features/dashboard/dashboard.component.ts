import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/modules/material.module';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardCards: DashboardCard[] = [
    {
      title: 'Total Users',
      value: '2,847',
      icon: 'people',
      trend: { value: 12.5, isPositive: true },
      color: 'primary',
    },
    {
      title: 'Revenue',
      value: '$54,283',
      icon: 'attach_money',
      trend: { value: 8.3, isPositive: true },
      color: 'success',
    },
    {
      title: 'Orders',
      value: '1,426',
      icon: 'shopping_cart',
      trend: { value: 3.2, isPositive: false },
      color: 'accent',
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      icon: 'trending_up',
      trend: { value: 15.7, isPositive: true },
      color: 'warn',
    },
  ];

  recentActivities: RecentActivity[] = [
    {
      id: 1,
      user: 'John Smith',
      action: 'Created a new user account',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'success',
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'Updated product inventory',
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
      status: 'success',
    },
    {
      id: 3,
      user: 'Mike Davis',
      action: 'Failed login attempt detected',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: 'error',
    },
    {
      id: 4,
      user: 'Lisa Wilson',
      action: 'Generated monthly report',
      timestamp: new Date(Date.now() - 67 * 60 * 1000),
      status: 'success',
    },
    {
      id: 5,
      user: 'System',
      action: 'Database backup completed',
      timestamp: new Date(Date.now() - 89 * 60 * 1000),
      status: 'warning',
    },
  ];

  ngOnInit() {
    // Initialize dashboard data
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
