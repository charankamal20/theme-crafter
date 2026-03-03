'use client'
import { useEffect, useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import type { UnifiedTheme } from '@/lib/theme'
import type { ThemeRegistrationRaw } from 'shiki'
import { highlight } from '@/lib/shiki-cache'

// ── Language registry ────────────────────────────────────────────
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

// ── Sample code per language ─────────────────────────────────────
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
  apiUrl: string
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
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timer)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      return res.json() as Promise<T>
    } catch (err) {
      lastError = err as Error
    }
  }
  throw lastError
}

const data = await fetchWithRetry<{ name: string }>(
  "https://api.example.com/user",
  { apiUrl: "https://api.example.com", timeout: 3000 },
)
console.log(data.name)`,

  python: `from dataclasses import dataclass, field
from typing import Optional
import asyncio
import httpx

@dataclass
class Config:
    base_url: str
    timeout: float = 5.0
    headers: dict = field(default_factory=dict)

class APIClient:
    def __init__(self, config: Config) -> None:
        self.config = config
        self._client: Optional[httpx.AsyncClient] = None

    async def __aenter__(self):
        self._client = httpx.AsyncClient(
            base_url=self.config.base_url,
            timeout=self.config.timeout,
            headers=self.config.headers,
        )
        return self

    async def __aexit__(self, *_):
        await self._client.aclose()

    async def get(self, path: str) -> dict:
        resp = await self._client.get(path)
        resp.raise_for_status()
        return resp.json()

async def main():
    cfg = Config(base_url="https://api.example.com")
    async with APIClient(cfg) as client:
        data = await client.get("/users/1")
        print(f"Hello, {data['name']}")

asyncio.run(main())`,

  rust: `use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use anyhow::Result;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Config {
    host: String,
    port: u16,
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
            host: "localhost".into(),
            port: 8080,
            metadata: HashMap::new(),
        }
    }
}

async fn run(cfg: Config) -> Result<()> {
    println!("Starting server on {}", cfg.addr());
    let listener = tokio::net::TcpListener::bind(cfg.addr()).await?;
    loop {
        let (socket, addr) = listener.accept().await?;
        println!("Connection from {addr}");
        drop(socket);
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    let cfg = Config::default();
    run(cfg).await
}`,

  lua: `-- Neovim plugin: telescope extension
local telescope = require("telescope")
local actions   = require("telescope.actions")
local finders   = require("telescope.finders")
local pickers   = require("telescope.pickers")
local conf      = require("telescope.config").values

local M = {}

---@param opts table?
function M.find_dotfiles(opts)
  opts = opts or {}
  local dotfiles = vim.fn.systemlist("find ~/.config -name '*.lua' -type f")

  pickers.new(opts, {
    prompt_title = "Dotfiles",
    finder = finders.new_table {
      results = dotfiles,
      entry_maker = function(entry)
        return { value = entry, display = entry, ordinal = entry }
      end,
    },
    sorter  = conf.generic_sorter(opts),
    attach_mappings = function(buf, map)
      map("i", "<CR>", function()
        actions.select_default:replace(function()
          actions.close(buf)
          vim.cmd("edit " .. vim.fn.fnamemodify(buf, ":p"))
        end)
      end)
      return true
    end,
  }):find()
end

M.setup = function(opts)
  telescope.register_extension({ exports = M })
end

return M`,

  // eslint-disable-next-line no-secrets/no-secrets
  bash: `#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="\${HOME}/code"
LOG_FILE="/tmp/setup.log"
PACKAGES=(git curl ripgrep fd-find neovim tmux)

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "\${LOG_FILE}"; }

install_packages() {
  log "Installing packages..."
  if command -v apt-get &>/dev/null; then
    sudo apt-get update -qq
    sudo apt-get install -y "\${PACKAGES[@]}"
  elif command -v pacman &>/dev/null; then
    sudo pacman -Sy --noconfirm "\${PACKAGES[@]}"
  else
    log "ERROR: unsupported package manager"
    exit 1
  fi
}

setup_dotfiles() {
  local dotfiles_repo="https://github.com/user/dotfiles.git"
  if [[ ! -d "\${REPO_DIR}/dotfiles" ]]; then
    log "Cloning dotfiles..."
    git clone --depth=1 "\${dotfiles_repo}" "\${REPO_DIR}/dotfiles"
  fi
  log "Linking configs..."
  ln -sf "\${REPO_DIR}/dotfiles/.config/nvim" "\${HOME}/.config/nvim"
  ln -sf "\${REPO_DIR}/dotfiles/.tmux.conf"   "\${HOME}/.tmux.conf"
}

main() {
  log "Starting setup"
  install_packages
  setup_dotfiles
  log "Done ✓"
}

