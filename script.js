console.log("hey");
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var tl = gsap.timeline({
  scrollTrigger:{
    trigger:"#nav",
    start:"top 3%",
    end:"top 50%",
    // markers:true,
    scroller:"#main",
    scrub:2,
    }
}
    
);
tl.to("#nav",{
  top:"0vh",
    width:"102vw",
    left:"-1vw",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.274)",
    

})
tl.to("#nav",{

    borderRadius:"0vw",
    

})

var start = gsap.timeline();
start.to("#page1",{
  backgroundSize:"110%",
  duartion:10,
  delay:0.5
})
start.from("#nav",{
    y:-200,
  opacity:0,
  duartion:5,
  ease:"expo.out"
},"<0.6")
// start.to("#nav",{
// opacity:1,
//   ease:"expo.out"
// },"<")

var reveal = gsap.timeline({
  scrollTrigger:{
    trigger:"#page2",
    scroller:"#main",
    // markers:true,
    start:"top 70%",
    end:"top 40%",
    

  }
})

reveal.to(".p2-txt-box h1 span",{
y: "0%",
  opacity:1,
  stagger:0.1
})
reveal.to(".p2-txt-box2 h1 span",{
y: "0%",
  opacity:1,
  stagger:0.1
},"<0.2")


var reveal2 = gsap.timeline({
  scrollTrigger:{
    trigger:"#page2",
    scroller:"#main",
    // markers:true,
    start:"top 30%",
    // end:"top 40%",
    

  }
}) 
reveal2.from(".best-tag",{
  opacity:0,
  top:"30vh",
  
},"<0.4")
reveal2.from(".best-tag",{
 rotate:"0deg"
},"<0.3")

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 24,
  slidesPerGroup: 1, 
  loop: false,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      if (index < 3) {
        return '<span class="' + className + '"></span>';
      }
      return ''; 
    },
  },

  breakpoints: {
    320: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 4 }
  }
});

// --- LINE PAGINATION CLICK LOGIC ---
document.addEventListener('click', function(e) {
  if(e.target.classList.contains('swiper-pagination-bullet')) {
    var bullets = Array.from(document.querySelectorAll('.swiper-pagination-bullet'));
    var clickedIndex = bullets.indexOf(e.target);

    if (clickedIndex === 0) {
      swiper.slideTo(0); // Line 1 Click -> Direct Card 1,2,3,4
    } else if (clickedIndex === 1) {
      swiper.slideTo(4); // Line 2 Click -> Direct Card 5,6,7,8 (Index 4 is 5th Card)
    } else if (clickedIndex === 2) {
      swiper.slideTo(5); // Line 3 Click -> Direct Card 6,7,8,9 (Index 5 is 6th Card)
    }
  }
});

// --- ARROWS AUR AUTO-SWIPE DETECTOR LINKING ---
// Arrow keys dabane par bhi bullet state logic maintain rahega flawlessly
swiper.on('slideChange', function () {
  var bullets = document.querySelectorAll('.swiper-pagination-bullet');
  if(bullets.length >= 3) {
    bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));
    
    if (swiper.activeIndex < 4) {
      bullets[0].classList.add('swiper-pagination-bullet-active');
    } else if (swiper.activeIndex === 4) {
      bullets[1].classList.add('swiper-pagination-bullet-active');
    } else if (swiper.activeIndex >= 5) {
      bullets[2].classList.add('swiper-pagination-bullet-active');
    }
  }
});


var revealp3 = gsap.timeline({
  scrollTrigger:{
    trigger:"#page3",
    scroller:"#main",
    // markers:true,
    start:"top 50%",
    end:"top 30%",
    

  }
})
revealp3.from(".dis",{
  opacity:0,
  marginTop:"0vh",
  ease:"power2.Out"
  
},"<")
revealp3.from(".dis",{
 rotate:"0deg"
},"<0.3")
revealp3.to(".p3-txt h1 span",{
y: "0%",
  opacity:1,
  stagger:0.1
},"<0.3")
revealp3.to(".p3-txt2 h1 span",{
y: "0%",
  opacity:1,
  stagger:0.1
},"<0.2")

revealp3.from(".txtbox span",{

  opacity:0,
  stagger:0.1
},"<0.2")

