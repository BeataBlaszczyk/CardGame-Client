import Chat from "./Chat";
import Logs from "./Logs";
import React from "react";
import classes from "./RightSide.module.css"

function RightSide() {


    
        function resizing(e){
            const el = document.getElementById("resize");
           
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);

            let prevY=e.clientY;

            function mousemove(e){
                let newY =  e.clientY - prevY+"px";
                const gridEl = document.getElementById("rightSide--main");
               
                gridEl.style.gridTemplateRows = "calc(50% - 1px + " +newY+ ") 2px calc(50% - 1px - " + newY + ")"
            
            }

            function mouseup(){
                
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
    
            }




        }


  return (
    <div id="rightSide--main" className={classes["rightSide--main"]}>
      <Logs />
      <div id="resize" className={classes.resize} onMouseDown={resizing} > </div>
      <Chat />
    </div>
  );
}

export default RightSide;
