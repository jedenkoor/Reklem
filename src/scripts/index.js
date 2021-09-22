import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import IMask from 'imask'

class Init {
  constructor() {
    this.init()

    this.directionScroll = [0]
  }

  init() {
    this.events()

    setTimeout(() => {
      this.actions().showBody()
    }, 300)

    this.actions().initVhVar()

    this.actions().initPhoneMask()

    this.actions().toggleHeaderOnScroll()

    this.actions().checkMobile()

    this.actions().mobileGoodBtn()

    this.actions().changeMetaViewport()

    if (document.querySelectorAll('.goods__wrap').length) {
      const sliders = document.querySelectorAll('.goods__wrap')
      sliders.forEach((item) => {
        this.actions().initGoodsSlider(item)
      })
    }

    if (document.querySelectorAll('.reviews__slider').length) {
      const sliders = document.querySelectorAll('.reviews__slider')
      sliders.forEach((item) => {
        this.actions().initReviewsSlider(item)
      })
    }

    if (document.querySelectorAll('.accordion-content').length) {
      const accordionContent = document.querySelectorAll('.accordion-content')
      accordionContent.forEach((item) => {
        this.actions().initAccordion(item)
      })
    }
  }

  events() {
    const _this = this

    const emailInput = document.querySelectorAll('input[data-type="email"]')
    emailInput.forEach((item) => {
      item.addEventListener('input', function () {
        _this.actions().checkEmail(this)
      })
    })

    const noTelAndEmailInput = document.querySelectorAll('input:not([data-type="tel"]):not([data-type="email"]), textarea')
    noTelAndEmailInput.forEach((item) => {
      item.addEventListener('input', function () {
        _this.actions().checkOtherInputs(this)
      })
    })

    window.ap(document).on('click', 'button[data-validate]', function (e) {
      e.preventDefault()
      const form = this.closest('form')
      if (_this.actions().validation(form)) {
        form.submit()
        _this.actions().validationSuccess(form)
      }
    })

    document.addEventListener('scroll', () => {
      _this.actions().toggleHeaderOnScroll()
    })

    window.addEventListener('resize', () => {
      _this.actions().changeMetaViewport()
      _this.actions().initVhVar()
    })

    const scrollBLocks = document.querySelectorAll('.header-mobmenu__list')
    scrollBLocks.forEach((item) => {
      item.addEventListener('scroll', () => {
        _this.actions().toggleMenuGradient(item)
      })
    })

    window.ap(document).on('mouseover', '.goods-slide-gallery__item', function () {
      _this.actions().changeGalleryBg(this)
    })

    window.ap(document).on('mouseout', '.goods-slide-gallery__item', function () {
      _this.actions().resetGalleryBg(this)
    })

    window.ap(document).on('click', '.header-list__link--menu', (e) => {
      e.preventDefault()
      _this.actions().openMenu()
    })
    window.ap(document).on('click', '.header-mobmenu__mobclose, .header-mobmenu__close', (e) => {
      e.preventDefault()
      _this.actions().closeMenu()
    })
    document.addEventListener('click', (e) => {
      const btn = document.querySelector('.header-list__link')
      const tabletBtn = document.querySelector('.header__btn--menu')
      const mobileBtn = document.querySelector('.header-mobnav__link--menu')
      const container = document.querySelector('.header__popup')
      if (
        e.target !== container &&
        e.target.closest('.header__popup') === null &&
        e.target !== btn &&
        e.target.closest('.header-list__link') === null &&
        e.target !== tabletBtn &&
        e.target.closest('.header__btn--menu') === null &&
        e.target !== mobileBtn &&
        e.target.closest('.header-mobnav__link--menu') === null
      ) {
        _this.actions().closeMenu()
      }
    })

    window.ap(document).on('click', '.header-list__link--search', (e) => {
      e.preventDefault()
      _this.actions().openSearch()
    })
    window.ap(document).on('click', '.header-mobmenu__mobclose, .header-search__close', (e) => {
      e.preventDefault()
      _this.actions().closeSearch()
    })
    document.addEventListener('click', (e) => {
      const btn = document.querySelector('.header-list__link')
      const tabletBtn = document.querySelector('.header__btn--menu')
      const mobileBtn = document.querySelector('.header-mobnav__link--menu')
      const container = document.querySelector('.header__popup')
      if (
        e.target !== container &&
        e.target.closest('.header__popup') === null &&
        e.target !== btn &&
        e.target.closest('.header-list__link') === null &&
        e.target !== tabletBtn &&
        e.target.closest('.header__btn--menu') === null &&
        e.target !== mobileBtn &&
        e.target.closest('.header-mobnav__link--menu') === null
      ) {
        _this.actions().closeSearch()
      }
    })

    window.ap(document).on('click', '.header__btn--menu', function (e) {
      e.preventDefault()
      if (this.classList.contains('header__btn--active')) {
        _this.actions().closeMenu()
        _this.actions().closeSearch()
      } else {
        _this.actions().openMenu()
        _this.actions().openSearch()
      }
    })

    window.ap(document).on('click', '.header-mobnav__link--menu', function (e) {
      e.preventDefault()
      if (this.classList.contains('header-mobnav__link--active')) {
        _this.actions().closeMenu()
        _this.actions().closeSearch()
      } else {
        _this.actions().openMenu()
        _this.actions().openSearch()
      }
    })

    window.ap(document).on('click', '.header-mobmenu__btn', function (e) {
      e.preventDefault()
      _this.actions().openSubmenu(this)
    })

    window.ap(document).on('click', '.header-mobmenu__back', function (e) {
      e.preventDefault()
      _this.actions().closeSubmenu(this)
    })

    window.ap(document).on('click', '.header-mobmenu__mobback', function (e) {
      e.preventDefault()
      document.querySelector('.header-search__input').value = ''
      _this.actions().checkSearch()
      const back = document.querySelector('.header-mobmenu__back')
      if (back.classList.contains('header-mobmenu__back--active')) {
        _this.actions().closeSubmenu(this)
        document.querySelector('.header-mobmenu__mobback').classList.remove('header-mobmenu__mobback--active')
      }
    })

    window.ap(document).on('click', '.accordion-btn', function (e) {
      e.preventDefault()
      _this.actions().toggleAccordion(this)
    })

    document.querySelector('.header-search__input').addEventListener('input', function () {
      _this.actions().checkSearch()
    })

    window.ap(document).on('click', '.header-mobnav__link--help', function (e) {
      e.preventDefault()
      _this.actions().toggleHelp(this)
    })
    window.ap(document).on('click', '.header-help__close', function (e) {
      e.preventDefault()
      _this.actions().toggleHelp(this)
    })
    document.addEventListener('click', (e) => {
      const btn = document.querySelector('.header-mobnav__link--help')
      const container = document.querySelector('.header-help__content')
      if (
        e.target !== container &&
        e.target.closest('.header-help__content') === null &&
        e.target !== btn &&
        e.target.closest('.header-mobnav__link--help') === null
      ) {
        _this.actions().toggleHelp(e.target)
      }
    })
  }

