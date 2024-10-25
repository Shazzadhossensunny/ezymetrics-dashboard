import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create PDF Document
const PDFReport = ({ leads }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontSize: 20 }}>Leads Report</Text>
        {leads.map((lead, index) => (
          <Text key={index}>
            {lead.name} - {lead.email} - {lead.lastContact}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFReport;
