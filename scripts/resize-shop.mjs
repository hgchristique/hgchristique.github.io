import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync } from 'fs'
import { join } from 'path'

const srcDir = 'public'
const outDir = 'public/resized-tmp'
mkdirSync(outDir, { recursive: true })

const skip = new Set(['hero1.webp','hero1.1.webp','hero2.webp','hero3.webp','hero4.webp','hero5.webp'])
const files = readdirSync(srcDir).filter(f => f.endsWith('.webp') && !skip.has(f))

for (const file of files) {
  const src = join(srcDir, file)
  const dst = join(outDir, file)
  const before = statSync(src).size
  const { width, height } = await sharp(src).metadata()
  await sharp(src)
    .resize(600, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dst)
  const after = statSync(dst).size
  console.log(`${file}: ${width}x${height} ${Math.round(before/1024)}KB -> 600w ${Math.round(after/1024)}KB`)
}
console.log('Done.')
