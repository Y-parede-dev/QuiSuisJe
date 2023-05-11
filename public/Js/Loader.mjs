const createAndDestroyLoader = (duree) => {
    const Loader = document.getElementById("loader")
    const loading = document.createElement('P');
    const loadElt = ["l","o","a","d","i","n","g"]
    Loader.classList.add('Loader_container')
    loadElt.forEach((elt)=>{
        const loadEltSpan = document.createElement("SPAN")
        loadEltSpan.textContent = elt
        loadEltSpan.classList.add('loadElt')
        loading.appendChild(loadEltSpan)
    })
    Loader.appendChild(loading)

    const timeout = setTimeout(()=>{
        Loader.remove()
    }, duree)
    return (()=>{
        clearTimeout(timeout)
        }
    )
}
export default createAndDestroyLoader