if (document.querySelector(".preloader")) {
  window.addEventListener("load", (event) => {
    setTimeout(() => {
      enableScroll()
      document.body.classList.add('loaded');
    }, 100);
  });
}
const overlay = document.querySelector(".overlay")
const selectOverlay = document.querySelector(".select-overlay")
const fixedBtns = document.querySelector(".fixed-btns")
const jsPageUp = document.querySelector(".js-pageUp")
const customSelect = document.querySelectorAll(".select-custom")
const header = document.querySelector(".header")
const mobMenu = document.querySelector(".mob-menu")
const modalOpenBtn = document.querySelectorAll(".mod-open-btn")
const modalCloseBtn = document.querySelectorAll(".mod-close-btn")
const modal = document.querySelectorAll(".modal")
const successModal = document.querySelector("#success-modal")
const errorModal = document.querySelector("#error-modal")
let animSpd = 400
let lblTimeout
//get path to sprite id
function sprite(id) {
  return '<svg><use xlink:href="img/icons/sprite.svg#' + id + '"></use></svg>'
}
//scroll pos
function scrollPos() {
  return window.pageYOffset || document.documentElement.scrollTop
}
//enable scroll
function enableScroll() {
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}
//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.setAttribute("aria-expanded", true);
  if (!select.parentNode.classList.contains("select-form") && window.innerWidth > 767.98) {
    selectOverlay.classList.add("show")
  }
  select.querySelectorAll(".select-custom__options input").forEach(item => {
      item.addEventListener("change", (e) => {
        setActiveOption(select)
      });
  });
  document.addEventListener("click", function clickOutside(e) {
    if ( window.innerWidth > 767.98) {
      if (!select.contains(e.target)) {
        closeSelectCustom(select)
        document.removeEventListener('click', clickOutside);
      }
    } else {
      if (select.querySelector(".select-custom__body").contains(e.target) && !select.querySelector(".select-custom__options").contains(e.target)) {
        closeSelectCustom(select)
        document.removeEventListener('click', clickOutside);
      }
    }
  });
}
// set active select option
function setActiveOption(select) {
  select.querySelector(".select-custom__selected").classList.add("checked")
  if (select.querySelector(".item-radio")) {
    let activeInpTxt = select.querySelector("input:checked").nextElementSibling.innerHTML
    select.querySelector(".select-custom__selected span").innerHTML = activeInpTxt
  }
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  select.setAttribute("aria-expanded", false);
  selectOverlay.classList.remove("show")
}
selectOverlay.addEventListener("click", () => {
  customSelect.forEach(sel => closeSelectCustom(sel))
})
//setSuccessTxt
function setSuccessTxt(title = false, btnTxt = false) {
  successModal.querySelector("h3").textContent = title ? title : "Заявка успешно отправлена"
  successModal.querySelector(".main-btn").textContent = btnTxt ? btnTxt : "Закрыть"
}
//setErrorTxt
function setErrorTxt(title = false, btnTxt = false) {
  errorModal.querySelector("h3").textContent = title ? title : "Что-то пошло не так"
  errorModal.querySelector(".main-btn").textContent = btnTxt ? btnTxt : "Закрыть"
}
// formSuccess
function formSuccess(form, title = false, btnTxt = false) {
  form.querySelectorAll(".item-form").forEach(item => item.classList.remove("error"))
  form.querySelectorAll("input").forEach(inp => {
      if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
          inp.value = ""
      }
      if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
          inp.checked = false
      }
  })
  if (form.querySelector("textarea")) {
      form.querySelector("textarea").value = ""
  }
  if (form.querySelector(".file-form__items")) {
      form.querySelector(".file-form__items").innerHTML = ""
  }
  if (form.classList.contains("password-modal__form")) {
    openModal(document.querySelector("#password-reset-modal"))
  } else if (form.classList.contains("password-reset__form")) {
    openModal(document.querySelector("#password-success-modal"))
  } else if (form.classList.contains("review-modal__form")) {
    openModal(document.querySelector("#review-success-modal"))
  } else if (form.classList.contains("trainer-success-form")) {
    openModal(document.querySelector("#trainer-success-modal"))
  } else {
    if (form.classList.contains("brecipient-form")) {
      setSuccessTxt("Данные получателя успешно изменены","Вернуться к оформлению")
    } else if (form.classList.contains("profile-form")) {
      setSuccessTxt("Данные успешно обновлены","Вернуться в Профиль")
    } else if (form.classList.contains("settings-form")) {
      setSuccessTxt("Пароль успешно изменен","Вернуться в Профиль")
    } else if (form.classList.contains("messages-form")) {
      setSuccessTxt("Спасибо! Ваше сообщение принято к рассмотрению","Вернуться к Сообщениям")
    } else {
      setSuccessTxt()
    }
    openModal(successModal)
  }
}
//searchFormSuccess
function searchFormSuccess(form) {
  form.querySelector("input").value = ""
  form.querySelector(".search-form__reset").classList.remove("show")
}
// custom scroll FF
const customScroll = document.querySelectorAll(".custom-scroll")
let isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
  document.documentElement.style.scrollbarColor = "#41536D #E6ECFF"
}
if (isFirefox && customScroll) {
  customScroll.forEach(item => { item.style.scrollbarColor = "#1573FF #F7F7F7" })
}
//open modal
function openModal(modal) {
  let activeModal = document.querySelector(".modal.open")
  if (!activeModal && !mobMenu.classList.contains("open") ) {
      disableScroll()
  }
  if (activeModal) {
    activeModal.classList.remove("open")
  }
  modal.classList.add("open")
}
//close modal
function closeModal(modal) {
  modal.classList.remove("open")
  setTimeout(() => {
    if (!mobMenu.classList.contains("open")) {
      enableScroll()
    }
  }, animSpd);
}
// modal click outside
modal.forEach(mod => {
  mod.addEventListener("click", e => {
      if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".btn-close").contains(e.target)){
          closeModal(mod)
      }
  })
})
// modal button on click
modalOpenBtn.forEach(btn => {
  btn.addEventListener("click", e => {
      e.preventDefault()
      let href = btn.getAttribute("data-modal")
      openModal(document.getElementById(href))
  })
})
// modal close button on click
modalCloseBtn.forEach(btn => {
  btn.addEventListener("click", e => {
      e.preventDefault()
      let href = btn.getAttribute("data-modal")
      closeModal(document.getElementById(href))
  })
})
// fixed header
function scrollPos() {
  return window.pageYOffset || document.documentElement.scrollTop;
}
let lastScroll = scrollPos();
window.addEventListener("scroll", () => {
  if (scrollPos() > 1) {
      header.classList.add("fixed")
      header.classList.add("fixed-block")
      if ((scrollPos() > document.querySelector(".header__inner").clientHeight && scrollPos() > lastScroll && !header.classList.contains("unshow"))) {
          header.classList.add("unshow")
          document.querySelectorAll(".js-lbl").forEach(item => item.classList.add("header-hidden"))
          if (document.querySelector(".menu--desktop.active")) {
            document.querySelector(".menu--desktop").querySelector('.icon-menu').click()
          }
      } else if (scrollPos() < lastScroll && header.classList.contains("unshow")) {
          header.classList.remove("unshow")
          document.querySelectorAll(".js-lbl").forEach(item => item.classList.remove("header-hidden"))
      }
  } else {
      header.classList.remove("fixed")
      header.classList.remove("fixed-block")
  }
  lastScroll = scrollPos()
}) 

