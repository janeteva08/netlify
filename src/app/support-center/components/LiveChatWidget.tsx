'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 lg:right-8 w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Live Support</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-white/90 text-xs">Online - Avg. response 2 min</span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
              >
                <Icon name="XMarkIcon" size={20} className="text-white" />
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-muted/30">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="UserIcon" size={16} className="text-white" />
                </div>
                <div className="bg-card border border-border rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-foreground">
                    Hello! Welcome to ShieldxSSL support. How can I assist you today?
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">Just now</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                <Icon name="PaperAirplaneIcon" size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-4 lg:right-8 w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Open live chat"
      >
        {isOpen ? (
          <Icon name="XMarkIcon" size={24} />
        ) : (
          <Icon name="ChatBubbleLeftRightIcon" size={24} />
        )}
      </button>
    </>
  );
}