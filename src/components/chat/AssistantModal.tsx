import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChatContainer } from './ChatContainer';

interface AssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssistantModal({ open, onOpenChange }: AssistantModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Chat with Sam</DialogTitle>
        </DialogHeader>
        <ChatContainer className="h-[calc(100%-4rem)]" />
      </DialogContent>
    </Dialog>
  );
}