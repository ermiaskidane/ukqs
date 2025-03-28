// import type { Certificate } from "./types"
import { Certificate } from "@prisma/client"
import { jsPDF } from "jspdf"

// Function to generate a random signature image
function generateRandomSignature(): string {
  // Create a canvas element
  const canvas = document.createElement("canvas")
  canvas.width = 300
  canvas.height = 100
  const ctx = canvas.getContext("2d")

  if (!ctx) return ""

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Set signature style
  ctx.strokeStyle = "#000033"
  ctx.lineWidth = 2
  ctx.lineJoin = "round"
  ctx.lineCap = "round"

  // Generate random signature points
  const points = []
  const startX = 20 + Math.random() * 30
  const startY = 50 + Math.random() * 20

  points.push({ x: startX, y: startY })

  // Generate a random number of points for the signature
  const numPoints = 15 + Math.floor(Math.random() * 10)

  for (let i = 0; i < numPoints; i++) {
    // Create a flowing signature-like pattern
    const lastPoint = points[points.length - 1]
    const newX = lastPoint.x + (5 + Math.random() * 15) * (Math.random() > 0.2 ? 1 : -0.5)
    const newY = lastPoint.y + (Math.random() * 10 - 5)

    points.push({ x: newX, y: newY })
  }

  // Draw the signature
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  for (let i = 1; i < points.length; i++) {
    // Use quadratic curves for a more natural signature look
    if (i % 2 === 0) {
      const xc = (points[i].x + points[i - 1].x) / 2
      const yc = (points[i].y + points[i - 1].y) / 2
      ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc)
    } else {
      ctx.lineTo(points[i].x, points[i].y)
    }
  }

  ctx.stroke()

  // Add a random flourish
  ctx.beginPath()
  const flourishX = points[points.length - 1].x
  const flourishY = points[points.length - 1].y

  ctx.moveTo(flourishX, flourishY)
  ctx.bezierCurveTo(flourishX + 20, flourishY - 10, flourishX + 40, flourishY + 20, flourishX + 60, flourishY - 5)
  ctx.stroke()

  // Return the signature as a data URL
  return canvas.toDataURL("image/png")
}

