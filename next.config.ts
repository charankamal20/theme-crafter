import type { NextConfig } from 'next'

const config: NextConfig = {
  turbopack: {
    root: __dirname,   // pins root to the project dir, not /home/classikh
  },
}

export default config
