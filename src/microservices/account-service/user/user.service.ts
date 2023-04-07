import { Injectable } from '@nestjs/common';

enum NotifType {
  Email = 'email',
  UI = 'ui',
}

@Injectable()
export class UserService {
  users = [
    {
      id: 1,
      name: 'Dionysus Andrioletti',
      email: 'dandrioletti0@ucoz.com',
      notifChannels: ['ui'],
      companyId: 1,
    },
    {
      id: 2,
      name: 'Lucille Douce',
      email: 'ldouce1@newsvine.com',
      notifChannels: ['ui'],
      companyId: 1,
    },
    {
      id: 3,
      name: 'Melloney Rachuig',
      email: 'mrachuig2@cpanel.net',
      notifChannels: ['email'],
      companyId: 3,
    },
    {
      id: 4,
      name: 'Brand Risso',
      email: 'brisso3@google.com',
      notifChannels: ['ui', 'email'],
      companyId: 1,
    },
    {
      id: 5,
      name: 'Neda Tench',
      email: 'ntench4@nba.com',
      notifChannels: ['ui', 'email'],
      companyId: 2,
    },
    {
      id: 6,
      name: 'Kassi Vinker',
      email: 'kvinker5@slate.com',
      notifChannels: ['ui', 'email'],
      companyId: 2,
    },
  ];

  constructor() {}

  getById(id: number) {
    return this.users.find((u) => u.id === id) || null;
  }
}
