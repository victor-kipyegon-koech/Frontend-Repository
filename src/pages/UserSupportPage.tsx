import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const UserSupportPage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({ title: 'Please enter a message', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      // Replace this with an actual API call
      await new Promise((res) => setTimeout(res, 1000));

      toast({
        title: 'Request submitted',
        description: 'We’ll respond to your message as soon as possible.',
      });
      setMessage('');
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-semibold">Support</h1>
      <p className="text-gray-600">Have a question or issue? Send us a message and we’ll get back to you.</p>

      <Textarea
        placeholder="Type your message here..."
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </div>
  );
};

export default UserSupportPage;