//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
        Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
    })
}
//addToCart
function  addToCart() {
}
//swhitch tab
function tabSwitch(nav,block) {
  nav.forEach((item,idx) => {
    item.addEventListener("click", () => {
      nav.forEach(el => {
        el.classList.remove("active")
      })
      block.forEach(el => {
        el.classList.remove("active")
      })
      item.classList.add("active")
      block[idx].classList.add("active")
      item.style.opacity = "0"
        block[idx].style.opacity = "0"
      setTimeout(() => {
        item.style.opacity = "1"
        block[idx].style.opacity = "1"
      }, 0);
    })
  });
}
//smoothdrop
function smoothDrop(header, body, dur) {
  body.style.overflow = 'hidden';
  body.style.transition = `height ${dur}ms ease`;
  body.style['-webkit-transition'] = `height ${dur}ms ease`;
  if (!header.classList.contains("active")) {
      header.classList.add("open")
      body.style.display = 'block';
      let height = body.clientHeight + 'px';
      body.style.height = '0px';
      setTimeout(function () {
          body.style.height = height;
          setTimeout(() => {
              body.style.height = null
              header.classList.add("active")
          }, dur); 
      }, 0);
  } else {
      header.classList.remove("open")
      let height = body.clientHeight + 'px';
      body.style.height = height
      setTimeout(function () {
          body.style.height = "0"
          setTimeout(() => {
              body.style.display = 'none';
              body.style.height = null
              header.classList.remove("active")
          }, dur);
      }, 0);
  }
}
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
  switchBlock.forEach(item => {
    tabSwitch(item.querySelectorAll("[data-nav]"),item.querySelectorAll("[data-block]"))
  })
}
//fancybox default
const fancybox = Fancybox.bind('[data-fancybox]', {
  Hash: false,
  Toolbar: {
    display: ["close"]
  },
  Thumbs: false
});

