import selectPeople from './gameFonctions.mjs';

const createGameBoard = (parent, name, srcImg, config) => {
    const UL_listPeoples = document.createElement("UL");
    for(let i=0;i<24;i++){
        const LI_people = document.createElement("LI");
        const DIV_containerInLI = document.createElement("DIV");
        const PeopleIMG = document.createElement("IMG");
        const peopleName = document.createElement("P");

        PeopleIMG.classList.add("people_img")
        DIV_containerInLI.classList.add("people_container")
        LI_people.classList.add('people')
        LI_people.classList.add(`people_${i}`)
        peopleName.classList.add('name_people')

        PeopleIMG.src = srcImg[i]
        peopleName.textContent =`${name[i]}`

        // voir pour faire passer le nom en plus car en faisant passer juste l image et en recuperant le nom par raport a l URL bug sur les charactères spéciaux
        selectPeople(PeopleIMG, UL_listPeoples, config)

        DIV_containerInLI.appendChild(PeopleIMG)
        DIV_containerInLI.appendChild(peopleName)
        LI_people.appendChild(DIV_containerInLI)
        UL_listPeoples.appendChild(LI_people)
    }
    UL_listPeoples.classList.add("list_peoples")
    parent.appendChild(UL_listPeoples)
}
export default createGameBoard
