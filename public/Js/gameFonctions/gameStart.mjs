import selectPeople from './gameFonctions.mjs';

const createGameBoard = (parent, name, srcImg, config) => {
    const UL = document.createElement("UL");
    for(let i=0;i<24;i++){
        const LI = document.createElement("LI");
        const DIV = document.createElement("DIV");
        const IMG = document.createElement("IMG");
        const P = document.createElement("P");

        IMG.classList.add("people_img")
        DIV.classList.add("people_container")
        LI.classList.add('people')
        LI.classList.add(`people_${i}`)
        P.classList.add('name_people')

        IMG.src = srcImg[i]
        P.textContent =`${name[i]}`

        // voir pour faire passer le nom en plus car en faisant passer juste l image et en recuperant le nom par raport a l URL bug sur les charactères spéciaux
        selectPeople(IMG, UL, config)

        DIV.appendChild(IMG)
        DIV.appendChild(P)
        LI.appendChild(DIV)
        UL.appendChild(LI)
    }
    UL.classList.add("list_peoples")
    parent.appendChild(UL)
}
export default createGameBoard