// Function to generate a random logo
function generateRandomLogo(): string {
  // Create a canvas element
  const canvas = document.createElement("canvas")
  canvas.width = 200
  canvas.height = 200
  const ctx = canvas.getContext("2d")

  if (!ctx) return ""

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Generate a random color scheme
  const hue = Math.floor(Math.random() * 360)
  const primaryColor = `hsl(${hue}, 70%, 50%)`
  const secondaryColor = `hsl(${(hue + 180) % 360}, 70%, 50%)`
  const tertiaryColor = `hsl(${(hue + 90) % 360}, 70%, 50%)`

  // Background
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Choose a random logo style (1-5)
  const logoStyle = Math.floor(Math.random() * 5) + 1

  switch (logoStyle) {
    case 1: // Shield style
      // Draw shield
      ctx.fillStyle = primaryColor
      ctx.beginPath()
      ctx.moveTo(100, 30)
      ctx.lineTo(170, 60)
      ctx.lineTo(150, 150)
      ctx.lineTo(100, 170)
      ctx.lineTo(50, 150)
      ctx.lineTo(30, 60)
      ctx.closePath()
      ctx.fill()

      // Inner shield
      ctx.fillStyle = secondaryColor
      ctx.beginPath()
      ctx.moveTo(100, 50)
      ctx.lineTo(150, 70)
      ctx.lineTo(135, 140)
      ctx.lineTo(100, 155)
      ctx.lineTo(65, 140)
      ctx.lineTo(50, 70)
      ctx.closePath()
      ctx.fill()

      // Center emblem
      ctx.fillStyle = tertiaryColor
      ctx.beginPath()
      ctx.arc(100, 100, 25, 0, Math.PI * 2)
      ctx.fill()

      // Text-like lines
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(80, 90, 40, 5)
      ctx.fillRect(85, 105, 30, 5)
      break

    case 2: // Circle logo
      // Outer circle
      ctx.fillStyle = primaryColor
      ctx.beginPath()
      ctx.arc(100, 100, 80, 0, Math.PI * 2)
      ctx.fill()

      // Middle circle
      ctx.fillStyle = secondaryColor
      ctx.beginPath()
      ctx.arc(100, 100, 60, 0, Math.PI * 2)
      ctx.fill()

      // Inner circle
      ctx.fillStyle = tertiaryColor
      ctx.beginPath()
      ctx.arc(100, 100, 40, 0, Math.PI * 2)
      ctx.fill()

      // Center
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(100, 100, 20, 0, Math.PI * 2)
      ctx.fill()

      // Add some text-like elements
      ctx.fillStyle = "#ffffff"
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const x = 100 + Math.cos(angle) * 50
        const y = 100 + Math.sin(angle) * 50
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
      }
      break

    case 3: // Square logo
      // Main square
      ctx.fillStyle = primaryColor
      ctx.fillRect(40, 40, 120, 120)

      // Inner square
      ctx.fillStyle = secondaryColor
      ctx.fillRect(60, 60, 80, 80)

      // Diagonal lines
      ctx.strokeStyle = tertiaryColor
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(40, 40)
      ctx.lineTo(160, 160)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(160, 40)
      ctx.lineTo(40, 160)
      ctx.stroke()

      // Center circle
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(100, 100, 20, 0, Math.PI * 2)
      ctx.fill()
      break

    case 4: // Abstract shape
      // Background shape
      ctx.fillStyle = primaryColor
      ctx.beginPath()
      ctx.moveTo(30, 70)
      ctx.bezierCurveTo(50, 30, 150, 30, 170, 70)
      ctx.bezierCurveTo(190, 110, 170, 170, 100, 170)
      ctx.bezierCurveTo(30, 170, 10, 110, 30, 70)
      ctx.fill()

      // Middle shape
      ctx.fillStyle = secondaryColor
      ctx.beginPath()
      ctx.moveTo(50, 80)
      ctx.bezierCurveTo(65, 50, 135, 50, 150, 80)
      ctx.bezierCurveTo(165, 110, 150, 150, 100, 150)
      ctx.bezierCurveTo(50, 150, 35, 110, 50, 80)
      ctx.fill()

      // Center shape
      ctx.fillStyle = tertiaryColor
      ctx.beginPath()
      ctx.moveTo(70, 90)
      ctx.bezierCurveTo(80, 70, 120, 70, 130, 90)
      ctx.bezierCurveTo(140, 110, 130, 130, 100, 130)
      ctx.bezierCurveTo(70, 130, 60, 110, 70, 90)
      ctx.fill()

      // White center
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(100, 100, 15, 0, Math.PI * 2)
      ctx.fill()
      break

    case 5: // Geometric logo
      // Background
      ctx.fillStyle = primaryColor
      ctx.beginPath()
      ctx.moveTo(100, 30)
      ctx.lineTo(170, 100)
      ctx.lineTo(100, 170)
      ctx.lineTo(30, 100)
      ctx.closePath()
      ctx.fill()

      // Middle layer
      ctx.fillStyle = secondaryColor
      ctx.beginPath()
      ctx.moveTo(100, 50)
      ctx.lineTo(150, 100)
      ctx.lineTo(100, 150)
      ctx.lineTo(50, 100)
      ctx.closePath()
      ctx.fill()

      // Inner layer
      ctx.fillStyle = tertiaryColor
      ctx.beginPath()
      ctx.moveTo(100, 70)
      ctx.lineTo(130, 100)
      ctx.lineTo(100, 130)
      ctx.lineTo(70, 100)
      ctx.closePath()
      ctx.fill()

      // Center
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(100, 100, 15, 0, Math.PI * 2)
      ctx.fill()
      break
  }

  // Add "UKQS" text
  ctx.font = "bold 20px Arial"
  ctx.fillStyle = "#000033"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("UKQS", 100, 100)

  // Return the logo as a data URL
  return canvas.toDataURL("image/png")
}

export async function generatePDF(certificate: Certificate): Promise<void> {
  // Generate random signature and logo
  const signatureImage = generateRandomSignature()
  const logoImage = generateRandomLogo()

  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Set background color
  doc.setFillColor(245, 245, 245)
  doc.rect(0, 0, 210, 297, "F")

  // Add border
  doc.setDrawColor(0, 32, 96) // Blue border
  doc.setLineWidth(1)
  doc.rect(10, 10, 190, 277, "S")

  // Add header
  doc.setFillColor(0, 32, 96) // Blue header
  doc.rect(10, 10, 190, 30, "F")

  // Add logo
  try {
    doc.addImage(logoImage, "PNG", 15, 12, 25, 25)
  } catch (error) {
    console.error("Error adding logo to PDF:", error)
  }

  // Add title
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(22)
  doc.text("UK QUALIFICATIONS FOR SKILLS", 105, 25, { align: "center" })
  doc.setFontSize(14)
  doc.text("Certificate of Achievement", 105, 35, { align: "center" })

  // Add certificate content
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(24)
  doc.text("CERTIFICATE", 105, 60, { align: "center" })

  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.text("This is to certify that", 105, 80, { align: "center" })

  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(0, 32, 96)
  doc.text(certificate.candidateName, 105, 95, { align: "center" })

  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(0, 0, 0)
  doc.text("has successfully completed", 105, 110, { align: "center" })

  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(0, 32, 96)
  doc.text(certificate.courseTitle, 105, 125, { align: "center" })

  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(0, 0, 0)
  doc.text(`Level: ${certificate.level}`, 105, 140, { align: "center" })

  const awardDate = new Date(certificate.awardDate).toLocaleDateString()
  doc.text(`Awarded on: ${awardDate}`, 105, 150, { align: "center" })

  // Add certificate details
  doc.setFontSize(12)
  doc.text("Certificate Details:", 30, 180)

  doc.setFontSize(10)
  doc.text(`Certificate Number: ${certificate.certificateNumber}`, 30, 190)
  doc.text(`Learner Reference Number: ${certificate.learnerReferenceNumber}`, 30, 200)
  doc.text(`Centre: ${certificate.centreName}`, 30, 210)
  doc.text(`Country: ${certificate.country}`, 30, 220)

  // Add footer
  doc.setDrawColor(0, 32, 96)
  doc.setLineWidth(0.5)
  doc.line(30, 250, 180, 250)

  // Add signature
  try {
    doc.addImage(signatureImage, "PNG", 130, 255, 50, 20)
  } catch (error) {
    console.error("Error adding signature to PDF:", error)
  }

  doc.setFontSize(10)
  doc.text("Verified at: ukqs.org.uk/verify", 30, 260)
  doc.text("Director of Certification", 160, 280, { align: "center" })

  // Add QR code-like element (simplified)
  // doc.setFillColor(0, 0, 0)
  // doc.roundedRect(30, 240, 20, 20, 2, 2, "F")
  // doc.setFillColor(255, 255, 255)
  // doc.roundedRect(33, 243, 14, 14, 1, 1, "F")
  // doc.setFillColor(0, 0, 0)
  // doc.roundedRect(36, 246, 8, 8, 1, 1, "F")

  // Save the PDF
  doc.save(`${certificate.candidateName.replace(/\s+/g, "_")}_Certificate.pdf`)
}


