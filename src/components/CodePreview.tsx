'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'
import type { ThemeRegistrationRaw } from 'shiki'
import type { UnifiedTheme } from '@/lib/theme'
import { highlight } from '@/lib/shiki-cache'

const LANGUAGES = [
  { id: 'go', label: 'Go', icon: '🐹', filename: 'main.go' },
  { id: 'typescript', label: 'TypeScript', icon: '🔷', filename: 'index.ts' },
  { id: 'python', label: 'Python', icon: '🐍', filename: 'main.py' },
  { id: 'rust', label: 'Rust', icon: '🦀', filename: 'main.rs' },
  { id: 'lua', label: 'Lua', icon: '🌙', filename: 'init.lua' },
  { id: 'bash', label: 'Bash', icon: '🐚', filename: 'setup.sh' },
  { id: 'sql', label: 'SQL', icon: '🗃️', filename: 'query.sql' },
  { id: 'json', label: 'JSON', icon: '📦', filename: 'config.json' },
  { id: 'css', label: 'CSS', icon: '🎨', filename: 'styles.css' },
  { id: 'cpp', label: 'C++', icon: '⚙️', filename: 'main.cpp' },
  { id: 'java', label: 'Java', icon: '☕', filename: 'Main.java' },
  { id: 'yaml', label: 'YAML', icon: '📋', filename: 'config.yaml' },
] as const

type LangId = typeof LANGUAGES[number]['id']

