// References to DOM elements
// const prevBtn = document.querySelector('#prev-btn');
// const nextBtn = document.querySelector('#next-btn');
const book = document.querySelector('#book');

const paper1 = document.querySelector('#p1')
const paper2 = document.querySelector('#p2')
const paper3 = document.querySelector('#p3')
const paper4 = document.querySelector('#p4')
const paper5 = document.querySelector('#p5')
let shortHairIndex = 0;
// Event listeners
// prevBtn.addEventListener("click", goPrevious);
// nextBtn.addEventListener("click", goNext);

// Business Logic
let currentState = 1;
let numOfPapers = 5;
let maxState = numOfPapers + 1;

var aText;
var iSpeed = 50; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = 0; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
    
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow;
var isFirstPage = false;
var page2Opened = false;
var page3Opened = false;
var page4Opened = false;
var isDoneTyping = false;

const object1 = {
    fooValue: false,
    get foo() {
      return this.fooValue;
    },
    set foo(val) {
      this.fooValue = val;
      this.fooListener(val);
    },
    fooListener: function (val) {},
    registerNewListener: function (externalListenerFunction) {
      this.fooListener = externalListenerFunction;
    },
};
object1.registerNewListener((val) => console.log(`New Value: ${val}`));

function openBook() {
    book.style.transform = "translateX(50%)";
    // prevBtn.style.transform = "translateX(-180px)";
    // nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isFirstPage) {
    if(isFirstPage) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    // prevBtn.style.transform = "translateX(0px)";
    // nextBtn.style.transform = "translateX(0px)";
}

async function goNext() {
    if(currentState < maxState) { 
        switch(currentState) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 5;
                paper2.style.zIndex = 5;
                if(!isFirstPage){
                    aText = new Array(
                        "Dear Wabby Bubby,",
                        "",
                        "'<i>Kumusta ka aking mahal?",
                        "",
                        "Sana ay nasa mabuti ka",
                        "",
                        "Ako'y wag mong intindihin, nakakaraos din.</i>'",
                        "",
                        "Pero bitaw, <b>Happy Anniversary Wabby Bubby😘😘😘!</b> Mahal na mahal kita. Ayieeeeeeeeeee!",
                        "",
                        "Itong website na ito ay para talaga sayo.",
                        "",
                        "I hope you enjoy it!",
                    );
                    iArrLength = aText[0].length;
                    typewriter('typed-content-1', 1);
                    isFirstPage = true;
                }
                break;
            case 2:
                paper1.style.zIndex = 4;
                paper2.classList.add("flipped");
                paper3.style.zIndex = 5;
                if(!page2Opened){
                    showSlides('short-hair-slides', 0);
                    showSlides('long-hair-slides', 0);
                    page2Opened = true;
                }
                break;
            case 3:
                paper1.style.zIndex = 2;
                paper2.style.zIndex = 3;
                paper3.classList.add("flipped");
                paper4.style.zIndex = 5;
                if(!page3Opened){
                    showSlides('selfie-slides', 0);
                    showSlides('foodie-slides', 0);
                    page3Opened = true;
                }
                break;
            case 4:
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 3;
                paper4.classList.add("flipped");
                paper5.style.zIndex = 5;
                if(!page4Opened){
                    showSlides('sporty-slides', 0);
                    page4Opened = true;
                }
                break;
            case 5:
                closeBook(false);
                paper5.classList.add("flipped");
                if(isDoneTyping){
                    aText = new Array(
                        `"To all forms of you, aside sa akong gihisgotan sa sulod sa book, I will always and always love you."`,
                    );
                    iArrLength = aText[0].length;
                    typewriter('last-message', 3)
                }
                break;
            default: 
                throw new Error("unkown state");    
        }

        currentState++;
    }
}

function goPrevious() {
    if(currentState > 1) {
        switch(currentState) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 6;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 5;
                paper3.style.zIndex = 4;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 5;
                paper4.style.zIndex = 4;
                break;
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 5;
                paper5.style.zIndex = 4;
                break;
            case 6: 
                openBook()
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 5;
                break;
        }
        currentState--;
    }
}

function typewriter(div, type){
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
    var destination = document.getElementById(div);
    
    while ( iRow < iIndex ) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "|";
    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText.length ) {
            iArrLength = aText[iIndex].length;
            setTimeout(`typewriter('${div}', ${type})`, 300);
        }else{
            deleteLastCharacter(destination, 1);
            iIndex = 0; 
            iArrLength = 0;
            iScrollAt = 20; 
            iTextPos = 0; 
            sContents = '';
            if(type == 1){
                aText =  new Array(
                    `Taas taas napud atong naagian by ba? From year 2017 up to this year, padayon gihapon ta ug fight sa atong mga differences. Pero despite ana, we still managed to stay together. Stay strong lang jud ta by bisan pa sa atong mga ginagmay or dinagko nga mga away. Ibutang jud nato si Jehova sa center sa atong relasyon. Padayon ta sa pagbag-o ug pagsunod sa iya. Dira rako taman magstorya hahaha. Ang next pages kay appreciation post nako sa imo ug sa ato. Enjoy!`,
                );
                iArrLength = aText[0].length;
                typewriter('typed-content-2', 2);
            }else if(type == 2){
                isDoneTyping = true;
                document.getElementById('navigation').style.display = "block";
            }else if(type == 3){
                aText =  new Array(
                    `Sincerely yours,`,
                    '',
                    '<b>Wabby Buddy</b>'
                );
                iArrLength = aText[0].length;
                typewriter('from-message');
            }
        }
    } else {
        setTimeout(`typewriter('${div}', ${type})`, iSpeed);
    }
}
const getTextNodes = (el, nodes) => {
    nodes = nodes || [];
    for (var i = 0; i < el.childNodes.length; i++) {
        var curNode = el.childNodes[i];
        if (curNode.nodeName === "#text") {
            if (curNode.textContent.trim().length) {
                nodes.push(curNode);
            }
        } else {
            getTextNodes(curNode, nodes);
        }
    }
    
    return nodes;
}

const deleteLastCharacter = (el) => {
    const nodes = getTextNodes(el);
    curNode = nodes[nodes.length - 1];
    curNode.textContent = curNode.textContent.slice(0, -1);
}

function calculateTime(arr) {
    let total = arr.length;
    let newLineCalc = total * 300;
    let sumCalc = 0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].length == 0){
            sumCalc += 300;
        }
        sumCalc += (arr[i].length * (iSpeed + 10));
    }
    return newLineCalc + sumCalc;
}

function openGift(){
    document.getElementById("gift").style.display = "none";
    document.getElementById('dbook').style.display = "flex";
}
function showSlides(slideName, index) {
    let i;
    let slides = document.getElementsByClassName(slideName);
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    index++;
    if (index > slides.length) {index = 1}    
    slides[index-1].style.display = "block";  
    setTimeout(`showSlides('${slideName}', ${index})`, 3000);
}