// // import type { Certificate } from "./types"
// import { Certificate } from "@prisma/client"
// import { jsPDF } from "jspdf"

// export async function generatePDF(certificate: Certificate): Promise<void> {
//   // Create a new PDF document
//   const doc = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4",
//   })

//   // Set background color
//   doc.setFillColor(245, 245, 245)
//   doc.rect(0, 0, 210, 297, "F")

//   // Add border
//   doc.setDrawColor(0, 32, 96) // Blue border
//   doc.setLineWidth(1)
//   doc.rect(10, 10, 190, 277, "S")

//   // Add header
//   doc.setFillColor(0, 32, 96) // Blue header
//   doc.rect(10, 10, 190, 30, "F")

//   // Add title
//   doc.setTextColor(255, 255, 255)
//   doc.setFont("helvetica", "bold")
//   doc.setFontSize(22)
//   doc.text("UK QUALIFICATIONS FOR SKILLS", 105, 25, { align: "center" })
//   doc.setFontSize(14)
//   doc.text("Certificate of Achievement", 105, 35, { align: "center" })

//   // Add certificate content
//   doc.setTextColor(0, 0, 0)
//   doc.setFontSize(24)
//   doc.text("CERTIFICATE", 105, 60, { align: "center" })

//   doc.setFontSize(14)
//   doc.setFont("helvetica", "normal")
//   doc.text("This is to certify that", 105, 80, { align: "center" })

//   doc.setFontSize(20)
//   doc.setFont("helvetica", "bold")
//   doc.setTextColor(0, 32, 96)
//   doc.text(certificate.candidateName, 105, 95, { align: "center" })

//   doc.setFontSize(14)
//   doc.setFont("helvetica", "normal")
//   doc.setTextColor(0, 0, 0)
//   doc.text("has successfully completed", 105, 110, { align: "center" })

//   doc.setFontSize(18)
//   doc.setFont("helvetica", "bold")
//   doc.setTextColor(0, 32, 96)
//   doc.text(certificate.courseTitle, 105, 125, { align: "center" })

//   doc.setFontSize(14)
//   doc.setFont("helvetica", "normal")
//   doc.setTextColor(0, 0, 0)
//   doc.text(`Level: ${certificate.level}`, 105, 140, { align: "center" })

//   const awardDate = new Date(certificate.awardDate).toLocaleDateString()
//   doc.text(`Awarded on: ${awardDate}`, 105, 150, { align: "center" })

//   // Add certificate details
//   doc.setFontSize(12)
//   doc.text("Certificate Details:", 30, 180)

//   doc.setFontSize(10)
//   doc.text(`Certificate Number: ${certificate.certificateNumber}`, 30, 190)
//   doc.text(`Learner Reference Number: ${certificate.learnerReferenceNumber}`, 30, 200)
//   doc.text(`Centre: ${certificate.centreName}`, 30, 210)
//   doc.text(`Country: ${certificate.country}`, 30, 220)

//   // Add footer
//   doc.setDrawColor(0, 32, 96)
//   doc.setLineWidth(0.5)
//   doc.line(30, 250, 180, 250)

//   doc.setFontSize(10)
//   doc.text("Verified at: ukqs.org.uk/verify", 30, 260)
//   doc.text("Director of Certification", 160, 260)

//   // Save the PDF
//   doc.save(`${certificate.candidateName.replace(/\s+/g, "_")}_Certificate.pdf`)
// }

