"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { text: "const server = express();", delay: 0 },
  { text: "server.use(cors({ origin: CLIENT_URL }));", delay: 400 },
  { text: "server.use(authMiddleware);", delay: 300 },
  { text: "", delay: 200 },
  { text: "// Route: Authenticate user", delay: 500 },
  { text: "server.post('/api/auth/login', async (req, res) => {", delay: 400 },
  { text: "  const { email, password } = req.body;", delay: 300 },
  { text: "  const user = await prisma.user.findUnique({ where: { email } });", delay: 400 },
  { text: "  const valid = await bcrypt.compare(password, user.hash);", delay: 350 },
  { text: "  const token = jwt.sign({ id: user.id, role: user.role }, SECRET);", delay: 400 },
  { text: "  res.json({ token, user: sanitize(user) });", delay: 300 },
  { text: "});", delay: 200 },
  { text: "", delay: 200 },
  { text: "server.listen(PORT, () => console.log(`🚀 Running on ${PORT}`));", delay: 500 },
];

export function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [cursorLine, setCursorLine] = useState(0);
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    let currentLine = 0;

    const typeNext = () => {
      if (currentLine < codeLines.length) {
        setCursorLine(currentLine);
        setVisibleLines(currentLine + 1);
        currentLine++;
        timeoutRef.current = setTimeout(typeNext, codeLines[currentLine - 1]?.delay + 200 || 400);
      } else {
        setTyping(false);
        // Restart after pause
        timeoutRef.current = setTimeout(() => {
          setVisibleLines(0);
          setCursorLine(0);
          setTyping(true);
          currentLine = 0;
          typeNext();
        }, 4000);
      }
    };

    typeNext();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-black/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/[0.03]"
      style={{ perspective: "1000px" }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-3 text-[11px] font-mono text-zinc-500">server.ts</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[9px] font-mono text-zinc-600 px-1.5 py-0.5 rounded bg-white/[0.04]">TypeScript</span>
        </div>
      </div>

      {/* Code area */}
      <div className="p-4 font-mono text-[12px] sm:text-[13px] leading-6 min-h-[280px] overflow-hidden">
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="flex"
          >
            {/* Line number */}
            <span className="text-zinc-700 w-8 shrink-0 text-right mr-4 select-none">
              {i + 1}
            </span>
            {/* Code content */}
            <span className="flex-1">
              {line.text === "" ? (
                <span>&nbsp;</span>
              ) : line.text.startsWith("//") ? (
                <span className="text-zinc-600 italic">{line.text}</span>
              ) : (
                <CodeHighlight code={line.text} />
              )}
            </span>
            {/* Cursor */}
            {typing && i === cursorLine && (
              <span className="inline-block w-[7px] h-4 bg-indigo-400 ml-0.5 animate-pulse" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Reflection glow */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-500/[0.03] to-transparent pointer-events-none" />
    </motion.div>
  );
}

/* Simple syntax highlighting */
function CodeHighlight({ code }: { code: string }) {
  const keywords = ["const", "let", "var", "async", "await", "return", "if", "else", "function", "=>"];
  const builtins = ["require", "express", "cors", "json", "listen", "post", "get", "use", "findUnique", "compare", "sign"];

  const parts = code.split(/(\s+|[{}();,.]|'[^']*'|`[^`]*`|"[^"]*")/g);

  return (
    <>
      {parts.map((part, i) => {
        if (/^['"`]/.test(part)) return <span key={i} className="text-emerald-400">{part}</span>;
        if (keywords.includes(part)) return <span key={i} className="text-violet-400">{part}</span>;
        if (builtins.includes(part)) return <span key={i} className="text-amber-300">{part}</span>;
        if (/^\$\{/.test(part)) return <span key={i} className="text-amber-300">{part}</span>;
        if (part === "=>" || part === "=" || part === "===" || part === "!==") return <span key={i} className="text-indigo-400">{part}</span>;
        return <span key={i} className="text-zinc-300">{part}</span>;
      })}
    </>
  );
}
