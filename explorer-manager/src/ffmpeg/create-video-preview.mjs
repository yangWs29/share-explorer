// https://fooy.github.io/posts/ffmpeg-fast-mosaic-preview/
import { exec, execSync } from 'child_process'

export const createVideoPreview = (INFILE = '', OUTFILE = '') => {
  const FFMPEG = 'ffmpeg -nostdin -loglevel error -nostats'

  if (!INFILE) {
    console.error('Input file not provided')
    process.exit(1)
  }

  if (!OUTFILE) {
    OUTFILE = `${INFILE}.webp`
  }

  const DURATION = execSync(`ffprobe -loglevel error -show_entries format=duration -of default=nw=1:nk=1 "${INFILE}"`)
    .toString()
    .trim()
  const DURATION_SECONDS = Math.floor(parseFloat(DURATION))

  if (isNaN(DURATION_SECONDS)) {
    console.error('Invalid duration')
    process.exit(1)
  }

  console.log(`Duration is ${DURATION_SECONDS} s`)

  const COL = 4
  let N_SHOT = COL * 7
  let SEG = Math.floor(DURATION_SECONDS / N_SHOT)

  if (SEG < 5) {
    SEG = 5
    N_SHOT = DURATION_SECONDS / 5
  }

  let SHOTS = Array.from({ length: N_SHOT + 1 }, (_, i) => i * SEG)

  if (DURATION_SECONDS >= N_SHOT) {
    SHOTS.shift()

    if (SEG >= 300) {
      SHOTS.unshift(5, 30, 90, 180)
    } else if (SEG >= 150) {
      SHOTS.unshift(5, 30, 60, 100)
    } else if (SEG >= 60) {
      SHOTS.unshift(5, 10, 20, 40)
    }
  }

  console.log(`SEG: ${SEG}, Screenshots: ${SHOTS.join(' ')}`)

  const SCALE = `${1920 * 2}:-1`
  const PADS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97)).concat(
    Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)),
  )
  const N_FRAME = SHOTS.length

  let OPT_SEEK = ''
  let OPT_FILTER = ''
  let i = 0

  for (const t of SHOTS) {
    OPT_SEEK += ` -ss ${t} -i '${INFILE}'`
    OPT_FILTER += `[${i}:v]trim=start_frame=1:end_frame=2[${PADS[i]}];`
    i++
  }

  OPT_FILTER += `${PADS.slice(0, i)
    .map((item) => `[${item}]`)
    .join(' ')}concat=n=${i},tile=${COL}x${Math.ceil(N_FRAME / COL)},scale=${SCALE}`

  return exec(`${FFMPEG} ${OPT_SEEK} -filter_complex '${OPT_FILTER}' -y '${OUTFILE}'`)
}
