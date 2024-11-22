import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Mail, Bell, Shield, Key, Bot, Brain } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Global Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure system-wide settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API</span>
          </TabsTrigger>
          <TabsTrigger value="assistants" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>Assistants</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
        </TabsList>

        {/* Existing tab content remains the same */}
        
        <TabsContent value="assistants">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistants Configuration</CardTitle>
              <CardDescription>
                Manage AI assistants, their capabilities, and training data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sam AI Assistant</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Active</Badge>
                      <Badge variant="outline">GPT-4</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Primary renovation management assistant
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Knowledge Base
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Base Prompt</Label>
                      <Textarea
                        className="min-h-[100px]"
                        placeholder="Enter the base system prompt for Sam..."
                        defaultValue="You are Sam, an expert AI assistant specializing in renovation project management..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Training Data Sources</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-sm font-medium">Construction Standards</span>
                            <p className="text-xs text-muted-foreground">Building codes and regulations</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-sm font-medium">Project Templates</span>
                            <p className="text-xs text-muted-foreground">Standard renovation workflows</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-sm font-medium">Cost Database</span>
                            <p className="text-xs text-muted-foreground">Material and labor pricing</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Capabilities</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Document Generation</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow Sam to generate and modify documents
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Communication</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow Sam to send and manage emails
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Project Management</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow Sam to create and modify projects
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Vendor Management</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow Sam to interact with vendors
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Configuration</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>OpenAI API Key</Label>
                      <Input type="password" defaultValue="sk-..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Pinecone API Key</Label>
                      <Input type="password" defaultValue="pin-..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Neo4j Connection URI</Label>
                      <Input defaultValue="neo4j+s://..." />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset Defaults</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rest of the existing tab content */}
      </Tabs>
    </div>
  );
}