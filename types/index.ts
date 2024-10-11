export interface User {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  emailVerified?: Date;
  isAdmin?: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  accounts: Account[];
  sessions: Session[];
  jobs: Job[];
  applications: Application[];
  resume?: string;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  jobType: string;
  postedAt: Date;
  postedBy: User;
  postedById: string;
  applications: Application[];
}

export interface Application {
  id: string;
  job: Job;
  jobId: string;
  user: User;
  userId: string;
  status: string;
  appliedAt: Date;
}
