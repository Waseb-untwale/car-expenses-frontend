"use client"
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
    borderBottomStyle: "solid",
    alignItems: "center",
    minHeight: 30,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
  signature: {
    width: 100,
    height: 50,
    marginTop: 20,
  },
})

// Create Document Component
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
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          {companyLogo && <Image style={styles.logo} src={companyLogo || "/placeholder.svg"} />}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>{companyName || "Company Name"}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14 }}>Invoice #{invoiceNumber || "000000"}</Text>
          <Text style={{ fontSize: 10 }}>Date: {invoiceDate || new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.companyInfo}>
        <Text>{companyInfo || "Company Address and Contact Information"}</Text>
      </View>

      <Text style={styles.title}>Trip Invoice</Text>

      <View style={styles.section}>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Details</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Cab Number</Text>
            <Text style={styles.tableCell}>{trip?.cab?.cabNumber || "N/A"}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Driver Name</Text>
            <Text style={styles.tableCell}>{trip?.driver?.name || "N/A"}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Route</Text>
            <Text style={styles.tableCell}>
              {trip?.tripDetails?.location?.from || "N/A"} → {trip?.tripDetails?.location?.to || "N/A"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Distance</Text>
            <Text style={styles.tableCell}>{trip?.tripDetails?.location?.totalDistance || "0"} KM</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Assigned Date</Text>
            <Text style={styles.tableCell}>
              {trip?.assignedAt ? new Date(trip.assignedAt).toLocaleDateString() : "N/A"}
            </Text>
          </View>
        </View>

        {/* Expenses Section */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Expenses</Text>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Expense Type</Text>
            <Text style={styles.tableCell}>Amount (₹)</Text>
          </View>

          {/* Fuel */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Fuel</Text>
            <Text style={styles.tableCell}>
              {trip?.tripDetails?.fuel?.amount
                ? trip.tripDetails.fuel.amount.reduce((sum, amount) => sum + Number(amount || 0), 0)
                : "0"}
            </Text>
          </View>

          {/* FastTag */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>FastTag</Text>
            <Text style={styles.tableCell}>
              {cabData?.fastTag?.amount
                ? cabData.fastTag.amount.reduce((sum, amount) => sum + Number(amount || 0), 0)
                : "0"}
            </Text>
          </View>

          {/* Tyre Puncture */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Tyre Repairs</Text>
            <Text style={styles.tableCell}>
              {trip?.tripDetails?.tyrePuncture?.repairAmount
                ? trip.tripDetails.tyrePuncture.repairAmount.reduce((sum, amount) => sum + Number(amount || 0), 0)
                : "0"}
            </Text>
          </View>

          {/* Vehicle Servicing */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Vehicle Servicing</Text>
            <Text style={styles.tableCell}>
              {trip?.tripDetails?.vehicleServicing?.amount
                ? trip.tripDetails.vehicleServicing.amount.reduce((sum, amount) => sum + Number(amount || 0), 0)
                : "0"}
            </Text>
          </View>

          {/* Other Problems */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Other Expenses</Text>
            <Text style={styles.tableCell}>
              {trip?.tripDetails?.otherProblems?.amount
                ? trip.tripDetails.otherProblems.amount.reduce((sum, amount) => sum + Number(amount || 0), 0)
                : "0"}
            </Text>
          </View>

          {/* Total */}
          <View style={[styles.tableRow, { fontWeight: "bold" }]}>
            <Text style={styles.tableCell}>Total</Text>
            <Text style={styles.tableCell}>{calculateTotal(trip, cabData)}</Text>
          </View>
        </View>
      </View>

      {/* Signature */}
      <View style={{ alignItems: "flex-end", marginTop: 30, marginRight: 30 }}>
        <Text>Authorized Signature</Text>
        {signature && <Image style={styles.signature} src={signature || "/placeholder.svg"} />}
      </View>

      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
      </View>
    </Page>
  </Document>
)

// Helper function to calculate total
const calculateTotal = (trip, cabData) => {
  let total = 0

  // Add fuel expenses
  if (trip?.tripDetails?.fuel?.amount) {
    total += trip.tripDetails.fuel.amount.reduce((sum, amount) => sum + Number(amount || 0), 0)
  }

  // Add FastTag expenses
  if (cabData?.fastTag?.amount) {
    total += cabData.fastTag.amount.reduce((sum, amount) => sum + Number(amount || 0), 0)
  }

  // Add tyre repair expenses
  if (trip?.tripDetails?.tyrePuncture?.repairAmount) {
    total += trip.tripDetails.tyrePuncture.repairAmount.reduce((sum, amount) => sum + Number(amount || 0), 0)
  }

  // Add vehicle servicing expenses
  if (trip?.tripDetails?.vehicleServicing?.amount) {
    total += trip.tripDetails.vehicleServicing.amount.reduce((sum, amount) => sum + Number(amount || 0), 0)
  }

  // Add other expenses
  if (trip?.tripDetails?.otherProblems?.amount) {
    total += trip.tripDetails.otherProblems.amount.reduce((sum, amount) => sum + Number(amount || 0), 0)
  }

  return total.toLocaleString()
}

export default PDFDocument