const SAMPLES: Record<LangId, string> = {
  go: `package main

import (
  "fmt"
  "net/http"
)

type Server struct {
  Host string
  Port int
}

func (s *Server) Addr() string {
  return fmt.Sprintf("%s:%d", s.Host, s.Port)
}

func (s *Server) Start() error {
  mux := http.NewServeMux()
  mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "ok")
  })
  return http.ListenAndServe(s.Addr(), mux)
}

func main() {
  srv := &Server{Host: "localhost", Port: 8080}
  if err := srv.Start(); err != nil {
    panic(err)
  }
}`,

  typescript: `interface Config {
  apiUrl:  string
  timeout: number
  retries?: number
}

async function fetchWithRetry<T>(
  url: string,
  config: Config,
): Promise<T> {
  const { timeout, retries = 3 } = config
  let lastError: Error | null = null

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), timeout)
      const res   = await fetch(url, { signal: controller.signal })
      clearTimeout(timer)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      return res.json() as Promise<T>
    } catch (err) {
      lastError = err as Error
    }
  }
  throw lastError
}`,

  python: `from dataclasses import dataclass, field
from typing import Optional
import asyncio, httpx

@dataclass
class Config:
    base_url: str
    timeout:  float = 5.0
    headers:  dict  = field(default_factory=dict)

class APIClient:
    def __init__(self, config: Config) -> None:
        self.config  = config
        self._client: Optional[httpx.AsyncClient] = None

    async def __aenter__(self):
        self._client = httpx.AsyncClient(
            base_url=self.config.base_url,
            timeout=self.config.timeout,
        )
        return self

    async def __aexit__(self, *_):
        await self._client.aclose()

    async def get(self, path: str) -> dict:
        resp = await self._client.get(path)
        resp.raise_for_status()
        return resp.json()

async def main():
    async with APIClient(Config("https://api.example.com")) as c:
        data = await c.get("/users/1")
        print(f"Hello, {data['name']}")

asyncio.run(main())`,

  rust: `use std::collections::HashMap;

#[derive(Debug, Clone)]
struct Config {
    host:     String,
    port:     u16,
    metadata: HashMap<String, String>,
}

impl Config {
    fn addr(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}

impl Default for Config {
    fn default() -> Self {
        Self {
            host:     "localhost".into(),
            port:     8080,
            metadata: HashMap::new(),
        }
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cfg      = Config::default();
    let listener = tokio::net::TcpListener::bind(cfg.addr()).await?;
    println!("Listening on {}", cfg.addr());
    loop {
        let (_, addr) = listener.accept().await?;
        println!("Connection from {addr}");
    }
}`,

  lua: `local pickers = require("telescope.pickers")
local finders  = require("telescope.finders")
local conf     = require("telescope.config").values

local M = {}

function M.find_dotfiles(opts)
  opts = opts or {}
  local files = vim.fn.systemlist(
    "find ~/.config -name '*.lua' -type f"
  )
  pickers.new(opts, {
    prompt_title = "Dotfiles",
    finder = finders.new_table {
      results     = files,
      entry_maker = function(e)
        return { value = e, display = e, ordinal = e }
      end,
    },
    sorter = conf.generic_sorter(opts),
  }):find()
end

return M`,


  bash: `#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="\${HOME}/code"
PACKAGES=(git curl ripgrep fd-find neovim tmux)

log() { echo "[$(date '+%H:%M:%S')] $*"; }

install_packages() {
  if command -v apt-get &>/dev/null; then
    sudo apt-get install -y "\${PACKAGES[@]}"
  elif command -v pacman &>/dev/null; then
    sudo pacman -Sy --noconfirm "\${PACKAGES[@]}"
  fi
}

setup_dotfiles() {
  git clone --depth=1 https://github.com/user/dots "\${REPO_DIR}/dots"
  ln -sf "\${REPO_DIR}/dots/.config/nvim" "\${HOME}/.config/nvim"
  ln -sf "\${REPO_DIR}/dots/.tmux.conf"   "\${HOME}/.tmux.conf"
}

main() { log "start"; install_packages; setup_dotfiles; log "done"; }
main "$@"`,

  sql: `WITH monthly_active AS (
  SELECT
    u.id,
    u.username,
    COUNT(DISTINCT e.session_id) AS sessions,
    COUNT(e.id)                  AS total_events,
    MAX(e.occurred_at)           AS last_seen
  FROM users  u
  JOIN events e ON e.user_id = u.id
  WHERE e.occurred_at >= NOW() - INTERVAL '30 days'
    AND u.deleted_at IS NULL
  GROUP BY u.id, u.username
),
ranked AS (
  SELECT *,
    NTILE(4) OVER (ORDER BY total_events DESC) AS quartile
  FROM monthly_active
)
SELECT username, sessions, total_events,
  CASE quartile
    WHEN 1 THEN 'power user'
    WHEN 2 THEN 'regular'
    ELSE        'casual'
  END AS segment
FROM ranked
ORDER BY total_events DESC
LIMIT 50;`,

  json: `{
  "name": "theme-crafter",
  "version": "1.0.0",
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "lint":  "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    "next":         "^16.0.0",
    "react":        "^19.0.0",
    "shiki":        "^1.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "typescript":  "^5",
    "tailwindcss": "^3"
  },
  "engines": { "node": ">=20.0.0" }
}`,

  css: `/* Design tokens */
:root {
  --color-bg:      #1e1e2e;
  --color-fg:      #cdd6f4;
  --color-primary: #cba6f7;
  --color-accent:  #89b4fa;
  --radius:        0.5rem;
}

body {
  background: var(--color-bg);
  color:      var(--color-fg);
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

.card {
  background:    color-mix(in srgb, var(--color-bg) 80%, white);
  border:        1px solid rgb(255 255 255 / 0.1);
  border-radius: var(--radius);
  padding:       1.25rem;
  transition:    transform 150ms ease;

  &:hover { transform: translateY(-2px); }
}

.btn {
  background:    var(--color-primary);
  color:         var(--color-bg);
  padding:       0.5rem 1rem;
  border-radius: var(--radius);
  font-weight:   600;
  cursor:        pointer;
}`,

  cpp: `#include <iostream>
#include <vector>

template<typename T>
class RingBuffer {
public:
  explicit RingBuffer(std::size_t cap) : buf_(cap), cap_(cap) {}

  void push(T val) {
    buf_[head_++ % cap_] = std::move(val);
    if (size_ < cap_) ++size_;
  }

  [[nodiscard]] const T& latest() const {
    return buf_[(head_ - 1) % cap_];
  }

  [[nodiscard]] std::size_t size()  const noexcept { return size_; }
  [[nodiscard]] bool        empty() const noexcept { return size_ == 0; }

private:
  std::vector<T> buf_;
  std::size_t    cap_, head_ = 0, size_ = 0;
};

int main() {
  RingBuffer<std::string> log(5);
  for (auto m : {"boot","init","ready","request","done"})
    log.push(m);
  std::cout << log.latest() << " (" << log.size() << " entries)\\n";
}`,

  java: `import java.util.List;
import java.util.concurrent.*;

public sealed interface Result<T> {
  record Ok<T>(T value)         implements Result<T> {}
  record Err<T>(String message) implements Result<T> {}

  static <T> Result<T> of(java.util.function.Supplier<T> fn) {
    try   { return new Ok<>(fn.get()); }
    catch (Exception e) { return new Err<>(e.getMessage()); }
  }
}

public class Main {
  static final Executor POOL =
    Executors.newVirtualThreadPerTaskExecutor();

  public static void main(String[] args) {
    var futures = List.of(1L, 2L, 3L).stream()
      .map(id -> CompletableFuture.supplyAsync(
        () -> Result.of(() -> "User#" + id), POOL))
      .toList();

    futures.forEach(f -> f.thenAccept(r -> switch (r) {
      case Result.Ok<String>  ok  -> System.out.println("✓ " + ok.value());
      case Result.Err<String> err -> System.err.println("✗ " + err.message());
    }));

    CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
  }
}`,

  yaml: `name: app-stack

services:
  api:
    build: { context: ., target: production }
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app
      REDIS_URL:    redis://cache:6379/0
    ports: ["8080:8080"]
    depends_on:
      db: { condition: service_healthy }
    healthcheck:
      test:     ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 15s
      retries:  3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER:     user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB:       app
    volumes: [pg_data:/var/lib/postgresql/data]
    healthcheck:
      test:    ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s

  cache:
    image:   redis:7-alpine
    command: redis-server --maxmemory 256mb

volumes:
  pg_data:`,
}

