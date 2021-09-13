import Swiper from 'swiper'
import 'swiper/css'

class Init {
  constructor() {
    this.init()

    this.directionScroll = [0]
  }

  init() {
    this.events()

    this.actions().toggleHeaderOnScroll()

    if (document.querySelectorAll('.tariffs__wrap').length) {
      const sliders = document.querySelectorAll('.tariffs__wrap')
      sliders.forEach((item) => {
        this.actions().iniTariffsSlider(item)
      })
    }
  }

  events() {
    const _this = this

    document.addEventListener('scroll', (e) => {
      _this.actions().toggleHeaderOnScroll()
    })
  }

  actions() {
    // const _this = this

    return {
      toggleHeaderOnScroll() {
        const bannerHeight = document.querySelector('.banner').clientHeight
        if (window.pageYOffset + 82 > bannerHeight) {
          document.querySelector('.header').classList.remove('header--banner')
        } else {
          document.querySelector('.header').classList.add('header--banner')
        }
      },

      iniTariffsSlider(el) {
        const slider = el.querySelector('.tariffs__slider')
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        ;(() =>
          new Swiper(slider, {
            slidesPerView: 4,
            spaceBetween: 40,
            resistanceRatio: 0,
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            }
          }))()
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
