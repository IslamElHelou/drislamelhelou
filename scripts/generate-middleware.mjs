import fs from 'node:fs'
import path from 'node:path'

/**
 * Next.js only runs Edge middleware when the entry file is named "middleware".
 * The project keeps the logic in "proxy.ts" (single source of truth).
 *
 * This script generates a tiny middleware.ts wrapper at install time.
 */

const root = process.cwd()
const middlewarePath = path.join(root, 'middleware.ts')

const content = `import { NextRequest } from 'next/server'\nimport { proxy } from './proxy'\n\nexport function middleware(req: NextRequest) {\n  return proxy(req)\n}\n\nexport const config = {\n  matcher: ['/((?!_next|api|.*\\\\..*).*)']\n}\n`

try {
  // If the user explicitly removed middleware, we recreate it.
  // If it exists but differs, overwrite to ensure correctness.
  fs.writeFileSync(middlewarePath, content, 'utf8')
  // eslint-disable-next-line no-console
  console.log('[postinstall] Generated middleware.ts wrapper for proxy.ts')
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('[postinstall] Could not generate middleware.ts:', err)
}
