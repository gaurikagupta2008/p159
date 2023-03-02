AFRAME.registerComponent("comic",{
    schema:{
      state:{type:"string",default:"places-list"},
      selectedCard:{type:"string",default:"#card1"}
    },  
    init:function(){
      this.postersContainer = this.el;
      this.createCards()
    },
    tick:function(){
      const{state}=this.el.getAttribute("comic")
      if(state==="view"){
        this.hideEl([this.postersContainer])
        this.showView()
      }
    },
    hideEl:function(elList){
      elList.map(el=>{el.setAttribute("visible",false)});
    },
    showView:function(){
      const{selectedCard}=this.data;
      const skyEl=document.querySelector("#main-container")
      skyEl.setAttribute("material",{
        src: `./assets${selectedCard}/spiderman3D`,
        color:"white"
      });
    },
    createCards: function () {
        const thumbNailsRef = [
          {
            id: "superman-poster",
            url: "./assets/superman.jpg",
          },
          {
            id: "spiderman-poster",
            url: "./assets/spiderman.jpg",
          },
    
          {
            id: "aero-poster",
            url: "./assets/captainaero.jpg",
          },
          {
            id: "outer-space-poster",
            url: "./assets/outerspace.jpg",
          },
        ]
        let previousXPosition = -60;
        for (var item of thumbNailsRef) {
            const posX = previousXPosition + 25;
            const posY = 0;
            const posZ = -40;
            const position = { x: posX, y: posY, z: posZ };
            previousXPosition = posX;

    // Border Element
      const borderEl=this.createBorder(position,item.id)

      // Thumbnail Element
      const thumbnail=this.createThumbnail(item)
      borderEl.appendChild(thumbnail)
      
      this.postersContainer.appendChild(borderEl);
    }
    

},
    createBorder:function(position,id){
      const entityEl=document.createElement("a-entity")
      entityEl.setAttribute("id", id);
      entityEl.setAttribute("visible",true)
      entityEl.setAttribute("geometry",{
        primitive:"plane",
        height:30,
        width:22,
    });
    entityEl.setAttribute("position",position)
    entityEl.setAttribute("material",{
      color:"white",
      opacity:1,
    });
    entityEl.setAttribute("cursor-listener",{});
    return entityEl
  },
  createThumbnail:function(item){
    const entityEl=document.createElement("a-entity")
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("geometry",{
      primitive:"plane",
      height:28,
      width:20
    });
    entityEl.setAttribute("material",{
      src:item.url
    });
    entityEl.setAttribute("position",{
      x:0, y:0, z:0.1
    });
    return entityEl
  },  
})