  actions() {
    const _this = this

    return {
      initVhVar() {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      },
      showBody() {
        document.querySelector('body').style.opacity = 1
      },
      initPhoneMask() {
        document.querySelectorAll('[data-type="tel"]').forEach((item) => {
          const telMask = IMask(item, {
            mask: '+{7} 000 000 00 00'
          })
          let flagInput = true
          item.addEventListener('input', (e) => {
            if ((e.target.value === '+7 8' || e.target.value === '+7') && flagInput === true) {
              e.target.value = '+7'
              telMask.masked.reset()
              telMask.value = '+7'
              flagInput = false
            } else if (e.target.value === '') {
              flagInput = true
            }
          })
          telMask.on('accept', function () {
            item.classList.remove('input-ok')
          })
          telMask.on('complete', function () {
            item.classList.add('input-ok')
          })
        })
      },
      checkEmail(el) {
        const pattern = /^[a-z0-9_.-]+@[a-z0-9_.-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i
        if (el.value !== '') {
          if (el.value.search(pattern) === 0) {
            el.classList.remove('input-err')
            el.classList.add('input-ok')
          } else {
            el.classList.add('input-err')
            el.classList.remove('input-ok')
          }
        } else {
          el.classList.remove('input-err')
          el.classList.remove('input-ok')
        }
      },
      checkOtherInputs(el) {
        if (el.value !== '') {
          el.classList.add('input-ok')
        } else {
          el.classList.remove('input-ok')
        }
      },
      validation(form) {
        const inputs = form.querySelectorAll('[data-required]')
        let temp = true
        for (let i = 0; i < inputs.length; i++) {
          if (!inputs[i].classList.contains('input-ok')) {
            inputs[i].classList.add('input-err')
            temp = false
          } else {
            inputs[i].classList.remove('input-err')
          }
        }
        if (temp === false) {
          console.warn('Форма заполнена не корректно')
          return false
        } else {
          console.log('Форма отправлена')
          return true
        }
      },
      validationSuccess(form) {
        const inputsAndButton = form.querySelectorAll('input, textarea, button')
        inputsAndButton.forEach((item) => {
          item.classList.remove('input-err')
          item.classList.remove('input-ok')
          item.setAttribute('disabled', 'disabled')
        })
        setTimeout(() => {
          inputsAndButton.forEach((item) => {
            item.value = ''
            item.removeAttribute('disabled')
          })
        }, 2000)
      },
      checkMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          document.querySelector('.constructor__link').innerHTML = `
            Доступно через компьютер
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3033 3.6105C14.4314 3.80458 14.4101 4.06832 14.2392 4.23917L8.11095 10.3674C8.04814 10.4302 7.96971 10.4752 7.88376 10.4976L5.33148 11.1643C5.24823 11.1861 5.16243 11.1856 5.08181 11.1651C4.9961 11.1433 4.91625 11.0988 4.85157 11.0341C4.72605 10.9086 4.67649 10.7259 4.72135 10.5542L5.38802 8.00189C5.40767 7.92669 5.44453 7.85241 5.49552 7.79414L11.6465 1.64645C11.7003 1.5926 11.7652 1.55231 11.8358 1.52775C11.8881 1.50955 11.9436 1.5 12 1.5C12.1326 1.5 12.2598 1.55268 12.3536 1.64645L14.2392 3.53206C14.2636 3.55647 14.285 3.58278 14.3033 3.6105ZM13.1786 3.88562L12 2.70711L6.32127 8.38588L5.90461 9.98106L7.49978 9.56439L13.1786 3.88562Z" fill="#B3B3B3"/>
              <path d="M13.0943 11.4402C13.2765 9.8818 13.3345 8.31252 13.2683 6.74719C13.2651 6.67225 13.2933 6.59932 13.3463 6.54628L14.0019 5.89073C14.0825 5.81013 14.2202 5.86129 14.2277 5.97503C14.351 7.8348 14.3043 9.70302 14.0875 11.5564C13.9298 12.9047 12.8469 13.9614 11.5055 14.1113C9.19449 14.3696 6.8056 14.3696 4.49455 14.1113C3.15318 13.9614 2.07029 12.9047 1.91259 11.5564C1.63623 9.19351 1.63623 6.80649 1.91259 4.44362C2.07029 3.09527 3.15318 2.03859 4.49455 1.88867C6.24772 1.69273 8.04568 1.64543 9.82047 1.74677C9.93486 1.75331 9.987 1.89172 9.90599 1.97273L9.24429 2.63443C9.19182 2.6869 9.11988 2.71507 9.04573 2.71257C7.56145 2.66251 6.06708 2.71915 4.60563 2.88249C3.71889 2.98159 3.00856 3.68134 2.90582 4.55979C2.63849 6.84547 2.63849 9.15452 2.90582 11.4402C3.00856 12.3187 3.71889 13.0184 4.60563 13.1175C6.84286 13.3675 9.15724 13.3675 11.3945 13.1175C12.2812 13.0184 12.9915 12.3187 13.0943 11.4402Z" fill="#B3B3B3"/>
            </svg>
          `
          document.querySelector('.constructor__link').classList.add('disabled')
        }
      },
      mobileGoodBtn() {
        if (document.documentElement.clientWidth < 768) {
          const goodBtns = document.querySelectorAll('.goods-slide__btn')
          goodBtns.forEach((item) => {
            item.innerHTML = `
              Вид
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 11.3334V4.66675" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M4.66671 8L11.3334 8" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            `
          })
        }
      },
      changeMetaViewport() {
        if (document.documentElement.clientWidth < 760) {
          document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=320')
        } else {
          document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0')
        }
      },
      toggleHeaderOnScroll() {
        const bannerHeight = document.querySelector('.banner').clientHeight
        if (window.pageYOffset + 82 > bannerHeight) {
          document.querySelector('.header').classList.remove('header--banner')
        } else {
          document.querySelector('.header').classList.add('header--banner')
        }
      },
      initGoodsSlider(el) {
        const slider = el.querySelector('.goods__slider')
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        ;(() =>
          new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            resistanceRatio: 0,
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            },
            breakpoints: {
              768: {
                spaceBetween: 28
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 64
              }
            }
          }))()
      },
      initReviewsSlider(el) {
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        ;(() =>
          new Swiper(el, {
            resistanceRatio: 0,
            effect: 'fade',
            loop: true,
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            }
          }))()
      },
      changeGalleryBg(el) {
        const gallery = el.closest('.goods-slide__gallery')
        const bg = el.dataset.image
        gallery.style.backgroundImage = `url('${bg}')`
      },
      resetGalleryBg(el) {
        const gallery = el.closest('.goods-slide__gallery')
        const firstBg = gallery.querySelector('.goods-slide-gallery__item:first-child').dataset.image
        gallery.style.backgroundImage = `url('${firstBg}')`
      },
      getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth
      },
      openHeader() {
        const header = document.querySelector('.header')
        const html = document.querySelector('html')
        if (this.getScrollbarWidth()) {
          html.classList.add('compensate-for-scrollbar')
        }
        html.classList.add('fixed')
        if (header.classList.contains('header--banner')) {
          header.dataset.willbanner = 1
          header.classList.remove('header--banner')
        }
        document.querySelector('.header__btn--menu').classList.add('header__btn--active')
        document.querySelector('.header-mobnav__link--menu').classList.add('header-mobnav__link--active')
      },
      closeHeader() {
        const header = document.querySelector('.header')
        const html = document.querySelector('html')
        html.classList.remove('compensate-for-scrollbar')
        html.classList.remove('fixed')
        if (header.dataset.willbanner) {
          header.removeAttribute('data-willbanner')
          header.classList.add('header--banner')
        }
        document.querySelector('.header__btn--menu').classList.remove('header__btn--active')
        document.querySelector('.header-mobnav__link--menu').classList.remove('header-mobnav__link--active')
        if (document.documentElement.clientWidth < 1200) {
          document.querySelector('.header__mobmenu .header-mobmenu__wrap').style.display = 'flex'
        }
      },
      openMenu() {
        this.openHeader()
        const header = document.querySelector('.header')
        header.classList.add('header--menu')
      },
      closeMenu() {
        this.closeHeader()
        const header = document.querySelector('.header')
        header.classList.remove('header--menu')
        setTimeout(() => {
          const back = document.querySelector('.header-mobmenu__back')
          if (back.classList.contains('header-mobmenu__back--active')) {
            _this.actions().closeSubmenu()
          }
          document.querySelector('.header-mobmenu__mobback').classList.remove('header-mobmenu__mobback--active')
        }, 300)
      },
      openSearch() {
        this.openHeader()
        const header = document.querySelector('.header')
        header.classList.add('header--search')
      },
      closeSearch() {
        this.closeHeader()
        const header = document.querySelector('.header')
        header.classList.remove('header--search')
        setTimeout(() => {
          document.querySelector('.header__search').classList.remove('header__search--active')
          document.querySelector('.header-search__input').value = ''
        }, 300)
      },
      openSubmenu(el) {
        const text = el.previousSibling.innerText
        const subMenu = el.closest('.header-mobmenu__item').querySelector('.header-mobmenu__content')
        const menu = el.closest('.header-mobmenu__list')
        const back = document.querySelector('.header-mobmenu__back')
        const current = document.querySelector('.header-mobmenu__title')
        subMenu.classList.add('header-mobmenu__content--active')
        setTimeout(() => {
          menu.classList.add('header-mobmenu__list--fixed')
        }, 300)
        back.classList.add('header-mobmenu__back--active')
        current.innerText = text
        if (document.documentElement.clientWidth < 1200) {
          document.querySelector('.header-mobmenu__mobback').classList.add('header-mobmenu__mobback--active')
        }
      },
      closeSubmenu() {
        const subMenu = document.querySelector('.header-mobmenu__content--active')
        const menu = document.querySelector('.header-mobmenu__list--fixed')
        const back = document.querySelector('.header-mobmenu__back')
        const current = document.querySelector('.header-mobmenu__title')
        subMenu.classList.remove('header-mobmenu__content--active')
        menu.classList.remove('header-mobmenu__list--fixed')
        back.classList.remove('header-mobmenu__back--active')
        current.innerText = 'Меню'
      },
      initAccordion(el) {
        setTimeout(() => {
          el.setAttribute('data-height', el.offsetHeight)
          el.style.opacity = 1
          el.style.position = 'static'
          if (el.closest('.accordion').classList.contains('accordion--active')) {
            el.style.height = `${el.offsetHeight}px`
          } else {
            el.style.height = '0px'
          }
        }, 500)
      },
      toggleAccordion(el) {
        const accordion = el.closest('.accordion')
        const content = el.closest('.accordion').querySelector('.accordion-content')
        if (!accordion.classList.contains('accordion--active')) {
          const accordions = document.querySelectorAll('.accordion')
          accordions.forEach((item) => {
            item.classList.remove('accordion--active')
            item.querySelector('.accordion-content').style.height = '0px'
          })
          accordion.classList.add('accordion--active')
          content.style.height = `${content.dataset.height}px`
        } else {
          accordion.classList.remove('accordion--active')
          content.style.height = '0px'
        }
      },
      toggleMenuGradient(el) {
        const elems = el.querySelectorAll(':scope > *')
        const height = el.offsetHeight
        let heightElems = 0
        elems.forEach((item) => {
          heightElems += item.offsetHeight
        })
        if (el.scrollTop > 0) {
          el.classList.remove('header-mobmenu__list--ontop')
        } else {
          el.classList.add('header-mobmenu__list--ontop')
        }
        if (el.scrollTop + height >= heightElems) {
          el.classList.add('header-mobmenu__list--onbot')
        } else {
          el.classList.remove('header-mobmenu__list--onbot')
        }
      },
      checkSearch() {
        const searchWrap = document.querySelector('.header__search')
        const searchInput = document.querySelector('.header-search__input')
        if (searchInput.value.length >= 3) {
          searchWrap.classList.add('header__search--active')
          if (document.documentElement.clientWidth < 1200) {
            document.querySelector('.header-mobmenu__mobback').classList.add('header-mobmenu__mobback--active')
            document.querySelector('.header__mobmenu .header-mobmenu__wrap').style.display = 'none'
          }
        } else {
          searchWrap.classList.remove('header__search--active')
          if (document.documentElement.clientWidth < 1200) {
            const back = document.querySelector('.header-mobmenu__back')
            if (!back.classList.contains('header-mobmenu__back--active')) {
              document.querySelector('.header-mobmenu__mobback').classList.remove('header-mobmenu__mobback--active')
            }
            document.querySelector('.header__mobmenu .header-mobmenu__wrap').style.display = 'flex'
          }
        }
      },
      toggleHelp(el) {
        const btn = document.querySelector('.header-mobnav__link--help')
        const container = document.querySelector('.header__help')
        if (!btn.classList.contains('header-mobnav__link--active')) {
          if (el.classList.contains('header-mobnav__link--help')) {
            btn.classList.add('header-mobnav__link--active')
            container.classList.add('header__help--active')
            document.querySelector('html').classList.add('fixed')
          }
        } else {
          btn.classList.remove('header-mobnav__link--active')
          container.classList.remove('header__help--active')
          document.querySelector('html').classList.remove('fixed')
        }
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
