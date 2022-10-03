let typingElement = document.querySelector(".typing")
let home = document.querySelector("#home")
const copiers = document.querySelectorAll(".copy")

const scrollables = document.querySelectorAll(".card")
class Bubble{
  constructor(left, top) {
    this.top = top
    this.left = left
    this.element =  null
  }
 
  
  init(){
    this.element = document.createElement("div")
    this.element.classList.add("bubble")
    this.element.style.setProperty("--x-direction", `${Math.random() * 1000}px`)
    this.element.style.setProperty("--y-direction", `${Math.random() * 1000}px`)
    this.element.style.setProperty("--left", `${this.left}px`)
    this.element.style.setProperty("--top", `${this.top}px`)
    this.element.style.setProperty("--size", `${Math.random() * .5 + 1}rem`)
    this.element.style.setProperty("--speed", `${Math.random() * .5 + 3}s`)
    this.element.style.setProperty("--color", `hsl(290, 100%, ${Math.random() * 100 + 1}%, .5)`)
    document.querySelector("#home .container").appendChild(this.element)
    // this.move()
    setInterval(() => {
      this.element.remove()
    }, 2000)
  }
}
function addBubbles(e) {
  const buble = new Bubble(e.clientX, e.clientY)
  buble.init()
}


function type(typingElement) {
  typingElement.classList.remove("next")
 return new Promise((resolve, reject) => {
   
   const typingText = typingElement.textContent
   
   typingElement.textContent = null
   
   let i = 0
   let typingInterval
   
   typingInterval = setInterval(() => {
     typingElement.textContent += typingText.charAt(i)
     
     i++
     
     if(i > typingText.length) {
       clearInterval(typingInterval)
       
       document.querySelector(".typing ~ .cursor").style.display = "none"
       resolve(true)
     }
   }, 100)
 })
  
  
}

async function copyText(e){
  const text = e.target.textContent
  await navigator.clipboard.writeText(text)
}
const typingElementNext = document.querySelector(".typing.next")

type(typingElement).then(res => {
  type(typingElementNext)
})


const observer = new IntersectionObserver(entries => {
  entries.forEach(card => {
    if(card.isIntersecting) {
      card.target.classList.add("visible")
    }
  })
})

copiers.forEach(copier => copier.addEventListener("click", copyText))

scrollables.forEach(scrollable => observer.observe(scrollable))

home.addEventListener("mousemove", addBubbles)