import { pdf, PDFViewerProps } from "@react-pdf/renderer";
import TripPDF, { TripPDFProps } from "./TripPDF";
import { ITripPopulated } from "../../../server/api/middleware/tripDetails";

export async function renderPDF(iframe: HTMLIFrameElement, trip: ITripPopulated) {
  const blob = await pdf(
    <TripPDF trip={trip} />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  iframe.src = url;
}