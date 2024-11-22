import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function PropertyFilters() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="filters">
        <AccordionTrigger>Advanced Filters</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="space-y-2">
            <Label>Property Type</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sfr" id="sfr" />
                <Label htmlFor="sfr">Single Family</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multi" id="multi" />
                <Label htmlFor="multi">Multi-Family</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="completed" />
                <Label htmlFor="completed">Completed</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select defaultValue="recent">
              <SelectTrigger>
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}