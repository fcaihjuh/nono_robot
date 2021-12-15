<?php

namespace nono\vue;

class VueParticipant
{
    private $data;
    private $container;
    private $selecteur;
    private $htmlvars;

    public function __construct(array $data, $c)
    {
        $this->data = $data;
        $this->container = $c;
    }


    public function carte($htmlvars){
        $this->htmlvars = $htmlvars;
        $csspath = $this->htmlvars['basepath'].'/web/css/style.css';
        $jsgame = $this->htmlvars['basepath'].'/web/javascript/Game.js';
        $jsmap = $this->htmlvars['basepath'].'/web/javascript/Map.js';
        $jscell = $this->htmlvars['basepath'].'/web/javascript/Cell.js';
        $html = <<<END
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href=$csspath>
    <title>titre</title>
    <script src="$jsgame"></script>
    <script src="$jsmap"></script>
    <script src="$jscell"></script>
</head>
<body>

    <canvas id="myCanvas" width=900 height="800"></canvas>

</body>

<script>
    game = new Game();
    game.init();
    setInterval('game.run()', 100);
</script>
</html>
END;
    return $html;
    }

    public function controleur($htmlvars){
        $this->htmlvars = $htmlvars;
        $csspath = $this->htmlvars['basepath'].'/web/css/style.css';
        $jspath = $this->htmlvars['basepath'].'/web/javascript/Menu.js';
        $html = <<<END
        <!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bootstrap</title>
	<link rel="stylesheet" type="text/css" href="http://www.jq22.com/jquery/bootstrap-3.3.4.css">
	<link rel="stylesheet" href="$csspath">

</head>
<body>
	<div id="wrapper">
        <div class="overlay"></div>
        <nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
            <ul class="nav sidebar-nav">
                <li class="sidebar-brand"><a href="#">Contrôleur</a></li>
                <li><a href="#"><i class="fa fa-fw fa-home"></i> Home</a></li>
                <li><a href="#"><i class="fa fa-fw fa-folder"></i> Page one</a></li>
                <li><a href="#"><i class="fa fa-fw fa-file-o"></i> Second page</a></li>
                <li><a href="#"><i class="fa fa-fw fa-cog"></i> Third page</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-fw fa-plus"></i> Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li class="dropdown-header">Dropdown heading</li>
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li><a href="#">Separated link</a></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
                <li><a href="#"><i class="fa fa-fw fa-bank"></i> Page four</a></li>
                <li><a href="#"><i class="fa fa-fw fa-dropbox"></i> Page 5</a></li>
                <li><a href="#"><i class="fa fa-fw fa-twitter"></i> Last page</a></li>
            </ul>
        </nav>

        <div id="page-content-wrapper">
              <button type="button" class="hamburger is-closed animated fadeInLeft" data-toggle="offcanvas">
                <span class="hamb-top"></span>
                <span class="hamb-middle"></span>
                <span class="hamb-bottom"></span>
              </button>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2">
                        <!--Contenu de Nono-->
                    </div>
                </div>
            </div>
        </div>
    </div>
	<script src="http://www.jq22.com/jquery/jquery-1.10.2.js"></script>
	<script src="http://www.jq22.com/jquery/bootstrap-3.3.4.js"></script>
	<script type="text/javascript" src="$jspath"></script>
</body>
</html>
END;
        return $html;
    }
}