export interface ProjectMeta {
  github?: string
  live?: string
  demoDesktop?: string
  demoMobile?: string
}

export const projectsMeta: Record<'p1' | 'p2' | 'p3' | 'p4', ProjectMeta> = {
  p1: {
    github: 'https://github.com/nabilsaiyan/cartello',
    live: 'https://cartello-shop.vercel.app/',
    demoDesktop: 'https://res.cloudinary.com/dvzs21utn/video/upload/q_auto/portfolio/cartello-demo.mov',
    demoMobile:  'https://res.cloudinary.com/dvzs21utn/video/upload/q_auto/portfolio/cartello-demo-phone.mov',
  },
  p2: {
    github: 'https://github.com/nabilsaiyan/nexametrics',
    live: 'https://nexametrics-dash.vercel.app/',
    demoDesktop: 'https://res.cloudinary.com/dvzs21utn/video/upload/q_auto/nexametrics-demo.mp4',
    demoMobile:  'https://res.cloudinary.com/dvzs21utn/video/upload/q_auto/nexametrics-demo-phone.mp4',
  },
  p3: {
    github: 'https://github.com/nabilsaiyan/series-finder',
    demoDesktop: 'https://res.cloudinary.com/dvzs21utn/video/upload/q_auto/portfolio/series-finder-demo.mov',
    demoMobile:  'https://res.cloudinary.com/dvzs21utn/video/upload/q_auto/portfolio/series-finder-demo-phone.mov',
  },
  p4: {},
}
