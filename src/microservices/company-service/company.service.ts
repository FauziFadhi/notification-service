import { Injectable } from '@nestjs/common';

enum NotifType {
  Email = 'email',
  UI = 'ui',
}

@Injectable()
export class CompanyService {
  companies = [
    {
      id: 1,
      name: 'Skiba',
      notifChannels: ['ui'],
    },
    {
      id: 2,
      name: 'Kazu',
      notifChannels: ['email'],
    },
    {
      id: 3,
      name: 'Skinder',
      notifChannels: ['ui', 'email'],
    },
  ];

  constructor() {}

  getById(id: number) {
    return this.companies.find((u) => u.id === id) || null;
  }
}
