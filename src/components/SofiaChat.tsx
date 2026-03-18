import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatMessage {
  role: "user" | "sofia";
  content: string;
}

const SofiaChat = ({ variant }: { variant: "diesel" | "electric" }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sessionId = useRef(() => {
    const saved = localStorage.getItem("tecport_session");
    if (saved) return saved;
    const newId = crypto.randomUUID();
    localStorage.setItem("tecport_session", newId);
    return newId;
  }).current();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: "user", content: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://n8n-n8n.dfp88a.easypanel.host/webhook/e024ac5e-c546-414e-95e7-4ccd16d2c928",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg.content, sessionId, variant }),
        }
      );
      const data = await response.text();
      setChat((prev) => [...prev, { role: "sofia", content: data }]);
    } catch {
      setChat((prev) => [...prev, { role: "sofia", content: t.sofia.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const welcomeMsg =
    variant === "diesel" ? t.sofia.welcome_diesel : t.sofia.welcome_electric;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex h-[450px] w-[350px] flex-col border border-border bg-background shadow-lg">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <span className="font-titles text-sm font-bold uppercase">
              Sofia — Tecport AI
            </span>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 rounded-sm bg-secondary p-3 text-sm text-secondary-foreground">
              {welcomeMsg}
            </div>
            {chat.map((m, i) => (
              <div
                key={i}
                className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block rounded-sm px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-3 text-left">
                <div className="inline-block rounded-sm bg-secondary px-3 py-2 text-sm text-muted-foreground">
                  ...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="flex border-t border-border">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t.sofia.placeholder}
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-primary px-4 text-primary-foreground transition-colors hover:bg-accent"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-accent"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default SofiaChat;
