/*** 

Explanation:

iframeRef gives you a reference to the <iframe> element.

useEffect ensures that renderPDF runs after the component mounts.

Adding lorem to the dependency array ensures live updates when data changes.
*/

import React, { useRef, useEffect } from "react";
import { renderPDF } from "./renderPDF";
import StyledButton from "../StyledComponents/StyledButton";
import { ITripPopulated } from "../../../server/api/middleware/tripDetails";

export interface PDFViewerProps {
  trip: ITripPopulated;
}
/** FOR manual generation */
const PDFViewer = ( { trip }: PDFViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  console.log("IN PDFViewer ", trip)
  const handleGenerate = () => {
    if (iframeRef.current) {
      renderPDF(iframeRef.current, trip);
    }
  };

  return (
    <div>
      <StyledButton 
        onClickFn={handleGenerate}
        color="blue"
        >Generate PDF</StyledButton>
      <iframe ref={iframeRef} width="100%" height="600px" />
    </div>
  );
}

export { PDFViewer as default }