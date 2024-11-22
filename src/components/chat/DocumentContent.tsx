import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, ChevronRight, Download } from 'lucide-react';

interface DocumentContentProps {
  document: {
    title: string;
    content: string;
    type: 'markdown' | 'html';
  };
}

export function DocumentContent({ document }: DocumentContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOpenCanvas = () => {
    // TODO: Implement canvas view
    console.log('Opening canvas view for document:', document.title);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <h3 className="font-medium">{document.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleOpenCanvas}>
            Open in Canvas
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 prose prose-sm dark:prose-invert">
          {document.type === 'html' ? (
            <div dangerouslySetInnerHTML={{ __html: document.content }} />
          ) : (
            <div className="whitespace-pre-wrap">{document.content}</div>
          )}
        </div>
      )}
    </Card>
  );
}