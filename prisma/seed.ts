import { PrismaClient, UserRole } from "@prisma/client"
import { randomUUID } from "crypto"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting to seed the database...")

  // First, clear existing data
  await prisma.certificate.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.account.deleteMany({})
  await prisma.verification.deleteMany({})
  await prisma.user.deleteMany({})

  console.log("Cleared existing data")

  // Create sample users with different roles
  const users = [
    {
      id: randomUUID(),
      name: "Admin User",
      email: "admin@example.com",
      emailVerified: true,
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: "Agent User",
      email: "agent@example.com",
      emailVerified: true,
      role: UserRole.AGENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: "Regular User 1",
      email: "user1@example.com",
      emailVerified: true,
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: "Regular User 2",
      email: "user2@example.com",
      emailVerified: true,
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: "Regular User 3",
      email: "user3@example.com",
      emailVerified: true,
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  // Create users
  for (const userData of users) {
    await prisma.user.create({
      data: userData,
    })
  }

  console.log(`Created ${users.length} users`)

  // Create an account for the admin user (for demonstration)
  await prisma.account.create({
    data: {
      id: randomUUID(),
      accountId: "local",
      providerId: "credentials",
      userId: users[0].id,
      password: "$2a$10$8JOGOSLDkYfvRm/JRLKwSuQFzQKCGJVRy5MUssGYPM1V/C/Zcft4e", // hashed 'password123'
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  console.log("Created account for admin user")

  // Define some sample data arrays for variety
  const centres = [
    { no: "IT202501", name: "UKQS London Training Centre" },
    { no: "IT202502", name: "UKQS Manchester Academy" },
    { no: "IT202503", name: "UKQS Birmingham Institute" },
    { no: "IT202504", name: "UKQS Edinburgh College" },
    { no: "IT202505", name: "UKQS Cardiff School" },
  ]

  const countries = ["United Kingdom", "Ireland", "France", "Germany", "Spain", "Italy", "Netherlands"]

  const candidates = [
    "John Smith",
    "Emma Johnson",
    "Michael Williams",
    "Olivia Brown",
    "James Jones",
    "Sophia Miller",
    "William Davis",
    "Ava Wilson",
    "Alexander Moore",
    "Charlotte Taylor",
    "Daniel Anderson",
    "Mia Thomas",
    "Matthew Jackson",
    "Amelia White",
    "David Harris",
    "Emily Martin",
    "Joseph Thompson",
    "Elizabeth Garcia",
    "Christopher Martinez",
    "Abigail Robinson",
  ]

  const courses = [
    { title: "Advanced Web Development", level: "Level 5" },
    { title: "Business Management", level: "Level 6" },
    { title: "Digital Marketing", level: "Level 4" },
    { title: "Cybersecurity Fundamentals", level: "Level 5" },
    { title: "Data Science and Analytics", level: "Level 7" },
    { title: "Project Management", level: "Level 5" },
    { title: "Artificial Intelligence", level: "Level 6" },
    { title: "Cloud Computing", level: "Level 5" },
    { title: "Software Engineering", level: "Level 6" },
    { title: "Network Administration", level: "Level 4" },
    { title: "Mobile App Development", level: "Level 5" },
    { title: "UX/UI Design", level: "Level 4" },
    { title: "Blockchain Technology", level: "Level 6" },
    { title: "DevOps Engineering", level: "Level 5" },
    { title: "Machine Learning", level: "Level 7" },
  ]

  // Generate random date within a range
  function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  // Create certificates and associate them with users
  // We'll create 10 certificates per user (50 total)
  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    const user = users[userIndex]

    for (let i = 0; i < 10; i++) {
      // Generate random data for this certificate
      const centreIndex = Math.floor(Math.random() * centres.length)
      const centre = centres[centreIndex]

      const country = countries[Math.floor(Math.random() * countries.length)]
      const candidateName = candidates[Math.floor(Math.random() * candidates.length)]

      const courseIndex = Math.floor(Math.random() * courses.length)
      const course = courses[courseIndex]

      // Generate dates
      const dateOfBirth = randomDate(new Date(1980, 0, 1), new Date(2000, 11, 31))
      const awardDate = randomDate(new Date(2020, 0, 1), new Date())

      // Generate certificate number and learner reference number
      const year = awardDate.getFullYear().toString().slice(-2)
      const certificateNumber = `UKQS${year}${(10000 + (userIndex * 10 + i)).toString().slice(-5)}`
      const learnerReferenceNumber = `LRN${year}${(10000 + (userIndex * 10 + i)).toString().slice(-5)}`

      // Create certificate with user relation
      await prisma.certificate.create({
        data: {
          id: randomUUID(),
          centreNo: centre.no,
          centreName: centre.name,
          country,
          candidateName,
          dateOfBirth,
          courseTitle: course.title,
          level: course.level,
          awardDate,
          certificateNumber,
          learnerReferenceNumber,
          userId: user.id, // Associate with the user
        },
      })
    }
  }

  console.log(`Created 50 certificates (10 per user)`)
  console.log("Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