//mob-menu
if (mobMenu) {
  document.querySelector(".icon-menu--mob").addEventListener('click', () => {
    disableScroll()
    mobMenu.classList.add("open")
  }) 
  mobMenu.querySelectorAll(".menu__item").forEach(item => {
    item.addEventListener("click", () => {
      if (item.querySelector(".menu__dropdown")) {
        mobMenu.querySelectorAll(".menu__item").forEach( el => {
          if (!item.querySelector(".menu__header").classList.contains("active") && el.querySelector(".menu__header").classList.contains("active")) {
            el.click()
          }
        })
        smoothDrop(item.querySelector(".menu__header"), item.querySelector(".menu__dropdown"), 500)
      }
    })
  })
  //close mob menu
  mobMenu.addEventListener("click", e => {
    if (!mobMenu.querySelector(".mob-menu__inner").contains(e.target) || mobMenu.querySelector(".btn-close").contains(e.target)) {
        mobMenu.classList.remove("open")
        if (!document.querySelector(".modal.open")) {
          enableScroll()
      }
    }
  })
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767.98 && mobMenu.classList.contains("open")) {
      mobMenu.querySelector(".btn-close").click()
    }
  })
}
//fixedBtns
function showFixedBtns() {
  if (window.innerWidth >= 991.98 && window.innerHeight - document.querySelector(".footer").getBoundingClientRect().top + 30 <= 0 && scrollPos() > 150) {
    fixedBtns.classList.add("show")
  } else {
    fixedBtns.classList.remove("show")
  }
}
if (fixedBtns) {
  showFixedBtns()
  window.addEventListener("resize", showFixedBtns)
  window.addEventListener("scroll", showFixedBtns)
  //jsPageUp
  jsPageUp.addEventListener("click", () => {
    window.scrollTo(0,0)
  })
}
//accordion
const accordion = document.querySelectorAll(".accordion")
if (accordion) {
  accordion.forEach(item => {
    item.querySelector(".accordion__header").addEventListener("click", e => {
      smoothDrop(item.querySelector(".accordion__header"), item.querySelector(".accordion__body"), 500) 
    })
})
}
//delivery item on checked
const accRadio = document.querySelectorAll(".acc-radio")
if (accRadio) {
  accRadio.forEach(item => {
    if (item.querySelector(".item-radio input").checked) {
      smoothDrop(item.querySelector(".item-radio"), item.querySelector(".acc-radio__body"), 500) 
    }
    item.querySelector(".item-radio input").addEventListener("change", e => {
      accRadio.forEach(item => {
        item.querySelector(".item-radio").classList.remove("active"); 
        item.querySelector(".acc-radio__body").style.display = 'none';       
      })  
      smoothDrop(item.querySelector(".item-radio"), item.querySelector(".acc-radio__body"), 500)     
    })
  })
}
//menu
const menuDesk = document.querySelector(".menu--desktop")
if(menuDesk) {
  const menuDeskIcon = menuDesk.querySelector(".icon-menu")
  menuDesk.querySelector(".icon-menu").addEventListener("click", () => {
    if (!menuDesk.classList.contains("active")) {
      menuDesk.classList.add("active")
      menuDeskIcon.classList.add("active")
      document.addEventListener("click", e => {
        if (!menuDesk.contains(e.target)) {
          menuDesk.classList.remove("active")
          menuDeskIcon.classList.remove("active")
        }
      })
    } else{
      menuDesk.classList.remove("active")
      menuDeskIcon.classList.remove("active")
    }
  })
}
const iconMenuMob = document.querySelector(".icon-menu--mob")
if (iconMenuMob) {

}
// search form
//search form show/unshow reset btn
const searchForm = document.querySelectorAll(".search-form")
function showResetBtn(item) {
  if (item.querySelector("input").value.length > 0) {
    item.querySelector(".search-form__reset").classList.add("show")
  } else {
      item.querySelector(".search-form__reset").classList.remove("show")
  }
}
if (searchForm) {
  searchForm.forEach(item => {
    showResetBtn(item)
    item.querySelector("input").addEventListener("input",() => showResetBtn(item))
    item.addEventListener("reset", () => {
      item.classList.remove("show-results")
      item.querySelector("input").setAttribute("value", "")
      showResetBtn(item) 
    })
  })
}
//file-form
function addFile(files, item) {
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    if (file.size >  2 * 1024 * 1024) {
      item.querySelector("input").value = "" 
      item.classList.add("error")
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      } 
      item.querySelector(".item-form__error").textContent = "Файл должен быть менее 2 МБ"
      return
    } else if (!fileTypes.includes(file.type)) {
      item.querySelector("input").value = "" 
      item.classList.add("error")
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      } 
      item.querySelector(".item-form__error").textContent = 'Разрешённые форматы: png,jpg,jpeg,pdf'
      return
    } else {
      item.classList.remove("error")
      item.querySelector(".item-form__error").textContent = "" 
      if (!item.parentNode.classList.contains("edu-profile")) {
        let reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = () => {
            item.querySelector(".file-form__items").insertAdjacentHTML("afterbegin", `<div class="file-form__item">
            <div class="file-form__name">${file.name}</div>
            <div class="file-form__del">${sprite("close")}</div>
           </div>
          `)
        }
        reader.onerror = () => {
          console.log(reader.error);
        }
      } else {
        item.parentNode.submit()
      }  
    }
  }
}
let fileTypes = [
  "image/png", "image/jpeg", 
  "application/pdf", 
]
let dragEl
if (document.querySelector(".file-form")) {
  document.querySelectorAll(".file-form").forEach(item => {
    item.querySelector("input").addEventListener("change", e => { 
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      }  
      let files = e.target.files;
      addFile(files, item)
    })
    //delete file
    item.addEventListener("click", e => {
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__del").forEach((del, idx) => {
          if (del.contains(e.target)) {
              const dt = new DataTransfer()
              const input = item.querySelector("input")
              const { files } = input
              for (let i = 0; i < files.length; i++) {
                  let file = files[i]
                  if (i !== idx) {
                    dt.items.add(file)
                  }      
              }
              input.files = dt.files
              setTimeout(() => {
                del.parentNode.remove()
             }, 0);
          }
        }) 
      }
    })
    if (item.parentNode.classList.contains("edu-profile")) {
      dragEl = item.querySelector(".edu-profile__add")
    } else {
      dragEl = item
    }
    dragEl.addEventListener("dragenter", e => {
      e.preventDefault();
    })
    dragEl.addEventListener("dragover", e => {
      e.preventDefault();
    })
    dragEl.addEventListener("dragleave", e => {
      e.preventDefault();
    })
    dragEl.addEventListener("drop", function(e) {
      e.preventDefault();
      const dt = new DataTransfer()
      dt.items.add(e.dataTransfer.files[0])
      let files = Array.from(dt.files)
      item.querySelector("input").files = dt.files
      if (!item.parentNode.classList.contains("edu-profile")) {
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
      } 
      addFile(files, item)
    });
  })
}
//select-custom
if (customSelect) {
  customSelect.forEach(select => {
      select.querySelector(".select-custom__selected").addEventListener("click", () => {
          if (!select.classList.contains("open")) {
              openSelectCustom(select)
          } else {
              closeSelectCustom(select)
          }
      })
  })
}
//js-fav
function favOnClick() {
  const jsFav = document.querySelectorAll(".js-fav") 
  if (jsFav) {
    jsFav.forEach(item => {
      item.addEventListener("click", () => {
        if (item.classList.contains("active")) {
          item.classList.remove("active")
          showLbl(document.querySelector(".js-remove-fav"))
        } else {
          item.classList.add("active")
          showLbl(document.querySelector(".js-add-fav"))
        }
      })
    })
  }
}
favOnClick()
//card
function cardOnAdd() {
  const card = document.querySelectorAll(".card")
  if (card) {
    card.forEach(item => {
      const cardBtn = item.querySelector(".card__add")
      if (cardBtn) {
        cardBtn.addEventListener("click", () => {
          item.querySelector(".card__action").classList.add("in-card")
          addToCart()
        })
      }
    })
  }
}
cardOnAdd()
//quantity
function disabledMinBtn(item, count) {
  if (count <= 1) {
    item.querySelector(".js-minus").classList.add("disabled")
  } else {
    item.querySelector(".js-minus").classList.remove("disabled")
  }
}
function setQuantity() {
  const quantity = document.querySelectorAll(".quantity")
  if (quantity) {
    quantity.forEach(item => {
        const inp = item.querySelector(".quantity__count input")
        disabledMinBtn(item, inp.value)
        inp.addEventListener("change", e => {
          if (Number.isInteger(e.target.value) || e.target.value >=1 ) {
            if(e.target.value.split("")[0] == 0) {
              inp.value = Math.round(e.target.value.substring(1))
            } else {
              inp.value = Math.round(e.target.value)
            }          
          } else {
            inp.value = 1
          }
          clearTimeout(lblTimeout)
          showLbl(document.querySelector(".js-add-cart"))
          disabledMinBtn(item, inp.value)
          addToCart()
        })
        item.querySelector(".js-minus").addEventListener("click", () => {
          if (inp.value > 1) {
            inp.value--
            clearTimeout(lblTimeout)
            showLbl(document.querySelector(".js-add-cart"))
          } else {
            item.parentNode.classList.remove("in-card")
            clearTimeout(lblTimeout)
            showLbl(document.querySelector(".js-remove-cart"))
          }
          disabledMinBtn(item, inp.value)
          addToCart()
        })
        item.querySelector(".js-plus").addEventListener("click", () => {
          inp.value++
          clearTimeout(lblTimeout)
          showLbl(document.querySelector(".js-add-cart"))
          disabledMinBtn(item, inp.value)
          addToCart()
        })
    })
  }
}
setQuantity()
// showmore
function showMore() {
  cardOnAdd()
  favOnClick()
  setQuantity()
}
// intro swiper
const intro = document.querySelector('.intro')
if (intro) {
  let introSwiper = new Swiper(intro.querySelector(".swiper"), {
    slidesPerView: 1,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    pagination: {
      el: intro.querySelector('.swiper-pagination'),
      type: 'bullets',
      clickable: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    breakpoints: {
    },
    speed: 800
  }) 
}
// services swiper
const services = document.querySelector('.services')
function showBtnGrad(servicesSwiper) {
  if (servicesSwiper.isEnd) {
    services.querySelector(".swiper").classList.add("scrollend")
  } else {
    services.querySelector(".swiper").classList.remove("scrollend")
  } 
  if (servicesSwiper.isBeginning) {
    services.querySelector(".swiper").classList.add("scrollstart")
  } else {
    services.querySelector(".swiper").classList.remove("scrollstart")
  } 
}
if (services) {
  let servicesSwiper = new Swiper(services.querySelector(".swiper"), {
    slidesPerView: 3,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    navigation: {
      prevEl: services.querySelector(".nav-btn--prev"),
      nextEl: services.querySelector(".nav-btn--next"),
    },
    breakpoints: {
      1250.98: {
        slidesPerView: 6,
      },
      767.98: {
        slidesPerView: 4.8
      },
      575.98: {
        slidesPerView: 3.8
      },
      374.98: {
        slidesPerView: 3.39
      }
    },
    speed: 800
  }) 
  showBtnGrad(servicesSwiper)
  servicesSwiper.on("slideChange", () => showBtnGrad(servicesSwiper))
}
//swiper 3 items
const swiper3 = document.querySelectorAll('.swiper3')
if (swiper3) {
  swiper3.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
      slidesPerView: 2,
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      navigation: {
        prevEl: item.querySelector(".nav-btn--prev"),
        nextEl: item.querySelector(".nav-btn--next"),
      },
      breakpoints: {
        575.98: {
          slidesPerView: 3
        }
      },
      speed: 800
    }) 
  })
}
//swiper 4 items
const swiper4 = document.querySelectorAll('.swiper4')
if (swiper4) {
  swiper4.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
      slidesPerView: 2,
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      navigation: {
        prevEl: item.querySelector(".nav-btn--prev"),
        nextEl: item.querySelector(".nav-btn--next"),
      },
      breakpoints: {
        767.98: {
          slidesPerView: 4
        },
        575.98: {
          slidesPerView: 3
        }
      },
      speed: 800
    }) 
  })
}
//swiper 6 items
const swiper6 = document.querySelectorAll('.swiper6')
if (swiper6) {
  swiper6.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
      slidesPerView: 2,
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      navigation: {
        prevEl: item.querySelector(".nav-btn--prev"),
        nextEl: item.querySelector(".nav-btn--next"),
      },
      breakpoints: {
        1250.98: {
          slidesPerView: 6,
        },
        767.98: {
          slidesPerView: 4
        },
        575.98: {
          slidesPerView: 3
        }
      },
      speed: 800
    }) 
  })
}
//swiper 4 items
const popular = document.querySelector('.popular')
if (popular) {
  let popularSwiper = new Swiper(popular.querySelector(".swiper"), {
    slidesPerView: 2,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    navigation: {
      prevEl: popular.querySelector(".nav-btn--prev"),
      nextEl: popular.querySelector(".nav-btn--next"),
    },
    breakpoints: {
      1250.98: {
        slidesPerView: 4,
      },
      767.98: {
        slidesPerView: 2,
      },
      575.98: {
        slidesPerView: 3,
      }
    },
    speed: 800
  }) 
}
//partners swiper
const partners = document.querySelector('.partners')
if (partners) {
  let partnersSwiper = new Swiper(partners.querySelector(".swiper"), {
    slidesPerView: 3,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    grid: {
      rows: 2,
      fill: 'column'  
    },
    navigation: {
      prevEl: partners.querySelector(".nav-btn--prev"),
      nextEl: partners.querySelector(".nav-btn--next"),
    },
    breakpoints: {
      767.98: {
        slidesPerView: 5,
      },
      575.98: {
        slidesPerView: 4,
      }
    },
    speed: 800
  }) 
}
//init range slider
function initSliders() {
  let rangeSliders = filter.querySelectorAll(".range-filter")
  rangeSliders.forEach(item => {
    let rangeStart = item.querySelector(".range-filter__start")
    let rangeEnd = item.querySelector(".range-filter__end")
    let rangeSlider = item.querySelector(".range-filter__slider")
    let start = +item.getAttribute("data-start")
    let end = +item.getAttribute("data-end")
    let min = +item.getAttribute("data-min")
    let max = +item.getAttribute("data-max")
    noUiSlider.create(rangeSlider, {
      start: [start, end],
      connect: true,
      range: {
        'min': min,
        'max': max
      }
    });
    rangeStart.addEventListener("focus", () => {
      rangeStart.value = rangeStart.value.replaceAll(' ', '')
      rangeStart.setAttribute("type", "number")
    });
    rangeEnd.addEventListener("focus", () => {
      rangeEnd.value = rangeEnd.value.replaceAll(' ', '')
      rangeEnd.setAttribute("type", "number")
    });
    rangeStart.addEventListener("change", () => {
      rangeSlider.noUiSlider.set([rangeStart.value, null])
    });
    rangeEnd.addEventListener("change", () => {
      rangeSlider.noUiSlider.set([null, rangeEnd.value])
    });
    let rangeValues = [rangeStart, rangeEnd];
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      rangeStart.setAttribute("type", "text")
      rangeEnd.setAttribute("type", "text")
      rangeValues[handle].value = String(parseInt(values[handle])).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim();
    });
    rangeSlider.noUiSlider.on('change', function (values, handle) {
      //submit filtra
    });
  })
}
//filter-form
const filter = document.querySelector(".cat-top__filter")
if (filter) {
  initSliders()
}
// tippy
const tippy = document.querySelectorAll('.tippy')
const tippyContent = document.querySelector(".tippy-content")
if (tippy) {
    tippy.forEach(item => {
        function move() {
            let top = item.getBoundingClientRect().top
            let left = item.getBoundingClientRect().left
            tippyContent.style.left = left - tippyContent.clientWidth / 2 < 0 ? 0 : left - tippyContent.clientWidth / 2 + "px"
            tippyContent.style.top = top + 10 + "px"
        }
        item.addEventListener("mouseenter", () => {
            tippyContent.textContent = item.querySelector("p").textContent
            tippyContent.classList.add("show")
            move()
        })
        item.addEventListener("mouseleave", () => {
            tippyContent.textContent = ""
            tippyContent.classList.remove("show")
        })
    })
    window.addEventListener("resize", () => {
        tippyContent.textContent = ""
        tippyContent.classList.remove("show")
    })
    window.addEventListener("scroll", () => {
        tippyContent.textContent = ""
        tippyContent.classList.remove("show")
    })
}
const productAct = document.querySelector(".product__action")
if (productAct) {
  productAct.addEventListener("click", e => {
    if (productAct.querySelector(".product__add").contains(e.target)) {
      productAct.classList.add("in-card")
      addToCart()
      openModal(document.querySelector("#cart-modal"))
    }
  })
}
// allItemsCheck
function allCheckBtn(allItemsCheck,itemCheck) {
  allItemsCheck.addEventListener("change",() => {
    itemCheck.forEach(item => {
      if (allItemsCheck.checked) {
        item.checked = true
        item.setAttribute("checked", true)
      } else {
        item.checked = false
        item.removeAttribute("checked")
      }
    })
  })
  itemCheck.forEach(item => {
    item.addEventListener("change",() => {
      if (Array.from(itemCheck).every(item => item.checked )) {
        allItemsCheck.checked = true
        allItemsCheck.setAttribute("checked", true)
      } else {
        allItemsCheck.checked = false
        allItemsCheck.removeAttribute("checked")
      }
    })
  })
}
//cart select all
const cartForm = document.querySelector(".cart__form")
const allCartItemsCheck = document.querySelector(".cart-select-all input")
const itemCartCheck = Array.from(document.querySelectorAll(".item-cart__check input"))
if (cartForm) {
  allCheckBtn(allCartItemsCheck,itemCartCheck)
}
// filter checkbox select all
const allFilterItemsCheck = document.querySelectorAll(".cat-top .text-checkbox input")[0]
const itemFilterCheck = Array.from(document.querySelectorAll(".cat-top .text-checkbox input")).slice(1)
if (document.querySelector(".cat-top .text-checkbox")) {
  allCheckBtn(allFilterItemsCheck,itemFilterCheck)
}
// form validate
function formValidate(form) {
  let formReq = form.querySelectorAll(".required");
  form.querySelector(".form-btn").addEventListener("click", e => {
    e.preventDefault();
    let error = 0;
    formReq.forEach(item => {
      item.parentNode.classList.remove("error");
      if (item.classList.contains("email")) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(item.value)) {
          formAddError(item);
          error++;
        } 
      } else if (item.classList.contains("phone")) {
        if (!/^((\+7|7|8)([\s\-])?)?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(item.value)) {
          item.parentNode.classList.add("error");
          error++;
        }
      } else if (item.getAttribute("type")=== "checkbox" && item.checked ===false) {
        item.parentNode.classList.add("error");
        error++;
      } else {
        if (item.value === "") {
          item.parentNode.classList.add("error");
          error++;
        }
      }
    })
    if (error === 0) {
      if (!form.classList.contains("recipient-form")) {
        form.submit();
      } else {
        document.querySelector("input[name=recipientName]").value = form.querySelector("input[name=name]").value     
        document.querySelector("input[name=recipientTel]").value = form.querySelector("input[name=tel]").value
        document.querySelector("input[name=recipientMail]").value = form.querySelector("input[name=email]").value
        document.querySelector(".order-form__rec-name").textContent = form.querySelector("input[name=name]").value     
        document.querySelector(".order-form__rec-tel").textContent = form.querySelector("input[name=tel]").value
        document.querySelector(".order-form__rec-mail").textContent = form.querySelector("input[name=email]").value
      }      
     formSuccess(form, txt = false)
    }
    formReq.forEach(item => {
      item.addEventListener("change",e => {
        formValidate(form);
      })
    })
  });
}
const valForm = document.querySelectorAll(".form-validate")
if (valForm) {
  valForm.forEach(form => formValidate(form))
}
// extra text
const readMore = document.querySelectorAll(".read-more")
if (readMore) {
    function showMoreBtn() {
      readMore.forEach(item => {
        item.classList.remove("active")
        item.classList.add("more-hidden")
        let height = item.querySelector(".read-more__content").clientHeight
        item.classList.remove("more-hidden")
        let fullHeight = item.querySelector(".read-more__content").clientHeight
        item.classList.add("more-hidden")
        if (fullHeight > height ) {
            item.classList.add("btn-show")
        } else {
            item.classList.remove("btn-show")
        }
      })
    }
    showMoreBtn()
    window.addEventListener("resize",showMoreBtn)
    readMore.forEach(item => {
      let openTxt = item.querySelector(".read-more__btn").getAttribute("data-open")
      let closeTxt = item.querySelector(".read-more__btn").getAttribute("data-close")
      item.querySelector(".read-more__btn").addEventListener("click", () => {
        if (!item.classList.contains("active")) {
          item.classList.add("active")
          let height = item.querySelector(".read-more__content").clientHeight + "px"
          item.classList.remove("more-hidden")        
          let fullHeight = item.querySelector(".read-more__content").clientHeight + "px"
          item.querySelector(".read-more__content").style.height = height; 
          setTimeout(function () {
            item.querySelector(".read-more__content").style.height = fullHeight
            item.querySelector(".read-more__btn span").textContent = closeTxt           
            setTimeout(() => {
                  item.querySelector(".read-more__content").style.height = null
            }, 500); 
          }, 0);
      } else {
          item.classList.remove("active")
          let fullHeight = item.querySelector(".read-more__content").clientHeight + 'px';
          item.classList.add("more-hidden")
          let height = item.querySelector(".read-more__content").clientHeight + 'px';
          item.classList.remove("more-hidden")
          item.querySelector(".read-more__content").style.height = fullHeight   
          setTimeout(function () {
              item.querySelector(".read-more__content").style.height = height
              item.querySelector(".read-more__btn span").textContent = openTxt
              setTimeout(() => {
                item.classList.add("more-hidden")
                item.querySelector(".read-more__content").style.height = null
              }, 500);
          }, 0);
      }
      })
    })
}

