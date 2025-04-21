"use client"

import React, { useEffect, useState } from "react"
import {
  // Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer"

// PDF styles
const styles = StyleSheet.create({
  // page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  header: { fontSize: 18, marginBottom: 10 },
  section: { marginBottom: 10 },
  label: { fontWeight: "bold" },
  logo: { width: 100, height: 50, marginBottom: 10 },
  signature: { width: 80, height: 40, marginTop: 20 },
})

// PDF Document component
const PDFDocument = ({
  trip,
  companyLogo,
  signature,
  companyInfo,
  companyName,
  invoiceNumber,
  invoiceDate,
  cabData,
}) => (
  <Document>
    <Page style={styles.page}>
      {companyLogo && <Image style={styles.logo} src={companyLogo} />}
      <Text style={styles.header}>{companyName}</Text>
      <Text style={styles.section}>{companyInfo}</Text>

      <Text style={styles.section}>
        <Text style={styles.label}>Invoice Number: </Text>
        {invoiceNumber}
      </Text>
      <Text style={styles.section}>
        <Text style={styles.label}>Invoice Date: </Text>
        {invoiceDate}
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Trip Details:</Text>
        <Text>From: {trip?.from || "N/A"}</Text>
        <Text>To: {trip?.to || "N/A"}</Text>
        <Text>Date: {trip?.date || "N/A"}</Text>
        <Text>Fare: ₹{trip?.fare || "0"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Cab Details:</Text>
        <Text>Driver: {cabData?.driver || "N/A"}</Text>
        <Text>Cab No: {cabData?.cabNumber || "N/A"}</Text>
        <Text>Model: {cabData?.model || "N/A"}</Text>
      </View>

      {signature && <Image style={styles.signature} src={signature} />}
    </Page>
  </Document>
)

// Page Component
export default function Page() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const fakeTrip = {
    from: "Mumbai",
    to: "Pune",
    date: "2025-04-21",
    fare: 1200,
  }

  const fakeCab = {
    driver: "Ravi Sharma",
    cabNumber: "MH12AB1234",
    model: "Toyota Etios",
  }

  const companyLogo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
  const signature = "https://cdn-icons-png.flaticon.com/512/60/60995.png"
  const companyInfo = "123 Main St, Example City\nGST: 27ABCDE1234F1Z5"
  const companyName = "My Cab Company Pvt. Ltd."
  const invoiceNumber = "INV-0001"
  const invoiceDate = "2025-04-21"
  const fileName = "invoice.pdf"

  if (!isClient) {
    return (
      <button className="w-full bg-green-600 text-white px-4 py-2 rounded">
        Loading PDF Generator...
      </button>
    )
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <PDFDownloadLink
        document={
          <PDFDocument
            trip={fakeTrip}
            companyLogo={companyLogo}
            signature={signature}
            companyInfo={companyInfo}
            companyName={companyName}
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
            cabData={fakeCab}
          />
        }
        fileName={fileName}
      >
        {({ loading, error }) => {
          if (error) {
            console.error("PDF generation error:", error)
            return (
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded">
                Error generating PDF
              </button>
            )
          }

          return (
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded">
              {loading ? "Generating PDF..." : "Download Invoice"}
            </button>
          )
        }}
      </PDFDownloadLink>
    </main>
  )
}
