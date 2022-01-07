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


    public function neurone($htmlvars){
        $this->htmlvars = $htmlvars;
        $csspath = $this->htmlvars['basepath'].'/web/css/style.css';
        $jsgo = $this->htmlvars['basepath'].'/web/javascript/go-debug.js';
        $html = <<<END
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Neurone Nono</title>
    <link rel="stylesheet" href=$csspath>
    <script type="module" src=$jsgo></script>
    <script src="https://unpkg.com/gojs/release/go-debug.js"></script>
</head>
<body>
    <div id="myDiagramDiv"></div>
    <button id="start">Start</button>
</body>
</html>
END;
    return $html;
    }

    public function carte($htmlvars){
        $this->htmlvars = $htmlvars;
        $csspath = $this->htmlvars['basepath'].'/web/css/style.css';
        $jsapp = $this->htmlvars['basepath'].'/web/javascript/app.js';
        $jsmin = $this->htmlvars['basepath'].'/web/javascript/pixi.min.js';
        $html = <<<END
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Nono le robot</title>    
    </head>
    
    <body>
        <div id="keys"></div>
        <script src=$jsmin></script>
        <script src=$jsapp></script>
    </body>
</html>
END;
        return $html;
    }
}