const subscribe = document.querySelector(".banner-block--subscribe")
const newsWrap = document.querySelector(".news")
if (subscribe && newsWrap) {
  let newsItem = newsWrap.querySelectorAll(".item-news")
  if (newsItem.length >= 5) {
    newsItem[4].insertAdjacentElement("afterend", subscribe)
  }
}

const itemFormPass = document.querySelectorAll(".item-form--password")
if (itemFormPass) {
  itemFormPass.forEach(item => {
    item.querySelector(".item-form__eye").addEventListener("click", () => {
      item.classList.toggle("show-password")
      if (item.classList.contains("show-password")) {
        item.querySelector("input").type = "text"
      } else {
        item.querySelector("input").type = "password"
      }
    })
  })
}
//fixed-menu
const fixedMenu = document.querySelector(".fixed-menu")
const fixedMenuCat = document.querySelector(".fixed-menu__cat")
const mobCat = document.querySelector(".mobile-cat")
if (fixedMenuCat && mobCat) {
  fixedMenuCat.addEventListener("click", () => {
    fixedMenuCat.classList.add("active")
    mobCat.classList.add("show")
  })
  mobCat.querySelector(".btn-close").addEventListener("click", () => {
    fixedMenuCat.classList.remove("active")
    mobCat.classList.remove("show")
  })
}
function showFixedMenu() {
  if (window.innerWidth <= 991.98 && window.innerHeight - document.querySelector(".footer").getBoundingClientRect().bottom + 150 <= 0) {
    fixedMenu.classList.remove("unshow")
  } else {
    fixedMenu.classList.add("unshow")
  }
}
if (fixedMenu) {
  showFixedMenu()
  window.addEventListener("resize", showFixedMenu)
  window.addEventListener("scroll", showFixedMenu)
}
// tabs scroll btn
const tabsScroll = document.querySelectorAll(".tabs-scroll")
function viewScroll() {
  tabsScroll.forEach((item => {
    item.querySelector(".tabs").scrollWidth - item.querySelector(".tabs").clientWidth - item.querySelector(".tabs").scrollLeft > 5 ? item.classList.add("show-btn") : item.classList.remove("show-btn")
    item.querySelector(".tabs").addEventListener("scroll", () => {
      item.querySelector(".tabs").scrollWidth - item.querySelector(".tabs").clientWidth - item.querySelector(".tabs").scrollLeft > 5 ? item.classList.add("show-btn") : item.classList.remove("show-btn")
    })
  }
  ));
}
if (tabsScroll) {
  viewScroll(),
  window.addEventListener("resize", viewScroll)
}
// filter form
const filterForm = document.querySelectorAll(".filter-form")
const dataFilterForm = document.querySelectorAll("[data-filter]")
if (filterForm && dataFilterForm) {
  filterForm.forEach(item => {
    item.querySelectorAll("input[name=f-radio]").forEach(item => {
      item.addEventListener("change", () => {
        dataFilterForm.forEach(el => {
          if ( item.value == "all" || el.getAttribute("data-filter") == item.value) {
            el.style.display = "block"
          } else {
            el.style.display = "none"
          }
        })
      })
    })
  })
}