const isLangId = (id: string): id is LangId => LANGUAGES.some((l) => l.id === id)

function buildShikiTheme(t: UnifiedTheme): ThemeRegistrationRaw {
  return {
    name: 'custom-preview',
    type: t.type,
    settings: [
      { settings: { background: t.editor.background, foreground: t.editor.foreground } },
      { scope: 'comment', settings: { foreground: t.syntax.comment, fontStyle: 'italic' } },
      { scope: 'keyword, keyword.control, storage.type, storage.modifier', settings: { foreground: t.syntax.keyword } },
      { scope: 'string, string.quoted, string.template', settings: { foreground: t.syntax.string } },
      { scope: 'constant.numeric', settings: { foreground: t.syntax.number } },
      { scope: 'entity.name.function, support.function', settings: { foreground: t.syntax.function } },
      { scope: 'variable, variable.other', settings: { foreground: t.syntax.variable } },
      { scope: 'entity.name.type, support.type', settings: { foreground: t.syntax.type } },
      { scope: 'keyword.operator', settings: { foreground: t.syntax.operator } },
      { scope: 'punctuation', settings: { foreground: t.syntax.punctuation } },
      { scope: 'entity.name.tag', settings: { foreground: t.syntax.tag } },
      { scope: 'entity.other.attribute-name', settings: { foreground: t.syntax.attribute } },
      { scope: 'constant.language, support.constant', settings: { foreground: t.syntax.constant } },
      { scope: 'support.class, support.type.builtin', settings: { foreground: t.syntax.builtin } },
      { scope: 'variable.parameter', settings: { foreground: t.syntax.parameter } },
    ],
    colors: {
      'editor.background': t.editor.background,
      'editor.foreground': t.editor.foreground,
      'editorCursor.foreground': t.editor.cursor,
      'editor.selectionBackground': t.editor.selection,
      'editor.lineHighlightBackground': t.editor.lineHighlight,
      'editorLineNumber.foreground': t.editor.lineNumber,
      'editorLineNumber.activeForeground': t.editor.lineNumberActive,
    },
  }
}

export default function CodePreview({ theme }: { theme: UnifiedTheme }) {
  const [lang, setLang] = useState<LangId>('go')
  const [html, setHtml] = useState('')
  const [rendering, setRendering] = useState(false)
  const [copied, setCopied] = useState(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const code = SAMPLES[lang]
  const activeLang = LANGUAGES.find((l) => l.id === lang)!

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setRendering(true)
      try {
        setHtml(await highlight(code, lang, buildShikiTheme(theme)))
      } finally {
        setRendering(false)
      }
    }, 150)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [code, lang, theme])

  const handleLangChange = (id: string) => { if (isLangId(id)) setLang(id) }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Inline style for the Shiki output — just override wrapper bg
  const htmlCleaned = useMemo(
    () => html.replace(/<pre[^>]*>/, '<pre style="margin:0;padding:1rem;background:transparent;height:100%;overflow:auto">'),
    [html],
  )

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border"
      style={{ borderColor: theme.editor.border }}>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0 border-b"
        style={{ backgroundColor: theme.editor.lineHighlight, borderColor: theme.editor.border }}>

        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>

        <span className="text-[10px] ml-1 flex-shrink-0" style={{ color: theme.editor.lineNumber }}>
          {activeLang.filename}
        </span>

        {/* Language tabs */}
        <div className="flex gap-1 ml-2 overflow-x-auto
                        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LANGUAGES.map((l) => (
            <button key={l.id} onClick={() => handleLangChange(l.id)} title={l.label}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px]
                          transition-colors flex-shrink-0 ${lang === l.id ? 'text-white' : 'text-gray-600 hover:text-gray-400'
                }`}
              style={lang === l.id
                ? { backgroundColor: theme.editor.selection, color: theme.editor.foreground }
                : undefined}>
              <span>{l.icon}</span>
              <span className="hidden lg:inline">{l.label}</span>
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 flex-shrink-0">
          {rendering && (
            <div className="w-2 h-2 rounded-full animate-pulse mr-1"
              style={{ backgroundColor: theme.syntax.function }} />
          )}
          <button onClick={copyCode} title="Copy code"
            className="p-1.5 rounded text-gray-600 hover:text-gray-400 transition-colors">
            {copied
              ? <Check className="w-3.5 h-3.5 text-green-400" />
              : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code output — let Shiki own everything */}
      <div className="flex-1 overflow-hidden text-[12.5px] leading-relaxed font-mono"
        style={{ backgroundColor: theme.editor.background }}
        dangerouslySetInnerHTML={{ __html: htmlCleaned }}
      />

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 text-[10px] flex-shrink-0"
        style={{
          backgroundColor: theme.syntax.function + '22',
          borderTop: `1px solid ${theme.editor.border}`,
          color: theme.editor.lineNumber,
        }}>
        <span>{activeLang.icon} {activeLang.label}</span>
        <span>{code.split('\n').length} lines</span>
      </div>
    </div>
  )
}
