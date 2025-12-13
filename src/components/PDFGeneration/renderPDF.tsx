import { pdf } from "@react-pdf/renderer";
import TripPDF, { TripPDFProps } from "./TripPDF";

export async function renderPDF(iframe: HTMLIFrameElement, lorem: string) {
const loremText: TripPDFProps = { lorem };
  const blob = await pdf(
    <TripPDF lorem={lorem} />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  iframe.src = url;
}