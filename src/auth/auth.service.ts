import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  signup() {
    return { message: 'I have signed up' };
  }

  signin() {
    return { message: 'I have signed in' };
  }
}
