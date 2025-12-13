import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

export type TripPDFProps = {
  lorem: string;
};

// Register fonts (must be URL or imported asset)
Font.register({
  family: "Roboto",
  src: "/fonts/Roboto-Regular.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
  },

  title: {
    fontSize: 25,
    marginBottom: 20,
  },

  section: {
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    gap: 20,
  },

  box: {
    width: 100,
    height: 100,
    backgroundColor: "#FF3300",
  },

  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6600FF",
  },

  text: {
    fontSize: 13,
    lineHeight: 1.4,
    textAlign: "justify",
  },

  image: {
    width: 200,
    marginTop: 20,
  },
});

export default function TripPDF({ lorem }: TripPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Here is some vector graphics...
        </Text>

        {/* Vector-like shapes */}
        <View style={[styles.section, styles.row]}>
          <View style={styles.box} />
          <View style={styles.circle} />
        </View>

        {/* Text */}
        <View style={styles.section}>
          <Text style={styles.text}>
            And here is some wrapped text...
          </Text>
          <Text style={styles.text}>{lorem}</Text>
        </View>
      </Page>

      {/* Second page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>And an image...</Text>
        <Image
          style={styles.image}
          src="/images/bee.png"
        />

        <Text style={{ marginTop: 20 }}>
          Finish...
        </Text>
      </Page>
    </Document>
  );
}