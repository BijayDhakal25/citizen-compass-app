import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, FileText, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    name: string;
    type: string;
    url: string;
  } | null;
}

// Demo document contents
const DEMO_PDF_CONTENT = `
<div style="padding: 40px; font-family: system-ui; background: white; min-height: 400px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1e3a5f; margin: 0;">लिखु गाउँपालिका</h1>
    <p style="color: #666; margin: 5px 0;">Likhu Rural Municipality</p>
    <p style="color: #666; margin: 0;">Nuwakot, Bagmati Province, Nepal</p>
  </div>
  <hr style="border: 1px solid #eee; margin: 20px 0;" />
  <div style="margin: 20px 0;">
    <h2 style="color: #1e3a5f;">Official Document</h2>
    <p style="color: #333; line-height: 1.6;">
      This is a sample document preview. In production, this would display the actual PDF content.
    </p>
    <p style="color: #333; line-height: 1.6;">
      यो नमूना कागजात पूर्वावलोकन हो। उत्पादनमा, यसले वास्तविक PDF सामग्री प्रदर्शन गर्नेछ।
    </p>
  </div>
  <div style="margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
    <p style="margin: 0; color: #666; font-size: 14px;">
      <strong>Document ID:</strong> DOC-2024-001<br />
      <strong>Generated:</strong> ${new Date().toLocaleDateString()}<br />
      <strong>Status:</strong> Valid
    </p>
  </div>
</div>
`;

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
];

export function DocumentPreviewModal({ isOpen, onClose, document }: DocumentPreviewModalProps) {
  const { language } = useLanguage();

  if (!document) return null;

  const isPDF = document.type.includes("pdf");
  const isImage = document.type.includes("image");

  // Get a random demo image for image documents
  const getDemoImage = () => {
    const index = Math.abs(document.name.charCodeAt(0) % DEMO_IMAGES.length);
    return DEMO_IMAGES[index];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {isPDF ? (
                <FileText className="h-5 w-5 text-red-500" />
              ) : (
                <ImageIcon className="h-5 w-5 text-blue-500" />
              )}
              {document.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-muted rounded-lg p-4">
          {isPDF ? (
            <div 
              className="bg-card rounded-lg shadow-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: DEMO_PDF_CONTENT }}
            />
          ) : isImage ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <img
                src={getDemoImage()}
                alt={document.name}
                className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[300px] text-muted-foreground">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>{language === "ne" ? "यो कागजात प्रकार पूर्वावलोकन गर्न सकिँदैन" : "Cannot preview this document type"}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            {language === "ne" ? "बन्द गर्नुहोस्" : "Close"}
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            {language === "ne" ? "डाउनलोड" : "Download"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
