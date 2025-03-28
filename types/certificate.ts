export interface Certificate {
  id: string;
  certificateNumber: string;
  candidateName: string;
  learnerReferenceNumber: string;
  centreName: string;
  centreNo: string;
  courseTitle: string;
  level: string;
  country: string;
  dateOfBirth: string;
  awardDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
} 