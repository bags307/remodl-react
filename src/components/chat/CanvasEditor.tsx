import { useEffect, useRef } from 'react';
import Squire from 'squire-rte';

interface CanvasEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

export function CanvasEditor({ initialContent, onChange }: CanvasEditorProps) {
  const editorRef = useRef<Squire | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      const editor = new Squire(containerRef.current, {
        blockTag: 'div',
        blockAttributes: { class: 'paragraph' },
      });

      if (initialContent) {
        editor.setHTML(initialContent);
      }

      editor.addEventListener('input', () => {
        onChange?.(editor.getHTML());
      });

      editorRef.current = editor;
    }

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [initialContent, onChange]);

  return (
    <div className="min-h-[500px] border rounded-lg bg-background">
      <div className="border-b p-2">
        {/* Toolbar will go here */}
      </div>
      <div
        ref={containerRef}
        className="p-4 prose prose-sm dark:prose-invert max-w-none min-h-[400px]"
      />
    </div>
  );
}