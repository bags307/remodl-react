import { nanoid } from 'nanoid';
import { ChatMessage, ChatConversation } from '@/lib/chat';

// Helper to create timestamps for different dates
const getDate = (daysAgo: number, hoursAgo: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date;
};

// Mock conversations data with rich content examples
export const mockConversations: ChatConversation[] = [
  {
    id: nanoid(),
    title: "Kitchen Renovation Planning",
    messages: [
      {
        id: nanoid(),
        role: "assistant",
        content: "Hello! I'm Sam, your renovation assistant. How can I help you with your kitchen renovation today?",
        timestamp: getDate(0, 2),
      },
      {
        id: nanoid(),
        role: "user",
        content: "I'd like to get an estimate for renovating my kitchen. It's about 200 square feet.",
        timestamp: getDate(0, 2),
      },
      {
        id: nanoid(),
        role: "assistant",
        content: `Based on your kitchen size of 200 square feet, here's a rough estimate breakdown:

1. **Basic Components**:
- Cabinets: $15,000 - $30,000
- Countertops: $6,000 - $12,000
- Appliances: $8,000 - $20,000
- Flooring: $2,000 - $4,000

2. **Labor Costs**:
- Installation: $10,000 - $15,000
- Plumbing: $2,000 - $4,000
- Electrical: $2,000 - $4,000

Total estimated range: $45,000 - $89,000

Would you like me to break down any specific component in more detail?`,
        timestamp: getDate(0, 1),
      }
    ],
    createdAt: getDate(0, 2),
    updatedAt: getDate(0, 1),
    status: "active",
  },
  {
    id: nanoid(),
    title: "Bathroom Remodel Discussion",
    messages: [
      {
        id: nanoid(),
        role: "assistant",
        content: "Hello! I'm Sam, your renovation assistant. How can I help you with your bathroom remodel?",
        timestamp: getDate(1, 5),
      },
      {
        id: nanoid(),
        role: "user",
        content: "I want to convert my tub to a walk-in shower. What should I consider?",
        timestamp: getDate(1, 5),
      },
      {
        id: nanoid(),
        role: "assistant",
        content: `Here are the key considerations for converting a tub to a walk-in shower:

1. **Space Requirements**
- Minimum size: 30" x 30"
- Recommended size: 36" x 36" or larger
- Door clearance

2. **Plumbing Modifications**
- Drain location
- Water supply lines
- Waterproofing requirements

3. **Design Options**
- Curb vs. curbless entry
- Glass enclosure types
- Tile selections
- Built-in bench
- Grab bars

Would you like me to elaborate on any of these points?`,
        timestamp: getDate(1, 4),
      }
    ],
    createdAt: getDate(1, 5),
    updatedAt: getDate(1, 4),
    status: "active",
  },
  {
    id: nanoid(),
    title: "Flooring Installation Project",
    messages: [
      {
        id: nanoid(),
        role: "assistant",
        content: "Hello! I'm Sam, your renovation assistant. How can I help you with your flooring project?",
        timestamp: getDate(2, 8),
      },
      {
        id: nanoid(),
        role: "user",
        content: "I'm looking at different hardwood options for my living room. What do you recommend?",
        timestamp: getDate(2, 8),
      },
      {
        id: nanoid(),
        role: "assistant",
        content: `Here are some popular hardwood flooring options:

1. **Oak**
- Very durable
- Great for high-traffic areas
- Available in red and white varieties
- Cost: $8-15 per square foot

2. **Maple**
- Extremely hard and durable
- Light, clean appearance
- Takes stain well
- Cost: $10-18 per square foot

3. **Walnut**
- Rich, dark colors
- Softer than oak or maple
- Excellent grain patterns
- Cost: $12-20 per square foot

Would you like to see some specific examples or discuss installation methods?`,
        timestamp: getDate(2, 7),
      }
    ],
    createdAt: getDate(2, 8),
    updatedAt: getDate(2, 7),
    status: "active",
  },
  {
    id: nanoid(),
    title: "Paint Color Consultation",
    messages: [
      {
        id: nanoid(),
        role: "assistant",
        content: "Hello! I'm Sam, your renovation assistant. How can I help you choose the perfect paint colors?",
        timestamp: getDate(5, 3),
      },
      {
        id: nanoid(),
        role: "user",
        content: "I need help choosing paint colors for an open concept living/dining area. I want something modern but warm.",
        timestamp: getDate(5, 3),
      },
      {
        id: nanoid(),
        role: "assistant",
        content: `Here are some modern, warm color combinations to consider:

1. **Main Walls**
- Sherwin Williams "Agreeable Gray" (SW 7029)
- Benjamin Moore "Revere Pewter" (HC-172)

2. **Accent Walls**
- Sherwin Williams "Urbane Bronze" (SW 7048)
- Benjamin Moore "Kendall Charcoal" (HC-166)

Would you like to see some example rooms with these colors?`,
        timestamp: getDate(5, 2),
      }
    ],
    createdAt: getDate(5, 3),
    updatedAt: getDate(5, 2),
    status: "active",
  }
];

// Function to simulate message sending delay
export const simulateMessageDelay = (message: string): Promise<ChatMessage> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: nanoid(),
        role: 'assistant',
        content: message,
        timestamp: new Date(),
      });
    }, 1000);
  });
};