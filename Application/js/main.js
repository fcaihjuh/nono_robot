

function demo_init(){

    // check for WebGL
    
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
	type = "canvas";
    }
    PIXI.utils.sayHello(type);
    
    // Create a Pixi Application
    
    app = new PIXI.Application({
	width: 1030,        // default: 800
	height: 760,        // default: 600
	antialias: true,    // default: false
	transparent: false, // default: false
	resolution: 1,      // default: 1
	//autoResize: true
    });
	


    // Load ressources (images for sprites) 
    
    PIXI.Loader.shared
      .add('robot', "assets/nono-small.png")
      .add('cherry', "assets/cherry.png")
	  .add('obstacle', "assets/obstacle.png")
      .load(( loader, resources ) => {
	    
	  //make sprites 

	  textures.robot = resources.robot.texture;
	  textures.cherry = resources.cherry.texture;
	  textures.obstacle = resources.obstacle.texture;
	  
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
	make_obstacle(num_obstacles, app.stage);

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

		let obst =  new Obstacle(0,100+sensor_range * 0.5, 80, 0 );
		obstacles.push (obst );
		app.stage.addChild( obst );
      
		nono = new Robot(100,100,0);
		app.stage.addChild( nono );
    
    }
    paused = true;

    app.ticker.add((delta) => game_loop(delta));
	//app.ticker.stop();

	// Add the event to the button
	init_events();
    
}


function init_events() {
	let start = document.querySelector("#start");
	start.onclick = function () {
		console.log(paused);
		if(!paused){
			nono.set_nn_parameter(get_nn_parameter());

			//app.ticker.start();

			// change icon of button
			start.classList.remove("bi-pause-circle");
			start.classList.add('bi-play-circle');

		}else{
			//app.ticker.stop();

			//change icon of button
			start.classList.remove("bi-play-circle");
			start.classList.add('bi-pause-circle')
		}
		paused = !paused;
	}


	document.querySelector("#reset").addEventListener("click", ()=>{
		nono.reset();

		for (let i=0; i<num_cherries; i++) {
			cherries[i].relocate();
		}
		for (let i=0; i<num_obstacles; i++) {
			obstacles[i].relocate();
		}

		elapsed = 0;
		tics 	= 0;
		paused 	= true;
	})

	document.querySelector("#update").addEventListener("click", ()=>{
		nono.set_nn_parameter(get_nn_parameter());
		
	})
}

function game_loop(delta) {

	if (!paused) {
		// update time and tics
		let dt = delta / 60;
		elapsed += dt;
		tics++;

		// robot sens/ act loop
		if (!debug && (tics % act_rate) == 0) {

			// read sensors
			let sensors = nono.read_sensors();
			console.log(sensors);
			let motor;
			// compute controller
			motor = nono.nono_controller(sensors);
			nono.move(motor[0], motor[1], dt);


		}


		// debugging stuff  move robot and then stop
		if (debug && (tics % act_rate) == 0 && tics < 100) {

			let sensors = nono.read_sensors();
			//let motor = [0, 0]
			let motor = nono.nono_controller(sensors)
			nono.move(motor[0], motor[1], dt);

			console.log(sensors);
		}
	}
}







