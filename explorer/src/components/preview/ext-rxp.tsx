export const ImgExp = /\.(jpg|jpeg|gif|png|webp|ico)$/i

const RawExp = /\.(cr2|arw)/i

const GifExp = /\.(gif)$/i

const ZipExp = /\.(zip|rar|7z|tar\.xz|tar)(\.+\d+)?$/i

const VideoExp = /\.(mp4|mkv|mov|wmv|avi|avchd|flv|f4v|swf)(\.+\d+)?$/i

const TextExp = /\.(txt|text|xml|html|htm|css|less|sass|json|js|ts|mjs|jsx|py|php|md)$/i

export const isRaw = (path: string) => RawExp.test(path)
export const isImage = (path: string) => ImgExp.test(path)
export const isGif = (path: string) => GifExp.test(path)
export const isZip = (path: string) => ZipExp.test(path)
export const isVideo = (path: string) => VideoExp.test(path)
export const isText = (path: string) => TextExp.test(path)