main "$@"`,

  sql: `-- User analytics query
WITH monthly_active AS (
  SELECT
    u.id,
    u.username,
    u.created_at,
    COUNT(DISTINCT e.session_id)  AS sessions,
    COUNT(e.id)                   AS total_events,
    MAX(e.occurred_at)            AS last_seen
  FROM users u
  JOIN events e ON e.user_id = u.id
  WHERE
    e.occurred_at >= NOW() - INTERVAL '30 days'
    AND u.deleted_at IS NULL
  GROUP BY u.id, u.username, u.created_at
),
ranked AS (
  SELECT
    *,
    NTILE(4) OVER (ORDER BY total_events DESC) AS quartile,
    ROW_NUMBER() OVER (
      PARTITION BY DATE_TRUNC('week', last_seen)
      ORDER BY sessions DESC
    ) AS rank_in_week
  FROM monthly_active
)
SELECT
  username,
  sessions,
  total_events,
  last_seen::DATE        AS last_active,
  CASE quartile
    WHEN 1 THEN 'power user'
    WHEN 2 THEN 'regular'
    ELSE        'casual'
  END                    AS segment
FROM ranked
WHERE rank_in_week <= 10
ORDER BY total_events DESC
LIMIT 50;`,

  json: `{
  "name": "theme-crafter",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "lint":  "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    "next":          "^16.0.0",
    "react":         "^19.0.0",
    "shiki":         "^1.0.0",
    "react-colorful":"^5.6.1",
    "lucide-react":  "^0.400.0"
  },
  "devDependencies": {
    "typescript":     "^5",
    "tailwindcss":    "^3",
    "@types/react":   "^19"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}`,

  css: `/* Design tokens */
:root {
  --color-bg:       #1e1e2e;
  --color-fg:       #cdd6f4;
  --color-primary:  #cba6f7;
  --color-accent:   #89b4fa;
  --radius-md:      0.5rem;
  --radius-lg:      0.75rem;
  --shadow-sm:      0 1px 3px rgb(0 0 0 / 0.4);
}

/* Base reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; }

body {
  font-family: system-ui, sans-serif;
  background: var(--color-bg);
  color: var(--color-fg);
  line-height: 1.6;
}

/* Component: card */
.card {
  background: color-mix(in srgb, var(--color-bg) 80%, white);
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgb(0 0 0 / 0.5);
  }
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-bg);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string_view>

template<typename T>
class RingBuffer {
public:
  explicit RingBuffer(std::size_t capacity)
    : buf_(capacity), capacity_(capacity) {}

  void push(T value) {
    buf_[head_ % capacity_] = std::move(value);
    ++head_;
    if (size_ < capacity_) ++size_;
  }

  [[nodiscard]] const T& latest() const {
    return buf_[(head_ - 1) % capacity_];
  }

  [[nodiscard]] std::size_t size()     const noexcept { return size_; }
  [[nodiscard]] bool        empty()    const noexcept { return size_ == 0; }

private:
  std::vector<T>  buf_;
  std::size_t     capacity_;
  std::size_t     head_ = 0;
  std::size_t     size_ = 0;
};

int main() {
  RingBuffer<std::string> log(5);
  for (auto msg : { "boot", "init", "ready", "request", "response", "done" })
    log.push(msg);

  std::cout << "latest: " << log.latest() << "\\n"
            << "size:   " << log.size()   << "\\n";
}`,

  java: `import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public sealed interface Result<T> {
  record Ok<T>(T value)         implements Result<T> {}
  record Err<T>(String message) implements Result<T> {}

  static <T> Result<T> of(java.util.function.Supplier<T> fn) {
    try { return new Ok<>(fn.get()); }
    catch (Exception e) { return new Err<>(e.getMessage()); }
  }
}

public class Main {
  private static final Executor POOL =
    Executors.newVirtualThreadPerTaskExecutor();

  static CompletableFuture<Result<String>> fetchUser(long id) {
    return CompletableFuture.supplyAsync(() ->
      Result.of(() -> "User #" + id), POOL
    );
  }

  public static void main(String[] args) {
    var futures = List.of(1L, 2L, 3L)
      .stream()
      .map(Main::fetchUser)
      .toList();

    futures.forEach(f -> f.thenAccept(result -> switch (result) {
      case Result.Ok<String>  ok  -> System.out.println("✓ " + ok.value());
      case Result.Err<String> err -> System.err.println("✗ " + err.message());
    }));

    CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
  }
}`,

  yaml: `# docker-compose.yml
name: app-stack

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app
      REDIS_URL:    redis://cache:6379/0
      LOG_LEVEL:    info
    ports:
      - "8080:8080"
    depends_on:
      db:    { condition: service_healthy }
      cache: { condition: service_started }
    restart: unless-stopped
    healthcheck:
      test:     ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 15s
      timeout:  5s
      retries:  3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER:     user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB:       app
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test:     ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout:  5s
      retries:  5

  cache:
    image: redis:7-alpine
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru

