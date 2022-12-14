import bcrypt = require('bcrypt');
import * as dotenv from 'dotenv';

import {
  PrismaClient,
  User,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');
  const users = await createInitialUser();
  console.log({ users });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

async function createInitialUser(): Promise<User> {
  const userPassword = 'Ravngers@1';
  const fullName = 'Ravn Test';
  const email = 'ravn@test.co';
  return await createUser(email, userPassword, fullName);
}

async function createUser(email: string, password: string, fullName: string) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return await prisma.user.create({
    data: {
      fullName: fullName,
      email: email,
      password: passwordHash,
    },
  });
}