// setLbl
function showLbl(el) {
  overlay.classList.add("show")
  document.querySelectorAll(".js-lbl").forEach(item => item.classList.remove("show"))
  el.classList.add("show")
  if (lblTimeout) {
    clearTimeout(lblTimeout)
  } 
  lblTimeout = setTimeout(function () {
    overlay.classList.remove("show")
    el.classList.remove("show")
  }, 3500);
}
// filter inputs onchange
const catTopFilter = document.querySelector(".cat-top__filter")
const filterSelected = document.querySelector(".filter-selected__items")
if (filter && filterSelected) {
    const catfilter = {
        checkInp: function (inp) {
            inp.checked = true
            inp.setAttribute("checked", true)
        },
        uncheckInp: function (inp) {
            inp.checked = false
            inp.removeAttribute("checked")
        },
        setSelected: function (item) {
            let txt = item.parentNode.querySelector("span:last-child").textContent
            let idx = item.getAttribute("data-id")
            filterSelected.insertAdjacentHTML("afterbegin", `<div class="filter-selected__item" data-target="${idx}">${txt}${sprite("close")}</div>`)
        },
        removeSelected: function (index) {
            if (filterSelected.querySelector(`[data-target="${index}"]`)) {
                filterSelected.querySelector(`[data-target="${index}"]`).remove()
            }
        },
        selectedOnClick: function (e) {
            filterSelected.querySelectorAll(".filter-selected__item").forEach((item, idx) => {
                if (item.contains(e.target)) {
                    let dataTarget = item.getAttribute("data-target")
                    filter.querySelectorAll("label input[type=checkbox]")[dataTarget].click()
                    item.remove()
                    catfilter.checkedCount(filter.querySelectorAll("label input[type=checkbox]")[dataTarget])
                }
            })
        },
        resetFilter: function () {
            filter.querySelectorAll("label input[type=checkbox]").forEach(inp => {
                inp.checked = false
                inp.removeAttribute("checked")
                catfilter.checkedCount(inp)
            })
            filterSelected.innerHTML = ""
            if (catTopFilter.querySelector(".select-sort input[name=f-sort]")) {
              catTopFilter.querySelectorAll(".select-sort input[name=f-sort]")[0].parentNode.click()
            }
        },
        checkedCount: function (inp) {
          if (inp.closest(".select-custom") && inp.closest(".select-custom").querySelector(".filter-count")) {
            let count = inp.closest(".select-custom").querySelectorAll("label input[type=checkbox]:checked").length
            inp.closest(".select-custom").querySelector(".filter-count").textContent = count > 0 ? count : ""
          }        
        }
    }
    catTopFilter.querySelectorAll("label input[type=checkbox]").forEach((inp, i) => {
        inp.setAttribute("data-id", i)
        let index = inp.getAttribute("data-id")
        inp.addEventListener("change", () => {
            if (inp.checked) {
                catfilter.setSelected(inp)
            } else {
                catfilter.removeSelected(index)
            }
            catfilter.checkedCount(inp)
        })
    })
    filterSelected.addEventListener("click", e => catfilter.selectedOnClick(e))
    document.querySelector(".filter-selected__reset").addEventListener("click", () => catfilter.resetFilter())
}

// collagen validation
const collagenInput = document.getElementById('collagen-input');

if (collagenInput) {
  const errorMessage = document.getElementById('error-message');
  const submitBtn = document.getElementById('collagen-btn');

  collagenInput.addEventListener('input', function () {
    const regex = /^[^A-Za-z]*$/;
  
    if (!regex.test(collagenInput.value)) {
        errorMessage.textContent = "Для ввода используйте только русскую раскладку";
        errorMessage.style.display = "block";
        submitBtn.disabled = true;
    } else {
        errorMessage.style.display = "none";
        submitBtn.disabled = false;
    }
  });
  
}
