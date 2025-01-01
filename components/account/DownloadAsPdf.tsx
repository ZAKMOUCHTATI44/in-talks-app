import { useEffect, useState } from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import ReactDOM from "react-dom/client";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

const MyComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this runs only on the client
  }, []);

  // const download = () => {
  //   // Create a hidden div to render the component
  //   const container = document.createElement("div");
  //   container.style.visibility = "hidden";
  //   document.body.appendChild(container);

  //   // Use React 18's createRoot to render the component into the container
  //   const root = ReactDOM.createRoot(container);
  //   root.render(
  //     <div>
  //       <h1>This is my hidden component content!</h1>
  //       <p>Some additional content here...</p>
  //     </div>
  //   );

  //   // Capture the content of the hidden container
  //   html2canvas(container).then((canvas) => {
  //     const doc = new jsPDF({
  //       orientation: "landscape", // Optional, if you want landscape
  //       unit: "in", // You can use other units like 'mm', 'pt', etc.
  //       format: "a4", // A4 format
  //     });

  //     const imgData = canvas.toDataURL("image/png");

  //     // Add the image to the PDF
  //     doc.addImage(imgData, "PNG", 0, 0, 8.27, 11.69); // Adjust positioning and size
  //     doc.save("document-with-hidden-component.pdf");

  //     // Clean up by removing the hidden container from the DOM
  //     document.body.removeChild(container);
  //   });
  // };

  // Only render the button if it's on the client side
  if (!isClient) {
    return null;
  }

  return (
    <Button className="bg-mainColor text-white">
      <Download />
      Download PDF
    </Button>
  );
};

export default MyComponent;
