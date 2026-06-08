export interface ProjectMeta {
  github?: string
  live?: string
  demoDesktop?: string
  demoMobile?: string
}

export const projectsMeta: Record<'p1' | 'p2' | 'p3', ProjectMeta> = {
  p1: {
    github: 'https://github.com/nabilsaiyan/cartello',
    // live: 'https://cartello.vercel.app',
    // demoDesktop: '/videos/cartello-desktop.mp4',
    // demoMobile: '/videos/cartello-mobile.mp4',
  },
  p2: {
    github: 'https://github.com/nabilsaiyan/series-finder',
    // demoDesktop: '/videos/series-finder-desktop.mp4',
    // demoMobile: '/videos/series-finder-mobile.mp4',
  },
  p3: {
    // demoMobile: '/videos/mobile-app-demo.mp4',
  },
}
