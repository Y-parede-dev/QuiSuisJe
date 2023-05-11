/**
 * Cette fonction permet aux utilisateurs de sélectionner une personne dans une liste d'images et d'afficher leur nom et leur image.
 *
 * @param {HTMLImageElement} elt - L'élément image sur lequel l'utilisateur clique pour sélectionner une personne.
 * @param {HTMLUListElement} parent - L'élément parent où les informations de la personne sélectionnée sont affichées.
 * @param {JSON} config - Un objet de configuration contenant les paramètres de jeu.
 */
const selectPeople = (elt, parent, config) => {
    elt.addEventListener('click', (item) => {
        
        if(config.game.timeoutPeople.select){
            return
        }
        if(!config.game.people_choice){
            const urlImgChoice = item.target.src
            const containerImageChoice = document.createElement('DIV')
            const backgroudImage = document.createElement('DIV')
            const arrow = document.createElement('BUTTON')
            const imageChoice = document.createElement('IMG')
            const name = document.createElement('P')
            arrow.textContent='<'
            backgroudImage.classList.add('border-l-grad-img')
            arrow.classList.add('btn_show_people_choice')
            containerImageChoice.classList.add('container-img-choice')
            name.classList.add('name-select_people')
            imageChoice.src = urlImgChoice
            if(elt.src.includes('localhost')){
                name.textContent= elt.src.replaceAll("http://localhost:437/", "").replaceAll('.webp','')
            }
            else{
                name.textContent= elt.src.split(".com/")[1].replaceAll('.webp','')
            }
            containerImageChoice.appendChild(arrow)
            backgroudImage.appendChild(imageChoice)
            containerImageChoice.appendChild(backgroudImage)
            containerImageChoice.appendChild(name)
            parent.appendChild(containerImageChoice)
            showPeopleToggle(arrow, containerImageChoice)
            config.game.people_choice = !config.game.people_choice
            return            
        }
        elt.classList.toggle("people_down")
        config.game.timeoutPeople.select = true
        
        const timout = setTimeout(()=>{
            config.game.timeoutPeople.select = false
            
        },350)
        return(()=>{
            clearTimeout(timout)
        })
        
    })
}
/**
   * Cette fonction permet de basculer la visibilité d'un élément de conteneur lorsqu'un bouton est cliqué.
   *
   * @param {arrow} elt - bouton qui ouvre et ferme la fenetre de visualisation de la star choisie
   * @param {HTMLDivElement} container - L'élément de conteneur dont la visibilité doit être basculée.
*/
const showPeopleToggle = (elt, container) => {
    elt.addEventListener('click',(e)=>{
        elt.classList.toggle('arow_revers')
        container.classList.toggle('show_selected_people')
    })
}
export default selectPeople