var revealp4 = gsap.timeline({
  scrollTrigger:{
    trigger:"#page4",
    scroller:"#main",
    // markers:true,
    start:"top 50%",
    end:"top 30%",
  }
  })

  revealp4.from(".origin",{
  opacity:0,
  marginTop:"0vh",
  ease:"power2.Out"
  
},"<")
revealp4.from(".origin",{
 rotate:"0deg"
},"<0.3")


var revealp5 = gsap.timeline({
  scrollTrigger:{
    trigger:"#page4",
    scroller:"#main",
    // markers:true,
    start:"top 50%",
    end:"top 0%",
    scrub:5
  }
  })

revealp5.to(".kettle",{
 top:"-3vw"
})

gsap.to(".maintext",{
 top:"50vh",
 scrollTrigger:{
    trigger:"#page4",
    scroller:"#main",
    // markers:true,
    start:"top 30%",
    end:"top -10%",
    scrub:10
  }
})
gsap.to(".para",{
 top:"120vh",
 scrollTrigger:{
    trigger:".maintext",
    scroller:"#main",
    // markers:true,
    start:"top 50%",
    end:"top -10%",
    scrub:10
  }
})
gsap.to(".picon",{
 top:"185vh",
 scrollTrigger:{
    trigger:".para",
    scroller:"#main",
    // markers:true,
    start:"top 10%",
    end:"top -10%",
    scrub:10
  }
})


var revealp5 = gsap.timeline({
  scrollTrigger:{
    trigger:"#page5",
    scroller:"#main",
    // markers:true,
    start:"top 50%",
    end:"top 30%",
    

  }
})
revealp5.from(".rev",{
  opacity:0,
  marginTop:"0vh",
  ease:"power2.Out"
  
},"<")
revealp5.from(".rev",{
 rotate:"0deg"
},"<0.3")
revealp5.to(".p5-txt h1 span",{
y: "0%",
  opacity:1,
  stagger:0.1
},"<0.3")
revealp5.to(".p5-txt2 h1 span",{
y: "0%",
  opacity:1,
  stagger:0.1
},"<0.2")

var revealp8 = gsap.timeline({
  scrollTrigger:{
    trigger:"#page8",
    scroller:"#main",
    // markers:true,
    start:"top 50%",
    end:"top 30%",
    

  }
})
revealp8.from(".jor",{
  opacity:0,
  marginTop:"0vh",
  ease:"power2.Out"
  
},"<")
revealp8.from(".jor",{
 rotate:"0deg"
},"<0.3")
revealp8.to(".p8-txt h1 span",{
y: "0%",
  opacity:1,
  stagger:0.1
},"<0.3")
revealp8.to(".p8-txt2 h1 span",{
y: "0%",
  opacity:1,
  stagger:0.1
},"<0.2")




gsap.from(".psix6 h1, .psix6 h5, .psix6 .conbtn",{
  y:100,
  opacity:0,
    stagger:0.2,

  scrollTrigger:{
    trigger:"#page6",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    
  }
})

gsap.from(".p9-1 h1",{
  y:100,
  opacity:0,
    stagger:0.2,

  scrollTrigger:{
    trigger:"#page9",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    
  }
})
gsap.from(".p9p",{
  y:100,
  opacity:0,
    stagger:0.2,

  scrollTrigger:{
    trigger:"#page9",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    
  }
})
gsap.from(".p9b",{
  y:100,
  opacity:0,
    stagger:0.2,

  scrollTrigger:{
    trigger:"#page9",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    
  }
})
gsap.from(".p7txt h1, .p7txt h5",{
  y:100,
  opacity:0,
    stagger:0.2,

  scrollTrigger:{
    trigger:"#page7",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    
  }
})
gsap.to(".p7movingelm",{
 top:"-5vw",

  scrollTrigger:{
    trigger:"#page7",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    scrub:3
    
  }
})
gsap.from(".p7layertxt h1, .p7layertxt h4",{
  y:100,
  opacity:0,
    stagger:0.2,

  scrollTrigger:{
    trigger:".p7layertxt",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    
  }
})
gsap.from(".nice",{
 
  opacity:0,
    

  scrollTrigger:{
    trigger:".p7layertxt",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    
  }
})
gsap.from(".lst-logo img",{
 
  opacity:0,
    

  scrollTrigger:{
    trigger:"#page11",
    // markers:true,
    scroller:"#main",
    start:"top 45%",
    end:"top 5%",
    
  }
})