volumes:
  pg_data:`,
}

function buildShikiTheme(t: UnifiedTheme): ThemeRegistrationRaw {
  return {
    name: 'custom-preview',
    type: t.type,
    // Required by ThemeRegistrationRaw — global editor defaults
    settings: [
      {
        settings: {
          background: t.editor.background,
          foreground: t.editor.foreground,
        },
      },
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
    tokenColors: [
      { scope: ['comment'], settings: { foreground: t.syntax.comment, fontStyle: 'italic' } },
      { scope: ['keyword', 'keyword.control', 'storage.type', 'storage.modifier'], settings: { foreground: t.syntax.keyword } },
      { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: t.syntax.string } },
      { scope: ['constant.numeric'], settings: { foreground: t.syntax.number } },
      { scope: ['entity.name.function', 'support.function'], settings: { foreground: t.syntax.function } },
      { scope: ['variable', 'variable.other'], settings: { foreground: t.syntax.variable } },
      { scope: ['entity.name.type', 'support.type'], settings: { foreground: t.syntax.type } },
      { scope: ['keyword.operator'], settings: { foreground: t.syntax.operator } },
      { scope: ['punctuation'], settings: { foreground: t.syntax.punctuation } },
      { scope: ['entity.name.tag'], settings: { foreground: t.syntax.tag } },
      { scope: ['entity.other.attribute-name'], settings: { foreground: t.syntax.attribute } },
      { scope: ['constant.language', 'support.constant'], settings: { foreground: t.syntax.constant } },
      { scope: ['support.class', 'support.type.builtin'], settings: { foreground: t.syntax.builtin } },
      { scope: ['variable.parameter'], settings: { foreground: t.syntax.parameter } },
    ],
  }
}

// ── Component ────────────────────────────────────────────────────
export default function CodePreview({ theme }: { theme: UnifiedTheme }) {
  const [langId, setLangId] = useState<LangId>('go')
  const [html, setHtml] = useState<string>('')
  const [ddOpen, setDdOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const ddRef = useRef<HTMLDivElement>(null)

  const lang = LANGUAGES.find((l) => l.id === langId)!

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Re-highlight whenever theme or language changes
  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const result = await highlight(SAMPLES[langId], langId, buildShikiTheme(theme))
      setHtml(result)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [theme, langId])

  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col h-full"
      style={{ borderColor: theme.editor.border }}
    >
      {/* ── Title bar with language dropdown ── */}
      <div
        className="flex items-center gap-3 px-4 py-2 flex-shrink-0"
        style={{ backgroundColor: theme.editor.lineHighlight }}
      >
        {/* Window dots */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>

        {/* Filename */}
        <span className="text-xs flex-1" style={{ color: theme.editor.lineNumber }}>
          {lang.filename}
        </span>

        {/* Language dropdown */}
        <div className="relative" ref={ddRef}>
          <button
            onClick={() => setDdOpen((o) => !o)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border border-white/10
                       bg-white/5 hover:bg-white/10 transition-colors"
            style={{ color: theme.editor.foreground }}
          >
            <span>{lang.icon}</span>
            <span>{lang.label}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${ddOpen ? 'rotate-180' : ''}`} />
          </button>

          {ddOpen && (
            <div
              className="absolute right-0 top-8 z-50 w-44 rounded-xl border border-white/10
                         shadow-2xl overflow-hidden"
              style={{ backgroundColor: theme.editor.background }}
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => { setLangId(l.id); setDdOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left
                             transition-colors hover:bg-white/10"
                  style={{
                    color: l.id === langId ? theme.syntax.function : theme.editor.foreground,
                    backgroundColor: l.id === langId ? `${theme.editor.selection}` : undefined,
                  }}
                >
                  <span>{l.icon}</span>
                  <span className="flex-1">{l.label}</span>
                  <span style={{ color: theme.editor.lineNumber }}>{l.filename.split('.').pop()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Code area ── */}
      <div
        className="flex-1 overflow-auto
                   [scrollbar-width:thin] [scrollbar-color:#313244_transparent]"
        style={{ backgroundColor: theme.editor.background }}
      >
        {html ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="[&>pre]:p-5 [&>pre]:!bg-transparent [&>pre]:m-0
                       [&>pre]:text-[0.8rem] [&>pre]:leading-relaxed"
          />
        ) : (
          <div className="p-5 text-sm animate-pulse" style={{ color: theme.editor.lineNumber }}>
            Rendering…
          </div>
        )}
      </div>
    </div>
  )
}
