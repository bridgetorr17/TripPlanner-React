/*** 

Explanation:

iframeRef gives you a reference to the <iframe> element.

useEffect ensures that renderPDF runs after the component mounts.

Adding lorem to the dependency array ensures live updates when data changes.
*/

import React, { useRef, useEffect } from "react";
import { renderPDF } from "./renderPDF";

/** FOR manual generation */
export function PDFViewer({ lorem }: { lorem: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleGenerate = () => {
    if (iframeRef.current) {
      renderPDF(iframeRef.current, lorem);
    }
  };

  return (
    <div>
      <button onClick={handleGenerate}>Generate PDF</button>
      <iframe ref={iframeRef} width="100%" height="600px" />
    </div>
  );
}
