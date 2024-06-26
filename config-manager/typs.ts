export type EXPLORER_TYPE = {
  open_file_exp: {
    img: string
    raw: string
    gif: string
    zip: string
    video: string
    text: string
  }
}

export type Q_BITTORRENT_TYPE = {
  base: {
    host: string
    username: string
    password: string
  }
}

export type APP_CONFIG_TYPE = {
  explorer: EXPLORER_TYPE
  q_bittorrent: Q_BITTORRENT_TYPE
}
