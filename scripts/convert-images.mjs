import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const dirs = [
  'public',
  'public/gallery',
]

const exts = new Set(['.jpg', '.jpeg', '.png'])

for (const dir of dirs) {
  const files = readdirSync(dir)
  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!exts.has(ext)) continue
    const input = join(dir, file)
    if (!statSync(input).isFile()) continue
    const out = join(dir, basename(file, ext) + '.webp')
    const isHero = file.startsWith('hero')
    await sharp(input)
      .resize(isHero ? 1920 : undefined, undefined, { withoutEnlargement: true })
      .webp({ quality: isHero ? 72 : 80 })
      .toFile(out)
    const inKB = Math.round(statSync(input).size / 1024)
    const outKB = Math.round(statSync(out).size / 1024)
    console.log(`${file}: ${inKB}KB → ${outKB}KB`)
  }
}
