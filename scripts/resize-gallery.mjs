import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync } from 'fs'
import { join, extname, basename } from 'path'

const galleryDir = 'public/gallery'
const outDir = 'public/gallery-resized'
mkdirSync(outDir, { recursive: true })

const files = readdirSync(galleryDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg')).sort()

for (const file of files) {
  const src = join(galleryDir, file)
  const outName = basename(file, extname(file)) + '.webp'
  const dst = join(outDir, outName)
  const before = statSync(src).size
  const { width, height } = await sharp(src).metadata()
  await sharp(src)
    .resize(400, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dst)
  const after = statSync(dst).size
  console.log(`${file}: ${width}x${height} ${Math.round(before/1024)}KB -> 400w ${Math.round(after/1024)}KB`)
}
console.log('Done.')
