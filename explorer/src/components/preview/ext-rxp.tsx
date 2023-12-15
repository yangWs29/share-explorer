export const ImgRxp = /\.(jpg|jpeg|gif|png|webp|ico)$/i

const RawRxp = /\.(cr2|arw)/i

const GifRxp = /\.(gif)$/i

const ZipRxp = /\.(zip|rar|7z|tar\.xz|tar)(\.+\d+)?$/i

const VideoRxp = /\.(mp4|mkv|mov|wmv|avi|avchd|flv|f4v|swf)(\.+\d+)?$/i

export const isRaw = (path: string) => RawRxp.test(path)
export const isImage = (path: string) => ImgRxp.test(path)
export const isGif = (path: string) => GifRxp.test(path)
export const isZip = (path: string) => ZipRxp.test(path)
export const isVideo = (path: string) => VideoRxp.test(path)
