<?php

require_once __DIR__ . '/vendor/autoload.php';
use Illuminate\Database\Capsule\Manager as DB;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use nono\controleur\Controleur;

$db = new DB();
$config= parse_ini_file("src/conf/conf.ini");
$db->addConnection($config);
$db->setAsGlobal();
$db->bootEloquent();

$config = require_once './src/conf/settings.php';
$c = new \Slim\Container($config);
$app = new \Slim\App($c);

$app->get('/neurone', function (Request $rq, Response $rs, array $args):Response{
    $control = new Controleur($this);
    return $control->getNeurone($rq, $rs, $args);
});

$app->get('/carte', function (Request $rq, Response $rs, array $args):Response{
    $control = new Controleur($this);
    return $control->getCarte($rq, $rs, $args);
});


$app->run();
