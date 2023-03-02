AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" },
    },
    init: function () {
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();    
    },
    update:function(){
      const fadeEl=document.querySelector("#fadebg")
      comic=fadeEl.children;
      if(comic.length>0){
        var i;
        for(i=0; i<=comic.length; i++){
          fadeEl.removeChild(comic[i])
        }
      }
      else{
        this.handleMouseClickEvents()
      }

    },
    handlePostersListState: function () {
      const id = this.el.getAttribute("id");
      const postersId = ["superman-poster", "spiderman-poster", "aero-poster", "outer-space-poster"];
      if (postersId.includes(id)) {
        const posterContainer = document.querySelector("#posters-container");
        posterContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "blue",
          opacity: 1,
        });
      }
    },
    handleMouseEnterEvents: function () {
      // Mouse Enter Events
      this.el.addEventListener("mouseenter", () => {
        this.handlePostersListState();
      });
    },
    handleMouseLeaveEvents: function () {
      // Mouse Leave Events
      this.el.addEventListener("mouseleave",()=>{
        const {selectedItemId}=this.data
        if(selectedItemId){
          const el=document.querySelector(`#${selectedItemId}`)
          const id=el.getAttribute("id")
          if(id==selectedItemId){
            el.setAttribute("material",{
              color:"white",
              opacity:1
            });
          }
        }
      });
      
    },
    handleMouseClickEvents:function(){
      this.el.addEventListener("click",evt=>{
      const{selectedItemId}=this.data  
      const fadeEl=document.querySelector("#fadebg")
      const titleEl=document.querySelector("#app-title")
      const cursorEl=document.querySelector("#camera-cursor")
      if(selectedItemId){
        fadeEl.setAttribute("visible",true)
        fadeEl.setAttribute("cursor",{
          itemId:selectedItemId,
        });
        titleEl.setAttribute("visible",false)
        cursorEl.setAttribute("position",{x:0,y:0,z:-1})
        cursorEl.setAttribute("geometry",{
          radiusInner:0.03,
          radiusOuter:0.04
        })
      }
      else{
        fadeEl.setAttribute("visible",false)
        titleEl.setAttribute("visible",true)
        cursorEl.setAttribute("position",{x:0,y:0,z:-3})
        cursorEl.setAttribute("geometry",{
          radiusInner:0.08,
          radiusOuter:0.12
        })
      }
    })
  }
  });
  