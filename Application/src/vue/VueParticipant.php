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


    public function render($htmlvars){
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
<div id="box"">
    <canvas id="myCanvas" width="1000" height="800"></canvas>
</div>
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
}