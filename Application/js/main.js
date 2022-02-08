import go from "./go-debug.js";

function demo_init(){

    // check for WebGL
    
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
	type = "canvas";
    }
    PIXI.utils.sayHello(type);
    
    // Create a Pixi Application
    
    app = new PIXI.Application({
	width: 850,        // default: 800
	height: 500,        // default: 600
	antialias: true,    // default: false
	transparent: false, // default: false
	resolution: 1       // default: 1
    });

    // Load ressources (images for sprites) 
    
    PIXI.Loader.shared
      .add('robot', "assets/nono-small.png")
      .add('cherry', "assets/cherry.png")
      .load(( loader, resources ) => {
	    
	  //make sprites 

	  textures.robot = resources.robot.texture;
	  textures.cherry = resources.cherry.texture;
	  
	  // when finished loading images, start everyting else

	  demo_start();
	  
	});
}
	      
function demo_start() {
  
    // Add the canvas (app.view) to the HTML document

	document.getElementById("carte").appendChild(app.view);

    // Set the background

    app.renderer.backgroundColor = 0x000000;
           
    if (! debug ){
	
	// Add food and a robot 
	make_cherries(num_cherries, app.stage) ;
	make_robot(app.stage);
	
    }
    else {
	//DEBUG
	
	let obj = new PIXI.Graphics();
	obj.beginFill(0xff0000);
	obj.drawRect(0, 0,  100 + sensor_range * 0.5,  100 + 20);
	app.stage.addChild(obj);
	obj = new PIXI.Graphics();
	obj.beginFill(0x0000ff);
	obj.drawRect(0, 0, 100, 100);
	app.stage.addChild(obj);
	
	let cherry =  new Cherry(0,100+sensor_range * 0.5, 120, 0 );
	cherries.push ( cherry );
	app.stage.addChild( cherry );
      
	nono = new Robot(100,100,0);        
	app.stage.addChild( nono );
    
    }
    
    // Add a ticker (calls a function 60 time per sec)
	document.querySelector("#start").addEventListener("click", ()=>{
		console.log(go.save())
		app.ticker.add((delta) => game_loop(go.save()[0], go.save()[1], delta));
	})
    
}

function game_loop(vl, vr, delta) {
    
    // update time and tics
    let dt = delta/60;
    elapsed += dt;
    tics++;

    // robot sens/ act loop 
    if (! debug && (tics % act_rate) == 0){

	// read sensors   
	let sensors = nono.read_sensors();

	// compute controller
	let motor = nono.random_controller( sensors );
	
	// move robot
	nono.move(vl, vr, dt);

    }


    // debugging stuff  move robot and then stop
    if (debug &&  (tics % act_rate) == 0 && tics < 100 ){
	
	let sensors = nono.read_sensors();
	let motor = [1,1]
	nono.move(motor[0], motor[1], dt);

	console.log(sensors);
    }
  	
}


export default{
	demo_init: demo_init,
}





